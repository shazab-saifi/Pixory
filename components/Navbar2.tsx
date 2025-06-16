'use client'

import Image from "next/image";
import SearchBar from "./SearchBar";
import pixory from "@/public/pixory.svg";
import Link from "next/link";
import Button from "./Button";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import Sidebar from "./Sidebar";
import Dropdown from "./Dropdown";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleOnClick = () => {
    router.push(`/search?query=${inputValue}`);
  }

  const hoverEffect = "p-4 rounded-full transition-colors hover:bg-gray-100";

  return (
    <>
      {!isSearching ?
        <nav className="w-full relative px-4 py-4 2xl:px-20 flex justify-between items-center text-base text-black">
          <div className="flex 2xl:gap-20 gap-8">
            <Image className="aspect-auto w-[100px]" src={pixory} alt="Logo" />
            <SearchBar
              inputClassName="flex-1"
              className="hidden lg:flex gap-2"
            />
          </div>
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            <div className="space-x-4 xl:space-x-8 text-shadow-md">
              <Link className={hoverEffect} href="/">Home</Link>
              <Link className={hoverEffect} href="/getpixory+">Get Pixory+</Link>
              <Link className={hoverEffect} href="/advertise">Advertise</Link>
            </div>
            <div className="space-x-4 xl:space-x-8 flex">
              <Button variant="secondary" onClick={() => router.push("/signup")}>Sign Up</Button>
              <Button variant="primary" onClick={() => router.push("/signin")}>Sign In</Button>
            </div>
          </div>
          <div className="lg:hidden space-x-4 flex items-center">
            <Search
              className="w-6 h-6"
              onClick={() => setIsSearching(true)}
            />
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
        :
        <div className="flex items-center justify-center px-4">
          <div className="w-full inline-flex items-center p-1 mt-2 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <Dropdown />
            <input
              value={inputValue}
              onChange={handleInput}
              type="text"
              placeholder="Search for free photos"
              className="h-full outline-none flex-1 shrink w-[120px]"
            />
            <Button
              variant='secondary'
              className="px-2 rounded-md shadow-none active:bg-gray-100"
              onClick={() => setIsSearching(false)}
            >
              <X className="opacity-80 w-5 h-5 shrink-0" />
            </Button>
            <Button
              onClick={handleOnClick}
              variant='secondary'
              className="pl-2 pr-4 rounded-md active:bg-gray-100 shadow-none"
            >
              <Search className="opacity-80 w-5 h-5 shrink-0"
              />
            </Button>
          </div>
        </div>
      }
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navigate={(path: string) => router.push(path)}
      />
    </>
  );
}

export default Navbar2