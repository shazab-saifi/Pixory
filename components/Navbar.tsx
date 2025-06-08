"use client";

import React, { useState } from "react";
import Button from "./Button";
import Image from "next/image";
import pixoryWhite from "@/public/pixoryWhite.svg";
import pixory from "@/public/pixory.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Home, Plus, Megaphone } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="w-full px-4 py-4 md:px-20 flex justify-between items-center text-base text-white">
        <Image className="aspect-auto w-[100px]" src={pixoryWhite} alt="Logo" />
        <div className="hidden md:flex items-center space-x-8">
          <div className="space-x-8 font-medium">
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
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-white transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center px-6 py-6">
          <Image className="aspect-auto w-[100px]" src={pixory} alt="Logo" />
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="h-full flex flex-col p-6 justify-between text-base font-medium">
          <div className="flex flex-col space-y-6">
            <div className="inline-flex items-center gap-3">
              <Home />
              <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            </div>
            <div className="inline-flex items-center gap-3">
              <Plus />
              <Link href="/getpixory+" onClick={() => setIsOpen(false)}>Get Pixory+</Link>
            </div>
            <div className="inline-flex items-center gap-3">
              <Megaphone />
              <Link href="/advertise" onClick={() => setIsOpen(false)}>Advertise</Link>
            </div>
          </div>
          <div className="flex flex-col space-y-3 mb-12">
            <Button variant="secondary" onClick={() => { setIsOpen(false); router.push("/signup") }}>Sign Up</Button>
            <Button variant="primary" onClick={() => { setIsOpen(false); router.push("/signin") }}>Sign In</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
