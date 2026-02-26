import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SidePattern } from "./SidePattern";
import imgSeparatorPattern from "../assets/images/pattern.png";

import imgMvp from "../assets/images/product-partner/mvp-developement-img.svg";
import imgWorkflow from "../assets/images/product-partner/workflow-digitization-img.svg";
import imgAI from "../assets/images/product-partner/ai-consulting-img.svg";
import imgStaffAug from "../assets/images/product-partner/staff-aug-img.svg";

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        title: "MVP Development",
        description: "After launch, we stabilize, optimize, and keep shipping without fire drills.",
        image: imgMvp,
    },
    {
        title: "Workflow Digitization",
        description: "Once systems are live, we maintain integrations, performance, and reliability as usage grows.",
        image: imgWorkflow,
    },
    {
        title: "AI Consulting",
        description: "After AI goes live, we monitor quality, manage costs, and improve performance over time.",
        image: imgAI,
    },
    {
        title: "Staff Augmentation",
        description: "As teams scale, we maintain standards, DevOps hygiene, and clean handoffs.",
        image: imgStaffAug,
    },
];

export function ProductPartner() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const cardEls = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        if (cardEls.length < 2) return;

        const total = cardEls.length;

        cardEls.forEach((card, i) => {
            if (i === 0) {
                gsap.set(card, { y: 0, opacity: 1 });
            } else {
                gsap.set(card, { y: "110%", opacity: 0 });
            }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${total * 80}%`,
                pin: true,
                scrub: 0.5,
                anticipatePin: 1,
            },
        });

        for (let i = 0; i < total - 1; i++) {
            tl.to(cardEls[i], {
                y: "-40%",
                opacity: 0,
                scale: 0.95,
                duration: 1,
                ease: "power2.in",
            })
                .fromTo(
                    cardEls[i + 1],
                    { y: "110%", opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                    "<0.3",
                );
        }

        tl.to({}, { duration: 0.4 });

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-regal-navy flex flex-col items-center justify-center py-16 md:py-20 overflow-hidden min-h-screen"
        >
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

            <SidePattern />

            <div className="w-full max-w-[1096px] mx-auto px-4 relative z-10 flex flex-col items-center gap-10">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="bg-white/10 border border-white/10 flex items-center justify-center px-4 py-2 rounded">
                        <span className="font-sans text-xs text-white/90">
                            Your product partner
                        </span>
                    </div>
                    <h2 className="font-headings font-normal text-2xl md:text-3xl leading-snug text-white">
                        Build. Run. Scale.
                    </h2>
                </div>

                <div className="relative w-full" style={{ height: "clamp(320px, 50vh, 420px)" }}>
                    {cards.map((card, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                cardsRef.current[i] = el;
                            }}
                            className="absolute inset-x-0 top-0 w-full bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden will-change-transform"
                            style={{
                                zIndex: cards.length + i,
                                height: "clamp(320px, 50vh, 420px)",
                            }}
                        >
                            <div className="flex flex-col sm:flex-row h-full">
                                <div className="flex-shrink-0 flex flex-col justify-center gap-3 p-6 sm:p-10 md:p-12 sm:w-[40%]">
                                    <h3 className="font-headings font-normal text-2xl sm:text-[28px] md:text-[32px] text-carbon-black leading-snug">
                                        {card.title}
                                    </h3>
                                    <p className="font-sans font-medium text-sm md:text-base text-gray-600/75 leading-[22px] max-w-[360px]">
                                        {card.description}
                                    </p>
                                </div>
                                <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="w-full max-w-[460px] h-auto object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
