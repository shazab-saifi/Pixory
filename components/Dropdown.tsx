"use client";

import { useOptionsToggle } from "@/lib/store";
import { Images, CirclePlay, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

const Dropdown = () => {
  const [dropdownItem, setDropdownItem] = useState("photo");
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { setToPhotos, setToVideos } = useOptionsToggle();

  const handleButtonMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 50);
  };

  return (
    <div className="relative flex flex-col">
      <button
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex items-center gap-2 rounded-l-xl bg-white p-4 hover:bg-gray-100 hover:opacity-70"
      >
        {dropdownItem === "photo" ? (
          <div className="flex items-center gap-2">
            <Images size={18} className="opacity-80" />
            <span className="hidden md:block">Photos</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CirclePlay size={18} className="opacity-80" />
            <span className="hidden md:block">Videos</span>
          </div>
        )}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Always in DOM: animate opacity/scale based on isOpen */}
      <div className="absolute top-full w-[120px] pt-2 md:w-full">
        <div
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`transform space-y-4 rounded-lg bg-white p-4 shadow-md transition-all duration-300 ${
            isOpen
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          <div
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg hover:bg-gray-50 hover:text-red-500"
            onClick={() => {
              setDropdownItem("photo");
              setToPhotos();
            }}
          >
            <Images size={18} className="opacity-80" />
            <span>Photos</span>
          </div>
          <div
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg hover:bg-gray-50 hover:text-green-500"
            onClick={() => {
              setDropdownItem("video");
              setToVideos();
            }}
          >
            <CirclePlay size={18} className="opacity-80" />
            <span>Videos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
