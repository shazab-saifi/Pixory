"use client";

import React, { useState } from "react";
import Image from "next/image";
import pixoryWhite from "@/public/pixoryWhite.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import Sidebar from "../Sidebar";
import Navigation from "./Navigation";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <nav className="w-full relative px-4 py-4 md:px-20 flex justify-between items-center text-base text-white">
        <Link href="/">
          <Image className="aspect-auto w-[100px]" src={pixoryWhite} alt="Logo" />
        </Link>
        <Navigation
          navigate={(path: string) => router.push(path)}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navigate={(path: string) => router.push(path)}
      />
    </>
  );
};

export default Navbar;
