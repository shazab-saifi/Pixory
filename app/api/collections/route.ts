import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function GET() {
  try {
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
        { message: "User with this email doesn't exist!" },
        { status: 404 },
      );
    }

    const collections = await prisma.collection.findMany({
      where: { userId: user.id },
      include: {
        media: {
          include: {
            photo: true,
            video: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      collections,
      total: collections.length,
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { message: "Internal server error in collections endpoint!" },
      { status: 500 },
    );
  }
}
