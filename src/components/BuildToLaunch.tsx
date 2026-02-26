import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Images & Icons
import iconDarkTick from "../assets/images/navy-dark-tick.svg";
import iconLightTick from "../assets/images/light-tick.svg";

import imgDiscover from "../assets/images/build-launch/discover-img.svg";
import imgBuild from "../assets/images/build-launch/build-img.svg";
import imgLaunch from "../assets/images/build-launch/launch-img.svg";
import { SidePattern } from "./SidePattern";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function BuildToLaunch() {
    const sectionRef = useRef<HTMLElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);

    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);
    const card3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !leftColRef.current || !rightColRef.current) return;

        const c1 = card1Ref.current;
        const c2 = card2Ref.current;
        const c3 = card3Ref.current;

        if (!c1 || !c2 || !c3) return;

        // Create a Timeline for the stacking effect
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top", // Trigger when the section hits the top
                end: "+=200%",    // Pin for double the height to allow scroll
                pin: true,        // Pin the entire section
                scrub: 1,         // Smooth scrubbing
                anticipatePin: 1
            }
        });

        // Set initial states for cards 2 and 3 (below viewport or scaled down)
        gsap.set([c2, c3], { y: "100%", opacity: 0 });

        // Animation Sequence
        // 1. Bring in Card 2, slightly push back Card 1
        tl.to(c1, { scale: 0.95, opacity: 0.5, y: -20, duration: 1 })
            .to(c2, { y: 0, opacity: 1, duration: 1 }, "<");

        // 2. Bring in Card 3, slightly push back Card 2 (Card 1 drops further)
        tl.to(c1, { scale: 0.9, opacity: 0.2, y: -40, duration: 1 })
            .to(c2, { scale: 0.95, opacity: 0.5, y: -20, duration: 1 }, "<")
            .to(c3, { y: 0, opacity: 1, duration: 1 }, "<");

        return () => {
            // Cleanup ScrollTrigger instances
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-[#FFFAFA] py-12 md:py-16 overflow-hidden relative"
        >
            <SidePattern invert={true} />
            <div className="w-full max-w-[1320px] mx-auto px-4 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start h-full">

                {/* Left Column (Stacking Cards) */}
                <div
                    ref={leftColRef}
                    className="w-full lg:w-2/3 relative min-h-[500px] md:min-h-[600px] h-full"
                >
                    {/* Header for Left Column */}
                    <div className="mb-8 md:mb-12 relative z-20">
                        <div className="bg-regal-navy/5 border border-regal-navy/10 inline-flex items-center justify-center px-[18px] py-[8px] rounded-[4px] shrink-0 mb-4">
                            <span className="font-sans text-[12px] text-regal-navy text-center">
                                Build, launch, learn
                            </span>
                        </div>
                        <h2 className="font-headings font-normal text-2xl md:text-3xl leading-snug text-carbon-black max-w-lg">
                            The MVP cycle we run with you
                        </h2>
                    </div>

                    {/* Stacking Cards Container */}
                    <div className="relative w-full h-[360px] md:h-[400px]">

                        {/* Card 1: Discover */}
                        <div
                            ref={card1Ref}
                            className="absolute inset-0 w-full bg-white rounded-xl border border-carbon-black/10 shadow-lg p-2 md:p-6 flex flex-col md:flex-row gap-8 will-change-transform z-10"
                        >
                            <div className="flex-1 flex flex-col gap-4">
                                <h3 className="font-headings text-2xl text-carbon-black">Discover</h3>
                                <p className="font-sans text-base text-carbon-black/70">
                                    Align on the problem, users, and MVP scope before writing code.
                                </p>
                                <div className="mt-4 flex flex-col gap-3">
                                    <h4 className="font-sans text-sm font-bold text-regal-navy">Includes</h4>
                                    <ul className="flex flex-col gap-2">
                                        {[
                                            "Product goals & success metrics",
                                            "Feature prioritization",
                                            "MVP scope definition",
                                            "Technical feasibility review"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <img src={iconDarkTick} alt="tick" className="w-[18px] h-[18px]" />
                                                <span className="font-sans text-sm text-regal-navy">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex-1 rounded-lg overflow-hidden flex items-center justify-center ">
                                <img src={imgDiscover} alt="Discover Phase" className="w-full h-auto object-cover" />
                            </div>
                        </div>

                        {/* Card 2: Build */}
                        <div
                            ref={card2Ref}
                            className="absolute inset-0 w-full bg-white rounded-xl border border-carbon-black/10 shadow-xl p-2 md:p-6 flex flex-col md:flex-row gap-8 will-change-transform z-20"
                        >
                            <div className="flex-1 flex flex-col gap-4">
                                <h3 className="font-headings text-2xl text-carbon-black">Build</h3>
                                <p className="font-sans text-base text-carbon-black/70">
                                    Design and build the MVP in focused sprints, with speed and quality balanced.
                                </p>
                                <div className="mt-4 flex flex-col gap-3">
                                    <h4 className="font-sans text-sm font-bold text-regal-navy">Includes</h4>
                                    <ul className="flex flex-col gap-2">
                                        {[
                                            "UX/UI design",
                                            "MVP development (web or mobile)",
                                            "Agile sprint-based delivery",
                                            "Continuous feedback loops"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <img src={iconDarkTick} alt="tick" className="w-[18px] h-[18px]" />
                                                <span className="font-sans text-sm text-regal-navy">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex-1 rounded-lg overflow-hidden flex items-center justify-center ">
                                <img src={imgBuild} alt="Build Phase" className="w-full h-auto object-cover" />
                            </div>
                        </div>

                        {/* Card 3: Launch */}
                        <div
                            ref={card3Ref}
                            className="absolute inset-0 w-full bg-white rounded-xl border border-carbon-black/10 shadow-2xl p-2 md:p-6 flex flex-col md:flex-row gap-8 will-change-transform z-30"
                        >
                            <div className="flex-1 flex flex-col gap-4">
                                <h3 className="font-headings text-2xl text-carbon-black">Launch & Iterate</h3>
                                <p className="font-sans text-base text-carbon-black/70">
                                    Launch early, learn from real users, and improve toward V2.
                                </p>
                                <div className="mt-4 flex flex-col gap-3">
                                    <h4 className="font-sans text-sm font-bold text-regal-navy">Includes</h4>
                                    <ul className="flex flex-col gap-2">
                                        {[
                                            "Launch support",
                                            "User feedback analysis",
                                            "Iterative improvements",
                                            "V2 and scaling recommendations"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <img src={iconDarkTick} alt="tick" className="w-[18px] h-[18px]" />
                                                <span className="font-sans text-sm text-regal-navy">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex-1 rounded-lg overflow-hidden flex items-center justify-center ">
                                <img src={imgLaunch} alt="Launch Phase" className="w-full h-auto object-cover" />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Column (Sticky Models) */}
                <div
                    ref={rightColRef}
                    className="w-full lg:w-1/3 mt-12 lg:mt-20 relative z-40"
                // On desktop, it relies on GSAP pinning parent, but visually it acts like it's sticky next to the animating cards structure
                >
                    <div className="bg-regal-navy rounded-xl p-2 md:p-6 flex flex-col gap-8 shadow-2xl">

                        <div className="flex flex-col gap-2">
                            <h3 className="font-headings text-[26px] md:text-[30px] leading-tight text-white">
                                We offer flexible engagement models.
                            </h3>
                            <p className="font-sans font-medium text-sm text-white/75 mt-2">
                                Choose the approach that fits your timeline, scope and budget.
                            </p>
                        </div>

                        <hr className="border-t border-white/20 w-full" />

                        <div className="flex flex-col gap-6">

                            {/* Model 1 */}
                            <div className="flex items-start gap-4">
                                <img src={iconLightTick} alt="tick" className="w-6 h-6 mt-0.5 shrink-0" />
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-sans font-bold text-sm text-white">Fixed Scope</h4>
                                    <p className="font-sans font-medium text-xs text-white/80">Best for clearly defined MVPs</p>
                                </div>
                            </div>

                            {/* Model 2 */}
                            <div className="flex items-start gap-4">
                                <img src={iconLightTick} alt="tick" className="w-6 h-6 mt-0.5 shrink-0" />
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-sans font-bold text-sm text-white">Sprints</h4>
                                    <p className="font-sans font-medium text-xs text-white/80">Ideal for evolving ideas and fast validation</p>
                                </div>
                            </div>

                            {/* Model 3 */}
                            <div className="flex items-start gap-4">
                                <img src={iconLightTick} alt="tick" className="w-6 h-6 mt-0.5 shrink-0" />
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-sans font-bold text-sm text-white">Dedicated Teams</h4>
                                    <p className="font-sans font-medium text-xs text-white/80">Ongoing product development and scale</p>
                                </div>
                            </div>

                        </div>

                        <div className="mt-2 w-full">
                            <button className="w-full py-4 bg-white hover:bg-gray-50 text-carbon-black font-sans font-medium text-sm rounded transition-colors duration-200 border border-black/10 shadow-sm flex items-center justify-center">
                                Learn how we build
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
