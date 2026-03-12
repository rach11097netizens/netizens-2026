"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/Button";
import { SidePattern } from "@/components/SidePattern";
import Image from "next/image";

const caseStudiesData = [
  {
    id: 1,
    company: "NovaTech Solutions",
    description:
      "Partnering with Netizens Technologies transformed our project management. Their team navigated a complex project, delivering a scalable product ahead of schedule with transparent communication and proactive problem-solving.",
    metric: "50%",
    metricText:
      "increase in branded email open rates and improved brand recall.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    authorName: "Sarah Jones",
    authorTitle: "Founder, SaaS Startup",
  },
  {
    id: 2,
    company: "Lumina Estates",
    description:
      "The targeted landing pages generated exceptionally high-intent leads. Launching our new high-rise project was remarkably smooth thanks to the modular infrastructure designed specifically for performance marketing.",
    metric: "3x",
    metricText:
      "faster deployment for new tower phases and community launches.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    authorName: "Marcus Rhodes",
    authorTitle: "Marketing Director, Real Estate",
  },
  {
    id: 3,
    company: "Global Horizon Property",
    description:
      "By integrating WhatsApp and CRM directly into the bespoke funnel, our sales team no longer loses tracking on international investors. It's a game changer for qualifying serious high-ticket buyers.",
    metric: "40%",
    metricText:
      "reduction in Cost Per Lead comparing to traditional, unoptimized pages.",
    image:
      "https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?q=80&w=1171&auto=format&fit=crop&q=80&w=800",
    authorName: "Elena Rodriguez",
    authorTitle: "VP of Sales, Global Property",
  },
  {
    id: 4,
    company: "Oasis Developments",
    description:
      "Using the multi-language Arabic and English structures helped us penetrate local demographics far more effectively. The conversion rates outperformed our standard website immediately upon launch.",
    metric: "2.5x",
    metricText: "higher conversion rate among local UAE property investors.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    authorName: "Tariq Al-Fayed",
    authorTitle: "Director of Operations",
  },
];

export const CaseStudies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % caseStudiesData.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? caseStudiesData.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % caseStudiesData.length);
  };

  return (
    <section className="relative py-10 md:py-16 lg:py-20 bg-[#FDFDFD] overflow-hidden px-4 md:px-8 flex items-center justify-center">
      <SidePattern invert />

      <div className="max-w-[1320px] mx-auto flex flex-col items-center gap-4 sm:gap-[34px] relative z-10 w-full font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Heading Wrapper */}
        <div className="w-full max-w-[1096px] flex flex-col md:flex-row gap-[16px] items-center justify-between sm:mb-0 mb-2">
          <h2 className="font-['Sora',sans-serif] font-normal text-2xl md:text-3xl text-[#16181B]">
            Real Estate Use Cases
          </h2>

          {/* Slider Nav Controls */}
          <div className="flex items-center gap-[16px]">
            <button
              onClick={handlePrevious}
              className="flex items-center justify-center p-[8px] rounded-full bg-[rgba(14,53,114,0.1)] hover:bg-[rgba(14,53,114,0.2)] transition-colors text-[#0E3572] shrink-0"
              aria-label="Previous case study"
            >
              <ChevronLeft className="w-[20px] h-[20px]" />
            </button>

            {/* Pagination Dots Indicator */}
            <div className="flex items-center justify-center gap-[8px] flex-1">
              {caseStudiesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-[4px] rounded-[2px] transition-all duration-300 ${
                    idx === currentIndex
                      ? "bg-[#0E3572] w-[40px]"
                      : "bg-[rgba(14,53,114,0.3)] w-[4px] hover:bg-[rgba(14,53,114,0.5)]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center justify-center p-[8px] rounded-full bg-[rgba(14,53,114,0.1)] hover:bg-[rgba(14,53,114,0.2)] transition-colors text-[#0E3572] shrink-0"
              aria-label="Next case study"
            >
              <ChevronRight className="w-[20px] h-[20px]" />
            </button>
          </div>
        </div>

        {/* Testimonial Carousel Container */}
        <div className="w-full max-w-[1096px] relative overflow-hidden sm:pb-4 sm:pt-2 -mt-2 px-1">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {caseStudiesData.map((slide) => (
              <div
                key={slide.id}
                className="w-full shrink-0 flex items-center justify-center px-1.5"
              >
                <div className="w-full backdrop-blur-[2px] bg-white border border-[rgba(88,89,91,0.1)] rounded-[10px] p-[24px] md:p-[34px] flex flex-col md:flex-row gap-4 sm:gap-[34px] md:gap-[18px] items-start shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* Left Content Column */}
                  <div className="flex-1 flex flex-col justify-center items-start gap-3 sm:gap-[18px]">
                    <h3 className="font-['Sora',sans-serif] font-bold text-2xl text-[#16181B]">
                      {slide.company}
                    </h3>
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-sm md:text-lg text-[#16181B] leading-[1.6] md:leading-[32px]">
                      {slide.description}
                    </p>

                    <div className="flex flex-col items-start gap-[8px] py-[8px]">
                      <span className="font-['Sora',sans-serif] font-normal text-2xl md:text-3xl text-[#16181B]">
                        {slide.metric}
                      </span>
                      <span className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-sm  md:base text-[#16181B] leading-[22px]">
                        {slide.metricText}
                      </span>
                    </div>

                    <div className="mt-2 text-left">
                      <div className="sm:mt-12 flex justify-center sm:pb-4 w-full inset-x-0">
                        <Button
                          variant="primary"
                          className="shadow-xl px-8 py-3 text-sm"
                        >
                          Book a Discovery Call
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Right Image/Author Column */}
                  <div className="w-full md:max-w-[300px] lg:max-w-[400px] flex flex-col gap-[16px] shrink-0">
                    <div className="w-full sm:aspect-[263/263] bg-gray-100 rounded-[8px] overflow-hidden relative group">
                      <Image
                        src={slide.image}
                        height={800}
                        width={800}
                        alt={`${slide.authorName} - ${slide.company}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                    </div>

                    <div className="flex flex-col gap-[4px] px-1">
                      <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#0E3572]">
                        {slide.authorName}
                      </h4>
                      <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-xs text-[#16181B]">
                        {slide.authorTitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
