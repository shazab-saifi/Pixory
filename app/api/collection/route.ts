import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { CreateCollectionSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Not authenticated!" },
        { status: 401 },
      );
    }

    const validationResult = CreateCollectionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed!",
          errors: validationResult.error.errors,
        },
        { status: 400 },
      );
    }

    const { collectionName } = validationResult.data;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist with this email!" },
        { status: 404 },
      );
    }

    const existingCollectionsCount = await prisma.collection.count({
      where: { userId: user.id },
    });

    if (existingCollectionsCount >= 10) {
      return NextResponse.json(
        { error: "You can only have a maximum of 10 collections!" },
        { status: 400 },
      );
    }

    const findCollection = await prisma.collection.findFirst({
      where: { name: collectionName, userId: user.id },
    });

    if (findCollection) {
      return NextResponse.json(
        { error: "Collection with this name already exists!" },
        { status: 409 },
      );
    }

    const collection = await prisma.collection.create({
      data: {
        name: collectionName,
        userId: user.id,
      },
    });

    return NextResponse.json(
      { collection, message: "Collection created successfully!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating collection:", error);
    return NextResponse.json(
      { error: "Internal server error in collection endpoint!" },
      { status: 500 },
    );
  }
}
