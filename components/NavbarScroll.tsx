"use client";

import React, { useRef, useState } from "react";
import OptionsSection from "./OptionsSection";
import { useMotionValueEvent, useScroll, motion } from "motion/react";
import Navbar2 from "./Navbar/Navbar2";

const NavbarScroll = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 1) {
      setIsNavbarVisible(true);
    } else {
      setIsNavbarVisible(false);
    }
  });

  return (
    <div>
      <OptionsSection ref={ref} />
      {isNavbarVisible && <Navbar2 />}
    </div>
  );
};

export default NavbarScroll;
