import { CollectionVideoSchema } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const collectionIdParam = req.nextUrl.searchParams.get("collectionId");
    const collectionId = collectionIdParam
      ? parseInt(collectionIdParam, 10)
      : NaN;

    if (!collectionId) {
      return NextResponse.json(
        {
          error: "Collection id must be provided as a param!",
        },
        { status: 400 },
      );
    }

    const validateVideo = CollectionVideoSchema.safeParse(body);
    if (!validateVideo.success) {
      return NextResponse.json(
        {
          error: "validation failed!",
          errors: validateVideo.error.errors,
        },
        { status: 400 },
      );
    }

    const videoData = validateVideo.data;

    let video = await prisma.video.findUnique({
      where: { id: videoData.id },
    });

    if (!video) {
      video = await prisma.video.create({
        data: {
          id: videoData.id,
          url: videoData.url,
          image: videoData.image,
          height: videoData.height,
          width: videoData.width,
          videographer: videoData.videographer,
          videographerUrl: videoData.videographerUrl,
        },
      });

      if (videoData.videoFiles !== undefined) {
        await prisma.videoFile.createMany({
          data: videoData.videoFiles,
        });
      }
    }

    const existingCollection = await prisma.collection.findUnique({
      where: { id: collectionId },
    });

    if (!existingCollection) {
      return NextResponse.json(
        {
          error: "Collection does not exists!",
        },
        { status: 404 },
      );
    }

    const existingCollectionMedia = await prisma.collectionMedia.findFirst({
      where: { videoId: video.id, collectionId: existingCollection.id },
    });

    if (existingCollectionMedia) {
      return NextResponse.json(
        {
          error: "This video already exists in this collection!",
        },
        { status: 409 },
      );
    }

    const collectionMedia = await prisma.collectionMedia.create({
      data: {
        videoId: video.id,
        collectionId: existingCollection.id,
      },
    });

    return NextResponse.json(
      {
        message: "Video added to the collection!",
        collectionMedia,
      },
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
    console.error("Error while storing Video in db:", error);
    return NextResponse.json(
      { error: "Internal server error in storeVideo endpoint!" },
      { status: 500 },
    );
  }
}
