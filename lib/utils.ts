import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Collection } from "./types";

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

export async function fetchCollection(): Promise<Collection[]> {
  const res = await fetch("/api/collections");
  if (!res.ok) {
    throw new Error("Failed to fetch collection!");
  }
  return res.json();
}
