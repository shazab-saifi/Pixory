"use client";

import React, { useState } from "react";
import Button from "./Button";
import Image from "next/image";
import pixoryWhite from "@/public/pixoryWhite.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="w-full relative px-4 py-4 md:px-20 flex justify-between items-center text-base text-white">
        <Image className="aspect-auto w-[100px]" src={pixoryWhite} alt="Logo" />
        <div className="hidden md:flex items-center space-x-8">
          <div className="space-x-8 font-medium text-shadow-md">
            <Link href="/">Home</Link>
            <Link href="/getpixory+">Get Pixory+</Link>
            <Link href="/advertise">Advertise</Link>
          </div>
          <div className="space-x-4">
            <Button variant="secondary" onClick={() => router.push("/signup")}>Sign Up</Button>
            <Button variant="primary" onClick={() => router.push("/signin")}>Sign In</Button>
          </div>
        </div>
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
