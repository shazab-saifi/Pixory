"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import { ArrowDownRight, CopyPlus, LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import {
  CreateCollectionSchema,
  MAX_COLLECTIONS_PER_USER,
} from "@/lib/validation";

const BookmarkDialog = ({ ref }: { ref: React.Ref<HTMLDivElement> }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");
  const { status } = useSession();

  const { data: collectionsData } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const res = await fetch("/api/collections");
      if (!res.ok) throw new Error("Failed to fetch collections");
      return res.json();
    },
    enabled: status === "authenticated",
  });

  const collections = collectionsData?.collections || [];
  const hasReachedLimit = collections.length >= MAX_COLLECTIONS_PER_USER;

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const createCollectionMutation = useMutation({
    mutationFn: async (collectionData: { name: string }) => {
      const res = await fetch("/api/collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collectionData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create collection");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection created successfully");
      setIsClicked(false);
      setInputValue("");
      setValidationError("");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Create Collection request failed");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (validationError) {
      setValidationError("");
    }
  };

  const handleClick = async () => {
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

        createCollectionMutation.mutate({
          name: validationResult.data.collectionName,
        });
      } catch (error) {
        console.error("Internal server error : ", error);
      }
    } else {
      return toast.error("Sign in to Create Collections");
    }
  };

  return (
    <div className="fixed top-0 left-0 z-60 flex min-h-screen w-full items-center justify-center bg-black/80 backdrop-blur-sm">
      <div
        ref={ref}
        className="mx-4 flex flex-col items-center gap-8 rounded-4xl bg-white p-6 md:p-12"
      >
        <h1 className="text-2xl font-semibold md:text-3xl">
          Save to Collection
        </h1>
        {!isClicked ? (
          <>
            <div className="flex w-full overflow-x-auto">
              <div className="space-y-2">
                <button
                  onClick={(e) => {
                    if (hasReachedLimit) {
                      toast.error(
                        `You can only have a maximum of ${MAX_COLLECTIONS_PER_USER} collections!`,
                      );
                      return;
                    }
                    setIsClicked(true);
                  }}
                  disabled={hasReachedLimit}
                  className={`group flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-colors ${
                    hasReachedLimit
                      ? "cursor-not-allowed border-gray-200 bg-gray-50"
                      : "border-gray-300 bg-gray-100 hover:border-gray-400"
                  }`}
                >
                  <CopyPlus
                    className={`size-18 transition-colors ${
                      hasReachedLimit
                        ? "text-gray-200"
                        : "text-gray-300 group-hover:text-gray-400"
                    }`}
                  />
                </button>
                <span className="text-sm font-semibold text-gray-700">
                  Create new Collection
                </span>
                {hasReachedLimit && (
                  <span className="text-xs text-red-600">
                    Limit reached ({collections.length}/
                    {MAX_COLLECTIONS_PER_USER})
                  </span>
                )}
              </div>
            </div>
            <Button className="w-fit space-x-2 font-bold">
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
              <Button onClick={() => setIsClicked(false)} variant="secondary">
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
