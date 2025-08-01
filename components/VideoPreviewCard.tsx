"use client";

import { Bookmark, Download } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";
import { handleDownload } from "@/lib/utils";
import { CollectionVideo } from "@/lib/types";
import BookmarkDialog from "./BookmarkDialog";
import { useOutside } from "@/hooks/useOutside";
import { useThanksDialog } from "@/lib/store";

const VideoPreviewCard = ({
  video,
  onClick,
  originalVideoUrl,
  showBookmark = true,
}: {
  video: CollectionVideo;
  onClick: () => void;
  originalVideoUrl: string;
  showBookmark?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState<boolean>(false);
  const ref = useOutside(() => setIsBookmarkOpen(false), isBookmarkOpen);
  const showThanksDialog = useThanksDialog((s) => s.showThanksDialog);

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

  const videoAspect = video.height > video.width;

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={`group relative ${videoAspect ? "aspect-[9/14]" : "aspect-video"} overflow-hidden rounded-xl lg:rounded-2xl`}
      >
        <Image
          src={video.image}
          className={`absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}
          width={video.width}
          height={video.height}
          alt="video preview"
          loading="lazy"
          decoding="async"
        />
        <video
          ref={videoRef}
          src={video.videoFiles[0].link}
          muted
          playsInline
          className={`absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        />

        {/* Overlay */}
        <div className="invisible absolute inset-0 top-0 left-0 hidden h-full w-full bg-gradient-to-t from-black/30 via-transparent to-black/30 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 sm:block" />
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-2 md:p-4">
          <div className="flex justify-end">
            {showBookmark && (
              <button
                className="w-fit cursor-pointer rounded-md p-2 transition-colors hover:bg-black/30"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHovered(false);
                  setIsBookmarkOpen(true);
                }}
              >
                <Bookmark className="size-6 text-white md:invisible md:translate-x-full md:opacity-0 md:transition-all md:duration-300 md:group-hover:visible md:group-hover:translate-x-0 md:group-hover:opacity-100" />
              </button>
            )}
          </div>
          <div className="flex w-full items-center justify-between p-2 md:invisible md:translate-y-full md:opacity-0 md:transition-all md:duration-300 md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <Link
              href={video.url}
              className="text-shadow invisible text-[10px] text-white/70 sm:text-sm md:visible md:text-base md:font-semibold"
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
                handleDownload({
                  url: originalVideoUrl,
                  onStart: () =>
                    showThanksDialog("videoPreview", {
                      url: video.image,
                      photographer: video.videographer,
                      width: video.width,
                      height: video.height,
                      photographerUrl: video.videographerUrl,
                    }),
                });
              }}
            >
              Download
            </Button>
            <Download
              onClick={(e) => {
                e.stopPropagation();
                handleDownload({
                  url: originalVideoUrl,
                  onStart: () =>
                    showThanksDialog("videoPreview", {
                      url: video.image,
                      photographer: video.videographer,
                      width: video.width,
                      height: video.height,
                      photographerUrl: video.videographerUrl,
                    }),
                });
              }}
              className="size-6 text-white md:hidden"
            />
          </div>
        </div>
        {isBookmarkOpen && (
          <BookmarkDialog
            ref={ref}
            video={video}
            setBookmarkOpen={setIsBookmarkOpen}
          />
        )}
      </div>
    </>
  );
};

VideoPreviewCard.displayName = "VideoPreviewCard";

export default React.memo(VideoPreviewCard);
