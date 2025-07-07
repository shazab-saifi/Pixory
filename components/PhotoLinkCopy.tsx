import React, { useRef, useState } from "react";
import Button from "./Button";
import { Check, Copy } from "lucide-react";

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
          {!isCopied ? (
            <Copy className="h-5 w-5" />
          ) : (
            <Check className="text-green-600" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default PhotoLinkCopy;
