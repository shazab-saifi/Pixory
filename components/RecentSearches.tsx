"use client";

import { fetchCollection } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RecentSearches = ({ isFocused }: { isFocused: boolean }) => {
  const [recentSearches, setRecentSearches] = useState<string[] | []>();
  const { status } = useSession();
  const router = useRouter();

  const collections = useQuery({
    queryKey: ["collections"],
    queryFn: fetchCollection,
    enabled: status === "authenticated",
    staleTime: 0,
  });

  useEffect(() => {
    const recentSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]",
    );

    setRecentSearches(recentSearches);
  }, []);

  const handleClick = () => {
    console.log("clicked");
    if (localStorage.getItem("recentSearches")) {
      localStorage.removeItem("recentSearches");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="shadow-custom absolute top-full left-0 z-20 mt-4 hidden w-full flex-col gap-8 rounded-xl bg-white p-4 sm:flex"
          >
            <div className="flex w-full flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl">Recent Searches</h3>
                <button
                  onClick={handleClick}
                  disabled={recentSearches?.length === 0}
                  className="shadow-custom transreition-colors cursor-pointer rounded-md bg-neutral-100 px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-200"
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-4">
                {recentSearches?.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => router.push(`/search?query=${s}`)}
                    className="shadow-custom flex cursor-pointer items-center justify-center gap-2 rounded-md bg-white px-4 py-2 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                  >
                    <span>{s}</span>
                    <Search size={16} />
                  </button>
                ))}
              </div>
            </div>
            {status === "authenticated" &&
              collections.data &&
              collections.data?.length > 0 && (
                <div className="flex w-full flex-col gap-4">
                  <h3 className="text-2xl">Your Collections</h3>
                  <div className="flex w-full flex-wrap gap-4">
                    {collections.data?.map((collection, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                        <Link
                          href={`/collection/${collection.id}`}
                          className="relative"
                        >
                          <Image
                            width={80}
                            height={80}
                            className="aspect-square cursor-pointer rounded-lg"
                            src={
                              (collection.media[0].photo?.large as string) ||
                              (collection.media[0].video?.image as string)
                            }
                            alt="collection"
                          />
                          <div className="absolute top-0 left-0 z-20 h-full w-full cursor-pointer rounded-lg bg-transparent transition-colors hover:bg-black/50"></div>
                        </Link>
                        <span className="max-w-[80px] text-wrap">
                          {collection.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RecentSearches;
