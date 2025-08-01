"use client";

import React, { useState } from "react";
import { Bookmark, Download } from "lucide-react";
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";
import { handleDownload } from "@/lib/utils";
import BookmarkDialog from "./BookmarkDialog";
import { useOutside } from "@/hooks/useOutside";
import { CollectionPhoto } from "@/lib/types";
import { useThanksDialog } from "@/lib/store";

const PhotoPreviewCard = ({
  pexelsPhotoURL,
  onClick,
  photo,
  showBookmark = true,
}: {
  pexelsPhotoURL: string;
  onClick: () => void;
  photo: CollectionPhoto;
  showBookmark?: boolean;
}) => {
  const [isBookmarkOpen, setIsBookmarkOpen] = useState<boolean>(false);
  const ref = useOutside(() => setIsBookmarkOpen(false), isBookmarkOpen);
  const showThanksDialog = useThanksDialog((s) => s.showThanksDialog);

  return (
    <>
      <div
        onClick={onClick}
        className={`relative w-[${photo.width}px] h-[${photo.height}px] group overflow-hidden rounded-xl lg:rounded-2xl`}
      >
        <Image
          className="z-0 h-full w-full object-cover"
          src={photo.large}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
        />
        <div className="invisible absolute inset-0 top-0 left-0 hidden h-full w-full bg-gradient-to-t from-black/30 via-transparent to-black/30 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 sm:block"></div>
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-2 md:p-4">
          <div className="flex justify-end">
            {showBookmark && (
              <button
                className="w-fit cursor-pointer rounded-md p-2 transition-colors hover:bg-black/30"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBookmarkOpen(true);
                }}
              >
                <Bookmark className="size-6 text-white md:invisible md:translate-x-full md:opacity-0 md:transition-all md:duration-300 md:group-hover:visible md:group-hover:translate-x-0 md:group-hover:opacity-100" />
              </button>
            )}
          </div>
          <div className="flex w-full items-center justify-between p-2 md:invisible md:translate-y-full md:opacity-0 md:transition-all md:duration-300 md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <Link
              href={pexelsPhotoURL}
              className="text-shadow invisible text-[10px] text-white/70 sm:text-sm md:visible md:text-base md:font-semibold"
            >
              Provided by
              <span className="font-bold text-white italic"> pexels</span>
            </Link>
            <Button
              variant="secondary"
              size="lg"
              className="z-50 hidden md:block"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDownload({
                  url: photo.original,
                  onStart: () =>
                    showThanksDialog("photoPreview", {
                      url: photo.original,
                      width: photo.width,
                      height: photo.height,
                      photographer: photo.photographer,
                      photographerUrl: photo.photographerUrl,
                    }),
                });
              }}
            >
              Download
            </Button>
            <Download
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDownload({
                  url: photo.original,
                  onStart: () =>
                    showThanksDialog("photoPreview", {
                      url: photo.original,
                      width: photo.width,
                      height: photo.height,
                      photographer: photo.photographer,
                      photographerUrl: photo.photographerUrl,
                    }),
                });
              }}
              className="size-6 text-white md:hidden"
            />
          </div>
        </div>
      </div>
      {isBookmarkOpen && (
        <BookmarkDialog
          ref={ref}
          photo={photo}
          setBookmarkOpen={setIsBookmarkOpen}
        />
      )}
    </>
  );
};

PhotoPreviewCard.displayName = "PhotoPreviewCard";

export default React.memo(PhotoPreviewCard);
