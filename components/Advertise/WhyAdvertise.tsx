"use client"

import Image from "next/image";
import { customerCard, reviewCard } from "@/lib/import";
import { motion } from "motion/react"

export default function WhyAdvertise() {
    return (
        <section className="w-full flex flex-col lg:flex-row gap-10 md:gap-20 items-center px-4 xl:px-40 2xl:px-90">
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
                <motion.div
                    initial={{ opacity: 0, rotate: 90 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="z-10"
                >
                    <Image
                        src={customerCard}
                        width={300}
                        height={400}
                        alt="our customers"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, rotate: -90 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="z-20 -ml-[35px] mt-20"
                >
                    <Image
                        src={reviewCard}
                        width={300}
                        height={400}
                        alt="users review"
                    />
                </motion.div>
            </div>
        </section>
    );
}