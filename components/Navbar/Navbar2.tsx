"use client";

import Image from "next/image";
import SearchBar from "../SearchBar";
import { pixory } from "@/lib/import";
import { useState, ChangeEvent } from "react";
import { ChevronDown, Images, Menu, PlayCircle, Search, X } from "lucide-react";
import Sidebar from "../Sidebar";
import Dropdown from "../Dropdown";
import Navigation from "./Navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isTouchDevice } from "@/lib/utils";

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
          <div className="shadow-custom mt-2 inline-flex w-full items-center gap-2 rounded-xl bg-white p-1">
            <div
              onMouseEnter={() =>
                isTouchDevice ? undefined : setIsHovered(true)
              }
              onMouseLeave={() =>
                isTouchDevice ? undefined : setIsHovered(false)
              }
              onClick={() =>
                isTouchDevice ? setIsHovered((prev) => !prev) : undefined
              }
              className="relative flex flex-col"
            >
              <button className="inline-flex items-center gap-2 rounded-lg bg-neutral-100 px-4 py-3 hover:bg-neutral-200">
                <div className="flex items-center gap-2">
                  <Images
                    size={18}
                    className={`${isTouchDevice ? "active:bg-neutral-200 active:text-neutral-800" : "hover:bg-neutral-200 hover:text-neutral-800"} text-neutral-400`}
                  />
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
              className="h-full w-[100px] flex-1 outline-none"
            />
            <button
              className="flex min-h-full cursor-pointer items-center rounded-lg text-neutral-400 shadow-none"
              onClick={() => setIsSearching(false)}
            >
              <X className="h-5 w-5 shrink-0" />
            </button>
            <button
              onClick={handleOnClick}
              className={`flex min-h-full cursor-pointer items-center rounded-lg p-3 text-neutral-400 shadow-none transition-colors sm:px-4.5 sm:py-3.5 ${
                isTouchDevice
                  ? "active:bg-neutral-200 active:text-neutral-800"
                  : "hover:bg-neutral-200 hover:text-neutral-800"
              }`}
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      )}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} navigate={router.push} />
    </>
  );
};

export default Navbar2;
