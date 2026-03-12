"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import pattern from "@/assets/images/pattern-large.png";
import Image from "next/image";

export const NumberMetrics = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLHeadingElement | null)[]>([]);

  const metrics = [
    {
      prefix: "",
      num1: 3,
      separator: "–",
      num2: 5,
      suffix: "",
      unit: "Days",
      description:
        "Average time to launch a new project page using our modular system.",
      bgStyle:
        "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, #0E3572 0%, #0E3572 100%)",
    },
    {
      prefix: "",
      num1: 25,
      separator: "–",
      num2: 40,
      suffix: "%",
      unit: "Lower CPL",
      description: "Compared to traditional, generic landing pages.",
      bgStyle:
        "linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(90deg, #0E3572 0%, #0E3572 100%)",
    },
    {
      prefix: "",
      num1: 2,
      separator: "–",
      num2: 3,
      suffix: "x",
      unit: "Faster Deployment",
      description: "For new towers, phases, and campaign variations.",
      bgStyle:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%), linear-gradient(90deg, #0E3572 0%, #0E3572 100%)",
    },
    {
      prefix: "Up to ",
      num1: 35,
      separator: "",
      num2: null,
      suffix: "%",
      unit: "Higher Lead Quality",
      description: "Through structured qualification and smart CTA flows.",
      bgStyle:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%), linear-gradient(90deg, #0E3572 0%, #0E3572 100%)",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
    });

    // Smooth header fade-in
    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power1.out" }, // faster, no bounce
      );
    }

    cardsRef.current.forEach((card, index) => {
      if (card) {
        // Smooth card fade-in
        tl.fromTo(
          card,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power1.out" },
          "-=0.15", // slight overlap for speed
        );

        const metric = metrics[index];
        const numElem = numbersRef.current[index];

        if (numElem) {
          const animObject = { n1: 0, n2: 0 };

          tl.to(
            animObject,
            {
              n1: metric.num1,
              n2: metric.num2 || 0,
              duration: 0.5, // faster
              ease: "power1.out", // smooth, no bounce
              onUpdate: () => {
                let text = metric.prefix;

                // Smooth number animation, rounded to whole number
                text += Math.round(animObject.n1);

                if (metric.separator && metric.num2 !== null) {
                  text += metric.separator + Math.round(animObject.n2);
                }

                text += metric.suffix;
                numElem.innerText = text;
              },
            },
            "<", // sync with card entrance
          );
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-regal-navy overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none">
        <Image src={pattern} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-[1360px] mx-auto flex flex-col items-center justify-center py-10 sm:py-14 md:py-20 px-6 md:px-8 relative z-10 w-full">
        {/* Header Subtitle & Title */}
        <div
          ref={headerRef}
          className="flex flex-col items-center gap-2 mb-6 sm:mb-10 w-full max-w-3xl text-center"
        >
          <span className="font-jakarta font-normal text-xs text-[#FFFAFA] bg-[rgba(255,250,250,0.1)] border border-[rgba(14,53,114,0.1)] px-[18px] py-[8px] rounded-[4px] tracking-wide">
            Numbers Speaks
          </span>
          <h2 className="font-jakarta font-semibold text-2xl sm:text-4xl md:text-5xl text-white leading-tight">
            Built for ROI, Not Just Design
          </h2>
        </div>

        {/* Metrics Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-1.5">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="flex flex-col gap-2.5 sm:gap-5 items-start p-[24px] rounded-[8px] overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
              style={{ backgroundImage: metric.bgStyle }}
            >
              {/* Inner soft glow effect on hover */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex flex-col gap-2 sm:gap-[4px] items-start w-full relative z-10">
                <h3
                  ref={(el) => {
                    numbersRef.current[idx] = el;
                  }}
                  className="font-['Geist_Mono',monospace] font-medium text-2xl sm:text-4xl md:text-4xl text-white leading-none tracking-tight"
                >
                  0
                </h3>
                <p className="font-['Geist_Mono',monospace] font-medium text-base text-white/90 leading-snug">
                  {metric.unit}
                </p>
              </div>

              <p className="font-jakarta font-medium text-xs md:text-sm text-white/80 sm:leading-[24px] relative z-10">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
