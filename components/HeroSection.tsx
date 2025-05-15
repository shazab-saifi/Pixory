import React from 'react'
import Button from './Button'
import Dropdown from './Dropdown'
import { Search } from 'lucide-react'

const cards = [
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
]

const Card = ({ image, label, spanCols = false }: { image: string; label: string; spanCols?: boolean }) => (
  <div
    className={`group relative h-[150px] rounded-xl overflow-hidden cursor-pointer ${
      spanCols ? 'w-full col-span-2' : 'w-[180px]'
    }`}
  >
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-[1.01]"
      style={{ backgroundImage: `url(${image})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10 h-full p-2 flex items-end text-white">
      <span className="opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        {label}
      </span>
    </div>
  </div>
)

const HeroSection = () => {
  return (
    <div className="w-full px-80 inline-flex justify-between items-center py-20">
      <div className="space-y-8">
        <div className="text-2xl space-y-2 text-white font-semibold text-shadow-lg">
          <h2>Discover. Download. Inspire.</h2>
          <h2>
            Browse thousands of high-quality free photos <br /> for personal and commercial use
          </h2>
        </div>
        <div className="inline-flex items-center rounded-xl gap-2 bg-white shadow-md">
          <Dropdown />
          <input type="text" className="py-2 md:w-[350px] outline-none" />
          <Button
            variant="secondary"
            className="shadow-none flex items-center"
          >
            <Search size={18} className="opacity-80 hover:opacity-50" />
          </Button>
        </div>
      </div>

      <div className="hidden md:grid grid-flow-row grid-cols-2 grid-rows-2 gap-2 shadow-2xl text-white text-sm font-medium">
        {cards.map((card, index) => (
          <Card key={index} image={card.image} label={card.label} spanCols={card.spanCols} />
        ))}
      </div>
    </div>
  )
}

export default HeroSection
