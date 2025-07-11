import { Images, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CollectionCard = ({
  collectionName,
  preview,
  totalItems,
  collectionId,
}: {
  collectionName: string;
  preview: string[];
  totalItems: number;
  collectionId: number;
}) => {
  return (
    <div className="mx-auto flex w-fit flex-col gap-4">
      <Link
        href={`/collection/${collectionId}`}
        className="grid aspect-square w-70 cursor-pointer grid-cols-2 gap-2 overflow-hidden rounded-2xl transition-opacity hover:opacity-80"
      >
        <Image
          className="h-full w-full object-cover"
          width={200}
          height={200}
          src={preview[0] || "/gray100.svg"}
          alt="preview image 1"
        />
        <div className="grid grid-rows-2 gap-2">
          <Image
            className="h-full w-full object-cover"
            width={200}
            height={200}
            src={preview[1] || "/gray100.svg"}
            alt="preview image 2"
          />
          <Image
            className="h-full w-full object-cover"
            width={200}
            height={200}
            src={preview[2] || "/gray100.svg"}
            alt="preview image 3"
          />
        </div>
      </Link>
      <div className="flex w-full items-center">
        <h2 className="w-fit text-xl">{collectionName}</h2>
      </div>
    </div>
  );
};

export default CollectionCard;
