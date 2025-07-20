"use client";

import Navbar2 from "@/components/Navbar/Navbar2";
import OptionsSection from "@/components/OptionsSection";
import PhotosSection from "@/components/PhotosSection";
import VideosSection from "@/components/VideosSection";
import { useOptionsToggle, useSearchOptions } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SearchPageClient = () => {
  const searchParams = useSearchParams();
  const { currentOption, setToPhotos, setToVideos } = useOptionsToggle();
  const { currentSearchOption } = useSearchOptions();
  const query = searchParams.get("query") || undefined;

  useEffect(() => {
    const whichSection = () =>
      currentSearchOption === "photos" ? setToPhotos() : setToVideos();
    whichSection();
  }, []);

  return (
    <div>
      <Navbar2 />
      <div className="mt-17 xl:mt-25">
        <OptionsSection />
      </div>
      {currentOption === "photos" ? (
        <PhotosSection query={query} />
      ) : (
        <VideosSection query={query} />
      )}
    </div>
  );
};

export default SearchPageClient;
