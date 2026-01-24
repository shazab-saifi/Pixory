import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Collection, VideoData } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function handleDownload({
  url,
  onStart,
}: {
  url: string;
  onStart?: () => void;
}) {
  const data = await fetch(url);
  const blob = await data.blob();
  const dataURL = URL.createObjectURL(blob);

  const hostname = new URL(url).hostname;

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `downloaded-${hostname === "images.pexels.com" ? "image.jpg" : "video.mp4"}`;
  document.body.appendChild(link);
  link.click();
  onStart?.();
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

export function findVideoFile(video: VideoData) {
  const videoFile =
    video.video_files.find(
      (file) => file.quality === "sd" && file.file_type === "video/mp4"
    ) || video.video_files[0];

  const hdVideoFIle =
    video.video_files.find(
      (file) => file.quality === "hd" && file.file_type === "video/mp4"
    ) || video.video_files[0];

  return { videoFile, hdVideoFIle };
}

export const isTouchDevice =
  typeof window !== "undefined"
    ? window.matchMedia("(pointer: coarse)").matches
    : false;
