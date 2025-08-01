"use client";

import Navbar2 from "@/components/Navbar/Navbar2";
import OptionsSection from "@/components/OptionsSection";
import PhotosSection from "@/components/PhotosSection";
import VideosSection from "@/components/VideosSection";
import { useOptionsToggle } from "@/lib/store";
import { useSearchParams } from "next/navigation";

const SearchPageClient = () => {
  const searchParams = useSearchParams();
  const { currentOption } = useOptionsToggle();
  const query = searchParams.get("query") || undefined;

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
