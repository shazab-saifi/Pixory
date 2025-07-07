"use client";

import Dropdown from "./Dropdown";
import Button from "./Button";
import { Search } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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

  console.log(inputValue);

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
        "inline-flex items-center justify-between gap-2 rounded-xl bg-white shadow-md",
        className,
      )}
    >
      <Dropdown />
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
