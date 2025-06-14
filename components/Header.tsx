import { getHeroImage } from "@/lib/getHeroImage"
import HeroSection from "./HeroSection"
import Navbar from "./Navbar"

const Header = async () => {
    const { imageUrl } = await getHeroImage();

    return (
        <div
            style={{
                position: "relative",
                backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0" ></div>
            <Navbar />
            <HeroSection />
        </div>
    )
}

export default Header