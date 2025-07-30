"use client";

import { useThanksDialog } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useOutside } from "@/hooks/useOutside";
import { useCallback } from "react";
import CloseButton from "./CloseButton";

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
  const router = useRouter();
  const hideDialog = useThanksDialog((s) => s.hideThanksDialog);

  const closeAllThanksDialogs = useCallback(() => {
    hideDialog("photoSection");
    hideDialog("videoSection");
    hideDialog("videoPreview");
    hideDialog("photoPreview");
  }, [hideDialog]);

  const ref = useOutside(closeAllThanksDialogs, true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.3 }}
      ref={ref}
      className="relative z-60 flex h-fit w-fit flex-col gap-4 sm:flex-row"
    >
      <Image
        src={image.url || "/heroImage1.png"}
        width={400}
        loading="eager"
        height={400}
        alt="image"
        className="max-h-[150px] w-full rounded-t-3xl object-cover sm:max-h-[330px] sm:w-[150px] sm:rounded-tl-3xl sm:rounded-tr-none sm:rounded-bl-3xl"
      />
      <div className="flex flex-col justify-between gap-6 rounded-br-3xl rounded-bl-3xl bg-white p-6 sm:relative sm:rounded-tr-3xl sm:rounded-br-3xl sm:rounded-bl-none">
        <CloseButton handlerFn={closeAllThanksDialogs} />
        <div className="space-y-4">
          <h1 className="text-2xl tracking-tight sm:text-3xl">Say Thanks!</h1>
          <p className="max-w-[250px] text-sm text-neutral-600 sm:text-base">
            Show some love to&nbsp;
            <Link
              className="font-semibold text-black"
              href={ownerPexelsUrl || "https://pexels.com"}
            >
              {ownerName}
            </Link>
            &nbsp;by following them on pexels.
          </p>
          <p className="max-w-[330px] text-sm text-neutral-600 sm:text-base">
            Donate to our photographers to encourage them to deliver their best.
          </p>
        </div>
        <Button
          className="w-fit"
          onClick={() => router.push(ownerPexelsUrl || "https://pexels.com")}
        >
          Follow
        </Button>
      </div>
    </motion.div>
  );
};

export default ThanksDialog;
