import React from "react";
import Image from "next/image";
import Button from "./Button";
import { Bookmark, X } from "lucide-react";
import DownloadMenu from "./DownloadMenu";
import PhotoLinkCopy from "./PhotoLinkCopy";
import { PhotoURLsTypes, VideoFile } from "@/lib/types";

const MediaCard = React.memo(
  ({
    ownerName,
    ownerUrl,
    src,
    Url,
    isVideo,
    onXClick,
  }: {
    ownerName: string;
    ownerUrl: string;
    src: PhotoURLsTypes | VideoFile[];
    Url: string;
    isVideo: boolean;
    onXClick: () => void;
  }) => {
    return (
      <div className="relative flex h-full max-h-[610px] flex-col gap-4 rounded-2xl bg-white p-4 md:flex-row md:gap-6 md:p-6 lg:gap-8 lg:p-8 xl:max-h-none">
        <div className="absolute right-0 bottom-full cursor-pointer pb-1 text-white md:pl-4 lg:top-0 lg:right-0 lg:bottom-0 lg:left-full">
          <X onClick={onXClick} className="h-8 w-8 md:h-11 md:w-11" />
        </div>
        <div className="flex w-full justify-between md:hidden">
          <DownloadMenu src={src} />
          <Button
            variant="secondary"
            className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:bg-gray-100"
          >
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>
        <div className="h-full overflow-hidden rounded-lg">
          {!isVideo ? (
            <Image
              src={Url}
              width={400}
              height={400}
              alt="photo"
              loading="eager"
            />
          ) : (
            <video
              src={Url}
              muted
              width={400}
              height={500}
              controls
              className="h-full"
            />
          )}
        </div>
        <div className="flex-col justify-between space-y-6 md:flex">
          <div className="space-y-6">
            <div className="hidden w-full justify-between md:flex">
              <div>
                <h3 className="text-base font-semibold">
                  {!isVideo ? "Photographer" : "Videographer"}
                </h3>
                <a
                  href={ownerUrl}
                  className="cursor-pointer text-sm"
                  target="_blank"
                >
                  {ownerName}
                </a>
              </div>
              <Button
                variant="secondary"
                className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:bg-gray-100"
              >
                <Bookmark className="h-6 w-6" />
              </Button>
            </div>
            <div className="hidden md:block">
              <DownloadMenu src={src} />
            </div>
            <div className="md:hidden">
              <h3 className="text-base font-semibold">Photographer</h3>
              <a
                href={ownerUrl}
                className="cursor-pointer text-sm"
                target="_blank"
              >
                {ownerName}
              </a>
            </div>
          </div>
          <PhotoLinkCopy photoURL={Url} />
        </div>
      </div>
    );
  },
);

MediaCard.displayName = "MediaCard";

export default MediaCard;
