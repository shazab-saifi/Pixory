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

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User with this email doesn't exists!" },
        { status: 404 },
      );
    }

    const collections = await prisma.collection.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json(collections);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
