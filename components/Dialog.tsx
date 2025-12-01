"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type DialogProps = {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  isOpen?: boolean;
  className?: string;
  setIsOpen?: (open: boolean) => void;
};

export const Dialog = ({
  children,
  isOpen: controlledIsOpen,
  className,
  setIsOpen: controlledSetIsOpen,
}: DialogProps) => {
  const [internalIsOpen, internalSetIsOpen] = useState(false);
  const isControlled =
    typeof controlledIsOpen === "boolean" &&
    typeof controlledSetIsOpen === "function";
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const setIsOpen = isControlled ? controlledSetIsOpen! : internalSetIsOpen;

  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen, setIsOpen]);

  console.log(isOpen);

  return (
    <div className="max-w-3xl">
      <div
        className="flex items-center justify-center"
        style={{ pointerEvents: "none", perspective: "1000px" }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                filter: "blur(6px)",
                opacity: 0,
                rotateY: "10deg",
                transformOrigin: "left center",
              }}
              animate={{
                filter: "blur(0px)",
                opacity: 1,
                rotateY: "0deg",
                transformOrigin: "left center",
              }}
              exit={{
                filter: "blur(6px)",
                opacity: 0,
                rotateY: "10deg",
                transformOrigin: "left center",
                transition: { duration: 0.3 },
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
                pointerEvents: "auto",
              }}
              ref={dialogRef}
              className={cn("relative", className)}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
