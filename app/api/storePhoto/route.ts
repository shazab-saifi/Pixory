import { CollectionPhotoSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const collectionIdParam = req.nextUrl.searchParams.get("collectionId");
    const collectionId = collectionIdParam
      ? parseInt(collectionIdParam, 10)
      : NaN;

    if (isNaN(collectionId)) {
      return NextResponse.json(
        { message: "collectionId must be provided as a valid integer param!" },
        { status: 400 },
      );
    }

    const validatedResult = CollectionPhotoSchema.safeParse(body);
    if (!validatedResult.success) {
      return NextResponse.json(
        {
          message: "Validation failed!",
          errors: validatedResult.error.errors,
        },
        { status: 400 },
      );
    }

    const photoData = validatedResult.data;

    let photo = await prisma.photo.findUnique({
      where: { id: photoData.id },
    });

    if (!photo) {
      photo = await prisma.photo.create({
        data: photoData,
      });
    }

    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
    });
    if (!collection) {
      return NextResponse.json(
        { message: "Collection does not exist!" },
        { status: 404 },
      );
    }

    const existingCollectionMedia = await prisma.collectionMedia.findFirst({
      where: { photoId: photo.id, collectionId },
    });

    if (existingCollectionMedia) {
      return NextResponse.json(
        { message: "This photo already exists in this collection!" },
        { status: 409 },
      );
    }

    const collectionMedia = await prisma.collectionMedia.create({
      data: {
        photoId: photo.id,
        collectionId,
      },
    });

    return NextResponse.json(
      { message: "Photo added to collection successfully!", collectionMedia },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Unique constraint failed!" },
          { status: 409 },
        );
      }
    }
    console.error("Error while storing Photo in db:", error);
    return NextResponse.json(
      { error: "Internal server error in storePhoto endpoint!" },
      { status: 500 },
    );
  }
}
