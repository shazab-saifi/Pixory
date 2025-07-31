import { X } from "lucide-react";
import React from "react";

const CloseButton = ({ handlerFn }: { handlerFn: () => void }) => {
  return (
    <button
      onClick={handlerFn}
      className="group absolute top-4 right-4 z-50 cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100"
    >
      <X className="size-5 text-gray-400 transition-colors group-hover:text-gray-600" />
    </button>
  );
};

export default CloseButton;
