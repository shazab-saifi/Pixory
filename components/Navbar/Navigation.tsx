import { Link } from "next-view-transitions";
import Button from "../Button";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { LogOut, User } from "lucide-react";
import { useOutside } from "@/hooks/useOutside";
import { useState } from "react";
import { motion } from "motion/react";

const Navigation = ({
  isDropdownOpen,
  setIsDropdownOpen,
  navigate,
}: {
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: (path: string) => void;
}) => {
  const { data: session, status } = useSession();
  const ref = useOutside(() => setIsDropdownOpen(false), isDropdownOpen);
  const hoverEffect =
    "p-4 rounded-full transition-colors hover:bg-black/30 absolute inset-0 h-full w-full";
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const navItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Get Pixory+",
      href: "/getpixory",
    },
    {
      title: "Advertise",
      href: "/advertise",
    },
  ];

  return (
    <div className="hidden space-x-8 xl:flex xl:items-center">
      <div className="flex items-center font-medium text-shadow-md">
        {navItems.map((item, idx) => (
          <Link
            className="relative flex cursor-pointer px-6 py-1"
            href={item.href}
            key={idx}
            onMouseEnter={() => setIsHovered(idx)}
            onMouseLeave={() => setIsHovered(null)}
          >
            {isHovered === idx && (
              <motion.span
                layoutId="hovered-span"
                className="absolute inset-0 h-full w-full rounded-full bg-black/30 p-4"
              />
            )}
            <span className="relative z-50">{item.title}</span>
          </Link>
        ))}
        {/* <Link className={hoverEffect} href="/">
          Home
        </Link>
        <Link className={hoverEffect} href="/getpixory+">
          Get Pixory+
        </Link>
        <Link className={hoverEffect} href="/advertise">
          Advertise
        </Link> */}
      </div>
      {status === "authenticated" ? (
        <div
          className="relative flex justify-center"
          onClick={() => setIsDropdownOpen((prev: boolean) => !prev)}
        >
          <Image
            className="size-13 cursor-pointer rounded-full"
            src={
              session
                ? (session?.user?.image as string)
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            width={50}
            height={50}
            alt="profile pic"
          />
          <div
            className={`absolute top-full z-40 origin-top transform pt-2 text-black transition-all ${
              isDropdownOpen
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0"
            }`}
          >
            <div
              ref={ref}
              className="flex cursor-pointer flex-col gap-2 rounded-lg border bg-white p-2 shadow-lg"
            >
              <div
                onClick={() => navigate("/profile")}
                className="flex cursor-pointer items-center gap-2 rounded-md p-2 transition-all hover:bg-gray-100 hover:opacity-70"
              >
                <User className="size-5" />
                <p>Profile</p>
              </div>
              <div
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex cursor-pointer items-center gap-2 rounded-md p-2 transition-all hover:bg-gray-100 hover:opacity-70"
              >
                <LogOut className="size-5" />
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-x-4">
          <Button variant="secondary" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
          <Button variant="primary" onClick={() => navigate("signin")}>
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
