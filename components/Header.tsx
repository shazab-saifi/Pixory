import { getHeroImage } from "@/lib/getHeroImage";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar/Navbar";
import Image from "next/image";

const Header = async () => {
  const { imageUrl } = await getHeroImage();

  return (
    <div className="relative w-full">
      <Image
        src={imageUrl}
        alt="hero image"
        width={900}
        height={500}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute top-0 left-0 z-0 h-full w-full bg-black/40"></div>
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Header;
