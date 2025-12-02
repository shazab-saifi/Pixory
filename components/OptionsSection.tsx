"use client";

import React from "react";
import { useOptionsToggle } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

const tabOptions = [
  { key: "photos", label: "Photos" },
  { key: "videos", label: "Videos" },
];

const OptionsSection = ({
  ref,
  layoutId,
}: {
  ref?: React.Ref<HTMLDivElement>;
  layoutId: string;
}) => {
  const { currentOption, setToPhotos, setToVideos } = useOptionsToggle();

  const handleTabClick = (key: string) => {
    if (key === "photos") setToPhotos();
    if (key === "videos") setToVideos();
  };

  return (
    <div ref={ref} className="flex w-full justify-center px-20 py-6 md:py-8">
      <div className="relative flex w-auto space-x-2 rounded-full border-b border-gray-200 bg-gray-100 p-1">
        <AnimatePresence initial={false}>
          {tabOptions.map((tab) =>
            currentOption === tab.key ? (
              <motion.div
                key={tab.key}
                layoutId="tab-active-bg"
                className="absolute top-0 left-0 z-0 h-full rounded-full bg-white shadow"
                style={{
                  width: "auto",
                  minWidth: 0,
                }}
                initial={{ opacity: 0.95 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.18,
                  type: "spring",
                  stiffness: 400,
                  damping: 36,
                }}
              />
            ) : null,
          )}
        </AnimatePresence>
        {tabOptions.map((tab, idx) => (
          <div
            key={tab.key}
            className="relative z-10"
            style={idx === 0 ? undefined : { marginLeft: "1rem" }}
          >
            <button
              onClick={() => handleTabClick(tab.key)}
              className={`relative rounded-full px-5 py-2 transition-colors duration-150 focus:outline-none ${
                currentOption === tab.key
                  ? "font-semibold text-gray-900"
                  : "text-gray-500"
              }`}
              type="button"
              aria-selected={currentOption === tab.key}
              tabIndex={0}
              role="tab"
            >
              {currentOption === tab.key && (
                <motion.div
                  layoutId={`tab-${layoutId}`}
                  className="absolute inset-0 z-0 rounded-full bg-white shadow"
                  style={{ pointerEvents: "none" }}
                  transition={{
                    duration: 0.18,
                    type: "spring",
                    stiffness: 400,
                    damping: 36,
                  }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsSection;
