"use client";

import { Button } from "@/components/Button";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// SVG Icons from local assets
import problemIcon1 from "@/assets/images/icons/problem/1.svg";
import problemIcon2 from "@/assets/images/icons/problem/2.svg";
import problemIcon3 from "@/assets/images/icons/problem/3.svg";
import problemIcon4 from "@/assets/images/icons/problem/4.svg";
import problemIcon5 from "@/assets/images/icons/problem/5.svg";

import pattern from "@/assets/images/pattern.png";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const RealEstateProblemData = [
  {
    title: "Rebuilding From Scratch",
    description:
      "Every new tower or phase means new dev cost, new timelines, new delays.",
    color: "bg-[#feff9c]", // Pastel Yellow
    icon: problemIcon1,
    delay: 0,
  },
  {
    title: "Low-Intent Leads",
    description: "Generic forms attract volume, not serious investors.",
    color: "bg-[#7afcff]", // Pastel Cyan
    icon: problemIcon2,
    delay: 0.1,
  },
  {
    title: "Rising Ad Costs",
    description:
      "Google & Meta CPMs are increasing, poor landing pages multiply wasted spend.",
    color: "bg-[#7afcff]", // Pastel Cyan
    icon: problemIcon3,
    delay: 0.2,
  },
  {
    title: "Slow Go-Live",
    description: "Weeks lost in redesign, approvals, and development.",
    color: "bg-[#feff9c]", // Pastel Yellow
    icon: problemIcon4,
    delay: 0.3,
  },
  {
    title: "No Scalability System",
    description: "Most pages aren’t built for reuse, just one-off campaigns.",
    color: "bg-[#feff9c]", // Pastel Yellow
    icon: problemIcon5,
    delay: 0.4,
  },
];

export const RealEstateProblem = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const finalBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const macWindow = windowRef.current;
    const banner = finalBannerRef.current;

    if (section && header && macWindow && banner) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        },
      });

      // Animate Header
      tl.fromTo(
        header,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      )
        // Animate Mac Window Container
        .fromTo(
          macWindow,
          { y: 40, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
          "-=0.2",
        );

      // Animate individual sticky notes
      cardsRef.current.forEach((card, index) => {
        if (card) {
          tl.fromTo(
            card,
            { y: 30, opacity: 0, rotation: gsap.utils.random(-2, 2) },
            {
              y: 0,
              opacity: 1,
              rotation: gsap.utils.random(-1, 1), // slight randomized rotation for sticky note feel
              duration: 0.5,
              ease: "back.out(1.2)",
            },
            `-=${0.5 - index * 0.05}`, // Staggered overlap
          );
        }
      });

      // Animate Final Banner
      tl.fromTo(
        banner,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.1",
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-10 md:py-16 lg:py-20 flex flex-col items-center justify-center gap-8 sm:gap-12 overflow-hidden px-4"
    >
      {/* Header Area */}
      <div
        ref={headerRef}
        className="flex flex-col items-center justify-center gap-4 relative max-w-3xl text-center z-10"
      >
        <div className="bg-regal-navy/5 border border-regal-navy/10 flex items-center justify-center px-[18px] py-[8px] rounded-[4px] shrink-0">
          <span className="font-sans text-xs text-regal-navy text-center">
            The Problem
          </span>
        </div>

        <h2 className="font-sora font-semibold text-2xl md:text-4xl leading-snug text-carbon-black relative max-w-[1200px] mx-auto text-center w-full">
          Why Most Dubai Real Estate{" "}
          <span className="sm:whitespace-nowrap">
            Landing Pages{" "}
            <span className="inline-block relative align-middle -mt-2">
              <div className="rotate-3 mt-2 sm:mt-0 bg-white border border-red-ed/40 px-3 py-1 rounded-[10px] shadow-[0_8px_15px_-3px_rgba(237,28,36,0.1)] inline-flex items-center justify-center">
                <span className="font-sora font-bold text-2xl md:text-4xl text-red-ed leading-none">
                  Burn Budget
                </span>
              </div>
            </span>
          </span>
        </h2>
      </div>

      {/* Mac Window Area */}
      <div
        ref={windowRef}
        className="w-full max-w-[1016px] flex flex-col rounded-xl overflow-hidden shadow-2xl border border-gray-200 z-10 bg-white"
      >
        {/* Window Top Bar */}
        <div className="flex items-center px-4 py-3 bg-gradient-to-r from-gray-100 to-white border-b border-gray-200 w-full shrink-0">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="font-sans font-bold text-xs text-charcoal/70">
              Notes
            </span>
          </div>
          {/* Placeholder for right side alignment */}
          <div className="w-[42px]">
            <button aria-label="Open in external link" type="button">
              <ExternalLink size={20} className="text-charcoal" />
            </button>
          </div>
        </div>

        {/* Window Content / Sticky Notes Grid */}
        <div className="p-6 md:p-12 sm:min-h-[500px] relative bg-gray-50/30 flex flex-col">
          {/* Scrollable Container for Cards */}
          <div className="w-[calc(100%+3rem)] -ml-6 md:w-full md:ml-0 overflow-x-auto custom-scrollbar pb-6 px-6 md:px-0 md:overflow-visible">
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 md:gap-6 w-max md:w-auto pt-2 after:content-[''] after:w-2 after:shrink-0 md:after:hidden">
              {RealEstateProblemData.map((problem, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className={`
                                    ${problem.color} 
                                    transition-all
                                    duration-300
                                    border border-regal-navy/20 
                                    flex flex-col gap-2 p-6 rounded-md 
                                    w-[265px] h-[223px] shrink-0 transform 
                                    hover:scale-105 hover:shadow-lg shadow-sm cursor-default
                                    relative overflow-hidden
                                `}
                >
                  {/* Sticky Note Fold Illusion using CSS borders on a pseudo-element block */}
                  <div
                    className="absolute bottom-0 right-0 w-0 h-0"
                    style={{
                      borderStyle: "solid",
                      borderWidth: "0 0 20px 20px",
                      borderColor:
                        "transparent transparent #f9fafb rgba(0,0,0,0.1)", // f9fafb is general bg color
                    }}
                  >
                    <div
                      className="absolute right-0 bottom-[-20px] w-0 h-0"
                      style={{
                        borderStyle: "solid",
                        borderWidth: "20px 20px 0 0",
                        borderColor:
                          "transparent rgba(0,0,0,0.05) transparent transparent",
                      }}
                    ></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-[20px] h-[20px] bg-gradient-to-tl from-black/5 to-transparent pointer-events-none"></div>

                  <div className="flex justify-between items-start mb-2">
                    <span className="font-[family-name:var(--sans-serif,'Figma_Hand:Regular',sans-serif)] text-xs text-charcoal opacity-70">
                      Problem
                    </span>
                  </div>
                  <h3 className="font-headings font-normal text-lg text-carbon-black leading-snug">
                    {problem.title}
                  </h3>
                  <p className="font-sans font-medium text-sm text-charcoal/80 leading-relaxed flex-1">
                    {problem.description}
                  </p>
                  <div className="absolute bottom-4 right-8 opacity-40">
                    <Image
                      src={problem.icon}
                      alt={problem.title}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inner CTA Button inside the window */}
          <div className="mt-3 md:mt-6 flex justify-center pb-4 w-full relative z-10">
            <button className="shadow-xl px-8 py-3 text-sm">
              Book a Discovery Call
            </button>
          </div>
        </div>
      </div>

      {/* Final Problem Banner */}
      <div ref={finalBannerRef} className="w-full max-w-[1016px] relative">
        {/* Content Box */}
        <div className="bg-regal-navy rounded-[10px] px-6 md:px-10 py-6 md:py-8 flex justify-center items-center text-center relative overflow-hidden shadow-lg w-full">
          <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent pointer-events-none">
            <Image src={pattern} alt="" className="w-full opacity-10" />
          </div>

          <p className="font-headings font-semibold text-md md:text-2xl text-white leading-relaxed max-w-3xl relative z-10 px-4">
            In Dubai, ad costs for real estate campaigns continue to rise, yet
            most landing pages convert under 2–3%.
          </p>
        </div>

        {/* Left Rope */}
        <div className="absolute left-8 md:left-12 top-[-48px] w-[1px] md:w-[2px] h-[72px] bg-gradient-to-b from-[#E4E7ED] to-[#16181B] z-20 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[18px] h-[18px] md:w-[22px] md:h-[22px] bg-white border-[3px] md:border-[4px] border-[#3EAFD1] rounded-full shadow-sm"></div>
        </div>

        {/* Right Rope */}
        <div className="absolute right-8 md:right-12 top-[-48px] w-[1px] md:w-[2px] h-[72px] bg-gradient-to-b from-[#E4E7ED] to-[#16181B] z-20 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[18px] h-[18px] md:w-[22px] md:h-[22px] bg-white border-[3px] md:border-[4px] border-[#3EAFD1] rounded-full shadow-sm"></div>
        </div>
      </div>
    </section>
  );
};
