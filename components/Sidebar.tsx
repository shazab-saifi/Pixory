import Image from "next/image";
import React from "react";
import { pixory } from "@/lib/import";
import { Home, LogOut, Megaphone, Plus, User, X } from "lucide-react";
import Link from "next/link";
import Button from "./Button";
import { signOut, useSession } from "next-auth/react";
import { useOverflowHidden } from "@/hooks/useOverflowHidden";

const Sidebar = ({
  isOpen,
  setIsOpen,
  navigate,
}: {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  navigate: (path: string) => void;
}) => {
  const { data: session, status } = useSession();

  useOverflowHidden(isOpen);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 min-h-screen bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-4/6 max-w-xs transform flex-col bg-white p-5 transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <Image className="aspect-auto w-[90px]" src={pixory} alt="Logo" />
          <button onClick={() => setIsOpen(false)} aria-label="Close sidebar">
            <X className="h-7 w-7" />
          </button>
        </div>
        {status === "authenticated" && (
          <div className="mb-8 flex items-center gap-3">
            <Image
              src={
                (session && (session?.user?.image as string)) ||
                "/profileAvatar.webp"
              }
              width={44}
              height={44}
              className="rounded-full"
              alt="profile pic"
            />
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-semibold">
                {session?.user?.name}
              </span>
              <span className="block truncate text-xs text-neutral-600">
                {session?.user?.email}
              </span>
            </div>
          </div>
        )}
        <nav className="flex flex-1 flex-col gap-6">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded px-2 py-2 transition hover:bg-neutral-100"
          >
            <Home className="size-6" />
            <span>Home</span>
          </Link>
          {status === "authenticated" && (
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded px-2 py-2 transition hover:bg-neutral-100"
            >
              <User className="size-6" />
              <span>Profile</span>
            </Link>
          )}
          <Link
            href="/getpixory+"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded px-2 py-2 transition hover:bg-neutral-100"
          >
            <Plus className="size-6" />
            <span>Get Pixory+</span>
          </Link>
          <Link
            href="/advertise"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded px-2 py-2 transition hover:bg-neutral-100"
          >
            <Megaphone className="size-6" />
            <span>Advertise</span>
          </Link>
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          {status === "authenticated" ? (
            <Button
              variant="secondary"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center justify-center gap-3"
            >
              <LogOut className="size-4" />
              <span>Log Out</span>
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  setIsOpen(false);
                  navigate("signup");
                }}
                className="w-full"
              >
                Sign Up
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsOpen(false);
                  navigate("signin");
                }}
                className="w-full"
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
