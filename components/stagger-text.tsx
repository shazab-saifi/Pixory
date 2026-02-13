"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const StaggerText = ({
  str,
  className,
  textClassName,
}: {
  str: string;
  className?: string;
  textClassName?: string;
}) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {str.split(" ").map((item, idx) => (
        <motion.p
          key={idx}
          initial={{ opacity: 0, filter: "blur(10px)", y: -4 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          className={cn(textClassName)}
        >
          {item}
        </motion.p>
      ))}
    </div>
  );
};

export default StaggerText;
