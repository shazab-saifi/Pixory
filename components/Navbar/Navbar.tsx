"use client";

import React, { useState } from "react";
import Image from "next/image";
import { pixoryWhite } from "@/lib/import";
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
      <nav className="relative flex w-full items-center justify-between px-4 py-4 text-base text-white md:px-20">
        <Link href="/">
          <Image
            className="aspect-auto w-[100px]"
            src={pixoryWhite}
            alt="Logo"
          />
        </Link>
        <Navigation
          navigate={(path: string) => router.push(path)}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 focus:outline-none md:hidden"
        >
          <Menu className="h-6 w-6" />
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
