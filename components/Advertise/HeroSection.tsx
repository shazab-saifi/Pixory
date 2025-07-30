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
import { Rocket } from "lucide-react";
import Button from "../Button";

export default function HeroSection() {
  return (
    <section className="mt-24 px-6 lg:mt-32 xl:mt-48 xl:px-20">
      <div className="z-20 space-y-4 lg:space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className="text-center text-4xl font-semibold md:text-5xl lg:text-[64px] lg:leading-18"
        >
          Advertise Where Creators
          <br className="hidden md:block" /> Discover and Engage
        </motion.h1>
        <motion.h4
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
          className="text-center text-base md:text-xl"
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
        className="relative z-10 flex justify-center py-10 md:py-8"
      >
        <Button className="relative space-x-2 font-semibold">
          <Image
            className="absolute top-4 hidden md:-left-62 md:block md:min-w-[230px] lg:-left-68 lg:min-w-[250px] xl:-left-74 xl:min-w-[280px]"
            src={arrow}
            alt="arrow svg"
          />
          <Rocket size={18} />
          <span>Advertise your idea</span>
        </Button>
      </motion.div>
      <div className="relative flex items-center justify-center pt-4 md:pt-20">
        {/* Hero images animation group */}
        <div className="relative flex items-center justify-center">
          <motion.div
            className="z-1 hidden sm:-mr-20 sm:block md:-mr-[100px] lg:-mr-[150px]"
            initial={{
              opacity: 0,
              transform: "translateX(80%)",
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              transform: "translateX(0)",
              filter: "blur(0px)",
            }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.6 }}
          >
            <Image src={heroImage5} width={300} height={400} alt="image5" />
          </motion.div>
          <motion.div
            className="z-2 -mr-12 sm:-mr-10 md:-mr-[40px] lg:-mr-[75px]"
            initial={{
              opacity: 0,
              transform: "translateX(80%)",
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              transform: "translateX(0)",
              filter: "blur(0px)",
            }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.3 }}
          >
            <Image src={heroImage4} width={300} height={400} alt="image4" />
          </motion.div>
          <motion.div
            className="z-3"
            initial={{ opacity: 0, y: 120, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0 }}
          >
            <Image src={heroImage1} width={300} height={400} alt="image1" />
          </motion.div>
          <motion.div
            className="z-2 -ml-12 sm:-ml-10 md:-ml-[40px] lg:-ml-[75px]"
            initial={{
              opacity: 0,
              transform: "translateX(-80%)",
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              transform: "translateX(0)",
              filter: "blur(0px)",
            }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.3 }}
          >
            <Image src={heroImage2} width={300} height={400} alt="image2" />
          </motion.div>
          <motion.div
            className="z-1 hidden sm:-ml-20 sm:block md:-ml-[100px] lg:-ml-[150px]"
            initial={{
              opacity: 0,
              transform: "translateX(-80%)",
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              transform: "translateX(0)",
              filter: "blur(0px)",
            }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.6 }}
          >
            <Image src={heroImage3} width={300} height={400} alt="image3" />
          </motion.div>
        </div>
        <motion.img
          src="/Gradient.svg"
          alt="gradient"
          className="absolute -top-15 z-0 w-full md:-top-10 lg:-top-35 xl:-top-52"
          initial={{ opacity: 0, scale: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ease: "easeInOut", duration: 0.7 }}
        />
      </div>
    </section>
  );
}
