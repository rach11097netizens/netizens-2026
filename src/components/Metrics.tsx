"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Metrics() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const metrics = [
    { value: "30%", label: "Reduction Customer Churn" },
    { value: "5x Growth", label: "In Engagement Metrics" },
    { value: "30%", label: "Lower Cost Per Qualified Lead" },
    { value: "25%", label: "Faster Response To Inquiries" },
    { value: "15%", label: "Increase In Conversion Rates From Leads" },
  ];

  // Double the metrics so it's long enough to cover large screens naturally
  const duplicatedMetrics = [...metrics, ...metrics];

  return (
    <section
      ref={containerRef}
      className="w-full bg-regal-navy text-white text-center overflow-hidden flex"
    >
      {/* First Block */}
      <div className="flex shrink-0 animate-marquee">
        {duplicatedMetrics.map((metric, i) => (
          <div
            key={`first-${i}`}
            className="flex min-w-[200px] md:min-w-[280px] shrink-0 flex-col items-center justify-center p-4 gap-1 lg:gap-2 border-r"
          >
            <h4 className="font-sans font-bold text-lg md:text-xl">
              {metric.value}
            </h4>
            <p className="font-sans text-xs md:text-sm text-white/80 max-w-[160px] leading-tight capitalize">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      {/* Second identical block following immediately after the first */}
      <div className="flex shrink-0 animate-marquee" aria-hidden="true">
        {duplicatedMetrics.map((metric, i) => (
          <div
            key={`second-${i}`}
            className="flex min-w-[200px] md:min-w-[280px] shrink-0 flex-col items-center justify-center p-4 gap-1 lg:gap-2 border-r"
          >
            <h4 className="font-sans font-bold text-lg md:text-xl">
              {metric.value}
            </h4>
            <p className="font-sans text-xs md:text-base text-white/80 max-w-[160px] leading-tight capitalize">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
