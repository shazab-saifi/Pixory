"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="shadow-custom flex max-w-[700px] flex-col items-center justify-center rounded-lg border p-4 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-lg">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

const questions = [
  {
    question:
      "What's the difference between Standard, Advance, and Professional plans?",
    answer:
      "The Standard plan gives you access to free photos and videos. Advance unlocks premium content, higher resolution downloads, and an ad-free experience. Professional includes everything in Advance plus API access, team collaboration, and advanced tools.",
  },
  {
    question: "Is the Standard plan really free?",
    answer:
      "Yes! The Standard plan is completely free with unlimited downloads of free content. No credit card required.",
  },
  {
    question: "Can I use Pixory content for commercial projects?",
    answer:
      "Yes! All content from Pixory comes with commercial licensing rights. The Advance and Professional plans include unlimited commercial usage without attribution requirements.",
  },
  {
    question: "What file formats and resolutions are available?",
    answer:
      "We offer photos in JPG and PNG formats up to 4K resolution. Videos are available in MP4 format with resolutions up to 4K. Higher resolutions are available with Advance and Professional plans.",
  },
  {
    question: "Do I need to credit Pixory when using the content?",
    answer:
      "No attribution is required for Advance and Professional plans. For the free Standard plan, while not required, we appreciate credits when possible.",
  },
];

const FAQ = () => {
  return (
    <div className="flex flex-col gap-8 px-4 xl:my-30">
      <h1 className="text-center text-xl font-semibold xl:text-3xl">
        Frequent Asked Questions
      </h1>
      <div className="mx-auto w-fit space-y-4">
        {questions.map((q) => (
          <FAQItem key={q.question} question={q.question} answer={q.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
