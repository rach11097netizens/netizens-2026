import { useState, useRef, useEffect } from 'react';
import imgSeparatorPattern from '../assets/images/pattern.png';
import './OurJourneyTimeline.css';

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
    const cardRowRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const displayedYear = hoveredYear ?? activeYear;

    // Scroll active card into view
    useEffect(() => {
        const idx = milestones.findIndex((m) => m.year === displayedYear);
        const card = cardRefs.current[idx];
        const row = cardRowRef.current;
        if (card && row) {
            const cardLeft = card.offsetLeft;
            const scrollTo = Math.max(0, cardLeft - 0); // align to left edge
            row.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    }, [displayedYear]);

    // Position each year evenly across the container
    const getYearPosition = (index: number) => {
        const count = milestones.length;
        // leave some padding at the edges (8% on each side)
        const start = 8;
        const end = 92;
        const span = end - start;
        return start + (index / (count - 1)) * span;
    };

    return (
        <section className="relative w-full bg-regal-navy flex flex-col items-center overflow-hidden">
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

            <div className="w-full max-w-[1320px] mx-auto px-4 relative z-10 pt-[80px] pb-10 flex flex-col gap-[34px]">
                {/* ── Heading wrapper ── */}
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <div className="bg-[rgba(255,250,250,0.1)] border border-[rgba(14,53,114,0.1)] flex items-center justify-center px-[18px] py-2 rounded">
                        <span className="font-sans text-xs text-white text-center">
                            Our journey
                        </span>
                    </div>
                    <h2 className="font-headings font-normal text-[24px] md:text-[30px] leading-snug text-white">
                        From product builds to long-term engineering partnerships
                    </h2>
                </div>

                {/* ── Card row (horizontal scroll) ── */}
                <div className="relative w-full">
                    {/* Right fade gradient */}
                    <div className="journey-cards__fade" />

                    <div
                        ref={cardRowRef}
                        className="journey-card-row flex gap-[10px] items-start overflow-x-auto overflow-y-clip py-[18px] w-full"
                    >
                        {milestones.map((m, i) => {
                            const isActive = m.year === displayedYear;
                            return (
                                <div
                                    key={m.year}
                                    ref={(el) => { cardRefs.current[i] = el; }}
                                    className={`journey-card ${isActive ? 'journey-card--active' : 'journey-card--inactive'}`}
                                    onClick={() => setActiveYear(m.year)}
                                >
                                    <p>{m.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Timeline ruler ── */}
                <div className="journey-ruler">
                    {/* Baseline */}
                    <div className="journey-ruler__baseline" />

                    {/* Major ticks */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                'repeating-linear-gradient(90deg, rgba(255,250,250,0.22) 0px, rgba(255,250,250,0.22) 1px, transparent 1px, transparent 64px)',
                            backgroundSize: '64px 60%',
                            backgroundPosition: '0 100%',
                            backgroundRepeat: 'repeat-x',
                        }}
                    />

                    {/* Minor ticks */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                'repeating-linear-gradient(90deg, rgba(255,250,250,0.10) 0px, rgba(255,250,250,0.10) 1px, transparent 1px, transparent 16px)',
                            backgroundSize: '16px 35%',
                            backgroundPosition: '0 100%',
                            backgroundRepeat: 'repeat-x',
                        }}
                    />

                    {/* Year interaction points */}
                    {milestones.map((m, i) => {
                        const isActive = m.year === displayedYear;
                        return (
                            <div
                                key={m.year}
                                className={`journey-year ${isActive ? 'journey-year--active' : ''}`}
                                style={{ left: `${getYearPosition(i)}%` }}
                                onClick={() => setActiveYear(m.year)}
                                onMouseEnter={() => setHoveredYear(m.year)}
                                onMouseLeave={() => setHoveredYear(null)}
                            >
                                <span className="journey-year__label">{m.year}</span>
                                <div className="journey-year__dot" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
