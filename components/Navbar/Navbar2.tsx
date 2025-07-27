"use client";

import Image from "next/image";
import SearchBar from "../SearchBar";
import { pixory } from "@/lib/import";
import Button from "../Button";
import { useState, ChangeEvent } from "react";
import { ChevronDown, Images, Menu, PlayCircle, Search, X } from "lucide-react";
import Sidebar from "../Sidebar";
import Dropdown from "../Dropdown";
import Navigation from "./Navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);
  const handleOnClick = () => router.push(`/search?query=${inputValue}`);

  return (
    <>
      {!isSearching ? (
        <nav className="fixed top-0 z-20 flex w-full items-center justify-between bg-white px-4 py-4 text-base text-black md:px-20 xl:px-30 2xl:px-50">
          <div className="flex gap-8 2xl:gap-20">
            <Link href="/" className="inline-flex items-center">
              <Image
                className="aspect-auto w-[100px] xl:w-[130px]"
                src={pixory}
                alt="Logo"
              />
            </Link>
            <SearchBar
              inputClassName="w-[400px]"
              className="hidden gap-2 xl:flex"
            />
          </div>
          <Navigation
            navigate={router.push}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
          <div className="flex items-center space-x-4 md:hidden">
            <Search className="h-6 w-6" onClick={() => setIsSearching(true)} />
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      ) : (
        <div className="fixed top-0 z-20 flex w-full items-center justify-center px-4">
          <div className="shadow-custom mt-2 inline-flex w-full items-center rounded-xl bg-white p-1">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative flex flex-col"
            >
              <button
                onClick={() => setIsHovered((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-l-xl bg-white p-4 hover:bg-gray-100 hover:opacity-70"
              >
                <div className="flex items-center gap-2">
                  <Images size={18} className="opacity-80" />
                  <span className="hidden md:block">Photos</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isHovered ? "rotate-180" : ""}`}
                />
              </button>
              <Dropdown
                text1="Photos"
                text2="Videos"
                icon1={Images}
                icon2={PlayCircle}
                forSearch={true}
                isHovered={isHovered}
              />
            </div>
            <input
              value={inputValue}
              onChange={handleInput}
              type="text"
              placeholder="Search for free photos"
              className="h-full w-[120px] flex-1 shrink outline-none"
            />
            <Button
              variant="secondary"
              className="rounded-md px-2 shadow-none active:bg-gray-100"
              onClick={() => setIsSearching(false)}
            >
              <X className="h-5 w-5 shrink-0 opacity-80" />
            </Button>
            <Button
              onClick={handleOnClick}
              variant="secondary"
              className="rounded-md pr-4 pl-2 shadow-none active:bg-gray-100"
            >
              <Search className="h-5 w-5 shrink-0 opacity-80" />
            </Button>
          </div>
        </div>
      )}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} navigate={router.push} />
    </>
  );
};

export default Navbar2;
