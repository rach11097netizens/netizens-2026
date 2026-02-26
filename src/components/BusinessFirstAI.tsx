import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SidePattern } from "./SidePattern";
import patternImg from "../assets/images/pattern.png";

gsap.registerPlugin(ScrollTrigger);

export function BusinessFirstAI() {
    const pillsContainerRef = useRef<HTMLDivElement>(null);
    const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const container = pillsContainerRef.current;
        const pills = pillRefs.current.filter(Boolean);
        if (!container || pills.length === 0) return;

        const finalRotations = [-65, -35, -30, -0];
        const containerH = container.getBoundingClientRect().height;

        pills.forEach((pill, i) => {
            gsap.set(pill!, { y: -containerH, opacity: 0, rotation: finalRotations[i] - 10 });
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
            },
        });

        pills.forEach((pill, i) => {
            tl.to(pill!, {
                y: 0,
                opacity: 1,
                rotation: finalRotations[i],
                duration: 0.8,
                ease: "bounce.out",
            }, i * 0.18);
        });

        return () => { tl.kill(); };
    }, []);

    return (
        <section className="w-full bg-[#FFFAFA] py-12 sm:py-12 md:py-16 overflow-hidden relative">
            <SidePattern invert />
            <div className="max-w-[1200px] mx-auto px-4 relative z-10">
                <div className="bg-white rounded-[34px] border border-black/5 p-4 md:p-6 flex flex-col md:flex-row items-center gap-10 md:gap-16 shadow-sm">
                    <div className="flex-1 flex flex-col gap-5">
                        <div className="bg-regal-navy/5 border border-regal-navy/10 flex items-center justify-center px-[18px] py-[8px] rounded-[4px] w-fit">
                            <span className="font-sans text-[12px] text-regal-navy">The Netizens Approach to AI</span>
                        </div>
                        <h2 className="font-headings font-normal text-2xl md:text-3xl leading-snug text-carbon-black">
                            Business-First AI Implementation
                        </h2>
                        <p className="font-sans font-medium text-sm md:text-base text-gray-600/75 leading-relaxed max-w-[600px]">
                            Most AI consulting companies start with models. We start with workflows. We study how work actually moves across teams, tools, approvals, and decisions — then apply AI where it removes friction and creates measurable leverage. That's the difference between an AI demo and operational impact.
                        </p>
                    </div>

                    <div className="w-full md:w-[420px] shrink-0">
                        <div className="bg-regal-navy rounded-xl relative aspect-[4/3]">
                            <div className="absolute inset-0 pointer-events-none opacity-10 rounded-xl overflow-hidden">
                                <div
                                    className="absolute inset-0 w-full h-full mix-blend-screen"
                                    style={{
                                        opacity: 0.5,
                                        backgroundImage: `url(${patternImg})`,
                                        backgroundRepeat: "repeat",
                                        backgroundSize: "600px",
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

                            <div ref={pillsContainerRef} className="absolute inset-0 overflow-hidden rounded-xl">
                                <div
                                    ref={(el) => { pillRefs.current[0] = el; }}
                                    className="absolute bg-white/12 backdrop-blur-sm border border-white/15 rounded-full px-7 py-3.5 shadow-lg"
                                    style={{ top: "59%", left: "-11.5%" }}
                                >
                                    <span className="font-sans font-medium text-[15px] text-white whitespace-nowrap">Business-first thinking</span>
                                </div>

                                <div
                                    ref={(el) => { pillRefs.current[1] = el; }}
                                    className="absolute bg-white/12 backdrop-blur-sm border border-white/15 rounded-full px-7 py-3.5 shadow-lg"
                                    style={{ top: "68%", left: "10%" }}
                                >
                                    <span className="font-sans font-medium text-[15px] text-white whitespace-nowrap">Production-ready delivery</span>
                                </div>

                                <div
                                    ref={(el) => { pillRefs.current[2] = el; }}
                                    className="absolute bg-white/12 backdrop-blur-sm border border-white/15 rounded-full px-7 py-3.5 shadow-lg"
                                    style={{ top: "56%", right: "-2%" }}
                                >
                                    <span className="font-sans font-medium text-[15px] text-white whitespace-nowrap">Measurable ROI</span>
                                </div>

                                <div
                                    ref={(el) => { pillRefs.current[3] = el; }}
                                    className="absolute bg-white/12 backdrop-blur-sm border border-white/15 rounded-full px-7 py-3.5 shadow-lg"
                                    style={{ bottom: "0%", left: "40%" }}
                                >
                                    <span className="font-sans font-medium text-[15px] text-white whitespace-nowrap">Workflow fluency</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
