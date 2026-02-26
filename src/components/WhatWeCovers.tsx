import discoveryCallImage from '../assets/images/discovery-call-main-image.svg';
import { SidePattern } from './SidePattern';

const STEPS = [
    {
        label: "1.",
        title: "Your Current Situation & Goals",
        description: "Where you are today, what you've built so far, and what success looks like for you.",
    },
    {
        label: "2.",
        title: "The Problem You're Trying to Solve",
        description: "The bottleneck, challenge, or opportunity you want to address — technical, product, or business.",
    },
    {
        label: "3.",
        title: "Possible Approaches & Next Steps",
        description: "High-level solution directions, trade-offs, and what a realistic path forward could look like.",
    },
    {
        label: "4.",
        title: "Timeline, Budget & Expectations",
        description: "Early alignment on timelines, investment range, and how we'd structure engagement if we move ahead.",
    },
];

export function WhatWeCovers() {
    return (
        <section className="relative w-full bg-white py-12 md:py-20 overflow-hidden">
            <SidePattern invert />

            <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 flex flex-col items-center">
                {/* Header */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="bg-regal-navy/5 border border-regal-navy/10 inline-flex items-center justify-center px-[18px] py-[8px] rounded-[4px]">
                        <span className="font-sans font-bold text-[12px] text-regal-navy text-center">
                            What We'll Cover
                        </span>
                    </div>
                    <h2 className="font-headings font-normal text-2xl md:text-3xl text-carbon-black">
                        What Happens in a Discovery Call
                    </h2>
                </div>

                {/* Illustration + inline separator */}
                <div className="w-full overflow-hidden">
                    <img
                        src={discoveryCallImage}
                        alt="Discovery Call Process illustration"
                        className="w-full h-auto object-contain block"
                    />
                    <div
                        className="w-full h-5 md:h-8 lg:h-10 bg-[#FFFAFA] border border-[rgba(14,53,114,0.1)]"
                        aria-hidden="true"
                        style={{
                            backgroundImage: "linear-gradient(90deg, rgba(14, 53, 114, 0.1) 1px, transparent 1px)",
                            backgroundSize: "15px 100%",
                            backgroundPosition: "center center",
                        }}
                    />
                </div>

                {/* Step Cards */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-charcoal/10 rounded-b-[10px] overflow-hidden">
                    {STEPS.map((step, i) => (
                        <div
                            key={i}
                            className={`p-6 flex flex-col gap-3 ${i < STEPS.length - 1 ? 'border-b sm:border-b lg:border-b-0 lg:border-r border-charcoal/10' : ''}`}
                        >
                            <span className="font-sans font-bold text-sm text-charcoal/40">
                                {step.label}
                            </span>
                            <h3 className="font-headings font-normal text-lg text-carbon-black leading-snug">
                                {step.title}
                            </h3>
                            <p className="font-sans font-medium text-sm text-charcoal/70 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
