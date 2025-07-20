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
        { error: "Not authenticated!" },
        { status: 401 },
      );
    }

    if (!body.photoData && !body.videoData) {
      return NextResponse.json(
        {
          error:
            "Photo or Video at least one of them should be provided while creating collection!",
        },
        { status: 400 },
      );
    }

    const validation = CreateCollectionSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed!",
          errors: validation.error.errors,
        },
        { status: 400 },
      );
    }

    const { collectionName, photoData, videoData } = validation.data;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist with this email!" },
        { status: 404 },
      );
    }

    const collectionsCount = await prisma.collection.count({
      where: { userId: user.id },
    });

    if (collectionsCount >= 10) {
      return NextResponse.json(
        { error: "You can only have a maximum of 10 collections!" },
        { status: 400 },
      );
    }

    const duplicate = await prisma.collection.findFirst({
      where: { name: collectionName, userId: user.id },
    });

    if (duplicate) {
      return NextResponse.json(
        { error: "Collection with this name already exists!" },
        { status: 409 },
      );
    }

    let photoId: number | undefined = undefined;
    let videoId: number | undefined = undefined;

    if (photoData) {
      let photo = await prisma.photo.findUnique({
        where: { id: photoData.id },
      });

      if (!photo) {
        photo = await prisma.photo.create({ data: photoData });
      }

      photoId = photo.id;
    } else if (videoData) {
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
      videoId = video.id;
    }

    const collection = await prisma.collection.create({
      data: {
        name: collectionName,
        userId: user.id,
      },
    });

    if (photoId !== undefined) {
      await prisma.collectionMedia.create({
        data: {
          collectionId: collection.id,
          photoId: photoId,
        },
      });
    } else if (videoId !== undefined) {
      await prisma.collectionMedia.create({
        data: {
          collectionId: collection.id,
          videoId: videoId,
        },
      });
    }

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
