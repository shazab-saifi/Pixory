import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { getSession } from "./auth";
import prisma from "./prismaClient";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function handleDownload({ url }: { url: string }) {
  const data = await fetch(url);
  const blob = await data.blob();
  const dataURL = URL.createObjectURL(blob);

  const hostname = new URL(url).hostname;

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `downloaded-${hostname === "images.pexels.com" ? "image.jpg" : "video.mp4"}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(dataURL);
}

export const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z
    .string()
    .min(1, { message: "Name is required!" })
    .max(40, { message: "Name cannnot be longer than 40 characters!" }),
  password: z
    .string()
    .min(8, { message: "Password should have at least 8 characters" })
    .max(40, { message: "Password cannot be longer than 40 characters" }),
});
