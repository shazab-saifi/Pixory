import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import bcrypt from "bcrypt"
import { FormSchema } from "@/lib/utils";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { email, name, password } = FormSchema.parse(data);

        const existingUser = await prisma.user.findFirst({ where: { email } });
        const hashedPassword = await bcrypt.hash(password, 10);

        if (!existingUser) {
            await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                    provider: "Credentials"
                }
            });
        } else {
            return NextResponse.json({ message: "User already exists!" });
        }

        return NextResponse.json({ message: "User signed up successfully!" });
    } catch (error) {
        if (error instanceof ZodError) {
            return new NextResponse(JSON.stringify({ message: error.errors }), {
                status: 400
            });
        }

        return new NextResponse(JSON.stringify({ message: "Internal server error while signing up!" }), {
            status: 500
        });
    }
}