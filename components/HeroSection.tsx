import SearchBar from "./SearchBar";

const HeroSection = () => {
  return (
    <div className="relative flex w-full items-center justify-center px-4 py-32 sm:px-20 md:px-40">
      <div className="flex w-full flex-col items-center justify-center space-y-8 md:max-w-[650px]">
        <div className="space-y-2 text-white text-shadow-lg md:text-3xl">
          <h2 className="text-3xl font-semibold text-wrap lg:text-4xl">
            Stunning Free Photos & Videos for Every Creative Need
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
