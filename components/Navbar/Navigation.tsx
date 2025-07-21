import { Link } from "next-view-transitions";
import Button from "../Button";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { LogOutIcon, User } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import Dropdown from "../Dropdown";

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
  const [isNavHovered, setIsNavHovered] = useState<number | null>(null);

  const navItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Get Pixory+",
      href: "/getpixory+",
    },
    {
      title: "Advertise",
      href: "/advertise",
    },
  ];

  return (
    <div className="hidden xl:flex xl:items-center">
      <div className="flex items-center text-shadow-md">
        {navItems.map((item, idx) => (
          <Link
            className="relative flex cursor-pointer px-6 py-1"
            href={item.href}
            key={idx}
            onMouseEnter={() => setIsNavHovered(idx)}
            onMouseLeave={() => setIsNavHovered(null)}
          >
            {isNavHovered === idx && (
              <motion.span
                layoutId="hovered-span"
                className="absolute inset-0 -top-2 h-full w-full rounded-full bg-black/30 p-6"
              />
            )}
            <span className="relative z-50">{item.title}</span>
          </Link>
        ))}
      </div>
      {/* Avatar and dropdown are wrapped together to keep dropdown open on hover */}
      {status === "authenticated" ? (
        <div
          className="relative flex w-[120px] justify-center"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <Image
            className="size-13 cursor-pointer rounded-full"
            src={
              (session && (session?.user?.image as string)) ||
              "/profileAvatar.webp"
            }
            width={50}
            height={50}
            alt="profile pic"
          />
          <Dropdown
            text1="Profile"
            text2="Logout"
            icon1={User}
            icon2={LogOutIcon}
            forSearch={false}
            isHovered={isDropdownOpen}
            pointerEventsNone={!isDropdownOpen}
          />
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
