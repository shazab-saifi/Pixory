import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "@/lib/queryClient";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CollectionCard = ({
  collectionName,
  preview,
  collectionId,
  onClick,
}: {
  collectionName: string;
  preview: string[];
  collectionId: number;
  onClick: () => void;
}) => {
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `/api/deleteCollection?collectionId=${collectionId}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete collection");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Delete request failed");
    },
  });

  return (
    <div
      onClick={onClick}
      className="mx-auto flex w-fit flex-col gap-2 md:gap-4"
    >
      <Link
        href={`/collection/${collectionId}`}
        className="group relative grid aspect-square max-w-70 cursor-pointer grid-cols-2 gap-2 overflow-hidden rounded-2xl transition-opacity hover:opacity-80"
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteMutation.mutate();
          }}
          disabled={deleteMutation.isPending}
          className="hover:shadow-custom absolute top-2 right-2 cursor-pointer rounded-md bg-neutral-100 p-2 font-bold text-red-600 transition-all sm:top-4 sm:right-4 sm:rounded-lg lg:translate-x-14 lg:group-hover:translate-x-0"
        >
          <Trash className="size-4 sm:size-6" />
        </button>
        <Image
          className="h-full w-full object-cover"
          width={200}
          height={200}
          src={preview[0] || "/collectionImage.svg"}
          alt="preview image 1"
        />
        <div className="grid grid-rows-2 gap-2">
          <Image
            className="h-full w-full object-cover"
            width={200}
            height={200}
            src={preview[1] || "/collectionImage.svg"}
            alt="preview image 2"
          />
          <Image
            className="h-full w-full object-cover"
            width={200}
            height={200}
            src={preview[2] || "/collectionImage.svg"}
            alt="preview image 3"
          />
        </div>
      </Link>
      <div className="flex w-full items-center">
        <h2 className="w-fit text-base md:text-xl">{collectionName}</h2>
      </div>
    </div>
  );
};

export default CollectionCard;
