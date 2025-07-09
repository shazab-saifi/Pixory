"use client";

import { Images } from "lucide-react";
import Image from "next/image";

const CollectionCard = ({
  collectionName,
  preview,
  totalItems,
  onCardClick,
}: {
  collectionName: string;
  preview: string[];
  totalItems: number;
  onCardClick: () => void;
}) => {
  return (
    <div onClick={onCardClick} className="flex w-fit flex-col gap-4">
      <div className="grid aspect-square w-70 cursor-pointer grid-cols-2 gap-2 overflow-hidden rounded-2xl transition-opacity hover:opacity-80">
        <Image
          className="h-full w-full object-cover"
          width={200}
          height={200}
          src={preview[0]}
          alt="preview image 1"
        />
        <div className="grid grid-rows-2 gap-2">
          <Image
            className="h-full w-full object-cover"
            width={200}
            height={200}
            src={preview[1]}
            alt="preview image 2"
          />
          <Image
            className="h-full w-full object-cover"
            width={200}
            height={200}
            src={preview[2]}
            alt="preview image 3"
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <h2 className="w-fit text-xl">{collectionName}</h2>
        <div className="flex w-fit items-center gap-2">
          <Images className="size-5 text-gray-500" />
          <span className="text-xl">{totalItems}</span>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
