'use client'

import Image from "next/image";
import SearchInput from "./SearchInput";
import pixory from "@/public/pixory.svg";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Search } from "lucide-react";
import Sidebar from "./Sidebar";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <>
      <nav className="w-full relative px-4 py-4 md:px-20 flex justify-between items-center text-base text-black">
        <div className="flex gap-20">
          <Image className="aspect-auto w-[100px]" src={pixory} alt="Logo" />
          <SearchInput
            inputClassName="md:w-[300px] lg:w-[350px]"
            className="hidden md:block"
          />
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <div className="space-x-8 text-shadow-md">
            <Link href="/">Home</Link>
            <Link href="/getpixory+">Get Pixory+</Link>
            <Link href="/advertise">Advertise</Link>
          </div>
          <div className="space-x-4">
            <Button variant="secondary" onClick={() => router.push("/signup")}>Sign Up</Button>
            <Button variant="primary" onClick={() => router.push("/signin")}>Sign In</Button>
          </div>
        </div>
        <div className="md:hidden space-x-4 flex items-center">
          <Search className="w-6 h-6" />
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navigate={(path: string) => router.push(path)}
      />
    </>
  );
}

export default Navbar2