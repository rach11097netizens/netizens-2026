import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SidePattern } from "./SidePattern";

interface ProcessStep {
    title: string;
    description: string;
}

interface ProcessTimelineProps {
    badge: string;
    heading: string;
    steps: ProcessStep[];
    ctaLabel?: string;
}

export function ProcessTimeline({ badge, heading, steps, ctaLabel }: ProcessTimelineProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const circlesRef = useRef<(HTMLDivElement | null)[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const progressLineRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);
    const activeIndexRef = useRef(0);

    const activateStep = (index: number) => {
        activeIndexRef.current = index;
        setActiveIndex(index);

        cardsRef.current.forEach((card, i) => {
            if (!card) return;
            gsap.to(card, {
                y: i === index ? -4 : 0,
                boxShadow:
                    i === index
                        ? "0 8px 30px rgba(0,0,0,0.08)"
                        : "0 1px 3px rgba(0,0,0,0.04)",
                borderColor:
                    i === index ? "rgba(14, 53, 114, 0.2)" : "rgba(0,0,0,0.06)",
                duration: 0.4,
                ease: "power2.out",
            });
        });

        circlesRef.current.forEach((circle, i) => {
            if (!circle) return;
            gsap.to(circle, {
                scale: i <= index ? 1.3 : 1,
                backgroundColor: i <= index ? "#0E3572" : "#ffffff",
                borderColor: i <= index ? "#0E3572" : "#d1d5db",
                duration: 0.3,
                ease: "power2.out",
            });
        });
    };

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const totalDuration = steps.length * 2.5;
            const tl = gsap.timeline({ repeat: -1, delay: 0.5 });
            tlRef.current = tl;

            tl.fromTo(
                progressLineRef.current,
                { width: "0%" },
                { width: "100%", duration: totalDuration, ease: "none" }
            );

            steps.forEach((_, i) => {
                const triggerTime = (i / (steps.length - 1)) * totalDuration;
                tl.call(() => activateStep(i), [], triggerTime);
            });

            tl.call(
                () => {
                    gsap.delayedCall(1, () => {
                        cardsRef.current.forEach((card) => {
                            if (!card) return;
                            gsap.set(card, {
                                y: 0,
                                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                                borderColor: "rgba(0,0,0,0.06)",
                            });
                        });
                        circlesRef.current.forEach((circle) => {
                            if (!circle) return;
                            gsap.set(circle, {
                                scale: 1,
                                backgroundColor: "#ffffff",
                                borderColor: "#d1d5db",
                            });
                        });
                        activeIndexRef.current = -1;
                        setActiveIndex(0);
                    });
                },
                [],
                totalDuration + 0.01
            );

            return () => {
                tl.kill();
            };
        });

        return () => mm.revert();
    }, [steps.length]);

    return (
        <section ref={sectionRef} className="relative py-16 md:py-24 bg-gray-50 overflow-hidden">
            <SidePattern />

            <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center relative z-10 px-2 sm:px-4">
                {/* Header */}
                <div className="flex flex-col items-center justify-center gap-4 text-center mb-10 md:mb-14">
                    <div className="bg-regal-navy/5 border border-regal-navy/10 flex items-center justify-center px-[18px] py-[8px] rounded-[4px]">
                        <span className="font-sans text-[12px] text-regal-navy text-center">
                            {badge}
                        </span>
                    </div>
                    <h2 className="font-headings font-normal text-2xl md:text-[30px] leading-snug text-carbon-black max-w-[1200px]">
                        {heading}
                    </h2>
                </div>

                {/* ─── Desktop timeline track (md+) ─── */}
                <div className="hidden md:block relative mb-6 w-full">
                    {/* Base gray line */}
                    <div className="absolute top-[6px] left-0 right-0 h-[2px] bg-gray-200" />

                    {/* Animated navy progress line */}
                    <div
                        ref={progressLineRef}
                        className="absolute top-[6px] left-0 h-[2px] bg-[#0E3572]"
                        style={{ width: "0%" }}
                    />

                    {/* Dashed leader extending from active circle */}
                    {activeIndex < steps.length - 1 && (
                        <div
                            className="absolute top-[6px] h-[2px]"
                            style={{
                                left: `${(activeIndex / (steps.length - 1)) * 100}%`,
                                right: `${100 - ((activeIndex + 1) / (steps.length - 1)) * 100}%`,
                                backgroundImage:
                                    "repeating-linear-gradient(90deg, #0E3572 0, #0E3572 6px, transparent 6px, transparent 12px)",
                                opacity: 0.4,
                            }}
                        />
                    )}

                    {/* Step circles */}
                    <div className="relative flex justify-between">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                ref={(el) => { circlesRef.current[i] = el; }}
                                className="w-[14px] h-[14px] rounded-full border-2 border-gray-300 bg-white cursor-pointer relative z-10"
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                </div>

                {/* ─── Cards — single source of truth for both breakpoints ─── */}
                {/*
          On mobile  : flex-col  → vertical stack with left border accent
          On desktop : flex-row  → horizontal card row (existing design)
        */}
                <div className="flex flex-col gap-4 md:flex-row md:gap-2">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className={[
                                // Shared
                                "flex-1 bg-white rounded-lg border p-3 xl:p-6 cursor-pointer transition-colors",
                                // Mobile-only: left accent border for active step
                                i === activeIndex
                                    ? "border-l-4 border-l-[#0E3572] md:border-l"
                                    : "border-l-4 border-l-transparent md:border-l",
                            ].join(" ")}
                            ref={(el) => { cardsRef.current[i] = el; }}
                            onClick={() => setActiveIndex(i)}
                            style={{
                                boxShadow:
                                    i === activeIndex
                                        ? "0 8px 30px rgba(0,0,0,0.08)"
                                        : "0 1px 3px rgba(0,0,0,0.04)",
                                borderColor:
                                    i === activeIndex
                                        ? "rgba(14, 53, 114, 0.2)"
                                        : "rgba(0,0,0,0.06)",
                            }}
                        >
                            {/* Mobile: inline circle + number in a row */}
                            <div className="flex items-center gap-3 md:block">
                                {/* Circle — visible only on mobile (desktop uses the track above) */}
                                <div
                                    className={[
                                        "md:hidden flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-colors",
                                        i === activeIndex
                                            ? "bg-[#0E3572] border-[#0E3572] text-white"
                                            : "bg-white border-gray-300 text-gray-400",
                                    ].join(" ")}
                                >
                                    {i + 1}
                                </div>

                                <span className="hidden md:block text-xs font-bold text-[#0E3572] md:mb-1 md:block">
                                    {i + 1}.
                                </span>
                            </div>

                            <h3 className="text-sm md:text-base font-semibold text-gray-900 mt-1">
                                {step.title}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-500 mt-1 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                {ctaLabel && (
                    <div className="text-center mt-10">
                        <button className="inline-flex items-center gap-2 bg-[#0E3572] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#0c2d60] transition-colors">
                            {ctaLabel}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
