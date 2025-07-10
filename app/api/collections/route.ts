import { getSession } from "@/lib/auth";
import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 403 },
      );
    }

    const collections = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
      select: {
        collections: {
          include: {
            collectionItems: {
              orderBy: {
                id: "desc",
              },
              take: 3,
            },
          },
        },
      },
    });

    if (!collections) {
      return NextResponse.json(
        { message: "You have no collection!" },
        { status: 404 },
      );
    }

    return NextResponse.json(collections);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
