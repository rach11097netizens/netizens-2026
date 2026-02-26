import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SidePattern } from './SidePattern';
import iconNavyTick from '../assets/images/icons/blue-bullet-icon.svg';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
    title: string;
    description: string;
    items: string[];
    cta: string;
    index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, items, cta, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(cardRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 90%",
                    }
                }
            );
        }
    }, [index]);

    return (
        <div
            ref={cardRef}
            className="bg-white rounded-[20px] p-4 xl:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)] transition-shadow duration-300"
        >
            <h3 className="font-headings text-2xl text-carbon-black mb-4">{title}</h3>
            <p className="font-sans text-sm text-gray-500 mb-8 leading-relaxed">
                {description}
            </p>

            <div className="flex flex-col gap-4 mb-10 mt-auto">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                        <div className="mt-0.5 flex-shrink-0">
                            <img src={iconNavyTick} alt="tick" className="w-5 h-5" />
                        </div>
                        <span className="font-sans text-[15px] font-medium text-regal-navy">
                            {item}
                        </span>
                    </div>
                ))}
            </div>

            <button
                className="w-full bg-regal-navy/10 hover:bg-regal-navy text-regal-navy hover:text-white font-bold py-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 mt-auto"
            >
                {cta}
            </button>
        </div>
    );
};

export const ServiceModelsSection: React.FC = () => {
    return (
        <section className="py-24 px-4 bg-[#FFFAFA] relative overflow-hidden">
            <SidePattern invert />
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block bg-[#F3F4F6] px-4 py-1.5 rounded-md border border-gray-200 mb-6">
                        <span className="text-xs font-semibold text-regal-navy uppercase tracking-wider">
                            What we can help with
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-headings text-carbon-black mb-6">
                        These models power every service we offer
                    </h2>
                    <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                        Start with the service, then choose the delivery model that fits your timeline and risk level.
                    </p>
                </div>

                {/* Top Row: 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <ServiceCard
                        index={0}
                        title="MVP Design & Development"
                        description="Turn your idea into a usable MVP with clear scope, clean architecture, and launch-ready execution."
                        items={[
                            "Founders & product teams shipping v1",
                            "New products, redesigns, or rebuilds"
                        ]}
                        cta="Build MVP"
                    />
                    <ServiceCard
                        index={1}
                        title="Workflow Digitization"
                        description="Replace spreadsheet ops with connected systems, automations, and dashboards your teams actually use."
                        items={[
                            "Ops/IT leaders scaling processes",
                            "ERP/CRM + integrations + automation"
                        ]}
                        cta="Digitize Workflows"
                    />
                    <ServiceCard
                        index={2}
                        title="AI Consulting & Automation"
                        description="Apply LLMs to real business workflows, integrate tools, and ship measurable automation that sticks."
                        items={[
                            "Teams adopting AI workflows/LLMs",
                            "AI pilots, integrations, prompt systems"
                        ]}
                        cta="Explore AI Consulting"
                    />
                </div>

                {/* Bottom Row: 2 cards centered */}
                <div className="flex flex-col md:flex-row justify-center gap-6 md:max-w-5xl mx-auto">
                    <div className="md:w-1/2">
                        <ServiceCard
                            index={3}
                            title="Staff Augmentation"
                            description="Add vetted engineers to your team to unblock delivery without long hiring cycles or hand-holding."
                            items={[
                                "Backlog pressure or hiring gaps",
                                "Short-term surge or long-term capacity"
                            ]}
                            cta="Hire Engineers"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <ServiceCard
                            index={4}
                            title="Support & Scale"
                            description="Ongoing software maintenance services to keep production stable, fast, secure, and improving post-launch."
                            items={[
                                "Live products needing reliability",
                                "SLAs, monitoring, performance, DevOps"
                            ]}
                            cta="Get Support & Scale"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
