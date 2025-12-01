import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import DownloadMenu from "./DownloadMenu";
import PhotoLinkCopy from "./PhotoLinkCopy";
import { PhotoURLsTypes, VideoFile } from "@/lib/types";
import { useOutside } from "@/hooks/useOutside";
import CloseButton from "./CloseButton";
import { Dialog } from "./Dialog";

const MediaCard = ({
  ownerName,
  ownerUrl,
  src,
  Url,
  isVideo,
  isOpen,
  setIsOpen,
  mediaWidth,
  mediaHeight,
}: {
  ownerName: string;
  ownerUrl: string;
  src: PhotoURLsTypes | VideoFile[];
  Url: string;
  isVideo: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  mediaWidth: number;
  mediaHeight: number;
}) => {
  const ref = useOutside(() => setIsOpen(false), isOpen);
  const mediaAspect = mediaWidth > mediaHeight;

  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        ref={
          typeof window !== "undefined" && window.innerWidth >= 768
            ? ref
            : undefined
        }
        className="relative flex flex-col gap-4 rounded-2xl bg-white p-4 md:max-h-fit md:flex-row md:gap-6 lg:gap-8 xl:max-h-none"
      >
        <CloseButton handlerFn={() => setIsOpen(false)} />
        <div className="w-full md:hidden">
          <DownloadMenu src={src} />
        </div>
        <div className="flex w-auto items-center justify-center">
          {!isVideo ? (
            <Image
              src={Url}
              width={mediaWidth}
              height={mediaHeight}
              alt="photo"
              loading="eager"
              className={`h-full max-w-[280px] rounded-lg object-cover md:aspect-auto ${mediaAspect ? "aspect-video md:max-w-[500px]" : "aspect-[9/14] md:max-w-[400px]"}`}
              style={{ display: "block" }}
            />
          ) : (
            <video
              src={Url}
              width={mediaWidth}
              height={mediaHeight}
              controls
              className={`h-full max-w-[280px] rounded-lg object-cover md:aspect-auto ${mediaAspect ? "aspect-video md:max-w-[500px]" : "aspect-[9/14] md:max-w-[400px]"}`}
              style={{ display: "block" }}
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
    </Dialog>
  );
};

MediaCard.displayName = "MediaCard";

export default React.memo(MediaCard);
