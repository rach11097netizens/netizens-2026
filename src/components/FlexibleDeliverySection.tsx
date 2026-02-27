import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import iconTick from '../assets/images/navy-dark-tick.svg';
import imgSeparatorPattern from '../assets/images/pattern.png';

interface DeliveryModel {
    id: string;
    title: string;
    bestFor: string[];
    whatYouGet: string[];
    whenToChoose: string[];
    howItWorks: { step: string; description: string }[];
}

const DELIVERY_MODELS: DeliveryModel[] = [
    {
        id: 'sprint',
        title: 'Sprint-Based Delivery',
        bestFor: ['MVP delivery', 'AI pilot builds', 'V2 upgrades', 'Product improvements', 'UX rescue'],
        whatYouGet: [
            'Defined sprint goal & backlog',
            'Weekly demos and visible progress',
            'Agile development sprint cycles (2-4 weeks)',
            'Flexibility to pivot as priorities shift',
            'Clear output, not just time spent',
        ],
        whenToChoose: [
            'You need meaningful progress in weeks, not months',
            'Scope is evolving and you want flexibility',
            "You're testing an idea before full commitment",
            "You have a priority feature that can't wait",
            'You want execution without long-term lock-in',
        ],
        howItWorks: [
            { step: 'Define the sprint goal', description: 'We align on one clear objective and success criteria.' },
            { step: 'Break into 1-2 week cycles', description: 'Work is structured into focused, time-boxed sprints.' },
            { step: 'Ship, review, refine', description: 'You see progress every week. Feedback shapes the next sprint.' },
            { step: "Decide what's next", description: 'Continue, pivot, or scale into a larger engagement model.' },
        ],
    },
    {
        id: 'project',
        title: 'Project-Based Delivery',
        bestFor: ['Fixed-scope builds', 'Product launches', 'Platform migrations', 'Integration projects', 'Compliance work'],
        whatYouGet: [
            'Clear milestones and deliverables',
            'Defined timeline and budget',
            'Structured scope and change process',
            'Dedicated project lead and team',
            'Handoff and documentation',
        ],
        whenToChoose: [
            'Scope is well-defined and unlikely to change',
            'You have a hard deadline or launch date',
            'You need predictable cost and timeline',
            'You want a complete deliverable, not ongoing capacity',
            'You prefer milestone-based payments',
        ],
        howItWorks: [
            { step: 'Define scope and milestones', description: 'We lock in deliverables, timeline, and success criteria.' },
            { step: 'Execute in phases', description: 'Work progresses through defined phases with regular check-ins.' },
            { step: 'Review and adjust', description: 'Scope changes go through a structured review process.' },
            { step: 'Deliver and hand off', description: 'Final delivery includes documentation and knowledge transfer.' },
        ],
    },
    {
        id: 'retainer',
        title: 'Retainer Model',
        bestFor: ['Ongoing product development', 'Roadmap execution', 'Maintenance & support', 'Team extension', 'Continuous improvement'],
        whatYouGet: [
            'Dedicated capacity and team',
            'Flexible prioritization each cycle',
            'Roadmap alignment and planning',
            'SLA-backed responsiveness',
            'Predictable monthly investment',
        ],
        whenToChoose: [
            'You need ongoing delivery capacity',
            'Priorities evolve and you want flexibility',
            'You want a long-term product partner',
            'You prefer predictable monthly spend',
            'You need reliability and continuity',
        ],
        howItWorks: [
            { step: 'Align on capacity and cadence', description: 'We agree on team size, cycle length, and communication rhythm.' },
            { step: 'Prioritize each cycle', description: 'You set priorities; we execute against the roadmap.' },
            { step: 'Ship and iterate', description: 'Regular releases with continuous feedback and refinement.' },
            { step: 'Scale as needed', description: 'Adjust capacity and focus as your needs evolve.' },
        ],
    },
];

// Animate the right panel content whenever active model changes (desktop)
function useRightPanelAnimation(activeId: string, ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
        const panel = ref.current;
        if (!panel) return;
        gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        panel.querySelectorAll('[data-delivery-tag]').forEach((el, i) => {
            gsap.fromTo(el, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.28, ease: 'back.out(1.3)', delay: 0.08 + i * 0.035 });
        });
        panel.querySelectorAll('[data-delivery-list-item]').forEach((el, i) => {
            gsap.fromTo(el, { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', delay: 0.15 + i * 0.04 });
        });
        panel.querySelectorAll('[data-delivery-step]').forEach((el, i) => {
            gsap.fromTo(el, { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', delay: 0.2 + i * 0.04 });
        });
    }, [activeId, ref]);
}

export function FlexibleDeliverySection() {
    const [activeId, setActiveId] = useState<string>('sprint');
    const rightPanelRef = useRef<HTMLDivElement>(null);
    useRightPanelAnimation(activeId, rightPanelRef);

    const active = DELIVERY_MODELS.find((m) => m.id === activeId) ?? DELIVERY_MODELS[0];

    const toggle = (id: string) => setActiveId((prev) => (prev === id ? '' : id));

    return (
        <section className="relative w-full bg-white py-16 md:py-14">
            <div className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-10">

                {/* Header */}
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="flex items-center justify-center px-4 py-2 bg-regal-navy/5 border border-regal-navy/10 rounded">
                        <span className="font-sans text-xs font-semibold text-regal-navy uppercase tracking-wide">
                            Our Delivery Models
                        </span>
                    </div>
                    <h2 className="font-headings font-normal text-2xl md:text-3xl leading-tight text-carbon-black">
                        Flexible Delivery, Built Around You.
                    </h2>
                    <p className="font-sans font-medium text-sm md:text-base text-gray-600 max-w-2xl">
                        Not sure which model fits? We'll recommend the right structure after a short discovery call.
                    </p>
                </div>

                {/*
                  ─── Layout shell ────────────────────────────────────────────────
                  Mobile  (<lg): flex-col  → models render as accordion items
                  Desktop (≥lg): flex-row  → left tab strip + right detail panel

                  Each model is ONE element in the DOM. CSS drives how it looks.
                  ─────────────────────────────────────────────────────────────────
                */}
                <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 w-full">

                    {/* ── Left strip (tab buttons on desktop, accordion headers on mobile) ── */}
                    <div className="flex flex-col gap-3 w-full lg:w-[280px] lg:shrink-0">
                        {DELIVERY_MODELS.map((model) => {
                            const isActive = activeId === model.id;
                            return (
                                <div
                                    key={model.id}
                                    className={`rounded-lg border overflow-hidden transition-all duration-300 ${
                                        isActive
                                            ? 'bg-white border-regal-navy/25 shadow-md shadow-regal-navy/5 ring-1 ring-regal-navy/10'
                                            : 'bg-[#FAF5F5] border-[#e5e7eb] shadow-none'
                                    }`}
                                >
                                    {/* Tab / accordion trigger — shared */}
                                    <button
                                        onClick={() => toggle(model.id)}
                                        className={`w-full text-left px-5 py-4 flex items-center justify-between font-sans font-semibold text-sm transition-colors ${
                                            isActive ? 'text-carbon-black' : 'text-gray-600 hover:bg-white/50 hover:text-carbon-black'
                                        }`}
                                    >
                                        {model.title}
                                        {/* Chevron: visible on mobile as accordion indicator; hidden on desktop */}
                                        <ChevronDown
                                            className={`lg:hidden w-5 h-5 text-gray-600 shrink-0 transition-transform duration-200 ${
                                                isActive ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>

                                    {/*
                                      "What you get" list:
                                      - On desktop: shown inline inside the active tab button (left panel)
                                      - On mobile: part of the full accordion body below
                                      We render it here (inside the left strip) for desktop, hidden on mobile.
                                    */}
                                    {isActive && (
                                        <div className="hidden lg:block px-5 pb-5 pt-0 border-t border-regal-navy/10 animate-fade-in-down">
                                            <div className="pt-4">
                                                <h3 className="font-headings font-semibold text-carbon-black text-base mb-4">
                                                    What you get:
                                                </h3>
                                                <ul className="flex flex-col gap-3">
                                                    {model.whatYouGet.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <img src={iconTick} alt="" className="shrink-0 mt-0.5 w-5 h-5" />
                                                            <span className="font-sans text-sm text-gray-600 leading-[22px]">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {/*
                                      Full accordion body — mobile only (lg:hidden).
                                      Contains ALL content sections so nothing is duplicated on mobile.
                                    */}
                                    {isActive && (
                                        <div className="lg:hidden px-5 pb-5 pt-0 border-t border-[#e5e7eb] animate-fade-in-down">
                                            <div className="pt-4 space-y-5">

                                                {/* Best for */}
                                                <div>
                                                    <p className="font-sans font-semibold text-xs text-regal-navy mb-2">Best for</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {model.bestFor.map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="inline-flex px-3 py-1.5 bg-regal-navy/10 text-regal-navy rounded-full font-sans font-medium text-xs"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* What you get */}
                                                <div>
                                                    <h3 className="font-headings font-semibold text-carbon-black text-sm mb-3">What you get:</h3>
                                                    <ul className="flex flex-col gap-2">
                                                        {model.whatYouGet.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-3">
                                                                <img src={iconTick} alt="" className="shrink-0 mt-0.5 w-5 h-5" />
                                                                <span className="font-sans text-sm text-gray-600 leading-[22px]">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* When to choose */}
                                                <div>
                                                    <h3 className="font-headings font-semibold text-carbon-black text-sm mb-3">When to choose this?</h3>
                                                    <ul className="flex flex-col gap-2">
                                                        {model.whenToChoose.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-3">
                                                                <img src={iconTick} alt="" className="shrink-0 mt-0.5 w-5 h-5" />
                                                                <span className="font-sans text-sm text-gray-600 leading-[22px]">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* How it works */}
                                                <div>
                                                    <h3 className="font-headings font-semibold text-carbon-black text-sm mb-3">How it works?</h3>
                                                    <ol className="flex flex-col gap-3">
                                                        {model.howItWorks.map((item, i) => (
                                                            <li key={i} className="flex gap-3">
                                                                <span className="shrink-0 font-headings font-bold text-regal-navy text-sm">{i + 1}.</span>
                                                                <div>
                                                                    <p className="font-headings font-semibold text-carbon-black text-sm">{item.step}</p>
                                                                    <p className="font-sans text-sm text-gray-600 leading-[22px] mt-0.5">{item.description}</p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* ── Right detail panel — desktop only ── */}
                    {/*
                      This panel renders the active model's full detail.
                      It is hidden on mobile (lg:block), so content only exists
                      in the accordion bodies above at smaller breakpoints.
                      Each model's content therefore appears exactly once in the DOM
                      at any given breakpoint.
                    */}
                    <div
                        ref={rightPanelRef}
                        className="hidden lg:block flex-1 min-w-0 bg-white border border-[#e5e7eb] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        {/* Best for banner */}
                        <div className="relative bg-regal-navy px-6 py-4 overflow-hidden">
                            <div className="absolute inset-0 pointer-events-none opacity-10">
                                <div
                                    className="absolute inset-0 w-full h-full mix-blend-screen"
                                    style={{
                                        opacity: 0.5,
                                        backgroundImage: `url(${imgSeparatorPattern})`,
                                        backgroundRepeat: 'repeat',
                                        backgroundSize: '1000px',
                                    }}
                                />
                                <div
                                    className="absolute inset-0 w-full h-full"
                                    style={{
                                        backgroundImage: 'linear-gradient(#ffffff0a 1px, transparent 1px)',
                                        backgroundSize: '100% 32px',
                                    }}
                                />
                            </div>
                            <p className="font-sans font-semibold text-sm text-white mb-3 relative z-10">Best for</p>
                            <div className="flex flex-wrap gap-2 relative z-10">
                                {active.bestFor.map((tag) => (
                                    <span
                                        key={tag}
                                        data-delivery-tag
                                        className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-[84px] font-sans font-medium text-xs md:text-sm hover:scale-105 transition-transform duration-200 shadow-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* When to choose + How it works */}
                        <div data-delivery-content className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            <div>
                                <h3 className="font-headings font-semibold text-carbon-black text-base mb-4">When to choose this?</h3>
                                <ul className="flex flex-col gap-3">
                                    {active.whenToChoose.map((item, i) => (
                                        <li key={i} data-delivery-list-item className="flex items-start gap-3">
                                            <img src={iconTick} alt="" className="shrink-0 mt-0.5 w-5 h-5" />
                                            <span className="font-sans text-sm text-gray-600 leading-[22px]">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-headings font-semibold text-carbon-black text-base mb-4">How it works?</h3>
                                <ol className="flex flex-col gap-4">
                                    {active.howItWorks.map((item, i) => (
                                        <li key={i} data-delivery-step className="flex gap-4">
                                            <span className="shrink-0 font-headings font-bold text-regal-navy text-base">{i + 1}.</span>
                                            <div>
                                                <p className="font-headings font-semibold text-carbon-black text-sm">{item.step}</p>
                                                <p className="font-sans text-sm text-gray-600 leading-[22px] mt-1">{item.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
