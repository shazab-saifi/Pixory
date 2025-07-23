import SearchBar from "./SearchBar";

const HeroSection = () => {
  return (
    <div className="relative flex w-full items-center justify-center px-4 py-28 sm:px-20 md:px-40">
      <div className="flex w-full flex-col items-center justify-center space-y-8 lg:max-w-[600px]">
        <div className="space-y-2 text-2xl font-semibold text-white text-shadow-lg md:text-3xl">
          <h2>Discover. Download. Inspire.</h2>
          <h2 className="text-wrap">
            Browse thousands of high-quality free photos for personal and
            commercial use.
          </h2>
        </div>
        <SearchBar />
      </div>
      <span className="text-shadow absolute right-4 bottom-4 text-[10px] text-white/70 sm:text-sm md:font-semibold">
        Media provided by
        <span className="font-bold text-white italic"> pexels</span>
      </span>
    </div>
  );
};

export default HeroSection;
