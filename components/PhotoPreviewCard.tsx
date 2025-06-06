import React from "react"
import { Bookmark, Download } from "lucide-react"
import Button from "./Button"
import Image from "next/image"
import Link from "next/link"
import { handleDownload } from "@/lib/utils"

const PhotoPreviewCard = React.memo(({
  photoURL,
  originalPhotoURL,
  width,
  height,
  pexelsPhotoURL,
  onClick,
  alt
}: {
  photoURL: string,
  originalPhotoURL: string;
  width: number,
  height: number,
  pexelsPhotoURL: string,
  onClick: () => void,
  alt: string
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative w-[${width}px] h-[${height}px] rounded-xl lg:rounded-2xl overflow-hidden group`}
    >
      <Image
        className="w-full h-full object-cover z-0"
        src={photoURL}
        width={width}
        height={height}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute hidden sm:block invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 inset-0 top-0 left-0 w-full h-full bg-gradient-to-t from-black/30 via-transparent to-black/30"></div>
      <div className="absolute inset-0 p-2 md:p-4 flex flex-col justify-between z-10">
        <div className="flex justify-end">
          <Bookmark className="w-4 h-4 md:w-6 md:h-6 bg-transparent text-white p-0 hover:bg-transparent shadow-none opacity-0 invisible transition-all duration-300 translate-x-full group-hover:opacity-100 group-hover:visible group-hover:translate-x-0" />
        </div>
        <div className="flex w-full justify-between items-center opacity-0 invisible transition-all duration-300 translate-y-full group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
          <Link
            href={pexelsPhotoURL}
            className="text-white/70 md:font-semibold text-[10px] sm:text-sm md:text-base text-shadow"
          >
            Provided by
            <span className='font-bold text-white italic'> pexels</span>
          </Link>
          <Button
            variant="secondary"
            size='lg'
            className="hidden md:block z-50"
            onClick={e => {
              e.stopPropagation();
              handleDownload({ url: originalPhotoURL });
            }}
          >
            Download
          </Button>
          <Download
            size={20}
            className="md:hidden text-white"
          />
        </div>
      </div>
    </div>

  )
});

PhotoPreviewCard.displayName = 'PhotoPreviewCard';

export default PhotoPreviewCard
