import BentoCard from "./HeroSection/BentoCard";
import SearchBar from "./SearchBar";

const cardsItems = [
  {
    label: "Nature",
    image:
      "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    label: "Colorful",
    image:
      "https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    label: "Wallpapers",
    image:
      "https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    spanCols: true,
  },
];

const HeroSection = () => {
  return (
    <div className="relative flex w-full justify-center px-4 pt-20 pb-24 md:px-20 2xl:px-24">
      <div className="flex w-full flex-col items-center justify-center gap-8 lg:flex-row xl:gap-12 2xl:gap-50">
        <div className="space-y-8">
          <div className="space-y-2 text-xl font-semibold text-white text-shadow-lg md:text-3xl">
            <h2 className="">Discover. Download. Inspire.</h2>
            <h2 className="max-w-[500px] text-wrap">
              Browse thousands of high-quality free photos for personal and
              commercial use
            </h2>
          </div>
          <SearchBar inputClassName="w-[150px] sm:w-auto" />
        </div>
        <div className="hidden h-[300px] max-w-[350px] flex-1 grid-flow-row grid-cols-2 grid-rows-2 gap-2 text-sm font-medium text-white shadow-2xl lg:grid">
          {cardsItems.map((card, index) => (
            <BentoCard
              key={index}
              image={card.image}
              label={card.label}
              spanCols={card.spanCols}
            />
          ))}
        </div>
      </div>
      <span className="text-shadow absolute right-4 bottom-4 text-[10px] text-white/70 sm:text-sm md:text-base md:font-semibold">
        Provided by
        <span className="font-bold text-white italic"> pexels</span>
      </span>
    </div>
  );
};

export default HeroSection;
