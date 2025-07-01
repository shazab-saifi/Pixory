// TODO: Design this page and then code it. should be completed today

import Button from "@/components/Button";
import Navbar2 from "@/components/Navbar/Navbar2";
import { Rocket } from "lucide-react";
import { Montserrat } from 'next/font/google';
import arrow from '@/public/arrow.svg';
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import { heroImage1,
  heroImage2,
  heroImage3,
  heroImage4,
  heroImage5,
  customerCard,
  reviewCard,
  roundArrow,
} from "@/lib/import";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700']
});

const page = () => {
  return (
    <div className={`w-full min-h-screen space-y-32 md:space-y-42 xl:space-y-52 2xl:space-y-62 ${montserrat.variable}`}>
      <Navbar2 />
      {/* Hero section */}
      <div className="px-6 xl:px-20 mt-24 lg:mt-32 xl:mt-48">
        <div className="space-y-4 lg:space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-semibold text-center lg:leading-18">Advertise Where Creators<br className="hidden md:block" /> Discover and Engage</h1>
          <h4 className="text-base md:text-xl text-center">Tap into a high-intent audience of millions searching for stunning visuals.<br className="hidden md:block" /> Drive real results through native and targeted placements.</h4>
        </div>
        <div className="relative flex justify-center py-10 md:py-8">
          <Button className="relative space-x-2 font-semibold">
            <Image
              className="absolute top-4 -left-52 hidden md:block"
              width={300}
              height={50}
              src={arrow}
              alt="arrow svg"
            />
            <Rocket size={18} />
            <span>Advertise your idea</span>
          </Button>
          <Image
            className="absolute top-4 opacity-70 md:hidden"
            width={230}
            height={50}
            src={roundArrow}
            alt="arrow svg"
          />
        </div>
        <div className="flex items-center justify-center pt-8 md:pt-20">
          <div className="z-10">
            <Image
              src={heroImage5}
              width={300}
              height={400}
              alt="image5"
            />
          </div>
          <div className="z-20 -ml-[75px]">
            <Image
              src={heroImage4}
              width={300}
              height={400}
              alt="image4"
            />
          </div>
          <div className="z-30 -ml-[75px]">
            <Image
              src={heroImage1}
              width={300}
              height={400}
              alt="image1"
            />
          </div>
          <div className="z-20 -ml-[75px]">
            <Image
              src={heroImage2}
              width={300}
              height={400}
              alt="image2"
            />
          </div>
          <div className="z-10 -ml-[75px]">
            <Image
              src={heroImage3}
              width={300}
              height={400}
              alt="image3"
            />
          </div>
        </div>
      </div>
      {/* Why Advertise With Us section */}
      <div className="w-full flex flex-col lg:flex-row gap-10 md:gap-20 items-center px-4 xl:px-40 2xl:px-90">
        <div className="space-y-8 md:space-y-12 w-full md:w-auto">
          <div className="flex items-center gap-8">
            <h2 className="text-2xl md:text-4xl font-medium">Why Advertise With Us</h2>
            <div className="w-[100px] h-[2px] bg-black rounded-full"></div>
          </div>
          <p className="text-base md:text-xl">
            Our platform boasts a large and deeply engaged user base made up of creators, professionals, and everyday users who are visually driven and highly interactive. With millions of daily content views and meaningful engagements, it provides advertisers with exceptional visibility in a trusted, brand-safe environment. Whether you're looking to build awareness or drive conversions, our global creative community offers the perfect space to share your story, connect with the right audience, and achieve impactful results.
          </p>
        </div>
        <div className="flex shrink-0">
          <div className="z-10">
            <Image
              src={customerCard}
              width={300}
              height={400}
              alt="our customers"
            />
          </div>
          <div className="z-20 -ml-[35px] mt-20">
            <Image
              src={reviewCard}
              width={300}
              height={400}
              alt="users review"
            />
          </div>
        </div>
      </div>
      {/* Grid section */}
      <div className="hidden w-full aspect-[16/9] px-4 xl:px-40 2xl:px-90 md:grid grid-cols-2 gap-2 md:gap-4 text-white">
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="h-[80%] bg-[url(/image1.svg)] bg-cover rounded-xl lg:rounded-3xl p-6">
            <h2 className="text-[26px] mb-1">Creative Audience</h2>
            <p>Engage designers, creators, and storytellers.</p>
          </div>
          <div className="h-[20%] bg-[url(/image5.svg)] bg-cover rounded-xl lg:rounded-3xl p-6">
            <h2 className="text-[26px] mb-1">High Engagement</h2>
            <p>Visual-first users who actually interact.</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="h-[50%] bg-[url(/image2.svg)] bg-cover rounded-xl lg:rounded-3xl p-6">
            <h2 className="text-[26px] mb-1">Native Integration</h2>
            <p>Ads that blend naturally with content.</p>
          </div>
          <div className="flex gap-2 md:gap-4 flex-1">
            <div className="h-full w-full bg-[url(/image3.svg)] bg-cover rounded-xl lg:rounded-3xl p-6">
              <p>Launch and manage ads in minutes.</p>
            </div>
            <div className="h-full w-full bg-[url(/image4.svg)] bg-cover rounded-xl lg:rounded-3xl p-6">
              <p>Drive results without disrupting the experience.</p>
            </div>
          </div>
          <div className="h-[20%] bg-[url(/image6.svg)] bg-cover rounded-xl lg:rounded-3xl p-6">
            <h2 className="text-[26px] mb-1">Trusted by Brands</h2>
            <p>From startups to global campaigns.</p>
          </div>
        </div>
      </div>
      {/* Campaign */}
      <div>
        
      </div>
      <Footer />
    </div>
  );
}

export default page