"use client";

import { Bookmark, Download } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";
import { handleDownload } from "@/lib/utils";

const VideoPreviewCard = React.memo(
  ({
    videoURL,
    width,
    height,
    originalVideoURL,
    pexelsVideoURL,
    onClick,
    videoPreviewURL,
  }: {
    videoURL: string;
    width: number;
    height: number;
    originalVideoURL: string;
    pexelsVideoURL: string;
    onClick: () => void;
    videoPreviewURL?: string;
  }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };

    useEffect(() => {
      if (isHovered && videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, [isHovered]);

    const fixedHeight = height > width;

    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={`relative rounded-xl ${fixedHeight ? "h-[250px] sm:h-[400px] md:h-[500px] xl:h-[800px]" : "h-[100px] md:h-[200px] xl:h-[279.73px]"} group overflow-hidden lg:rounded-2xl`}
      >
        <Image
          src={videoPreviewURL as string}
          className={`absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}
          width={width}
          height={height}
          alt="video preview"
          loading="lazy"
          decoding="async"
        />
        <video
          ref={videoRef}
          src={videoURL}
          muted
          playsInline
          className={`absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        />

        {/* Overlay */}
        <div className="invisible absolute inset-0 top-0 left-0 hidden h-full w-full bg-gradient-to-t from-black/30 via-transparent to-black/30 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 sm:block" />
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-2 md:p-4">
          <div className="flex justify-end">
            <Bookmark className="invisible h-4 w-4 translate-x-full text-white opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 md:h-6 md:w-6" />
          </div>
          <div className="invisible flex w-full translate-y-full items-center justify-between opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
            <Link
              href={pexelsVideoURL}
              className="text-shadow text-[10px] text-white/70 sm:text-sm md:text-base md:font-semibold"
            >
              Provided by
              <span className="font-bold text-white italic"> pexels</span>
            </Link>
            <Button
              variant="secondary"
              size="lg"
              className="hidden md:block"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload({ url: originalVideoURL });
              }}
            >
              Download
            </Button>
            <Download size={20} className="text-white md:hidden" />
          </div>
        </div>
      </div>
    );
  },
);

VideoPreviewCard.displayName = "VideoPreviewCard";

export default VideoPreviewCard;
