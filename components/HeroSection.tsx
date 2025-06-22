import BentoCard from './HeroSection/BentoCard';
import SearchBar from './SearchBar';

const cardsItems = [
  {
      label: 'Nature',
      image: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
      label: 'Colorful',
      image: 'https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
      label: 'Wallpapers',
      image: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      spanCols: true,
  },
];

const HeroSection = () => {

  return (
    <div className="w-full relative px-4 pt-20 pb-24 md:px-20 2xl:px-24 flex justify-center">
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 xl:gap-12 2xl:gap-50">
        <div className="space-y-8">
          <div className="text-xl md:text-3xl space-y-2 text-white font-semibold text-shadow-lg">
            <h2 className=''>Discover. Download. Inspire.</h2>
            <h2 className='text-wrap max-w-[500px]'>
              Browse thousands of high-quality free photos for personal and commercial use
            </h2>
          </div>
          <SearchBar
            inputClassName='w-[150px] sm:w-auto'
          />
        </div>
        <div className="h-[300px] max-w-[350px] hidden lg:grid grid-flow-row grid-cols-2 grid-rows-2 gap-2 shadow-2xl text-white text-sm font-medium flex-1">
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
      <span className='absolute right-4 bottom-4 text-white/70 md:font-semibold text-[10px] sm:text-sm md:text-base text-shadow'>
        Provided by
        <span className='font-bold text-white italic'> pexels</span>
      </span>
    </div>
  );
};


export default HeroSection
