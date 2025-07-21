"use client";

import React from "react";
import Button from "./Button";
import { useOptionsToggle } from "@/lib/store";

const OptionsSection = ({ ref }: { ref: React.Ref<HTMLDivElement> }) => {
  const { currentOption, setToPhotos, setToVideos } = useOptionsToggle();

  return (
    <div
      ref={ref}
      className="flex w-full justify-center space-x-4 px-20 py-6 md:py-8"
    >
      <Button
        onClick={setToPhotos}
        size="lg"
        variant={currentOption === "photos" ? "primary" : "secondary"}
        className="rounded-full px-5 py-2"
      >
        Photos
      </Button>
      <Button
        onClick={setToVideos}
        size="lg"
        variant={currentOption === "videos" ? "primary" : "secondary"}
        className="rounded-full px-5 py-2"
      >
        Videos
      </Button>
    </div>
  );
};

export default OptionsSection;
