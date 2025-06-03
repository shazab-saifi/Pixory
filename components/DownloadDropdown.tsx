import { PhotoURLsTypes } from "@/lib/types"
import { ChevronDown, Check } from "lucide-react"
import { useState } from "react"

const DownloadDropdown = ({ src }: { src: PhotoURLsTypes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('Original (full resolution)');

  const dropdownItems = [
    {
      label: 'Choose a size'
    },
    {
      label: 'Original (full resolution)',
      onclick: () => setSelectedSize('Original (full resolution)'),
    },
    {
      label: 'Large',
      onclick: () => setSelectedSize('Large'),
    },
    {
      label: 'Portrait',
      onclick: () => setSelectedSize('Portrait'),
    },
    {
      label: 'Landscape',
      onclick: () => setSelectedSize('Landscape'),
    },
  ];

  const downloadImage = async () => {
    if (!src) return;
    let imageUrl = '';
    const size = selectedSize.toLowerCase();
    if (size === 'original (full resolution)') {
      imageUrl = src.original;
    } else if (size === 'large') {
      imageUrl = src.large;
    } else if (size === 'portrait') {
      imageUrl = src.portrait;
    } else if (size === 'landscape') {
      imageUrl = src.landscape;
    } else {
      imageUrl = src.original;
    }

    const image = await fetch(imageUrl);
    const imageBlob = await image.blob();
    const imageURL = URL.createObjectURL(imageBlob);

    let link = document.createElement('a');
    link.href = imageURL;
    link.download = 'downloaded-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
          {dropdownItems.map(({ label, onclick }) => (
            <li
              key={label}
              onClick={onclick}
              className={`w-full p-2 rounded-md flex justify-between items-center ${selectedSize === label && 'bg-gray-100 font-semibold'}`}
            >
              <span>{label}</span>
              {selectedSize === label && <Check className="text-green-600" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DownloadDropdown