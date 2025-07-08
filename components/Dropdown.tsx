"use client";

import { useOptionsToggle } from "@/lib/store";
import { signOut } from "next-auth/react";
import { useTransitionRouter } from "next-view-transitions";

const Dropdown = ({
  icon1: Icon1,
  icon2: Icon2,
  text1,
  text2,
  isHovered,
  forSearch,
  setDropdownItem,
}: {
  icon1: React.ElementType;
  icon2: React.ElementType;
  text1?: string;
  text2?: string;
  forSearch: boolean;
  isHovered: boolean;
  setDropdownItem?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useTransitionRouter();
  const { setToPhotos, setToVideos } = useOptionsToggle();

  return (
    <div className="absolute inset-x-0 top-full z-50 pt-2 md:w-full">
      <div
        className={`transform space-y-2 rounded-lg bg-white p-2 text-black shadow-md transition-all duration-300 ${
          isHovered
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div
          className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 transition-colors hover:bg-gray-100"
          onClick={() => {
            if (forSearch) {
              setDropdownItem && setDropdownItem("photo");
              setToPhotos();
            } else {
              router.push("/profile");
            }
          }}
        >
          <Icon1 size={18} className="opacity-80" />
          <span>{text1}</span>
        </div>
        <div
          className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 transition-colors hover:bg-gray-100"
          onClick={() => {
            if (forSearch) {
              setDropdownItem && setDropdownItem("video");
              setToVideos();
            } else {
              signOut({ callbackUrl: "/" });
            }
          }}
        >
          <Icon2 size={18} className="opacity-80" />
          <span>{text2}</span>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
