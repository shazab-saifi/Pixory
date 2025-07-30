import { X } from "lucide-react";
import React from "react";

const CloseButton = ({ handlerFn }: { handlerFn: () => void }) => {
  return (
    <button
      onClick={handlerFn}
      className="group absolute top-4 right-4 z-50 cursor-pointer rounded-lg p-2 text-white transition-colors hover:bg-gray-100"
    >
      <X className="size-5 text-white transition-colors sm:text-gray-400 sm:group-hover:text-gray-600" />
    </button>
  );
};

export default CloseButton;
