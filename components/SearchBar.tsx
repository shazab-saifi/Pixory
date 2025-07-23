"use client";

import Dropdown from "./Dropdown";
import Button from "./Button";
import { ChevronDown, Images, Play, PlayCircle, Search } from "lucide-react";
import { useRef, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { cn } from "@/lib/utils";
import { useSearchOptions } from "@/lib/store";

const SearchBar = ({
  className,
  inputClassName,
}: {
  className?: string;
  inputClassName?: string;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const router = useTransitionRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { currentSearchOption } = useSearchOptions();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOnClick = () => {
    if (inputValue.length === 0) {
      return alert("Please fill the input before searching!");
    } else {
      router.push(`/search?query=${inputValue}`);
    }
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleOnClick();
    } else {
      return null;
    }
  };

  return (
    <div
      className={cn(
        "inline-flex w-full items-center justify-between gap-2 rounded-xl bg-white shadow-md",
        className,
      )}
    >
      {/* Hover area includes both button and dropdown to prevent accidental close */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex flex-col"
      >
        <button
          onClick={() => setIsHovered((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-l-xl bg-white p-4 hover:bg-gray-100 hover:opacity-70"
        >
          {currentSearchOption === "photos" ? (
            <div className="flex items-center gap-2">
              <Images size={18} className="opacity-80" />
              <span className="hidden md:block">Photos</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <PlayCircle size={18} className="opacity-80" />
              <span className="hidden md:block">Videos</span>
            </div>
          )}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isHovered ? "rotate-180" : ""
            }`}
          />
        </button>
        <Dropdown
          text1="Photos"
          text2="Videos"
          icon1={Images}
          icon2={PlayCircle}
          forSearch={true}
          isHovered={isHovered}
          pointerEventsNone={!isHovered}
        />
      </div>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleEnterKey}
        type="text"
        placeholder="Search for free photos"
        className={cn("flex-1 py-2 outline-none 2xl:w-[300px]", inputClassName)}
      />
      <Button
        variant="secondary"
        onClick={handleOnClick}
        className="m-1 ml-2 flex items-center shadow-none"
      >
        <Search size={18} className="opacity-80" />
      </Button>
    </div>
  );
};

export default SearchBar;
