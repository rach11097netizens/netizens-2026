import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import netIconSrc from '../assets/images/net-icon.svg';

gsap.registerPlugin(ScrollTrigger);

interface PromiseCard {
    title: string;
    description: string;
}

const PROMISE_CARDS: PromiseCard[] = [
    {
        title: 'Clear Ownership',
        description: 'You get a dedicated lead who takes responsibility end to end. No task shuffling. No ambiguity.',
    },
    {
        title: 'Transparent Communication',
        description: 'Regular updates, shared visibility, and zero surprise escalations.',
    },
    {
        title: 'Structured Planning & Reviews',
        description: 'Roadmaps, sprint reviews, and performance check-ins built into the cadence.',
    },
    {
        title: 'Outcome-Driven Execution',
        description: 'We measure success by business impact, not hours logged or tickets closed.',
    },
];

function PromiseIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-regal-navy/70 shrink-0">
            <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M19 7L21 9M21 7L19 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7 19L9 21L11 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="17" y="17" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

export function OurPromiseSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        const header = headerRef.current;
        const center = centerRef.current;

        if (section && header && center) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                },
            });

            tl.fromTo(
                header,
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
            )
                .fromTo(
                    center,
                    { scale: 0.9, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' },
                    '-=0.2'
                );

            cardsRef.current.forEach((card, i) => {
                if (card) {
                    tl.fromTo(
                        card,
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
                        `-=${0.35 - i * 0.05}`
                    );
                }
            });
        }
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full bg-white py-20 md:py-14 overflow-hidden">
            <div className="w-full max-w-8xl mx-auto px-4 md:px-4 ">
                {/* Header */}
                <div ref={headerRef} className="flex flex-col items-center gap-4 text-center mb-6 md:mb-24">
                    <div className="flex items-center justify-center px-4 py-2 bg-white/90 border border-gray-200 rounded-lg">
                        <span className="font-sans text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Our Promise
                        </span>
                    </div>
                    <h2 className="font-headings font-normal text-2xl md:text-3xl leading-tight text-carbon-black max-w-4xl">
                        Different engagement models. Same standard.
                    </h2>
                </div>

                {/* Main layout: 4 cards + center with connector lines */}
                <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-34 items-center max-w-6xl mx-auto ">
                    {/* Connector lines overlay - left span (2 lines) + right span (2 lines) */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none hidden md:flex justify-between items-stretch">
                        {/* Left side: 2 lines connecting left cards to center */}
                        <span className="absolute right-1/2 top-1/2 -translate-y-1/2 flex flex-col justify-center gap-4 w-[143px]" style={{ marginRight: '4.5rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="143" height="61" viewBox="0 0 143 61" fill="none" className="shrink-0">
                                <path d="M0 0.5H51.3333C60.7614 0.5 65.4755 0.5 68.4044 3.42893C71.3333 6.35786 71.3333 11.0719 71.3333 20.5V40.5C71.3333 49.9281 71.3333 54.6421 74.2623 57.5711C77.1912 60.5 81.9052 60.5 91.3333 60.5H142.667" stroke="#0E3572" strokeDasharray="5 2" strokeWidth="1" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="143" height="61" viewBox="0 0 143 61" fill="none" className="shrink-0">
                                <path d="M0 60.5H51.3333C60.7614 60.5 65.4755 60.5 68.4044 57.5711C71.3333 54.6421 71.3333 49.9281 71.3333 40.5V20.5C71.3333 11.0719 71.3333 6.35786 74.2623 3.42893C77.1912 0.499998 81.9052 0.499998 91.3333 0.499998H142.667" stroke="#0E3572" strokeDasharray="5 2" strokeWidth="1" />
                            </svg>
                        </span>
                        {/* Right side: 2 lines connecting center to right cards */}
                        <span className="absolute left-1/2 top-1/2 -translate-y-1/2 flex flex-col justify-center gap-4 w-[143px]" style={{ marginLeft: '4.5rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="143" height="61" viewBox="0 0 143 61" fill="none" className="shrink-0">
                                <path d="M142.667 0.5H91.3337C81.9056 0.5 77.1915 0.5 74.2626 3.42893C71.3337 6.35786 71.3337 11.0719 71.3337 20.5V40.5C71.3337 49.9281 71.3337 54.6421 68.4047 57.5711C65.4758 60.5 60.7618 60.5 51.3337 60.5H0.000342369" stroke="#0E3572" strokeDasharray="5 2" strokeWidth="1" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="143" height="61" viewBox="0 0 143 61" fill="none" className="shrink-0">
                                <path d="M142.667 60.5H91.3337C81.9056 60.5 77.1915 60.5 74.2626 57.5711C71.3337 54.6421 71.3337 49.9281 71.3337 40.5V20.5C71.3337 11.0719 71.3337 6.35786 68.4047 3.42893C65.4758 0.499998 60.7618 0.499998 51.3337 0.499998H0.000342369" stroke="#0E3572" strokeDasharray="5 2" strokeWidth="1" />
                            </svg>
                        </span>
                    </div>

                    {/* Left column - 2 cards */}
                    <div className="relative z-10 flex flex-col gap-6 md:gap-8 order-2 md:order-1">
                        {PROMISE_CARDS.slice(0, 2).map((card, i) => (
                            <div
                                key={i}
                                ref={(el) => {
                                    cardsRef.current[i] = el;
                                }}
                                className="bg-white border border-regal-navy/15 rounded-xl p-4 xl:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex gap-4">
                                    <div className="shrink-0">
                                        <PromiseIcon />
                                    </div>
                                    <div>
                                        <h3 className="font-headings font-semibold text-carbon-black text-base mb-2">
                                            {card.title}
                                        </h3>
                                        <p className="font-sans text-sm text-gray-600 leading-[22px]">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Center - net icon circle with glow */}
                    <div
                        ref={centerRef}
                        className="relative z-10 flex items-center justify-center order-1 md:order-2"
                    >
                        <div
                            className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-white flex items-center justify-center"
                            style={{
                                boxShadow:
                                    '0 0 0 1px rgba(14,53,114,0.12), 0 0 24px rgba(14,53,114,0.25), 0 0 56px rgba(14,53,114,0.1)',
                            }}
                        >
                            <img
                                src={netIconSrc}
                                alt="Netizens"
                                className="w-14 md:w-16 h-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Right column - 2 cards */}
                    <div className="relative z-10 flex flex-col gap-6 md:gap-8 order-3">
                        {PROMISE_CARDS.slice(2, 4).map((card, i) => (
                            <div
                                key={i}
                                ref={(el) => {
                                    cardsRef.current[i + 2] = el;
                                }}
                                className="bg-white border border-regal-navy/15 rounded-xl p-4 xl:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex gap-4">
                                    <div className="shrink-0">
                                        <PromiseIcon />
                                    </div>
                                    <div>
                                        <h3 className="font-headings font-semibold text-carbon-black text-base mb-2">
                                            {card.title}
                                        </h3>
                                        <p className="font-sans text-sm text-gray-600 leading-[22px]">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
