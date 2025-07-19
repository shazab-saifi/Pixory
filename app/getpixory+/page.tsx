import Footer from "@/components/Footer/Footer";
import FAQ from "@/components/GetPixory+/FAQ";
import Pricing from "@/components/GetPixory+/Pricing";
import Navbar2 from "@/components/Navbar/Navbar2";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Pixory+ | Pixory",
  description:
    "Unlock premium features and exclusive benefits with Pixory+. Choose the best plan for your creative needs.",
};

const page = () => {
  return (
    <div className="h-full w-full space-y-10 py-25 xl:py-40">
      <Navbar2 />
      <div className="flex w-full flex-col items-center font-semibold lg:gap-2 xl:mb-30 xl:gap-4">
        <h1 className="text-2xl lg:text-3xl xl:text-5xl">Get Pixory+</h1>
        <h2 className="text-sm lg:text-lg xl:text-2xl">
          Choose the best plan for you
        </h2>
      </div>
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};

export default page;
