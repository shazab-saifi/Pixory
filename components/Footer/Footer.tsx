import Image from "next/image";
import { pixory } from "@/lib/import";
import QueryButton from "./QueryButton";

const Footer = () => {
  const commonClasses = "text-gray-500 uppercase font-semibold my-2 sm:my-4";

  const ulItems1 = [
    "Free Stock Photos",
    "Free Videos",
    "Popular searches",
    "Collections",
    "Challenges",
    "Leaderboard",
    "Other plugins & apps",
  ];

  const ulItems2 = [
    "About",
    "Blog",
    "Help Center",
    "Report content",
    "Become a Hero",
    "Partner with Pexels",
    "Image & Video API",
  ];

  const buttonItems = [
    {
      query: "black and white",
      lebel: "Black and white Images",
    },
    {
      query: "happy birthday",
      lebel: "Happy Birthday Images",
    },
    {
      query: "new year",
      lebel: "New Year Images",
    },
    {
      query: "birds",
      lebel: "Birds Images",
    },
    {
      query: "new york",
      lebel: "New York Images",
    },
    {
      query: "nature",
      lebel: "Nature Images",
    },
    {
      query: "love wallpaper",
      lebel: "Love Wallpaper",
    },
    {
      query: "4k wallpaper",
      lebel: "4k Wallpaper",
    },
    {
      query: "samsung wallpaper",
      lebel: "Samsung Wallpaper",
    },
    {
      query: "iphone wallpaper",
      lebel: "iphone Wallpaper",
    },
    {
      query: "galaxy wallpaper",
      lebel: "Galaxy Wallpaper",
    },
    {
      query: "cool wallpaper",
      lebel: "Cool Wallpaper",
    },
  ];

  return (
    <div className="w-full space-y-8 bg-gray-50">
      <div className="space-y-8 p-4 lg:flex lg:gap-10 lg:px-20 lg:py-12 xl:justify-between xl:px-40">
        <div className="flex flex-col gap-6 xl:gap-10">
          <Image src={pixory} alt="Logo" className="w-[100px]" />
          <h1 className="text-2xl font-semibold text-wrap xl:text-4xl">
            Where stories come
            <br /> together.
          </h1>
        </div>
        <div className="space-y-8 lg:flex lg:gap-10 xl:gap-30">
          <div>
            <h1 className={commonClasses}>Free Stock Photos</h1>
            <div className="flex flex-wrap gap-2 lg:w-[300px] xl:w-[400px]">
              {buttonItems.map(({ lebel, query }) => (
                <QueryButton key={lebel} query={query}>
                  {lebel}
                </QueryButton>
              ))}
            </div>
          </div>
          <div className="block space-y-8 sm:flex sm:gap-30 md:gap-50 lg:gap-10 xl:gap-30">
            <ul>
              <li className={commonClasses}>Pixory</li>
              {ulItems1.map((item) => (
                <li key={item} className="pb-1 font-semibold sm:pb-2">
                  {item}
                </li>
              ))}
            </ul>
            <ul>
              <li className={commonClasses}>Company</li>
              {ulItems2.map((item) => (
                <li key={item} className="pb-1 font-semibold sm:pb-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t-2 pt-4 text-center">@ 2025 Pixory</div>
    </div>
  );
};

export default Footer;
