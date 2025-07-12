import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User doesn't exist with this email!" },
        { status: 404 },
      );
    }

    const findCollection = await prisma.collection.findFirst({
      where: { name: body.collectionName, userId: user.id },
    });

    if (findCollection) {
      return NextResponse.json(
        { message: "Collection with this name already exists!" },
        { status: 409 },
      );
    } else {
      const collection = await prisma.collection.create({
        data: { name: body.collectionName, userId: user.id },
      });

      return NextResponse.json({ collection });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error in collection endpoint!" },
      { status: 500 },
    );
  }
}
