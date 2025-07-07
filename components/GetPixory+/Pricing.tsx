"use client";

import { Check } from "lucide-react";
import Button from "../Button";
import clsx from "clsx";
import { useState } from "react";

interface CardType {
  heading: string;
  subHeading: string;
  price: number;
  offerings: string[];
  onClick: () => void;
}

const PricingCard = ({
  card,
  selectedPlan,
}: {
  card: CardType;
  selectedPlan: string;
}) => {
  return (
    <div
      onClick={card.onClick}
      className={clsx(
        "flex h-full flex-col gap-20 rounded-2xl p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all duration-300 sm:p-6 lg:p-8",
        selectedPlan === card.heading
          ? "bg-black text-white xl:-translate-y-12"
          : "bg-white xl:-translate-y-0",
      )}
    >
      <div className="flex flex-1 flex-col gap-4 sm:gap-6 lg:gap-8">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h1 className="text-xl font-semibold sm:text-2xl lg:text-3xl">
            {card.heading}
          </h1>
          <h4 className="text-sm sm:text-base">{card.subHeading}</h4>
        </div>
        <div className="h-[1px] w-full rounded-full"></div>
        <p className="text-3xl font-bold sm:text-4xl lg:text-5xl">{`$${card.price}`}</p>
        <div className="flex-1 space-y-2 sm:space-y-3 lg:space-y-4">
          {card.offerings.map((item) => (
            <div key={item} className="flex gap-2 sm:gap-3">
              <Check size={16} className="mt-0.5 flex-shrink-0" />
              <p className="max-w-full text-sm text-wrap break-words sm:text-base">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Button
        size="lg"
        className="mt-6 w-full rounded-full bg-[#A8FF35] text-base text-black hover:bg-[#A8FF35] sm:mt-8 sm:text-lg lg:mt-12"
      >
        Buy
      </Button>
    </div>
  );
};

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("Advanced");

  const Cards: CardType[] = [
    {
      heading: "Standard",
      subHeading: "Special first packet",
      price: 300,
      offerings: [
        "Access to free stock photos",
        "Access to free stock videos",
        "Unlimited downloads (free content only)",
        "Basic search functionality",
        "Standard resolution downloads",
        "Credit not required (but appreciated)",
      ],
      onClick: () => setSelectedPlan("Standard"),
    },
    {
      heading: "Advanced",
      subHeading: "Special second packet",
      price: 500,
      offerings: [
        "Access to premium photo and video library",
        "High-resolution downloads (up to 4K)",
        "No attribution required",
        "Unlimited commercial license",
        "Ad-free experience",
        "Early access to new features",
        "Priority downloads (faster speed)",
        "Email support",
      ],
      onClick: () => setSelectedPlan("Advanced"),
    },
    {
      heading: "Professional",
      subHeading: "Special third packet",
      price: 1000,
      offerings: [
        "AI-powered content suggestions",
        "API access for integration",
        "Team collaboration features",
        "Bulk download & batch management tools",
        "Priority customer support (live chat or 24/7)",
        "Custom licensing options",
        "Usage analytics",
        "Download history",
        "Search suggestions",
        "Unlimited collections",
      ],
      onClick: () => setSelectedPlan("Professional"),
    },
  ];

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Cards.map((card, index) => (
          <div
            key={card.heading}
            className={`mx-auto max-w-90 ${
              index === 2
                ? "md:col-span-2 md:col-start-1 lg:col-span-1 lg:col-start-auto"
                : ""
            }`}
          >
            <PricingCard card={card} selectedPlan={selectedPlan} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
