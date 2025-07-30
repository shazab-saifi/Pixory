import React from "react";

const SkeletonLoading = ({ str }: { str: string }) => {
  return (
    <div className="flex flex-col">
      <h1 className="my-6 px-4 text-2xl font-medium md:px-22 xl:px-52">
        Free Stock {str}
      </h1>
      <div className="grid h-full w-full grid-cols-2 grid-rows-1 gap-4 px-4 pb-4 md:grid-cols-3 md:gap-6 md:px-20 md:pb-6 xl:px-50">
        {[
          ...Array(
            typeof window !== "undefined" && window.innerWidth < 768 ? 4 : 3,
          ),
        ].map((_, idx) => (
          <div
            key={idx}
            role="status"
            className="flex h-full w-full animate-pulse flex-col space-y-3"
          >
            <div className="aspect-[9/14] w-full rounded-2xl bg-neutral-200 dark:bg-neutral-700" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoading;
