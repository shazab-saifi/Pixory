"use client";

import { useOutside } from "@/hooks/useOutside";
import { useThanksDialog } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

type PropsType = {
  image: {
    url: string;
    width: number;
    height: number;
  };
  ownerName: string;
  ownerPexelsUrl: string;
};

const ThanksDialog = ({ image, ownerName, ownerPexelsUrl }: PropsType) => {
  const { closeThanks, thanksOpen } = useThanksDialog();
  const ref = useOutside(closeThanks, thanksOpen);
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm sm:px-0">
      <div
        ref={ref}
        className="relative z-60 flex h-fit w-fit flex-col gap-4 sm:flex-row"
      >
        <Image
          src={image.url}
          width={400}
          loading="eager"
          height={400}
          alt="image"
          className="max-h-[150px] w-full rounded-t-3xl object-cover sm:max-h-[330px] sm:w-[150px] sm:rounded-tl-3xl sm:rounded-tr-none sm:rounded-bl-3xl"
        />
        <div className="flex flex-col justify-between gap-6 rounded-br-3xl rounded-bl-3xl bg-white p-6 sm:relative sm:rounded-tr-3xl sm:rounded-br-3xl sm:rounded-bl-none">
          <button
            onClick={closeThanks}
            className="group absolute top-4 right-4 z-50 cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100"
          >
            <X className="size-5 text-gray-400 transition-colors group-hover:text-gray-600" />
          </button>
          <div className="space-y-4">
            <h1 className="text-2xl tracking-tight sm:text-3xl">Say Thanks!</h1>
            <p className="max-w-[250px] text-sm text-neutral-600 sm:text-base">
              Show some love to{" "}
              <Link className="font-semibold text-black" href={ownerPexelsUrl}>
                {ownerName}
              </Link>
              &nbsp;by following them on pexels.
            </p>
            <p className="max-w-[330px] text-sm text-neutral-600 sm:text-base">
              Donate to our photographers to encourage them to deliver their
              best.
            </p>
          </div>
          <Button className="w-fit" onClick={() => router.push(ownerPexelsUrl)}>
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThanksDialog;
