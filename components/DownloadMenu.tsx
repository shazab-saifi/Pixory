import { useOutside } from "@/hooks/useOutside";
import { useThanksDialog } from "@/lib/store";
import { PhotoURLsTypes, VideoFile } from "@/lib/types";
import { handleDownload } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";

const DownloadMenu = ({ src }: { src: PhotoURLsTypes | VideoFile[] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>();
  const ref = useOutside(() => setIsOpen(false), isOpen);
  const showThanksDialog = useThanksDialog((s) => s.showThanksDialog);

  const openThanks = () => {
    const section = Array.isArray(src) ? "videoSection" : "photoSection";
    showThanksDialog(section);
  };

  const photoDropdownItems = [
    {
      label: "Original (full resolution)",
      value: "Original (full resolution)",
      onclick: () => setSelectedSize("Original (full resolution)"),
    },
    {
      label: "Large",
      value: "Large",
      onclick: () => setSelectedSize("Large"),
    },
    {
      label: "Portrait",
      value: "Portrait",
      onclick: () => setSelectedSize("Portrait"),
    },
    {
      label: "Landscape",
      value: "Landscape",
      onclick: () => setSelectedSize("Landscape"),
    },
  ];

  let videoDropdownItems: {
    label: string;
    value: string;
    onclick: () => void;
  }[] = [];

  if (Array.isArray(src)) {
    const qualities = ["uhd", "hd"];
    videoDropdownItems = qualities
      .map((q) => {
        const file = src.find((v) => v.quality === q);
        if (!file) return null;
        return {
          label: `${q.toUpperCase()} ${file.width} X ${file.height}`,
          value: q,
          onclick: () => setSelectedSize(q),
        };
      })
      .filter(Boolean) as {
      label: string;
      value: string;
      onclick: () => void;
    }[];
  }

  const downloadImage = async () => {
    if (!src || !selectedSize) return;
    let Url = "";
    const size = selectedSize.toLowerCase();

    if (Array.isArray(src)) {
      const file = src.find((v) => v.quality === size);
      if (file) Url = file.link;
    } else {
      if (size === "original (full resolution)") {
        Url = src.original;
      } else if (size === "large") {
        Url = src.large;
      } else if (size === "portrait") {
        Url = src.portrait;
      } else if (size === "landscape") {
        Url = src.landscape;
      } else {
        Url = src.original;
      }
    }

    handleDownload({ url: Url, onStart: openThanks });
  };

  const dropdownItems = Array.isArray(src)
    ? videoDropdownItems
    : photoDropdownItems;

  return (
    <div ref={ref} className="relative flex items-center">
      <button
        onClick={() => downloadImage()}
        className="cursor-pointer rounded-l-lg bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600"
      >
        Free Download
      </button>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex cursor-pointer items-center justify-center rounded-r-lg bg-green-500 p-2 transition-colors ${isOpen && "bg-green-600"}`}
      >
        <ChevronDown
          className={`text-white transition-transform ${isOpen && "rotate-180"}`}
        />
      </button>
      <div className="absolute top-full left-0 pt-2">
        <ul
          className={`z-10 w-70 space-y-2 rounded-2xl bg-white p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition-all ${isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"}`}
        >
          <span className="flex w-full items-center rounded-md p-2 font-semibold text-gray-700">
            Choose a size
          </span>
          {dropdownItems.map(({ label, value, onclick }) => (
            <li
              key={label}
              onClick={onclick}
              className={`flex w-full cursor-pointer items-center justify-between rounded-md p-2 ${selectedSize === value && "bg-gray-100 font-semibold"}`}
            >
              <span>{label}</span>
              {selectedSize === value && <Check className="text-green-600" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DownloadMenu;
