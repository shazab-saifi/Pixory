"use client";

import Image from "next/image";
import SearchBar from "../SearchBar";
import { pixory } from "@/lib/import";
import { Link } from "next-view-transitions";
import Button from "../Button";
import { ChangeEvent, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { Menu, Search, X } from "lucide-react";
import Sidebar from "../Sidebar";
import Dropdown from "../Dropdown";
import Navigation from "./Navigation";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useTransitionRouter();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOnClick = () => {
    router.push(`/search?query=${inputValue}`);
  };

  return (
    <>
      {!isSearching ? (
        <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-white px-4 py-4 text-base text-black 2xl:px-20">
          <div className="flex gap-8 2xl:gap-20">
            <Link href="/" className="inline-flex items-center">
              <Image
                className="aspect-auto w-[100px]"
                src={pixory}
                alt="Logo"
              />
            </Link>
            <SearchBar
              inputClassName="flex-1"
              className="hidden gap-2 xl:flex"
            />
          </div>
          <Navigation
            navigate={(path: string) => router.push(path)}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
          <div className="flex items-center space-x-4 xl:hidden">
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
        <div className="flex items-center justify-center px-4">
          <div className="mt-2 inline-flex w-full items-center rounded-xl bg-white p-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <Dropdown />
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
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navigate={(path: string) => router.push(path)}
      />
    </>
  );
};

export default Navbar2;
