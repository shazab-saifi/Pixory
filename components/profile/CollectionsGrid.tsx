"use client";

import CollectionCard from "./CollectionCard";
import { useQuery } from "@tanstack/react-query";
import { fetchCollection } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

export default function CollectionsGrid() {
  const { status } = useSession();
  const router = useRouter();

  const { data: collections, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: fetchCollection,
    enabled: status === "authenticated",
  });

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 2xl:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-full">
              <Skeleton
                className="mb-2 aspect-square max-h-70 w-full max-w-70 md:mb-4"
                borderRadius={16}
              />
              <Skeleton width={100} height={20} borderRadius={4} />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          layout
          className="grid w-full grid-cols-2 gap-4 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 2xl:grid-cols-4"
        >
          <AnimatePresence>
            {collections?.map((collection) => (
              <motion.div
                key={collection.id}
                layoutId={`collection-${collection.name}`}
                className="h-fit"
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <CollectionCard
                  onClick={() => router.push(`/collection/${collection.id}`)}
                  collectionId={collection.id}
                  collectionName={collection.name}
                  preview={collection.media.map(
                    (item) =>
                      (item.photo?.large as string) ?? item.video?.image,
                  )}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
