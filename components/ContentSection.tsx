"use client";

import { useOptionsToggle } from "@/lib/store";
import PhotosSection from "./PhotosSection";
import VideosSection from "./VideosSection";

const ContentSection = () => {
  const { currentOption } = useOptionsToggle();

  return (
    <div>
      {currentOption === "photos" ? <PhotosSection /> : <VideosSection />}
    </div>
  );
};

export default ContentSection;
