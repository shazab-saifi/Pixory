"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import { ArrowDownRight, CopyPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";

const BookmarkDialog = ({ ref }: { ref: React.Ref<HTMLDivElement> }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const { status } = useSession();

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
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection created successfully");
    },
    onError: () => {
      toast.error("Create Collection request failed");
    },
  });

  const handleClick = async () => {
    if (status === "authenticated") {
      try {
        if (inputValue.length !== 0) {
          createCollectionMutation.mutate({ name: inputValue });
        }
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
                    setIsClicked(true);
                  }}
                  className="group flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-100 p-8 transition-colors hover:border-gray-400"
                >
                  <CopyPlus className="size-18 text-gray-300 transition-colors group-hover:text-gray-400" />
                </button>
                <span className="text-sm font-semibold text-gray-700">
                  Create new Collection
                </span>
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
              <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter Collection Name"
                className="w-full rounded-xl border p-4 text-gray-700"
              />
            </div>
            <div className="mx-auto flex w-fit gap-4">
              <Button onClick={() => setIsClicked(false)} variant="secondary">
                Back
              </Button>
              <Button
                onClick={handleClick}
                className="w-fit space-x-2 bg-green-500 font-bold hover:bg-green-600"
              >
                Create Collection
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkDialog;
