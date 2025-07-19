import Button from "@/components/Button";
import Navbar2 from "@/components/Navbar/Navbar2";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import HeroSection from "@/components/Advertise/HeroSection";
import WhyAdvertise from "@/components/Advertise/WhyAdvertise";
import Marquee from "react-fast-marquee";
import { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

interface Testimonial {
  name: string;
  avatar: string;
  review: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Johnson",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=80&h=80&fit=crop",
    review:
      "Pixory helped us reach a creative audience that truly cares about visuals. Our campaign engagement doubled, and we received valuable feedback from designers and creators who love our brand. The platform's seamless integration made the whole process effortless.",
    stars: 5,
  },
  {
    name: "Maria Chen",
    avatar:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&w=80&h=80&fit=crop",
    review:
      "The native ad integration is seamless. We saw a real boost in brand awareness and conversions. Our ads blended perfectly with the content, and the support team was always available to help us optimize our campaigns for the best results.",
    stars: 5,
  },
  {
    name: "David Kim",
    avatar:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&w=80&h=80&fit=crop",
    review:
      "Super easy to launch and manage ads. The support team is fantastic! We were able to reach our target audience quickly, and the analytics dashboard gave us all the insights we needed to improve our strategy and maximize ROI.",
    stars: 4,
  },
  {
    name: "Sophie Dubois",
    avatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&w=80&h=80&fit=crop",
    review:
      "Our startup got noticed by thousands of creators. Highly recommend Pixory for any brand looking to make an impact in the creative community. The exposure and engagement we received exceeded our expectations.",
    stars: 5,
  },
  {
    name: "Carlos Ramirez",
    avatar:
      "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&w=80&h=80&fit=crop",
    review:
      "We were amazed by the reach and quality of leads we got through Pixory. The creative community is vibrant and responsive, and our brand message was delivered in a way that felt authentic and engaging.",
    stars: 5,
  },
  {
    name: "Priya Singh",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=80&h=80&fit=crop",
    review:
      "Pixory's platform is intuitive and powerful. Our campaign results were outstanding, and the ability to target such a creative audience made all the difference for our product launch.",
    stars: 5,
  },
  {
    name: "Liam O'Connor",
    avatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&w=80&h=80&fit=crop",
    review:
      "The analytics and reporting tools are top-notch. We could see exactly how our ads were performing and make adjustments in real time. Highly recommend Pixory for any marketing team.",
    stars: 4,
  },
  {
    name: "Fatima Al-Farsi",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&w=80&h=80&fit=crop",
    review:
      "Our brand was able to connect with a global audience of creators and professionals. The feedback and engagement we received were beyond our expectations. Pixory is a must for creative brands.",
    stars: 5,
  },
  {
    name: "Tom Müller",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&w=80&h=80&fit=crop",
    review:
      "Launching our campaign on Pixory was a breeze. The support team guided us every step of the way, and the results spoke for themselves. We saw a significant increase in both traffic and conversions.",
    stars: 5,
  },
  {
    name: "Aisha Bello",
    avatar:
      "https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&w=80&h=80&fit=crop",
    review:
      "Pixory's creative-first approach is exactly what we needed. Our ads felt like a natural part of the platform, and the audience responded with enthusiasm. We'll definitely use Pixory again.",
    stars: 5,
  },
  {
    name: "Lucas Rossi",
    avatar:
      "https://images.pexels.com/photos/1707826/pexels-photo-1707826.jpeg?auto=compress&w=80&h=80&fit=crop",
    review:
      "The diversity and creativity of Pixory's user base helped us reach new markets. The platform's targeting options are robust, and the campaign setup was quick and easy.",
    stars: 4,
  },
  {
    name: "Emily Carter",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&w=80&h=80&fit=crop",
    review:
      "From the moment we launched our campaign, we saw immediate engagement. Pixory's tools made it simple to track our progress and optimize for even better results. Fantastic experience!",
    stars: 5,
  },
];

export const metadata: Metadata = {
  title: "Advertise your business with Pixory",
  description:
    "Promote your brand to a creative, engaged audience on Pixory. Launch visually integrated ad campaigns and connect with millions of creators worldwide.",
};

const page = () => {
  return (
    <div
      className={`min-h-screen w-full space-y-32 md:space-y-42 xl:space-y-52 2xl:space-y-62 ${montserrat.variable}`}
    >
      <Navbar2 />
      <HeroSection />
      <WhyAdvertise />
      {/* Grid section */}
      <div className="hidden aspect-[16/9] w-full grid-cols-2 gap-2 px-4 text-white md:grid md:gap-4 xl:px-40 2xl:px-90">
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="h-[80%] rounded-xl bg-[url(/image1.svg)] bg-cover p-6 lg:rounded-3xl">
            <h2 className="mb-1 text-[26px]">Creative Audience</h2>
            <p>Engage designers, creators, and storytellers.</p>
          </div>
          <div className="h-[20%] rounded-xl bg-[url(/image5.svg)] bg-cover p-6 lg:rounded-3xl">
            <h2 className="mb-1 text-[26px]">High Engagement</h2>
            <p>Visual-first users who actually interact.</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="h-[50%] rounded-xl bg-[url(/image2.svg)] bg-cover p-6 lg:rounded-3xl">
            <h2 className="mb-1 text-[26px]">Native Integration</h2>
            <p>Ads that blend naturally with content.</p>
          </div>
          <div className="flex flex-1 gap-2 md:gap-4">
            <div className="h-full w-full rounded-xl bg-[url(/image3.svg)] bg-cover p-6 lg:rounded-3xl">
              <p>Launch and manage ads in minutes.</p>
            </div>
            <div className="h-full w-full rounded-xl bg-[url(/image4.svg)] bg-cover p-6 lg:rounded-3xl">
              <p>Drive results without disrupting the experience.</p>
            </div>
          </div>
          <div className="h-[20%] rounded-xl bg-[url(/image6.svg)] bg-cover p-6 lg:rounded-3xl">
            <h2 className="mb-1 text-[26px]">Trusted by Brands</h2>
            <p>From startups to global campaigns.</p>
          </div>
        </div>
      </div>
      {/* Campaign */}
      <div className="mx-4 flex max-w-full flex-col justify-between gap-20 rounded-2xl bg-gray-100 p-4 md:flex-row md:gap-30 md:p-6 xl:mx-40 2xl:mx-90">
        <div className="flex min-h-full flex-col items-baseline-last justify-between gap-8 md:gap-0 md:p-4">
          <div className="space-y-4 md:space-y-8">
            <h1 className="text-2xl font-medium md:text-4xl">
              Launch Your Campaign And thrive your business
            </h1>
            <p>
              Connect with millions of creatives worldwide through high-impact,
              visually integrated ad experiences.
            </p>
          </div>
          <Button>Launch Now</Button>
        </div>
        <div className="aspect-square w-[300px] rounded-2xl bg-[url(/ad.jpg)] bg-cover bg-no-repeat md:w-[400px]"></div>
      </div>
      {/* Testimonials marquee */}
      <div className="relative flex w-full flex-col gap-8 overflow-x-auto py-8 md:overflow-hidden">
        {/* Mobile/Small screens: horizontal scroll, no marquee */}
        <div
          className="flex gap-4 px-2 md:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {testimonials.map(({ name, avatar, review, stars }, idx) => (
            <div
              key={name + idx}
              className="relative mx-1 flex max-w-[320px] min-w-[260px] shrink-0 flex-col justify-between rounded-3xl bg-gray-100 p-4 transition-shadow hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            >
              <div className="mb-2 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < stars
                        ? "text-2xl text-yellow-400"
                        : "text-2xl text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="max-w-full text-sm text-wrap text-gray-600">{`"${review}"`}</p>
              <div className="mt-4 flex items-center gap-2">
                <Image
                  src={avatar}
                  alt="avatar"
                  width={24}
                  height={24}
                  className="size-8 rounded-full"
                />
                <p className="text-sm text-gray-500">{name}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop/Medium+ screens: marquee effect */}
        <div className="hidden flex-col gap-8 mask-r-from-85% mask-r-to-90% mask-l-from-85% mask-l-to-90% md:flex">
          <Marquee pauseOnHover>
            {[...testimonials, ...testimonials].map(
              ({ name, avatar, review, stars }, idx) => (
                <div
                  key={name + idx}
                  className="relative mx-2 flex h-[220px] max-w-[400px] min-w-[320px] flex-col justify-between overflow-hidden rounded-3xl bg-gray-100 p-4 transition-shadow hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                  style={{ height: 220, minHeight: 220, maxHeight: 220 }}
                >
                  <div className="mb-2 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < stars
                            ? "text-2xl text-yellow-400"
                            : "text-2xl text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="line-clamp-4 max-w-full flex-1 overflow-hidden text-sm text-wrap text-ellipsis text-gray-600">{`"${review}"`}</p>
                  <div className="mt-8 flex items-center gap-2">
                    <Image
                      src={avatar}
                      alt="avatar"
                      width={24}
                      height={24}
                      className="size-8 rounded-full"
                    />
                    <p className="text-sm text-gray-500">{name}</p>
                  </div>
                </div>
              ),
            )}
          </Marquee>
          <Marquee pauseOnHover direction="right">
            {[...testimonials, ...testimonials].map(
              ({ name, avatar, review, stars }, idx) => (
                <div
                  key={name + idx}
                  className="relative mx-2 flex h-[220px] max-w-[400px] min-w-[320px] flex-col justify-between overflow-hidden rounded-3xl bg-gray-100 p-4 transition-shadow hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                  style={{ height: 220, minHeight: 220, maxHeight: 220 }}
                >
                  <div className="mb-2 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < stars
                            ? "text-2xl text-yellow-400"
                            : "text-2xl text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="line-clamp-4 max-w-full flex-1 overflow-hidden text-sm text-wrap text-ellipsis text-gray-600">{`"${review}"`}</p>
                  <div className="mt-8 flex items-center gap-2">
                    <Image
                      src={avatar}
                      alt="avatar"
                      width={24}
                      height={24}
                      className="size-8 rounded-full"
                    />
                    <p className="text-sm text-gray-500">{name}</p>
                  </div>
                </div>
              ),
            )}
          </Marquee>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
