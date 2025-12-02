import React, { useRef, useState } from "react";
import Button from "./Button";
import { Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const PhotoLinkCopy = ({ photoURL }: { photoURL: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyLink = () => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(inputRef.current.value);
      setIsCopied(true);
    } else {
      return;
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <h3 className="mb-2 text-base font-semibold">Link</h3>
      <div className="flex w-full overflow-hidden rounded-lg bg-gray-50 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <input
          ref={inputRef}
          type="text"
          readOnly
          value={photoURL}
          className="flex-grow border-none bg-gray-50 px-4 py-2 text-sm outline-none sm:text-base"
        />
        <Button
          variant="secondary"
          size="md"
          onClick={() => copyLink()}
          className="w-14 shrink-0 rounded-none transition-colors hover:bg-gray-100 sm:w-16"
          aria-label="Copy link"
        >
          <AnimatePresence mode="wait" initial={false}>
            {!isCopied ? (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <Copy className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.svg
                key="check"
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  filter: "blur(4px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  filter: "blur(4px)",
                }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="var(--color-green-500)"
                className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );
};

export default PhotoLinkCopy;
