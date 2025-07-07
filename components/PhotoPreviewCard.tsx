import React from "react";
import { Bookmark, Download } from "lucide-react";
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";
import { handleDownload } from "@/lib/utils";

const PhotoPreviewCard = React.memo(
  ({
    photoURL,
    originalPhotoURL,
    width,
    height,
    pexelsPhotoURL,
    onClick,
    alt,
  }: {
    photoURL: string;
    originalPhotoURL: string;
    width: number;
    height: number;
    pexelsPhotoURL: string;
    onClick: () => void;
    alt: string;
  }) => {
    return (
      <div
        onClick={onClick}
        className={`relative w-[${width}px] h-[${height}px] group overflow-hidden rounded-xl lg:rounded-2xl`}
      >
        <Image
          className="z-0 h-full w-full object-cover"
          src={photoURL}
          width={width}
          height={height}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
        <div className="invisible absolute inset-0 top-0 left-0 hidden h-full w-full bg-gradient-to-t from-black/30 via-transparent to-black/30 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 sm:block"></div>
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-2 md:p-4">
          <div className="flex justify-end">
            <Bookmark className="invisible h-4 w-4 translate-x-full bg-transparent p-0 text-white opacity-0 shadow-none transition-all duration-300 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 hover:bg-transparent md:h-6 md:w-6" />
          </div>
          <div className="invisible flex w-full translate-y-full items-center justify-between opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
            <Link
              href={pexelsPhotoURL}
              className="text-shadow text-[10px] text-white/70 sm:text-sm md:text-base md:font-semibold"
            >
              Provided by
              <span className="font-bold text-white italic"> pexels</span>
            </Link>
            <Button
              variant="secondary"
              size="lg"
              className="z-50 hidden md:block"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload({ url: originalPhotoURL });
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

PhotoPreviewCard.displayName = "PhotoPreviewCard";

export default PhotoPreviewCard;
