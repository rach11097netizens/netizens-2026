"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SidePattern } from "./SidePattern";
import Link from "next/link";

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
    const progressLineRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    const n = steps.length;
    // Each column is flex-1 equal width → dot centers sit at (2i+1)/(2n) * 100%
    // Line spans from first dot center to last dot center
    const firstDotPct = `${(1 / (2 * n)) * 100}%`;   // 12.5% for n=4
    const lastDotPct = `${(1 / (2 * n)) * 100}%`;   // same inset from right

    const activateStep = (index: number) => {
        setActiveIndex(index);

        cardsRef.current.forEach((card, i) => {
            if (!card) return;
            gsap.to(card, {
                opacity: i === index ? 1 : 0.5,
                boxShadow:
                    i === index
                        ? "0px 8px 18px 0px rgba(0,0,0,0.10), 0px 33px 33px 0px rgba(0,0,0,0.09), 0px 75px 45px 0px rgba(0,0,0,0.05)"
                        : "none",
                borderColor: i === index ? "#0E3572" : "rgba(14,53,114,0.1)",
                duration: 0.35,
                ease: "power2.out",
            });
        });

        circlesRef.current.forEach((circle, i) => {
            if (!circle) return;
            // Dot is filled navy if it has been reached (i <= index), else empty
            gsap.to(circle, {
                backgroundColor: i <= index ? "#0E3572" : "#ffffff",
                borderColor: i <= index ? "#0E3572" : "#d1d5db",
                scale: i === index ? 1.25 : 1,
                duration: 0.3,
                ease: "power2.out",
            });
        });
    };

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const stepDuration = 2.5;
                const lastStepDuration = 2.5;
                const sweepDuration = (n - 1) * stepDuration;
                const totalDuration = sweepDuration + lastStepDuration;

                const tl = gsap.timeline({ repeat: -1, delay: 0.3 });

                gsap.set(progressLineRef.current, { scaleX: 0 });
                gsap.set(circlesRef.current[0], { scale: 1.25 });

                const triggerTime = (i: number) =>
                    i === 0
                        ? 0.01
                        : i === n - 1
                            ? sweepDuration + 0.05
                            : (i / (n - 1)) * sweepDuration;

                tl.fromTo(
                    progressLineRef.current,
                    { scaleX: 0 },
                    { scaleX: 1, duration: sweepDuration, ease: "none" }
                ).to(
                    progressLineRef.current,
                    { scaleX: 1, duration: lastStepDuration, ease: "none" }
                );

                steps.forEach((_, i) => {
                    tl.call(() => activateStep(i), [], triggerTime(i));
                });

                tl.call(
                    () => {
                        gsap.delayedCall(0.6, () => {
                            cardsRef.current.forEach((card, i) => {
                                if (!card) return;
                                gsap.to(card, {
                                    opacity: i === 0 ? 1 : 0.5,
                                    boxShadow: i === 0
                                        ? "0px 8px 18px 0px rgba(0,0,0,0.10), 0px 33px 33px 0px rgba(0,0,0,0.09)"
                                        : "none",
                                    borderColor: i === 0 ? "#0E3572" : "rgba(14,53,114,0.1)",
                                    duration: 0.3,
                                });
                            });
                            circlesRef.current.forEach((circle, i) => {
                                if (!circle) return;
                                gsap.to(circle, {
                                    backgroundColor: i === 0 ? "#0E3572" : "#ffffff",
                                    borderColor: i === 0 ? "#0E3572" : "#d1d5db",
                                    scale: i === 0 ? 1.25 : 1,
                                    duration: 0.3,
                                });
                            });
                            setActiveIndex(0);
                        });
                    },
                    [],
                    totalDuration
                );

                // No need for a manual kill if we revert ctx
            });
        }, section);

        return () => ctx.revert();
    }, [n]);

    return (
        <section ref={sectionRef} className="relative py-16 md:py-24 bg-gray-50 overflow-hidden">
            <SidePattern />

            <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center relative z-10 px-4 sm:px-6">

                {/* Header */}
                <div className="flex flex-col items-center justify-center gap-2 text-center mb-10 md:mb-14">
                    <div className="bg-regal-navy/5 border border-regal-navy/10 flex items-center justify-center px-[18px] py-2 rounded-[4px]">
                        <span className="font-sans text-[12px] text-regal-navy">{badge}</span>
                    </div>
                    <h2 className="font-headings font-normal text-2xl lg:text-3xl leading-snug text-carbon-black">
                        {heading}
                    </h2>
                </div>

                {/* ─── Desktop timeline (md+) ─── */}
                <div className="hidden md:flex gap-[12px] relative w-full">

                    {/*
                      ── Connecting lines ──
                      Both lines are absolutely positioned, vertically centered on the dots (dot = 20px tall, center = top + 10px).
                      They span from the first dot center to the last dot center.
                      left/right = 1/(2n) * 100% keeps them anchored to dot centers regardless of container width.
                    */}

                    {/* Gray base line */}
                    <div
                        className="absolute top-[10px] h-[1.5px] bg-gray-200 -translate-y-1/2 z-0 pointer-events-none"
                        style={{ left: firstDotPct, right: lastDotPct }}
                    />

                    {/* Navy progress line — scaleX 0→1, origin-left */}
                    <div
                        ref={progressLineRef}
                        className="absolute top-[10px] h-[1.5px] bg-[#0E3572] -translate-y-1/2 z-0 origin-left pointer-events-none"
                        style={{ left: firstDotPct, right: lastDotPct }}
                    />

                    {/* Step columns — dot on top, card below */}
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="flex-1 flex flex-col items-center gap-[18px] min-w-0 relative z-[5]"
                        >
                            {/* Dot */}
                            <div
                                ref={(el) => { circlesRef.current[i] = el; }}
                                className="w-5 h-5 rounded-full border-2 cursor-pointer flex-shrink-0"
                                style={{
                                    backgroundColor: i === 0 ? "#0E3572" : "#ffffff",
                                    borderColor: i === 0 ? "#0E3572" : "#d1d5db",
                                    zIndex: 10,
                                    // transform intentionally omitted — GSAP owns scale
                                    // to prevent React re-renders from fighting the animation
                                }}
                                onClick={() => activateStep(i)}
                            />

                            {/* Card */}
                            <div
                                ref={(el) => { cardsRef.current[i] = el; }}
                                className="w-full bg-white rounded-[10px] border p-[18px] flex flex-col gap-[10px] h-full cursor-pointer"
                                style={{
                                    opacity: i === 0 ? 1 : 0.5,
                                    borderColor: i === 0 ? "#0E3572" : "rgba(14,53,114,0.1)",
                                    boxShadow: i === 0
                                        ? "0px 8px 18px 0px rgba(0,0,0,0.10), 0px 33px 33px 0px rgba(0,0,0,0.09), 0px 75px 45px 0px rgba(0,0,0,0.05)"
                                        : "none",
                                    transition: "none", // GSAP owns these properties
                                }}
                                onClick={() => activateStep(i)}
                            >
                                <p className="font-headings font-normal text-[18px] leading-[25px] text-black">
                                    {i + 1}.
                                </p>
                                <p className="font-headings font-normal text-[18px] leading-[25px] text-black">
                                    {step.title}
                                </p>
                                <p className="font-sans font-medium text-[14px] leading-[22px] text-[rgba(88,89,91,0.75)]">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ─── Mobile: vertical stack ─── */}
                <div className="flex md:hidden flex-col gap-4 w-full">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className={[
                                "bg-white rounded-lg border p-4 flex items-start gap-3 cursor-pointer",
                                i === activeIndex
                                    ? "border-l-4 border-l-[#0E3572] border-[#0E3572] shadow-md"
                                    : "border-l-4 border-l-transparent border-[rgba(14,53,114,0.1)] opacity-60",
                            ].join(" ")}
                            onClick={() => activateStep(i)}
                        >
                            <div
                                className={[
                                    "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold",
                                    i === activeIndex
                                        ? "bg-[#0E3572] border-[#0E3572] text-white"
                                        : "bg-white border-gray-300 text-gray-400",
                                ].join(" ")}
                            >
                                {i + 1}
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="text-sm font-semibold text-gray-900">{step.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                {ctaLabel && (
                    <div className="text-center mt-10">
                        <Link href="/how-we-work" className="px-8 py-4 bg-button-gradient text-white text-sm rounded-button transition-colors flex items-center justify-center gap-2 font-medium">
                            {ctaLabel}
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
