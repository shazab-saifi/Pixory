import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Button from "./Button";
import { Bookmark, X } from "lucide-react";
import DownloadMenu from "./DownloadMenu";
import PhotoLinkCopy from "./PhotoLinkCopy";
import { PhotoURLsTypes, VideoFile } from "@/lib/types";
import { useOutside } from "@/hooks/useOutside";

const MediaCard = React.memo(
  ({
    ownerName,
    ownerUrl,
    src,
    Url,
    isVideo,
    isOpen,
    setIsOpen,
  }: {
    ownerName: string;
    ownerUrl: string;
    src: PhotoURLsTypes | VideoFile[];
    Url: string;
    isVideo: boolean;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  }) => {
    console.log(typeof setIsOpen);
    const ref = useOutside(() => setIsOpen(false), isOpen);

    return (
      <div
        ref={ref}
        className="relative flex h-full max-h-[610px] flex-col gap-4 rounded-2xl bg-white p-4 md:flex-row md:gap-6 md:p-6 lg:gap-8 xl:max-h-none"
      >
        <button
          onClick={() => setIsOpen(false)}
          className="group absolute top-4 right-4 cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100"
        >
          <X className="size-5 text-gray-400 transition-colors group-hover:text-gray-600" />
        </button>
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
              {/* <Button
                variant="secondary"
                className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:bg-gray-100"
              >
                <Bookmark className="h-6 w-6" />
              </Button> */}
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
