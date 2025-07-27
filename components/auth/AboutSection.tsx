import Image from "next/image";
import React from "react";

const AboutSection = () => {
  return (
    <div className="relative hidden min-h-screen w-[50%] items-center justify-center lg:flex">
      <div className="pointer-events-none absolute inset-0 top-0 right-0 z-10 bg-black/20 backdrop-blur-xl" />
      <Image
        width={100}
        height={100}
        src="/bgImage.jpg"
        alt="sigin/signup page background image"
        className="absolute top-0 right-0 z-0 h-full w-full"
      />
      <div className="z-20 space-y-8">
        <video
          src="https://res.cloudinary.com/dgyxsjwuf/video/upload/v1753614609/pixoryDemo_kggpzb.mp4"
          muted
          playsInline
          loop
          autoPlay
          className="w-[500px] rounded-xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
        />
        <div className="max-w-[500px] rounded-2xl border border-black/10 bg-white p-10 shadow-xl backdrop-blur-md">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/10 shadow-md">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="12" fill="#000000" />
                <path
                  d="M7 17L17 7M7 7h10v10"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-black drop-shadow-sm">
              About <span className="text-black">Pixory</span>
            </h2>
          </div>
          <ul className="space-y-4 pl-0 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-black">
                <svg width="20" height="20" fill="none">
                  <circle cx="10" cy="10" r="8" fill="#000000" opacity="0.15" />
                  <circle cx="10" cy="10" r="4" fill="#000000" />
                </svg>
              </span>
              <span>
                {/*  */}
                <span className="font-semibold text-black">Pixory</span> is a
                free stock media platform inspired by sites like{" "}
                <span className="font-semibold text-black underline underline-offset-2">
                  Pexels.com
                </span>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-black">
                <svg width="20" height="20" fill="none">
                  <circle cx="10" cy="10" r="8" fill="#000000" opacity="0.15" />
                  <circle cx="10" cy="10" r="4" fill="#000000" />
                </svg>
              </span>
              <span>
                Browse and download{" "}
                <span className="font-semibold text-black">thousands</span> of
                high-quality photos and videos for personal and commercial use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-black">
                <svg width="20" height="20" fill="none">
                  <circle cx="10" cy="10" r="8" fill="#000000" opacity="0.15" />
                  <circle cx="10" cy="10" r="4" fill="#000000" />
                </svg>
              </span>
              <span>
                <span className="font-semibold text-black">
                  No attribution required
                </span>
                —use media in your projects, websites, or social media.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-black">
                <svg width="20" height="20" fill="none">
                  <circle cx="10" cy="10" r="8" fill="#000000" opacity="0.15" />
                  <circle cx="10" cy="10" r="4" fill="#000000" />
                </svg>
              </span>
              <span>
                Simple and{" "}
                <span className="font-semibold text-black">
                  intuitive interface
                </span>{" "}
                for searching and discovering beautiful content.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-black">
                <svg width="20" height="20" fill="none">
                  <circle cx="10" cy="10" r="8" fill="#000000" opacity="0.15" />
                  <circle cx="10" cy="10" r="4" fill="#000000" />
                </svg>
              </span>
              <span>
                All media is provided by talented creators and sourced from{" "}
                <span className="font-semibold text-black underline underline-offset-2">
                  Pexels
                </span>
                .
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
