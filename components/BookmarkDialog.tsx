"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import { ArrowDownRight, CopyPlus, Cross, LoaderCircle, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import {
  CreateCollectionSchema,
  MAX_COLLECTIONS_PER_USER,
} from "@/lib/validation";
import { Collection, CollectionPhoto, CollectionVideo } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchCollection } from "@/lib/utils";
import { useOverflowHidden } from "@/hooks/useOverflowHidden";

const BookmarkDialog = ({
  ref,
  photo,
  video,
  setBookmarkOpen,
}: {
  ref: React.Ref<HTMLDivElement>;
  photo?: CollectionPhoto;
  video?: CollectionVideo;
  setBookmarkOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");
  const { status } = useSession();
  const [activeCollectionId, setActiveCollectionId] = useState<number | null>(
    null,
  );
  const router = useRouter();

  useOverflowHidden(true);

  const { data: collectionsData, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: fetchCollection,
    enabled: status === "authenticated",
    staleTime: 0,
  });

  const collectionArray = collectionsData || [];
  const hasReachedLimit = collectionArray.length >= MAX_COLLECTIONS_PER_USER;

  const createCollectionMutation = useMutation({
    mutationFn: async (collectionData: {
      collectionName: string;
      photoData?: CollectionPhoto;
      videoData?: CollectionVideo;
    }) => {
      const res = await fetch("/api/collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collectionData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create collection");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection created successfully");
      setBookmarkOpen(false);
      setInputValue("");
      setValidationError("");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Create Collection request failed");
    },
  });

  const addPhotoMutation = useMutation({
    mutationFn: async (data: {
      photoData: CollectionPhoto;
      collectionId: number;
    }) => {
      const res = await fetch(
        `/api/storePhoto?collectionId=${data.collectionId}`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(data.photoData),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add photo");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Photo bookmarked successfully");
      setBookmarkOpen(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Photo storing request failed");
    },
  });

  const addVideoMutation = useMutation({
    mutationFn: async (data: {
      videoData: CollectionVideo;
      collectionId: number;
    }) => {
      const res = await fetch(
        `/api/storeVideo?collectionId=${data.collectionId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data.videoData),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add video");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Video bookmarked successfully");
      setBookmarkOpen(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Video storing request failed");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (validationError) {
      setValidationError("");
    }
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    if (status === "authenticated") {
      try {
        if (hasReachedLimit) {
          toast.error(
            `You can only have a maximum of ${MAX_COLLECTIONS_PER_USER} collections!`,
          );
          return;
        }

        const validationResult = CreateCollectionSchema.safeParse({
          collectionName: inputValue,
        });

        if (!validationResult.success) {
          const errorMessage =
            validationResult.error.errors[0]?.message || "Invalid input";
          setValidationError(errorMessage);
          return;
        }
        if (photo) {
          createCollectionMutation.mutate({
            collectionName: validationResult.data.collectionName,
            photoData: photo,
          });
        }

        if (video) {
          createCollectionMutation.mutate({
            collectionName: validationResult.data.collectionName,
            videoData: video,
          });
        }
      } catch (error) {
        console.error("Internal server error : ", error);
      }
    } else {
      return toast.error("Sign in to Create Collections");
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed top-0 left-0 z-60 flex min-h-screen w-full items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div
        ref={ref}
        className="relative mx-4 flex flex-col items-center gap-8 rounded-4xl bg-white p-6 md:p-12"
      >
        <h1 className="text-2xl font-semibold md:text-3xl">
          Save to Collection
        </h1>
        <button
          onClick={() => {
            setBookmarkOpen(false);
          }}
          className="group absolute top-4 right-4 cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100"
        >
          <X className="size-5 text-gray-400 transition-colors group-hover:text-gray-600" />
        </button>
        {!isClicked ? (
          <>
            <div className="no-scrollbar flex w-full max-w-120 gap-4 overflow-x-auto scroll-smooth">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (hasReachedLimit) {
                      toast.error(
                        `You can only have a maximum of ${MAX_COLLECTIONS_PER_USER} collections!`,
                      );
                      return;
                    }
                    setIsClicked(true);
                  }}
                  disabled={hasReachedLimit}
                  className={`group flex size-35 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-colors ${
                    hasReachedLimit
                      ? "cursor-not-allowed border-gray-200 bg-gray-50"
                      : "border-gray-300 bg-gray-100 hover:border-gray-400"
                  }`}
                >
                  <CopyPlus
                    className={`size-12 transition-colors ${
                      hasReachedLimit
                        ? "text-gray-200"
                        : "text-gray-300 group-hover:text-gray-400"
                    }`}
                  />
                </button>
                <span className="text-sm font-semibold text-gray-700">
                  New Collection
                </span>
                {hasReachedLimit && (
                  <div className="text-xs text-red-600">
                    Limit reached ({collectionArray.length}/
                    {MAX_COLLECTIONS_PER_USER})
                  </div>
                )}
              </div>
              {isLoading ? (
                <>
                  {/* Skeleton from react-loading-skeleton is not working here for some reason */}
                  {[1, 2, 3].map((n: number) => (
                    <div key={n}>
                      <div
                        role="status"
                        className="h-full max-w-sm animate-pulse space-y-4"
                      >
                        <div className="size-35 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-3 w-10 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {collectionArray.map(
                    (collection: Collection, idx: number) => (
                      <div key={idx} className="space-y-2">
                        <button
                          className="relative size-35 cursor-pointer overflow-hidden rounded-2xl"
                          onClick={() => {
                            if (photo) {
                              addPhotoMutation.mutate({
                                photoData: photo,
                                collectionId: collection.id,
                              });
                            }
                            if (video) {
                              addVideoMutation.mutate({
                                videoData: video,
                                collectionId: collection.id,
                              });
                            }
                            setActiveCollectionId(collection.id);
                          }}
                        >
                          <Image
                            src={
                              collection.media[0]?.photo?.large
                                ? collection.media[0]?.photo?.large
                                : "/heroImage5.png"
                            }
                            alt="collection thumbnail"
                            width={200}
                            height={200}
                            className="h-full w-full object-cover"
                          />
                          <div className="group absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-transparent transition-colors hover:bg-black/50">
                            {addPhotoMutation.isPending &&
                            activeCollectionId === collection.id ? (
                              <LoaderCircle className="size-12 animate-spin text-white" />
                            ) : (
                              <CopyPlus className="size-12 text-transparent transition-colors group-hover:text-white" />
                            )}
                          </div>
                        </button>
                        <div className="mt-1 text-sm font-semibold text-gray-700">
                          {collection.name}
                        </div>
                      </div>
                    ),
                  )}
                </>
              )}
            </div>
            <Button
              onClick={() => {
                router.push("/profile");
              }}
              className="w-fit space-x-2 font-bold"
            >
              <span>Your Collections</span>
              <ArrowDownRight className="size-5 -rotate-45" />
            </Button>
          </>
        ) : (
          <div className="w-full space-y-8">
            <div className="space-y-8">
              <span className="text-sm font-semibold text-gray-700">
                Collection Name
              </span>
              <div className="space-y-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Enter Collection Name"
                  className={`w-90 rounded-xl border p-4 text-gray-700 ${
                    validationError ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {validationError && (
                  <p className="text-sm text-red-600">{validationError}</p>
                )}
              </div>
            </div>
            <div className="mx-auto flex w-fit gap-4">
              <Button
                onClick={() => {
                  setIsClicked(false);
                }}
                variant="secondary"
              >
                Back
              </Button>
              <Button
                onClick={handleClick}
                disabled={createCollectionMutation.isPending || hasReachedLimit}
                className="flex w-40 items-center justify-center space-x-2 bg-green-500 font-bold hover:bg-green-600 disabled:opacity-50"
              >
                {!createCollectionMutation.isPending ? (
                  <span>Create Collection</span>
                ) : (
                  <LoaderCircle className="size-5 animate-spin" />
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkDialog;
