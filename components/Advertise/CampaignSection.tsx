"use client";

import React from "react";
import Button from "../Button";
import { motion } from "motion/react";

export const CampaignSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="mx-4 flex max-w-full flex-col justify-between gap-20 rounded-2xl bg-gray-100 p-4 md:flex-row md:gap-30 md:p-6 xl:mx-40 2xl:mx-90"
    >
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
    </motion.div>
  );
};
