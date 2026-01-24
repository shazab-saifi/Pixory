import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function DELETE(req: NextRequest) {
  const collectionIdParam = req.nextUrl.searchParams.get("collectionId");

  if (!collectionIdParam) {
    return NextResponse.json(
      {
        error:
          "collectionId must be provided as a param to delete the collection!",
      },
      { status: 404 }
    );
  }

  try {
    const collection = await prisma.collection.findUnique({
      where: { id: parseInt(collectionIdParam) },
    });

    if (!collection) {
      return NextResponse.json(
        { error: "Collection with this id doesn't exists!" },
        { status: 400 }
      );
    }

    await prisma.collectionMedia.deleteMany({
      where: { collectionId: parseInt(collectionIdParam) },
    });

    await prisma.collection.delete({
      where: { id: parseInt(collectionIdParam) },
    });

    return NextResponse.json({ message: "Collection Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
