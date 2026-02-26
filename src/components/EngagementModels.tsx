import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { SidePattern } from "./SidePattern";
import imgSeparatorPattern from "../assets/images/pattern.png";

gsap.registerPlugin(ScrollTrigger);

interface EngagementCard {
    label: string;
    title: string;
    tags: string[];
    description: string;
    color: "yellow" | "cyan";
}

interface EngagementModelsProps {
    badge: string;
    heading: string;
    cards: EngagementCard[];
    theme?: "light" | "dark";
}

const colorMap = {
    yellow: "bg-[#feff9c]",
    cyan: "bg-[#7afcff]",
} as const;

export function EngagementModels({ badge, heading, cards, theme = "light" }: EngagementModelsProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const windowRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const progressRef = useRef<HTMLDivElement>(null);
    const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const isDark = theme === "dark";

    // Entry animation (both themes)
    useEffect(() => {
        const section = sectionRef.current;
        const header = headerRef.current;
        const macWindow = windowRef.current;

        if (section && header && macWindow) {
            const tl = gsap.timeline(
                isDark
                    ? {}
                    : {
                        scrollTrigger: {
                            trigger: section,
                            start: "top 75%",
                        },
                    }
            );

            tl.fromTo(
                header,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            ).fromTo(
                macWindow,
                { y: 40, opacity: 0, scale: 0.98 },
                { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
                "-=0.2",
            );

            cardsRef.current.forEach((card, index) => {
                if (card) {
                    tl.fromTo(
                        card,
                        { y: 30, opacity: 0, rotation: isDark ? 0 : gsap.utils.random(-2, 2) },
                        {
                            y: 0,
                            opacity: 1,
                            rotation: isDark ? 0 : gsap.utils.random(-1, 1),
                            duration: 0.5,
                            ease: "back.out(1.2)",
                        },
                        `-=${0.5 - index * 0.05}`,
                    );
                }
            });
        }
    }, [isDark]);

    // Dark theme: auto-cycling timeline animation
    useEffect(() => {
        if (!isDark) return;

        const totalCards = cards.length;
        let intervalId: ReturnType<typeof setInterval>;

        const timeoutId = setTimeout(() => {
            setActiveIndex(0);
            let current = 0;

            intervalId = setInterval(() => {
                current = (current + 1) % totalCards;
                setActiveIndex(current);
            }, 2500);
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        };
    }, [isDark, cards.length]);

    // Animate progress bar & dots on activeIndex change
    useEffect(() => {
        if (!isDark) return;

        const progressEl = progressRef.current;
        if (progressEl) {
            const totalCards = cards.length;
            // Progress goes from first dot to current dot
            const pct = totalCards > 1
                ? (activeIndex / (totalCards - 1)) * 100
                : 100;
            gsap.to(progressEl, {
                width: `${pct}%`,
                duration: 0.8,
                ease: "power2.out",
            });
        }

        dotsRef.current.forEach((dot, i) => {
            if (dot) {
                gsap.to(dot, {
                    scale: i <= activeIndex ? 1.4 : 1,
                    duration: 0.4,
                    ease: "back.out(2)",
                });
            }
        });
    }, [activeIndex, isDark, cards.length]);

    if (isDark) {
        return (
            <section
                ref={sectionRef}
                className="relative w-full bg-regal-navy py-8 sm:py-16 md:py-20 flex flex-col items-center justify-center gap-6 sm:gap-12 overflow-hidden px-4"
            >
                {/* Pattern background */}
                <div className="absolute inset-0 pointer-events-none opacity-10">
                    <div
                        className="absolute inset-0 w-full h-full mix-blend-screen"
                        style={{
                            opacity: 0.5,
                            backgroundImage: `url(${imgSeparatorPattern})`,
                            backgroundRepeat: "repeat",
                            backgroundSize: "1000px",
                        }}
                    />
                    <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            backgroundImage: "linear-gradient(#ffffff0a 1px, transparent 1px)",
                            backgroundSize: "100% 32px",
                        }}
                    />
                </div>

                {/* Header */}
                <div
                    ref={headerRef}
                    className="flex flex-col items-center justify-center gap-4 relative max-w-4xl text-center z-10"
                >
                    <div className="bg-white/10 border border-white/10 flex items-center justify-center px-[18px] py-[8px] rounded-[4px] shrink-0">
                        <span className="font-sans text-[12px] text-white text-center">
                            {badge}
                        </span>
                    </div>
                    <h2 className="font-headings font-normal text-2xl md:text-3xl leading-snug text-white text-center w-full">
                        {heading}
                    </h2>
                </div>

                {/* Steps with animated connector */}
                <div ref={windowRef} className="w-full max-w-[1016px] z-10">
                    {/* Timeline connector */}
                    <div className="hidden md:flex items-center w-full max-w-[900px] mx-auto mb-4 px-4 relative h-4">
                        {/* Dashed background line */}
                        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-snow-white/20" />

                        {/* Animated solid progress line */}
                        <div
                            ref={progressRef}
                            className="absolute left-4 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-snow-white/80 to-snow-white/60 z-[1] rounded-full"
                            style={{ width: '0%' }}
                        />

                        {/* Circle nodes */}
                        <div className="relative z-[2] flex items-center w-full">
                            {cards.map((_, index) => (
                                <div key={index} className="flex items-center flex-1 last:flex-none">
                                    <div
                                        ref={(el) => { dotsRef.current[index] = el; }}
                                        className={`w-3 h-3 rounded-full border-2 shrink-0 transition-all duration-500 cursor-pointer ${index <= activeIndex
                                            ? 'bg-snow-white border-snow-white shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                                            : 'bg-transparent border-snow-white/30'
                                            }`}
                                        onClick={() => setActiveIndex(index)}
                                    />
                                    {index < cards.length - 1 && (
                                        <div className="flex-1" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="w-[calc(100%+2rem)] -ml-4 md:w-full md:ml-0 overflow-x-auto custom-scrollbar pb-6 px-4 md:px-0 md:overflow-visible">
                        <div className="flex flex-nowrap justify-start md:justify-center gap-4 md:gap-5 w-max md:w-auto pt-2 after:content-[''] after:w-2 after:shrink-0 md:after:hidden">
                            {cards.map((card, index) => (
                                <div
                                    key={index}
                                    ref={(el) => {
                                        cardsRef.current[index] = el;
                                    }}
                                    className={`backdrop-blur-sm border flex flex-col gap-3 p-5 rounded-[10px] w-[280px] md:w-[300px] min-h-[200px] shrink-0 cursor-pointer transition-all duration-500 ${index === activeIndex
                                        ? 'bg-[#264980]/90 border-snow-white/25 scale-[1.03] shadow-[0_4px_30px_rgba(255,255,255,0.07)]'
                                        : 'bg-[#264980]/35 border-snow-white/5 scale-100'
                                        }`}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <span className={`font-sans font-bold text-sm transition-colors duration-500 ${index === activeIndex ? 'text-white/80' : 'text-white/25'
                                        }`}>
                                        {card.label}
                                    </span>
                                    <h3 className={`font-headings font-normal text-lg leading-snug transition-colors duration-500 ${index === activeIndex ? 'text-white' : 'text-white/45'
                                        }`}>
                                        {card.title}
                                    </h3>
                                    <p className={`font-sans font-medium text-sm leading-relaxed flex-1 transition-colors duration-500 ${index === activeIndex ? 'text-white/75' : 'text-white/30'
                                        }`}>
                                        {card.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ─── Light theme (original) ───
    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-white py-8 sm:py-16 md:py-20 flex flex-col items-center justify-center gap-6 sm:gap-12 overflow-hidden px-4"
        >
            <SidePattern invert />

            <div
                ref={headerRef}
                className="flex flex-col items-center justify-center gap-4 relative max-w-4xl text-center z-10"
            >
                <div className="bg-regal-navy/5 border border-regal-navy/10 flex items-center justify-center px-[18px] py-[8px] rounded-[4px] shrink-0">
                    <span className="font-sans text-[12px] text-regal-navy text-center">
                        {badge}
                    </span>
                </div>
                <h2 className="font-headings font-normal text-2xl md:text-3xl leading-snug text-carbon-black text-center w-full">
                    {heading}
                </h2>
            </div>

            <div
                ref={windowRef}
                className="w-full max-w-[1016px] flex flex-col rounded-xl overflow-hidden shadow-2xl border border-gray-200 z-10 bg-white"
            >
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
                    <div className="w-[42px]">
                        <button>
                            <ExternalLink size={20} className="text-charcoal" />
                        </button>
                    </div>
                </div>

                <div className="p-6 md:p-12 relative bg-gray-50/30">
                    <div className="w-[calc(100%+3rem)] -ml-6 md:w-full md:ml-0 overflow-x-auto custom-scrollbar pb-6 px-6 md:px-0 md:overflow-visible">
                        <div className="flex flex-nowrap justify-start md:justify-center gap-4 md:gap-5 w-max md:w-auto pt-2 after:content-[''] after:w-2 after:shrink-0 md:after:hidden">
                            {cards.map((card, index) => (
                                <div
                                    key={index}
                                    ref={(el) => {
                                        cardsRef.current[index] = el;
                                    }}
                                    className={`
                                        ${colorMap[card.color]}
                                        transition-all duration-300
                                        border border-regal-navy/20
                                        flex flex-col gap-2 p-4 rounded-md
                                        w-[230px] md:w-[225px] h-[260px] shrink-0 transform
                                        hover:scale-105 hover:shadow-lg shadow-sm cursor-default
                                        relative overflow-hidden
                                    `}
                                >
                                    <div
                                        className="absolute bottom-0 right-0 w-0 h-0"
                                        style={{
                                            borderStyle: "solid",
                                            borderWidth: "0 0 20px 20px",
                                            borderColor: "transparent transparent #f9fafb rgba(0,0,0,0.1)",
                                        }}
                                    >
                                        <div
                                            className="absolute right-0 bottom-[-20px] w-0 h-0"
                                            style={{
                                                borderStyle: "solid",
                                                borderWidth: "20px 20px 0 0",
                                                borderColor: "transparent rgba(0,0,0,0.05) transparent transparent",
                                            }}
                                        ></div>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-[20px] h-[20px] bg-gradient-to-tl from-black/5 to-transparent pointer-events-none"></div>

                                    <span className="font-[family-name:var(--sans-serif,'Figma_Hand:Regular',sans-serif)] text-xs text-charcoal opacity-70">
                                        {card.label}
                                    </span>
                                    <h3 className="font-headings font-normal text-lg text-carbon-black leading-snug">
                                        {card.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {card.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 rounded-full border border-regal-navy/20 bg-white/60 font-sans font-medium text-[12px] text-charcoal"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="font-sans font-medium text-sm text-charcoal/80 leading-relaxed flex-1">
                                        {card.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
