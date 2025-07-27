"use client";

import Dropdown from "./Dropdown";
import { ChevronDown, Images, PlayCircle, Search } from "lucide-react";
import { useRef, useState } from "react";
import { cn, isTouchDevice } from "@/lib/utils";
import { useSearchOptions } from "@/lib/store";
import RecentSearches from "./RecentSearches";
import { toast } from "sonner";
import { useOutside } from "@/hooks/useOutside";
import { useRouter } from "next/navigation";

const SearchBar = ({
  className,
  inputClassName,
}: {
  className?: string;
  inputClassName?: string;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { currentSearchOption } = useSearchOptions();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const ref = useOutside(() => setIsFocused(false), isFocused);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOnClick = () => {
    if (inputValue.length === 0) {
      return toast.message("Please fill the input before searching!");
    } else {
      if (localStorage.getItem("recentSearches")) {
        const recentSearches: string[] = JSON.parse(
          localStorage.getItem("recentSearches") || "[]",
        );
        const alreadyExists = recentSearches.find((str) => str === inputValue);
        if (!alreadyExists && recentSearches.length < 5) {
          const update = [...recentSearches, inputValue];
          localStorage.setItem("recentSearches", JSON.stringify(update));
        }
      } else {
        localStorage.setItem("recentSearches", JSON.stringify([inputValue]));
      }
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
      ref={ref}
      className={cn(
        "relative inline-flex w-full items-center justify-between gap-2 rounded-xl bg-neutral-100 p-1 sm:gap-4",
        className,
      )}
    >
      <div
        onMouseEnter={() => (isTouchDevice ? undefined : setIsHovered(true))}
        onMouseLeave={() => (isTouchDevice ? undefined : setIsHovered(false))}
        onClick={() =>
          isTouchDevice ? setIsHovered((prev) => !prev) : undefined
        }
        className="relative flex flex-col"
      >
        <button
          className={cn(
            "inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3",
            isTouchDevice ? "active:bg-neutral-200" : "hover:bg-neutral-200",
          )}
        >
          {currentSearchOption === "photos" ? (
            <div className="flex items-center gap-2">
              <Images size={20} className="text-neutral-400" />
              <span className="hidden text-neutral-800 md:block">Photos</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <PlayCircle size={20} className="text-neutral-400" />
              <span className="hidden text-neutral-800 md:block">Videos</span>
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
        className={cn("min-w-[100px] flex-1 py-2 outline-none", inputClassName)}
        onFocus={() => setIsFocused(true)}
      />
      <button
        onClick={handleOnClick}
        className={cn(
          "flex min-h-full cursor-pointer items-center rounded-lg p-3 text-neutral-400 shadow-none transition-colors sm:px-4.5 sm:py-3.5",
          isTouchDevice
            ? "active:bg-neutral-200 active:text-neutral-800"
            : "hover:bg-neutral-200 hover:text-neutral-800",
        )}
      >
        <Search size={20} className="opacity-80" />
      </button>
      <RecentSearches isFocused={isFocused} />
    </div>
  );
};

export default SearchBar;
