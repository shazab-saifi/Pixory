"use client";

import { Images, CirclePlay, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

const Dropdown = () => {
  const [dropdownItem, setDropdownItem] = useState("photo");
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    <div className="flex flex-col relative mr-2">
      <button
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex rounded-l-xl items-center p-4 bg-white hover:bg-gray-100 hover:opacity-70 gap-2"
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
      <div className="w-[120px] md:w-full pt-2 absolute top-full">
        <div
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`transition-all duration-300 transform bg-white shadow-md space-y-4 p-4 rounded-lg ${
            isOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div
            className="w-full flex items-center gap-2 hover:bg-gray-50 hover:text-red-500 rounded-lg cursor-pointer"
            onClick={() => setDropdownItem("photo")}
          >
            <Images size={18} className="opacity-80" />
            <span>Photos</span>
          </div>
          <div
            className="w-full flex items-center gap-2 hover:bg-gray-50 hover:text-green-500 rounded-lg cursor-pointer"
            onClick={() => setDropdownItem("Play")}
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
