import { CollectionPhotoSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const collectionIdParam = req.nextUrl.searchParams.get("collectionId");
    const collectionId = collectionIdParam
      ? parseInt(collectionIdParam, 10)
      : NaN;

    if (isNaN(collectionId)) {
      return NextResponse.json(
        {
          message: "collectionId must be provided as a valid integer param!",
        },
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

    const {
      id,
      photographer,
      photographerUrl,
      width,
      height,
      alt,
      landscape,
      large,
      original,
      portrait,
    } = validatedResult.data;

    const collectionPhoto = await prisma.photo.create({
      data: {
        id,
        width,
        height,
        alt,
        landscape,
        large,
        original,
        portrait,
        photographer,
        photographerUrl,
        collectionId,
      },
    });

    return NextResponse.json(collectionPhoto, { status: 201 });
  } catch (error) {
    console.error("Error while storing Photo in db:", error);
    return NextResponse.json(
      { error: "Internal server error while storing Photo" },
      { status: 500 },
    );
  }
}
