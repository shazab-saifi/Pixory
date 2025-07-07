"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  heroImage1,
  heroImage2,
  heroImage3,
  heroImage4,
  heroImage5,
} from "@/lib/import";
import arrow from "@/public/arrow.svg";
import roundArrow from "@/public/roundArrow.svg";
import { Rocket } from "lucide-react";
import Button from "../Button";

export default function HeroSection() {
  return (
    <section className="px-6 xl:px-20 mt-24 lg:mt-32 xl:mt-48">
      <div className="space-y-4 lg:space-y-6 z-20">
        <motion.h1
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className="text-4xl md:text-5xl lg:text-[64px] font-semibold text-center lg:leading-18"
        >
          Advertise Where Creators
          <br className="hidden md:block" /> Discover and Engage
        </motion.h1>
        <motion.h4
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
          className="text-base md:text-xl text-center"
        >
          Tap into a high-intent audience of millions searching for stunning
          visuals.
          <br className="hidden md:block" /> Drive real results through native
          and targeted placements.
        </motion.h4>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="relative flex justify-center py-10 md:py-8 z-20"
      >
        <Button className="relative space-x-2 font-semibold">
          <Image
            className="absolute top-4 -left-52 hidden md:block w-[200px] h-auto"
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
      </motion.div>
      <div className="relative flex items-center justify-center pt-8 md:pt-20">
        {/* Hero images animation group */}
        <div className="relative flex items-center justify-center">
          <motion.div
            className="z-10 -mr-[150px]"
            initial={{ opacity: 0, transform: "translateX(80%)", scale: 0.8 }}
            animate={{ opacity: 1, transform: "translateX(0)", scale: 1 }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.6 }}
          >
            <Image src={heroImage5} width={300} height={400} alt="image5" />
          </motion.div>
          <motion.div
            className="z-20 -mr-[75px]"
            initial={{ opacity: 0, transform: "translateX(80%)" }}
            animate={{ opacity: 1, transform: "translateX(0)" }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.3 }}
          >
            <Image src={heroImage4} width={300} height={400} alt="image4" />
          </motion.div>
          <motion.div
            className="z-30"
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0 }}
          >
            <Image src={heroImage1} width={300} height={400} alt="image1" />
          </motion.div>
          <motion.div
            className="z-20 -ml-[75px]"
            initial={{ opacity: 0, transform: "translateX(-80%)" }}
            animate={{ opacity: 1, transform: "translateX(0)" }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.3 }}
          >
            <Image src={heroImage2} width={300} height={400} alt="image2" />
          </motion.div>
          <motion.div
            className="z-10 -ml-[150px]"
            initial={{ opacity: 0, transform: "translateX(-80%)" }}
            animate={{ opacity: 1, transform: "translateX(0)" }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.6 }}
          >
            <Image src={heroImage3} width={300} height={400} alt="image3" />
          </motion.div>
        </div>
        <motion.img
          src="/Gradient.svg"
          alt="gradient"
          className="absolute -top-25 z-0"
          initial={{ opacity: 0, scale: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ease: "easeInOut", duration: 0.7 }}
        />
      </div>
    </section>
  );
}
