"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import imgModularPage from "@/assets/images/icons/modular-page.svg";
import imgGoogleMeta from "@/assets/images/icons/google-meta-ad.svg";
import imgHighIntent from "@/assets/images/icons/high-intent-lead.svg";
import imgFastLoading from "@/assets/images/icons/fast-loading.svg";
import imgCrmWhatsapp from "@/assets/images/icons/crm-whatsapp.svg";
import imgMultiLanguage from "@/assets/images/icons/multi-language.svg";

import { Button } from "@/components/Button";
import { SidePattern } from "@/components/SidePattern";
import Image from "next/image";

export const WhatYouGet = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%", // Starts earlier when scrolling into view
        toggleActions: "play none none reverse",
      },
    });

    if (header) {
      tl.fromTo(
        header,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power4.inOut" }, // Faster header
      );
    }

    cards.forEach((card) => {
      if (card) {
        tl.fromTo(
          card,
          { opacity: 0, y: 150 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power4.inOut" }, // Crisp speed
          "-=0.2",
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  const features = [
    {
      id: "modular-page",
      title: "Modular Page Architecture",
      subtext:
        "Launch new towers, phases, or campaigns without rebuilding from zero.",
      image: imgModularPage,
      className: "lg:col-span-1 lg:row-span-3 flex flex-col",
      imgContainerClass: "flex-1 flex items-end justify-center pt-8",
    },
    {
      id: "google-meta",
      title: "Google & Meta Ad-Ready Structure",
      subtext: "Conversion-focused layout aligned with paid traffic behavior.",
      image: imgGoogleMeta,
      className:
        "lg:col-span-2 lg:row-span-1 flex flex-col md:flex-row items-center",
      textContainerClass: "md:w-1/2 sm:pr-4",
      imgContainerClass: "md:w-1/2 flex justify-end mt-6 md:mt-0",
    },
    {
      id: "high-intent",
      title: "High-Intent Lead Qualification",
      subtext: "Smart CTAs and form flows designed to filter serious buyers.",
      image: imgHighIntent,
      className: "lg:col-span-1 lg:row-span-1 flex flex-col",
      imgContainerClass: "flex-1 flex items-end justify-center pt-6",
    },
    {
      id: "fast-loading",
      title: "Fast-Loading, IT-Built Infrastructure",
      subtext: "Engineered for speed, reliability, and high ad Quality Scores.",
      image: imgFastLoading,
      className: "lg:col-span-1 lg:row-span-1 flex flex-col",
      imgContainerClass: "flex-1 flex items-end justify-center pt-6",
    },
    {
      id: "crm-whatsapp",
      title: "CRM & WhatsApp Integration",
      subtext:
        "Leads routed instantly to your sales team without tracking gaps.",
      image: imgCrmWhatsapp,
      className: "lg:col-span-1 lg:row-span-1 flex flex-col",
      imgContainerClass: "flex-1 flex items-end justify-center pt-6",
    },
    {
      id: "multi-language",
      title: "Multi-Language Support",
      subtext:
        "Arabic + English-ready architecture for local & international buyers.",
      image: imgMultiLanguage,
      className: "lg:col-span-1 lg:row-span-1 flex flex-col",
      imgContainerClass: "flex-1 flex items-end justify-center pt-6",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-10 md:py-16 lg:py-20 bg-[#FDFDFD] overflow-hidden px-4 md:px-8"
    >
      <SidePattern invert />

      <div className="max-w-[1280px] mx-auto flex flex-col items-center relative z-10 w-full font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header Section */}
        <div
          ref={headerRef}
          className="flex flex-col items-center text-center gap-[8px] mb-8 sm:mb-[64px] max-w-3xl"
        >
          <span className="font-['Plus_Jakarta_Sans'] font-normal text-xs text-[#0E3572] bg-[rgba(14,53,114,0.05)] border border-[rgba(14,53,114,0.1)] px-[18px] py-[8px] rounded-[4px] tracking-wide">
            What You Get
          </span>
          <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-2xl sm:text-4xl text-[#16181B] leading-tight">
            A Landing Page System Built for
            <br className="hidden md:block" /> Real Estate Performance
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4 lg:auto-rows-[auto]">
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className={`
                                relative overflow-hidden rounded-[18px] bg-#000 border border-[#EBEBEB] 
                                ${feature.id === "modular-page" ? "p-[35px]" : "p-[14px]"} shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] 
                                transition-all duration-300 ${feature.className}
                            `}
            >
              <div
                className={`flex flex-col gap-[8px] z-10 relative ${feature.textContainerClass || ""}`}
              >
                <h3 className="font-['Sora',sans-serif] font-normal text-base md:text-lg text-[#0E3572] leading-tight">
                  {feature.title}
                </h3>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-sm text-[rgba(22,24,27,0.7)] leading-6">
                  {feature.subtext}
                </p>
              </div>

              <div className={`relative z-0 ${feature.imgContainerClass}`}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  className="w-full max-w-[400px] h-auto object-contain mx-auto mix-blend-multiply"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Book Discovery Call Button */}
        <div className="mt-6 sm:mt-12 flex justify-center pb-0 sm:pb-4 w-full inset-x-0">
          <Button variant="primary" className="shadow-xl px-8 py-3 text-sm">
            Book a Discovery Call
          </Button>
        </div>
      </div>
    </section>
  );
};
