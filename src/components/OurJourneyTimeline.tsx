import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imgSeparatorPattern from '../assets/images/pattern.png';
import './OurJourneyTimeline.css';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface Milestone {
    year: number;
    description: string;
}

const milestones: Milestone[] = [
    {
        year: 2016,
        description:
            'Netizens started as a product-focused engineering company, helping early-stage founders turn ideas into working software with small, senior teams.',
    },
    {
        year: 2018,
        description:
            'Expanded into full-stack web and mobile development, delivering end-to-end solutions for startups scaling past their MVPs into production-grade platforms.',
    },
    {
        year: 2020,
        description:
            'Shifted to long-term engineering partnerships, embedding with client teams to own entire product lifecycles — from architecture to deployment and beyond.',
    },
    {
        year: 2022,
        description:
            'Introduced AI and automation capabilities, building intelligent workflows and LLM-powered tools for operations teams and SaaS products.',
    },
    {
        year: 2024,
        description:
            'Evolved into a full-stack software development and IT solutions partner for businesses that need more than outsourced coding — delivering structure, ownership, and scale.',
    },
    {
        year: 2026,
        description:
            'Today, Netizens operates as an engineering-led company built for long-term product growth — designing, building, and scaling connected systems across industries.',
    },
];

export function OurJourneyTimeline() {
    const [activeYear, setActiveYear] = useState(milestones[0].year);
    const [hoveredYear, setHoveredYear] = useState<number | null>(null);

    const sectionRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const cardsWrapperRef = useRef<HTMLDivElement>(null);

    const displayedYear = hoveredYear ?? activeYear;

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const scrollContainer = scrollContainerRef.current;
        const cardsWrapper = cardsWrapperRef.current;

        if (!section || !scrollContainer || !cardsWrapper) return;

        const ctx = gsap.context(() => {
            // Calculate how far to move left
            const getScrollAmount = () => {
                const containerWidth = scrollContainer.offsetWidth; // the visible window
                const contentWidth = cardsWrapper.scrollWidth; // total width of the cards
                return -(contentWidth - containerWidth) - 40; // add a little padding at the end
            };

            const tween = gsap.to(cardsWrapper, {
                x: getScrollAmount,
                ease: "none"
            });

            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: () => `+=${Math.abs(getScrollAmount() || 1000)}`, // Scroll distance = width to scroll
                pin: true,
                animation: tween,
                scrub: 1, // smooth scrubbing
                invalidateOnRefresh: true, // Recalculate values if window resizes
                onUpdate: (self) => {
                    // Update the active year dot based on scroll progress (0 to 1)
                    // The timeline progress maps to the milestone index
                    const progress = self.progress;
                    const maxIndex = milestones.length - 1;
                    
                    // Add slight padding to the progress mapping so it focuses on the dot closest to standard steps
                    let activeIndex = Math.round(progress * maxIndex);
                    
                    // clamp index strictly to bounds
                    activeIndex = Math.max(0, Math.min(activeIndex, maxIndex));
                    
                    setActiveYear(milestones[activeIndex].year);
                }
            });
        });

        return () => ctx.revert(); // clean up on unmount
    }, []);

    // Year position calculation on the SVG ruler
    // We space them out. Adjust as needed to match Figma perfectly.
    const getYearPosition = (index: number) => {
        const count = milestones.length;
        const start = 8;
        const end = 92;
        const span = end - start;
        return start + (index / (count - 1)) * span;
    };

    return (
        <section ref={sectionRef} className="relative w-full h-[100vh] bg-regal-navy flex flex-col items-center overflow-hidden">
            {/* Noise overlay */}
            <div className="journey-noise" />

            {/* Pattern overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: `url(${imgSeparatorPattern})`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '1000px',
                }}
            />

            <div className="w-full relative z-10 flex flex-col h-full justify-center">
                
                {/* ── Heading wrapper ── */}
                {/* Fixed relative to the section top so it doesn't move while pinned */}
                <div className="absolute top-[200px] w-full flex flex-col items-center justify-center gap-[34px] px-4">
                    <div className="flex flex-col items-center justify-center gap-2 text-center max-w-[1320px] mx-auto">
                        <div className="bg-[rgba(255,250,250,0.1)] border border-[rgba(14,53,114,0.1)] flex items-center justify-center px-[18px] py-2 rounded">
                            <span className="font-sans text-xs text-white text-center">
                                Our journey
                            </span>
                        </div>
                        <h2 className="font-headings font-normal text-[24px] md:text-[30px] leading-snug text-white max-w-[800px]">
                            From product builds to long-term engineering partnerships
                        </h2>
                    </div>
                </div>

                {/* ── Card row (horizontal scroll track) ── */}
                <div className="w-full max-w-[1320px] mx-auto px-4 mt-[100px] relative">
                    
                    {/* Right fade gradient (stays static above moving cards) */}
                    <div className="journey-cards__fade right-0 top-0 bottom-0 absolute z-10 pointer-events-none" />

                    <div 
                        ref={scrollContainerRef}
                        className="w-full overflow-hidden" 
                    >
                        <div
                            ref={cardsWrapperRef}
                            className="flex gap-[10px] items-stretch w-[max-content] py-[18px]"
                        >
                            {milestones.map((m) => {
                                const isActive = m.year === displayedYear;
                                return (
                                    <div
                                        key={m.year}
                                        className={`journey-card ${isActive ? 'journey-card--active' : 'journey-card--inactive'}`}
                                        onClick={() => setActiveYear(m.year)}
                                        onMouseEnter={() => setHoveredYear(m.year)}
                                        onMouseLeave={() => setHoveredYear(null)}
                                    >
                                        <p>{m.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Timeline ruler fixed at the bottom of the viewport/section ── */}
                <div className="absolute bottom-0 w-full flex justify-center h-[220px] pointer-events-none">
                    <div className="relative w-full max-w-[1320px] h-full">
                        {/* SVG Ruler Design matching Figma (no horizontal baseline, long major vertical ticks, short minor vertical ticks) */}
                        <svg width="100%" height="100%" preserveAspectRatio="none" className="absolute left-0 bottom-0 min-w-[200vw] -ml-[50vw]">
                            {/* Definition for the repeating tick pattern */}
                            <defs>
                                <pattern id="timelineTicks" x="0" y="0" width="64" height="220" patternUnits="userSpaceOnUse">
                                    {/* Major tick (taller) */}
                                    <line x1="0" y1="120" x2="0" y2="220" stroke="rgba(255,250,250,0.25)" strokeWidth="1" />
                                    {/* Minor ticks (shorter) */}
                                    <line x1="16" y1="170" x2="16" y2="220" stroke="rgba(255,250,250,0.12)" strokeWidth="1" />
                                    <line x1="32" y1="170" x2="32" y2="220" stroke="rgba(255,250,250,0.12)" strokeWidth="1" />
                                    <line x1="48" y1="170" x2="48" y2="220" stroke="rgba(255,250,250,0.12)" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#timelineTicks)" />
                        </svg>

                        {/* Year Interaction Dots Mapping */}
                        <div className="absolute inset-0 max-w-[1320px] mx-auto w-full pointer-events-auto">
                            {milestones.map((m, i) => {
                                const isActive = m.year === displayedYear;
                                return (
                                    <div
                                        key={m.year}
                                        className="absolute bottom-0 z-10 w-[80px] cursor-pointer"
                                        style={{ left: `${getYearPosition(i)}%`, transform: 'translateX(-50%)', height: '220px' }}
                                        onClick={() => setActiveYear(m.year)}
                                        onMouseEnter={() => setHoveredYear(m.year)}
                                        onMouseLeave={() => setHoveredYear(null)}
                                    >
                                        {/* Active vertical line overlay */}
                                        <div 
                                            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white transition-all duration-500 origin-bottom rounded-t-[1px]
                                                ${isActive ? 'h-[130px] opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.6)]' : 'h-[100px] opacity-0'}`}
                                        />
                                        
                                        {/* Label text placed exactly at the tip of the lines */}
                                        <span 
                                            className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 whitespace-nowrap font-sans
                                                ${isActive ? 'bottom-[144px] text-white text-[18px] font-semibold tracking-wide' : 'bottom-[112px] text-[rgba(255,250,250,0.4)] text-[15px]'}`}
                                        >
                                            {m.year}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
