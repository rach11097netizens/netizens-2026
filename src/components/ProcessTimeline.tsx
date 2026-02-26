import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SidePattern } from "./SidePattern";
import { Button } from "./Button";

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
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const circlesRef = useRef<(HTMLDivElement | null)[]>([]);
    const progressLineRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const activeIndexRef = useRef(0);

    const activateStep = (index: number) => {
        activeIndexRef.current = index;
        setActiveIndex(index);

        cardsRef.current.forEach((card, i) => {
            if (!card) return;
            gsap.to(card, {
                y: i === index ? -4 : 0,
                boxShadow: i === index
                    ? "0 8px 30px rgba(0,0,0,0.08)"
                    : "0 1px 3px rgba(0,0,0,0.04)",
                borderColor: i === index
                    ? "rgba(14, 53, 114, 0.2)"
                    : "rgba(0,0,0,0.06)",
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
                {
                    width: "100%",
                    duration: totalDuration,
                    ease: "none",
                }
            );

            steps.forEach((_, i) => {
                const triggerTime = (i / (steps.length - 1)) * totalDuration;
                tl.call(() => activateStep(i), [], triggerTime);
            });

            tl.call(() => {
                gsap.delayedCall(1, () => {
                    cardsRef.current.forEach((card) => {
                        if (!card) return;
                        gsap.set(card, { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", borderColor: "rgba(0,0,0,0.06)" });
                    });
                    circlesRef.current.forEach((circle) => {
                        if (!circle) return;
                        gsap.set(circle, { scale: 1, backgroundColor: "#ffffff", borderColor: "#d1d5db" });
                    });
                    activeIndexRef.current = -1;
                    setActiveIndex(0);
                });
            }, [], totalDuration + 0.01);

            return () => {
                tl.kill();
            };
        });

        return () => mm.revert();
    }, [steps.length]);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-white py-12 sm:py-16 md:py-20 flex flex-col items-center overflow-hidden px-4 relative"
        >
            <SidePattern invert />

            <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center gap-10 md:gap-14 relative z-10">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="bg-regal-navy/5 border border-regal-navy/10 flex items-center justify-center px-[18px] py-[8px] rounded-[4px]">
                        <span className="font-sans text-[12px] text-regal-navy text-center">
                            {badge}
                        </span>
                    </div>
                    <h2 className="font-headings font-normal text-2xl md:text-3xl leading-snug text-carbon-black max-w-[800px]">
                        {heading}
                    </h2>
                </div>

                {/* Desktop: horizontal timeline */}
                <div className="hidden md:flex flex-col w-full gap-0">
                    {/* Timeline track */}
                    <div className="relative w-full">
                        <div className="flex justify-between items-center relative">
                            {/* Base gray line */}
                            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200" />
                            {/* Animated navy progress line */}
                            <div
                                ref={progressLineRef}
                                className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-regal-navy"
                                style={{ width: "0%" }}
                            />
                            {/* Dashed leader extending from active circle */}
                            {activeIndex < steps.length - 1 && (
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 h-[2px] border-t-2 border-dashed border-regal-navy pointer-events-none"
                                    style={{
                                        left: `calc(${(activeIndex / (steps.length - 1)) * 100}% + 10px)`,
                                        width: "36px",
                                    }}
                                />
                            )}

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

                    {/* Cards row */}
                    <div className="grid mt-6" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: "12px" }}>
                        {steps.map((step, i) => (
                            <div
                                key={i}
                                ref={(el) => { cardsRef.current[i] = el; }}
                                className="bg-white rounded-lg border border-transparent p-5 md:p-6 flex flex-col gap-3 cursor-pointer transition-colors"
                                onClick={() => setActiveIndex(i)}
                                style={{
                                    boxShadow: i === activeIndex
                                        ? "0 8px 30px rgba(0,0,0,0.08)"
                                        : "0 1px 3px rgba(0,0,0,0.04)",
                                    borderColor: i === activeIndex
                                        ? "rgba(14, 53, 114, 0.2)"
                                        : "rgba(0,0,0,0.06)",
                                }}
                            >
                                <span className="font-headings font-normal text-xl text-regal-navy/40">
                                    {i + 1}.
                                </span>
                                <h3 className="font-headings font-semibold text-base text-carbon-black leading-snug">
                                    {step.title}
                                </h3>
                                <p className="font-sans font-medium text-sm text-gray-600/70 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile: compact vertical list */}
                <div className="flex md:hidden flex-col w-full gap-0">
                    {steps.map((step, i) => (
                        <div key={i} className="flex gap-4 items-stretch">
                            {/* Vertical line + circle */}
                            <div className="flex flex-col items-center">
                                <div className="w-[14px] h-[14px] rounded-full border-2 border-regal-navy bg-regal-navy shrink-0 mt-5" />
                                {i < steps.length - 1 && (
                                    <div className="w-[2px] bg-regal-navy/20 flex-1 min-h-[20px]" />
                                )}
                            </div>

                            {/* Card content */}
                            <div className="flex-1 pb-4">
                                <div className="bg-white rounded-lg border border-black/6 p-4 shadow-sm">
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="font-headings font-normal text-lg text-regal-navy/40">
                                            {i + 1}.
                                        </span>
                                        <h3 className="font-headings font-semibold text-sm text-carbon-black leading-snug">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="font-sans font-medium text-xs text-gray-600/70 leading-relaxed pl-7">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {ctaLabel && (
                    <div className="flex justify-center mt-2">
                        <a href="#" className="px-8 py-4 bg-button-gradient text-white text-sm rounded-button transition-colors flex items-center justify-center gap-2 font-medium">
                            {ctaLabel}
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
