"use client";

import React from "react";
import { useOptionsToggle } from "@/lib/store";

const tabOptions = [
  { key: "photos", label: "Photos" },
  { key: "videos", label: "Videos" },
];

const OptionsSection = ({ ref }: { ref?: React.Ref<HTMLDivElement> }) => {
  const { currentOption, setToPhotos, setToVideos } = useOptionsToggle();

  const handleTabClick = (key: string) => {
    if (key === "photos") {
      setToPhotos();
    } else if (key === "videos") {
      setToVideos();
    }
  };

  return (
    <div ref={ref} className="flex w-full justify-center px-20 py-6 md:py-8">
      <div className="flex w-auto space-x-4 rounded-full border-b border-gray-200 bg-gray-100 p-1">
        {tabOptions.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className={`rounded-full px-5 py-2 transition-colors duration-150 focus:outline-none ${
              currentOption === tab.key
                ? "bg-white font-semibold shadow"
                : "bg-transparent text-gray-500"
            }`}
            type="button"
            aria-selected={currentOption === tab.key}
            tabIndex={0}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionsSection;
