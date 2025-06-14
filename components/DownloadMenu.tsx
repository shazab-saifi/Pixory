import { PhotoURLsTypes, VideoFile } from "@/lib/types"
import { handleDownload } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react"
import { useState } from "react"

const DownloadMenu = ({ src }: { src: PhotoURLsTypes | VideoFile[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>();

  const photoDropdownItems = [
    {
      label: 'Original (full resolution)',
      value: 'Original (full resolution)',
      onclick: () => setSelectedSize('Original (full resolution)'),
    },
    {
      label: 'Large',
      value: 'Large',
      onclick: () => setSelectedSize('Large'),
    },
    {
      label: 'Portrait',
      value: 'Portrait',
      onclick: () => setSelectedSize('Portrait'),
    },
    {
      label: 'Landscape',
      value: 'Landscape',
      onclick: () => setSelectedSize('Landscape'),
    },
  ];

  let videoDropdownItems: { label: string, value: string, onclick: () => void }[] = [];

  if (Array.isArray(src)) {
    const qualities = ["uhd", "hd"]
    videoDropdownItems = qualities
    .map(q => {
      const file = src.find(v => v.quality === q);
      if (!file) return null;
      return {
        label: `${q.toUpperCase()} ${file.width} X ${file.height}`,
        value: q,
        onclick: () => setSelectedSize(q)
      }
    })
    .filter(Boolean) as { label: string, value: string, onclick: () => void }[];
  }

  const downloadImage = async () => {
    if (!src || !selectedSize) return;
    let Url = '';
    const size = selectedSize.toLowerCase();

    if (Array.isArray(src)) {
      const file = src.find(v => v.quality === size);
      if (file) Url = file.link
    } else {
      if (size === 'original (full resolution)') {
        Url = src.original;
      } else if (size === 'large') {
        Url = src.large;
      } else if (size === 'portrait') {
        Url = src.portrait;
      } else if (size === 'landscape') {
        Url = src.landscape;
      } else {
        Url = src.original;
      }
    }

    handleDownload({ url: Url });
  }

  const dropdownItems = Array.isArray(src) ? videoDropdownItems : photoDropdownItems;

  return (
    <div className="relative flex items-center">
      <button onClick={() => downloadImage()} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-l-lg cursor-pointer">Free Download</button>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`p-2 bg-green-500 flex items-center transition-colors rounded-r-lg cursor-pointer justify-center ${isOpen && 'bg-green-600'}`}
      >
        <ChevronDown className={`transition-transform text-white ${isOpen && 'rotate-180'}`} />
      </div>
      <div className="pt-2 absolute top-full left-0">
        <ul className={`w-70 bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-2xl p-2 space-y-2 transition-all z-10 ${isOpen ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-90"}`}>
          <span className="w-full p-2 rounded-md flex items-center font-semibold text-gray-700">Choose a size</span>
          {dropdownItems.map(({ label, value, onclick }) => (
            <li
              key={label}
              onClick={onclick}
              className={`w-full p-2 rounded-md flex cursor-pointer justify-between items-center ${selectedSize === value && 'bg-gray-100 font-semibold'}`}
            >
              <span>{label}</span>
              {selectedSize === value && <Check className="text-green-600" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DownloadMenu