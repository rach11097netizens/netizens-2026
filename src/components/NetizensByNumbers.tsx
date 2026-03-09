"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    primary: "10+",
    numericValue: 10,
    suffix: "+",
    category: "Years",
    description: "Building Products",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    primary: "150+",
    numericValue: 150,
    suffix: "+",
    category: "Projects",
    description: "Delivered Across Industries",
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    primary: "50+",
    numericValue: 50,
    suffix: "+",
    category: "AI, ERP & Workflow Systems",
    description: "Across SaaS, Fintech, Retail & Operations",
    className: "lg:col-span-1 lg:row-span-2",
  },
  {
    primary: "8+",
    numericValue: 8,
    suffix: "+",
    category: "Countries",
    description: "Served",
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    primary: "60%",
    numericValue: 60,
    suffix: "%",
    category: "Long-Term Clients",
    description: "On Ongoing Retainers",
    className: "lg:col-span-1 lg:row-span-1",
  },
];

export function NetizensByNumbers() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const counterEls = section.querySelectorAll<HTMLElement>(".stat-number");

      counterEls.forEach((el, i) => {
        const target = stats[i].numericValue;
        const suffix = stats[i].suffix;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          },
          onComplete: () => {
            el.textContent = target + suffix;
          },
        });
      });
    }, section);

    const scheduleRefresh = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    };

    if (document.readyState === "complete") {
      scheduleRefresh();
    } else {
      window.addEventListener("load", scheduleRefresh, { once: true });
    }

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      ctx.revert();
      window.removeEventListener("load", scheduleRefresh);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#FFFFFF] py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-headings font-normal text-2xl lg:text-3xl text-carbon-black text-center mb-4 md:mb-6">
          Netizens by the numbers
        </h2>

        {/* Bento grid: 4 cols on desktop, 1 col on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 auto-rows-fr px-2">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 md:p-8 rounded-[8px] border border-[rgba(14,53,114,0.1)] bg-white flex flex-col gap-3 min-h-[140px] ${stat.className}`}
            >
              {/* stat-number starts at "0" + suffix so layout doesn't shift */}
              <span
                className="stat-number font-mono font-medium text-[32px] md:text-[44px] lg:text-[48px] leading-[1.1] text-[#103C87] tracking-tight"
              >
                0{stat.suffix}
              </span>
              <span className="font-mono font-medium text-[15px] md:text-base text-[#103C87]">
                {stat.category}
              </span>
              <span className="font-sans text-[14px] leading-[22px] text-gray-500">
                {stat.description}
              </span>
            </div>
          ))}
        </div>

        <p className="font-sans font-medium text-[15px] md:text-base text-regal-navy text-center mx-auto mt-4 md:mt-6 leading-relaxed">
          Built with structured delivery, sprint-based execution, and long-term product thinking.
        </p>
      </div>
    </section>
  );
}
