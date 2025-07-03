import Button from "@/components/Button";
import Navbar2 from "@/components/Navbar/Navbar2";
import { Montserrat } from 'next/font/google';
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import HeroSection from "@/components/Advertise/HeroSection";
import WhyAdvertise from "@/components/Advertise/WhyAdvertise";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700']
});

interface Testimonial {
  name: string;
  avatar: string;
  review: string;
  stars: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Alex Johnson",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=80&h=80&fit=crop",
    review: "Pixory helped us reach a creative audience that truly cares about visuals. Our campaign engagement doubled, and we received valuable feedback from designers and creators who love our brand. The platform's seamless integration made the whole process effortless.",
    stars: 5
  },
  {
    name: "Maria Chen",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&w=80&h=80&fit=crop",
    review: "The native ad integration is seamless. We saw a real boost in brand awareness and conversions. Our ads blended perfectly with the content, and the support team was always available to help us optimize our campaigns for the best results.",
    stars: 5
  },
  {
    name: "David Kim",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&w=80&h=80&fit=crop",
    review: "Super easy to launch and manage ads. The support team is fantastic! We were able to reach our target audience quickly, and the analytics dashboard gave us all the insights we needed to improve our strategy and maximize ROI.",
    stars: 4
  },
  {
    name: "Sophie Dubois",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&w=80&h=80&fit=crop",
    review: "Our startup got noticed by thousands of creators. Highly recommend Pixory for any brand looking to make an impact in the creative community. The exposure and engagement we received exceeded our expectations.",
    stars: 5
  },
  {
    name: "Carlos Ramirez",
    avatar: "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&w=80&h=80&fit=crop",
    review: "We were amazed by the reach and quality of leads we got through Pixory. The creative community is vibrant and responsive, and our brand message was delivered in a way that felt authentic and engaging.",
    stars: 5
  },
  {
    name: "Priya Singh",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=80&h=80&fit=crop",
    review: "Pixory's platform is intuitive and powerful. Our campaign results were outstanding, and the ability to target such a creative audience made all the difference for our product launch.",
    stars: 5
  },
  {
    name: "Liam O'Connor",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&w=80&h=80&fit=crop",
    review: "The analytics and reporting tools are top-notch. We could see exactly how our ads were performing and make adjustments in real time. Highly recommend Pixory for any marketing team.",
    stars: 4
  },
  {
    name: "Fatima Al-Farsi",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&w=80&h=80&fit=crop",
    review: "Our brand was able to connect with a global audience of creators and professionals. The feedback and engagement we received were beyond our expectations. Pixory is a must for creative brands.",
    stars: 5
  },
  {
    name: "Tom Müller",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&w=80&h=80&fit=crop",
    review: "Launching our campaign on Pixory was a breeze. The support team guided us every step of the way, and the results spoke for themselves. We saw a significant increase in both traffic and conversions.",
    stars: 5
  },
  {
    name: "Aisha Bello",
    avatar: "https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&w=80&h=80&fit=crop",
    review: "Pixory's creative-first approach is exactly what we needed. Our ads felt like a natural part of the platform, and the audience responded with enthusiasm. We'll definitely use Pixory again.",
    stars: 5
  },
  {
    name: "Lucas Rossi",
    avatar: "https://images.pexels.com/photos/1707826/pexels-photo-1707826.jpeg?auto=compress&w=80&h=80&fit=crop",
    review: "The diversity and creativity of Pixory's user base helped us reach new markets. The platform's targeting options are robust, and the campaign setup was quick and easy.",
    stars: 4
  },
  {
    name: "Emily Carter",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&w=80&h=80&fit=crop",
    review: "From the moment we launched our campaign, we saw immediate engagement. Pixory's tools made it simple to track our progress and optimize for even better results. Fantastic experience!",
    stars: 5
  }
];

const page = () => {
  return (
    <div className={`w-full min-h-screen space-y-32 md:space-y-42 xl:space-y-52 2xl:space-y-62 ${montserrat.variable}`}>
      <Navbar2 />
      <HeroSection />
      <WhyAdvertise />
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
      <div className="max-w-full flex flex-col md:flex-row justify-between gap-20 md:gap-30 rounded-2xl bg-gray-100 p-4 md:p-6 mx-4 xl:mx-40 2xl:mx-90">
        <div className="min-h-full flex flex-col justify-between items-baseline-last md:p-4 gap-8 md:gap-0">
          <div className="md:space-y-8 space-y-4">
            <h1 className="text-2xl md:text-4xl font-medium">Launch Your Campaign And thrive your business</h1>
            <p>Connect with millions of creatives worldwide through high-impact, visually integrated ad experiences.</p>
          </div>
          <Button>Launch Now</Button>
        </div>
        <div className="bg-[url(/ad.jpg)] bg-cover bg-no-repeat rounded-2xl aspect-square w-[300px] md:w-[400px]"></div>
      </div>
      {/* Testimonials marquee */}
      <div className="relative w-full overflow-x-auto md:overflow-hidden flex flex-col gap-8 py-8">
        {/* Mobile/Small screens: horizontal scroll, no marquee */}
        <div className="flex gap-4 md:hidden px-2" style={{ WebkitOverflowScrolling: 'touch' }}>
          {testimonials.map(({ name, avatar, review, stars }, idx) => (
            <div
              key={name + idx}
              className="relative rounded-3xl bg-gray-100 p-4 transition-shadow hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col justify-between min-w-[260px] max-w-[320px] mx-1 shrink-0"
            >
              <div className="flex gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < stars ? "text-yellow-400 text-2xl" : "text-gray-300 text-2xl"}>★</span>
                ))}
              </div>
              <p className="text-sm text-gray-600 text-wrap max-w-full">{`"${review}"`}</p>
              <div className="flex gap-2 items-center mt-4">
                <Image src={avatar} alt="avatar" width={24} height={24} className="size-8 rounded-full" />
                <p className="text-sm text-gray-500">{name}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop/Medium+ screens: marquee effect */}
        <div className="hidden md:flex flex-col gap-8">
          <div className="flex animate-marquee gap-8">
            {[...testimonials, ...testimonials].map(({ name, avatar, review, stars }, idx) => (
              <div
                key={name + idx}
                className="relative rounded-3xl bg-gray-100 p-4 transition-shadow hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col justify-between min-w-[320px] max-w-[400px] mx-2"
              >
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < stars ? "text-yellow-400 text-2xl" : "text-gray-300 text-2xl"}>★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 text-wrap max-w-full">{`"${review}"`}</p>
                <div className="flex gap-2 items-center mt-4">
                  <Image src={avatar} alt="avatar" width={24} height={24} className="size-8 rounded-full" />
                  <p className="text-sm text-gray-500">{name}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex animate-reverse-marquee gap-8">
            {[...testimonials, ...testimonials].map(({ name, avatar, review, stars }, idx) => (
              <div
                key={name + idx}
                className="relative rounded-3xl bg-gray-100 p-4 transition-shadow hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col justify-between min-w-[320px] max-w-[400px] mx-2"
              >
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < stars ? "text-yellow-400 text-2xl" : "text-gray-300 text-2xl"}>★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 text-wrap max-w-full">{`"${review}"`}</p>
                <div className="flex gap-2 items-center mt-4">
                  <Image src={avatar} alt="avatar" width={24} height={24} className="size-8 rounded-full" />
                  <p className="text-sm text-gray-500">{name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page