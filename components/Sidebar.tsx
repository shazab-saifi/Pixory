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
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 transform bg-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Image className="aspect-auto w-[100px]" src={pixory} alt="Logo" />
          <button onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex w-full flex-col gap-50 p-6 text-base font-medium">
          <div className="space-y-10">
            {status === "authenticated" && (
              <div className="flex w-full gap-4">
                <Image
                  src={
                    (session && (session?.user?.image as string)) ||
                    "/profileAvatar.webp"
                  }
                  width={48}
                  height={48}
                  className="rounded-full"
                  alt="profile pic"
                />
                <div className="flex flex-col">
                  <span className="font-semibold">{session?.user?.name}</span>
                  <span className="block max-w-full text-[12px] break-words text-gray-600">
                    {session.user?.email}
                  </span>
                </div>
              </div>
            )}
            <div className="flex flex-col space-y-8">
              {status === "authenticated" && (
                <div className="jsu inline-flex items-center gap-3 pl-3">
                  <User />
                  <Link href="/profile" onClick={() => setIsOpen(false)}>
                    Profile
                  </Link>
                </div>
              )}
              <div className="inline-flex items-center gap-3 pl-3">
                <Home />
                <Link href="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              </div>
              <div className="inline-flex items-center gap-3 pl-3">
                <Plus />
                <Link href="/getpixory+" onClick={() => setIsOpen(false)}>
                  Get Pixory+
                </Link>
              </div>
              <div className="inline-flex items-center gap-3 pl-3">
                <Megaphone />
                <Link href="/advertise" onClick={() => setIsOpen(false)}>
                  Advertise
                </Link>
              </div>
            </div>
          </div>
          {status === "authenticated" ? (
            <div>
              <Button
                variant="secondary"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="mt-12 flex w-full justify-center gap-4"
              >
                <LogOut className="size-4" />
                <span>Log Out</span>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsOpen(false);
                  navigate("signup");
                }}
              >
                Sign Up
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsOpen(false);
                  navigate("signin");
                }}
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
