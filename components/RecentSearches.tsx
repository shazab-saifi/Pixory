"use client";

import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { fetchCollection, isTouchDevice } from "@/lib/utils";
import { Collection } from "@/lib/types";
import { useOptionsToggle, useSearchOptions } from "@/lib/store";

type RecentSearchesProps = {
  isFocused: boolean;
  isNewSearch: boolean;
};

const RecentSearches = ({ isFocused, isNewSearch }: RecentSearchesProps) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { status } = useSession();
  const router = useRouter();
  const { currentSearchOption } = useSearchOptions();
  const { setToVideos, setToPhotos } = useOptionsToggle();

  const { data: collections } = useQuery({
    queryKey: ["collections"],
    queryFn: fetchCollection,
    enabled: status === "authenticated",
    staleTime: 0,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("recentSearches");
      setRecentSearches(stored ? JSON.parse(stored) : []);
    } catch {
      setRecentSearches([]);
    }
  }, [isNewSearch]);

  const clearRecentSearches = useCallback(() => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  }, []);

  const showRecent = useMemo(
    () =>
      recentSearches.length > 0 ||
      (status === "authenticated" && collections && collections.length > 0),
    [recentSearches.length, status, collections]
  );

  const handleRecentSearchClick = useCallback(
    (s: string) => {
      if (currentSearchOption === "photos") {
        setToPhotos();
      } else {
        setToVideos();
      }

      router.push(`/search?query=${encodeURIComponent(s)}`);
    },
    [router, currentSearchOption, setToPhotos, setToVideos]
  );

  const recentSearchesSection = useMemo(() => {
    if (recentSearches.length === 0) return null;
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl md:text-2xl">Recent Searches</h3>
          <button
            onClick={clearRecentSearches}
            disabled={recentSearches.length === 0}
            className={
              "shadow-custom cursor-pointer rounded-md bg-neutral-100 px-1 py-0.5 text-[12px] text-neutral-600 transition-colors hover:bg-neutral-200 sm:px-2 sm:py-1 sm:text-sm " +
              (isTouchDevice && "active:bg-neutral-200")
            }
          >
            Clear
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {recentSearches.map((s, idx) => (
            <button
              key={s + idx}
              onClick={() => handleRecentSearchClick(s)}
              className={
                "shadow-custom flex cursor-pointer items-center justify-center gap-2 rounded-md bg-white px-2 py-1 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-600 sm:px-4 sm:py-2 sm:text-base " +
                (isTouchDevice &&
                  "active:bg-neutral-100 active:text-neutral-600")
              }
            >
              <span>{s}</span>
              <Search className="size-3.5 sm:size-4" />
            </button>
          ))}
        </div>
      </div>
    );
  }, [recentSearches, clearRecentSearches, handleRecentSearchClick]);

  const collectionsSection = useMemo(() => {
    if (status !== "authenticated" || !collections || collections.length === 0)
      return null;
    return (
      <div className="flex w-full flex-col gap-4">
        <h3 className="text-2xl">Your Collections</h3>
        <div className="flex w-full flex-wrap gap-4">
          {collections.map((collection: Collection, idx: number) => {
            const media = collection.media[0];
            const src =
              (media.photo?.large as string) ||
              (media.video?.image as string) ||
              "";
            return (
              <div key={collection.id || idx} className="flex flex-col gap-2">
                <Link
                  href={`/collection/${collection.id}`}
                  className="relative"
                >
                  <Image
                    width={80}
                    height={80}
                    className="aspect-square size-16 cursor-pointer rounded-lg sm:size-20"
                    src={src}
                    alt="collection"
                  />
                  <div
                    className={
                      "absolute top-0 left-0 z-20 h-full w-full cursor-pointer rounded-lg bg-transparent transition-colors hover:bg-black/30 " +
                      (isTouchDevice && "active:bg-black/30")
                    }
                  ></div>
                </Link>
                <span className="max-w-[64px] text-sm text-wrap sm:max-w-[80px] sm:text-base">
                  {collection.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [collections, status]);

  return (
    <AnimatePresence>
      {isFocused && showRecent && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="shadow-custom absolute top-full left-0 z-20 mt-4 flex w-full flex-col gap-8 rounded-xl bg-white p-4"
        >
          {recentSearchesSection}
          {collectionsSection}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(RecentSearches);
