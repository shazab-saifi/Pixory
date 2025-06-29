'use client'

import { Check } from "lucide-react";
import Button from "../Button";
import clsx from "clsx";
import { useState } from "react";

interface CardType {
  heading: string,
  subHeading: string,
  price: number,
  offerings: string[],
  onClick: () => void
};

const PricingCard = ({ card, selectedPlan }: { card: CardType, selectedPlan: string }) => {
  return (
    <div onClick={card.onClick} className={clsx(
      'flex flex-col rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all duration-300 p-4 sm:p-6 lg:p-8 h-full gap-20',
      selectedPlan === card.heading ?
        'bg-black text-white xl:-translate-y-12'
        :
        'bg-white xl:-translate-y-0'
    )}>
      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 flex-1">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">{card.heading}</h1>
          <h4 className="text-sm sm:text-base">{card.subHeading}</h4>
        </div>
        <div className="w-full h-[1px] rounded-full"></div>
        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">{`$${card.price}`}</p>
        <div className="space-y-2 sm:space-y-3 lg:space-y-4 flex-1">
          {card.offerings.map((item => (
            <div
              key={item}
              className="flex gap-2 sm:gap-3"
            >
              <Check size={16} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base max-w-full break-words text-wrap">{item}</p>
            </div>
          )))}
        </div>
      </div>
      <Button size='lg' className="w-full rounded-full bg-[#A8FF35] hover:bg-[#A8FF35] text-black text-base sm:text-lg mt-6 sm:mt-8 lg:mt-12">Buy</Button>
    </div>
  );
}

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState('Advanced');

  const Cards: CardType[] = [
    {
      heading: 'Standard',
      subHeading: 'Special first packet',
      price: 300,
      offerings: [
        'Access to free stock photos',
        'Access to free stock videos',
        'Unlimited downloads (free content only)',
        'Basic search functionality',
        'Standard resolution downloads',
        'Credit not required (but appreciated)'
      ],
      onClick: () => setSelectedPlan('Standard')
    },
    {
      heading: 'Advanced',
      subHeading: 'Special second packet',
      price: 500,
      offerings: [
        'Access to premium photo and video library',
        'High-resolution downloads (up to 4K)',
        'No attribution required',
        'Unlimited commercial license',
        'Ad-free experience',
        'Early access to new features',
        'Priority downloads (faster speed)',
        'Email support'
      ],
      onClick: () => setSelectedPlan('Advanced')
    },
    {
      heading: 'Professional',
      subHeading: 'Special third packet',
      price: 1000,
      offerings: [
        'AI-powered content suggestions',
        'API access for integration',
        'Team collaboration features',
        'Bulk download & batch management tools',
        'Priority customer support (live chat or 24/7)',
        'Custom licensing options',
        'Usage analytics',
        'Download history',
        'Search suggestions',
        'Unlimited collections'
      ],
      onClick: () => setSelectedPlan('Professional')
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {Cards.map((card, index) => (
          <div 
            key={card.heading} 
            className={`max-w-90 mx-auto ${
              index === 2 ? 'md:col-span-2 md:col-start-1 lg:col-span-1 lg:col-start-auto' : ''
            }`}
          >
            <PricingCard card={card} selectedPlan={selectedPlan} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricing