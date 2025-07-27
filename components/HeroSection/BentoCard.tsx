"use client";

import { useRouter } from "next/navigation";

const BentoCard = ({
  image,
  label,
  spanCols = false,
}: {
  image: string;
  label: string;
  spanCols?: boolean;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`search?query=${label.toLowerCase()}`)}
      className={`group relative cursor-pointer overflow-hidden rounded-xl ${spanCols ? "col-span-2" : ""}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10 flex h-full items-end p-2 text-white">
        <span className="translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {label}
        </span>
      </div>
    </div>
  );
};

export default BentoCard;
