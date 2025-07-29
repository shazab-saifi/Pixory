"use client";

import Dropdown from "./Dropdown";
import { ChevronDown, Images, PlayCircle, Search } from "lucide-react";
import { useRef, useState, useCallback, useMemo } from "react";
import { cn, isTouchDevice } from "@/lib/utils";
import { useSearchOptions } from "@/lib/store";
import RecentSearches from "./RecentSearches";
import { toast } from "sonner";
import { useOutside } from "@/hooks/useOutside";
import { useRouter } from "next/navigation";

const capitalizeInput = (input: string) =>
  input.length > 0 ? input[0].toUpperCase() + input.slice(1).toLowerCase() : "";

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
  const [isNewSearch, setIsNewSearch] = useState<boolean>(false);

  const ref = useOutside(
    useCallback(() => {
      setIsFocused(false);
      setIsNewSearch(false);
    }, []),
    isFocused,
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const finalInput = useMemo(() => capitalizeInput(inputValue), [inputValue]);

  const handleOnClick = useCallback(() => {
    if (finalInput.length === 0) {
      toast.message("Please fill the input before searching!");
      return;
    }

    let recentSearches: string[] = [];
    try {
      recentSearches = JSON.parse(
        localStorage.getItem("recentSearches") || "[]",
      );
    } catch {
      recentSearches = [];
    }

    recentSearches = recentSearches.filter(
      (str) => str.toLowerCase() !== finalInput.toLowerCase(),
    );

    const updated =
      recentSearches.length >= 10
        ? [...recentSearches.slice(1), finalInput]
        : [...recentSearches, finalInput];

    localStorage.setItem("recentSearches", JSON.stringify(updated));

    router.push(`/search?query=${finalInput}`);
    setIsFocused(false);
    setIsNewSearch(true);
  }, [finalInput, router]);

  const handleEnterKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleOnClick();
      }
    },
    [handleOnClick],
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setIsNewSearch(false);
  }, []);

  const dropdownProps = useMemo(
    () => ({
      text1: "Photos",
      text2: "Videos",
      icon1: Images,
      icon2: PlayCircle,
      forSearch: true,
      isHovered,
      pointerEventsNone: !isHovered,
    }),
    [isHovered],
  );

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex w-full items-center justify-between gap-2 rounded-xl bg-neutral-100 p-1 sm:gap-4",
        className,
      )}
    >
      <div
        onMouseEnter={() => {
          if (!isTouchDevice) setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (!isTouchDevice) setIsHovered(false);
        }}
        onClick={() => {
          if (isTouchDevice) setIsHovered((prev) => !prev);
        }}
        className="relative flex flex-col"
      >
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 hover:bg-neutral-200"
          tabIndex={-1}
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
        <Dropdown {...dropdownProps} />
      </div>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleEnterKey}
        type="text"
        placeholder="Search for free photos"
        className={cn("min-w-[100px] flex-1 py-2 outline-none", inputClassName)}
        onFocus={handleFocus}
        aria-label="Search input"
        autoComplete="off"
      />
      <button
        type="button"
        onClick={handleOnClick}
        className={cn(
          "flex min-h-full cursor-pointer items-center rounded-lg p-3 text-neutral-400 shadow-none transition-colors sm:px-4.5 sm:py-3.5",
          isTouchDevice
            ? "active:bg-neutral-200 active:text-neutral-800"
            : "hover:bg-neutral-200 hover:text-neutral-800",
        )}
        aria-label="Search"
      >
        <Search size={20} className="opacity-80" />
      </button>
      <RecentSearches isFocused={isFocused} isNewSearch={isNewSearch} />
    </div>
  );
};

export default SearchBar;
