import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./Button";
import pattern from "../assets/images/pattern.png";
import { ExternalLink } from "lucide-react";
import { SidePattern } from "./SidePattern";

gsap.registerPlugin(ScrollTrigger);

interface ProblemCard {
    title: string;
    description: string;
    color: "yellow" | "cyan";
    icon?: string;
}

interface ProblemBanner {
    content: React.ReactNode;
    ctaLabel?: string;
}

interface ProblemProps {
    badge: string;
    heading: React.ReactNode;
    cards: ProblemCard[];
    innerCta?: string;
    banner?: ProblemBanner;
}

const colorMap = {
    yellow: "bg-[#feff9c]",
    cyan: "bg-[#7afcff]",
} as const;

export const Problem = ({ badge, heading, cards, innerCta, banner }: ProblemProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const windowRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const finalBannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const header = headerRef.current;
        const macWindow = windowRef.current;
        const bannerEl = finalBannerRef.current;

        if (section && header && macWindow) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                },
            });

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
                        { y: 30, opacity: 0, rotation: gsap.utils.random(-2, 2) },
                        {
                            y: 0,
                            opacity: 1,
                            rotation: gsap.utils.random(-1, 1),
                            duration: 0.5,
                            ease: "back.out(1.2)",
                        },
                        `-=${0.5 - index * 0.05}`,
                    );
                }
            });

            if (bannerEl) {
                tl.fromTo(
                    bannerEl,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                    "-=0.1",
                );
            }
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-white py-8 sm:py-16 md:py-20 flex flex-col items-center justify-center gap-6 sm:gap-12 overflow-hidden px-4 relative"
        >
            <SidePattern invert />

            <div
                ref={headerRef}
                className="flex flex-col items-center justify-center gap-4 relative max-w-3xl text-center z-10"
            >
                <div className="bg-regal-navy/5 border border-regal-navy/10 flex items-center justify-center px-[18px] py-[8px] rounded-[4px] shrink-0">
                    <span className="font-sans text-[12px] text-regal-navy text-center">
                        {badge}
                    </span>
                </div>
                <h2 className="font-headings font-normal text-2xl md:text-3xl leading-snug text-carbon-black relative max-w-[1200px] mx-auto text-center w-full">
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
                        <span className="font-sans font-bold text-xs text-gray-600/70">Notes</span>
                    </div>
                    <div className="w-[42px]">
                        <button>
                            <ExternalLink size={20} className="text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="p-6 md:p-12 sm:min-h-[500px] relative bg-gray-50/30 flex flex-col">
                    <div className="w-[calc(100%+3rem)] -ml-6 md:w-full md:ml-0 overflow-x-auto custom-scrollbar pb-6 px-6 md:px-0 md:overflow-visible">
                        <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 md:gap-6 w-max md:w-auto pt-2 after:content-[''] after:w-2 after:shrink-0 md:after:hidden">
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
                                        flex flex-col gap-2 p-6 rounded-md
                                        w-[265px] h-[223px] shrink-0 transform
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

                                    <span className="font-[family-name:var(--sans-serif,'Figma_Hand:Regular',sans-serif)] text-xs text-gray-600 opacity-70">
                                        Problem
                                    </span>
                                    <h3 className="font-headings font-normal text-lg text-carbon-black leading-snug">
                                        {card.title}
                                    </h3>
                                    <p className="font-sans font-medium text-sm text-gray-600/80 leading-relaxed flex-1">
                                        {card.description}
                                    </p>
                                    {card.icon && (
                                        <div className="absolute bottom-4 right-8 opacity-40">
                                            <img src={card.icon} alt={card.title} className="w-12 h-12 object-contain" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {innerCta && (
                        <div className="mt-3 md:mt-6 flex justify-center pb-4 w-full relative z-10">
                            <Button variant="primary" className="shadow-xl px-8 py-3 text-sm">
                                {innerCta}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {banner && (
                <div ref={finalBannerRef} className="w-full max-w-[1016px] relative">
                    <div className="bg-regal-navy rounded-[10px] px-6 md:px-10 py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden shadow-lg w-full">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none">
                            <img src={pattern} alt="" className="w-full opacity-10" />
                        </div>
                        <div className="relative z-10 flex-1">
                            {banner.content}
                        </div>
                        {banner.ctaLabel && (
                            <button className="relative z-10 whitespace-nowrap shrink-0 bg-white text-regal-navy font-sans font-medium text-sm px-6 py-3 rounded-[6px] hover:bg-white/90 transition-colors cursor-pointer">
                                {banner.ctaLabel}
                            </button>
                        )}
                    </div>

                    <div className="absolute left-8 md:left-12 top-[-48px] w-[1px] md:w-[2px] h-[72px] bg-gradient-to-b from-[#E4E7ED] to-[#16181B] z-20 pointer-events-none">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[18px] h-[18px] md:w-[22px] md:h-[22px] bg-white border-[3px] md:border-[4px] border-[#3EAFD1] rounded-full shadow-sm"></div>
                    </div>
                    <div className="absolute right-8 md:right-12 top-[-48px] w-[1px] md:w-[2px] h-[72px] bg-gradient-to-b from-[#E4E7ED] to-[#16181B] z-20 pointer-events-none">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[18px] h-[18px] md:w-[22px] md:h-[22px] bg-white border-[3px] md:border-[4px] border-[#3EAFD1] rounded-full shadow-sm"></div>
                    </div>
                </div>
            )}
        </section>
    );
};
