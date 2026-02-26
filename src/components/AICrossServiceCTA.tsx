import { Link } from "react-router-dom";
import { SidePattern } from "./SidePattern";
import patternImg from "../assets/images/pattern.png";
import strengthLayerIcon from "../assets/images/ai-automation-3icon-cta/strength-layer.svg";
import productiveAiIcon from "../assets/images/ai-automation-3icon-cta/productive-ai.svg";
import scaleConfidenceIcon from "../assets/images/ai-automation-3icon-cta/scale-with-confidence.svg";

const cards = [
    {
        icon: strengthLayerIcon,
        title: "Strengthen the Workflow Layer",
        description: "If workflows are fragmented or manual, AI can only go so far. We help structure systems, connect tools, and build clean operational flows that AI can operate within.",
        cta: "Explore Workflow Digitization",
        href: "/workflow-digitization",
    },
    {
        icon: productiveAiIcon,
        title: "Productize the AI",
        description: "If your AI automation proves valuable, we help turn it into a scalable product or internal platform with proper UX, architecture, and performance.",
        cta: "Explore MVP Development",
        href: "/mvp-development",
    },
    {
        icon: scaleConfidenceIcon,
        title: "Scale with Confidence",
        description: "We monitor performance, refine prompts and models, manage costs, and ensure your AI systems stay accurate and dependable as usage grows.",
        cta: "Explore Support & Scale",
        href: "/support-and-scale",
    },
];

export function AICrossServiceCTA() {
    return (
        <section className="w-full bg-white py-12 sm:py-16 md:py-20 overflow-hidden relative">
            <SidePattern invert />
            <div className="max-w-[1200px] mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {cards.map((card, i) => (
                        <div
                            key={i}
                            className="bg-regal-navy rounded-xl p-7 md:p-8 flex flex-col gap-5 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 pointer-events-none opacity-10">
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

                            <div className="relative z-10 flex flex-col gap-5 flex-1">
                                <div className="bg-white/10 rounded-[8px] p-1.5 w-fit">
                                    <img src={card.icon} alt={card.title} className="w-12 h-12 object-contain" />
                                </div>
                                <h3 className="font-headings font-semibold text-xl text-white leading-snug">
                                    {card.title}
                                </h3>
                                <p className="font-sans font-medium text-sm text-white/70 leading-relaxed flex-1">
                                    {card.description}
                                </p>
                            </div>

                            <Link
                                to={card.href}
                                className="relative z-10 bg-white text-regal-navy font-sans font-medium text-sm px-6 py-3 rounded-[6px] hover:bg-white/90 transition-colors text-center"
                            >
                                {card.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
