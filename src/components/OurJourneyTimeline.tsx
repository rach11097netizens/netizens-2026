import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
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

const AUTO_ADVANCE_DELAY = 3.2; // seconds per slide
const CARD_WIDTH = 424;
const CARD_GAP = 10;

export function OurJourneyTimeline() {
    const [activeIndex, setActiveIndex] = useState(0);

    const sectionRef    = useRef<HTMLElement>(null);
    const headingRef    = useRef<HTMLDivElement>(null);
    const trackRef      = useRef<HTMLDivElement>(null);
    const ticksRef      = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const progressDotRef = useRef<HTMLDivElement>(null);

    // Mutable refs so callbacks never go stale
    const activeIndexRef    = useRef(0);
    const slideTweenRef     = useRef<gsap.core.Tween | null>(null);
    const delayedCallRef    = useRef<gsap.core.Tween | null>(null);
    const hasEnteredRef     = useRef(false);
    const isUserPausedRef   = useRef(false);
    const resumeTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);

    /* ─────────────────────────────────────────────────────────
       slideTo — GSAP-drives the card track, progress bar & dot
    ───────────────────────────────────────────────────────── */
    const slideTo = useCallback((index: number, instant = false) => {
        activeIndexRef.current = index;
        setActiveIndex(index);

        const targetX   = -(index * (CARD_WIDTH + CARD_GAP));
        const pct       = (index / (milestones.length - 1)) * 100;
        const dur       = instant ? 0 : 0.72;

        slideTweenRef.current?.kill();
        slideTweenRef.current = gsap.to(trackRef.current, {
            x: targetX,
            duration: dur,
            ease: 'power3.inOut',
        });

        gsap.to(progressBarRef.current, {
            width: `${pct}%`,
            duration: dur,
            ease: 'power3.inOut',
        });

        gsap.to(progressDotRef.current, {
            left: `${pct}%`,
            duration: dur,
            ease: 'power3.inOut',
        });
    }, []);

    /* ─────────────────────────────────────────────────────────
       scheduleNext — queues the next auto-advance via gsap.delayedCall
    ───────────────────────────────────────────────────────── */
    const scheduleNext = useCallback(() => {
        delayedCallRef.current?.kill();
        delayedCallRef.current = gsap.delayedCall(AUTO_ADVANCE_DELAY, () => {
            if (isUserPausedRef.current) return;
            const next = (activeIndexRef.current + 1) % milestones.length;
            slideTo(next);
            scheduleNext();
        });
    }, [slideTo]);

    /* ─────────────────────────────────────────────────────────
       Entry animation — fires once via IntersectionObserver
    ───────────────────────────────────────────────────────── */
    useEffect(() => {
        const section = sectionRef.current;
        const heading = headingRef.current;
        const ticks   = ticksRef.current;
        if (!section || !heading || !ticks) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || hasEnteredRef.current) return;
                hasEnteredRef.current = true;

                const tickEls    = ticks.querySelectorAll<HTMLElement>('.journey-tick');
                const cardEls    = section.querySelectorAll<HTMLElement>('.journey-card');
                const yearLabels = section.querySelectorAll<HTMLElement>('.journey-year__label');

                // ── Set initial hidden states ──
                gsap.set(heading,              { y: 40, opacity: 0 });
                gsap.set(cardEls,              { y: 30, opacity: 0 });
                gsap.set(tickEls,              { scaleY: 0, transformOrigin: 'bottom center' });
                gsap.set(yearLabels,           { opacity: 0, y: 10 });
                gsap.set(progressBarRef.current,  { width: '0%', opacity: 0 });
                gsap.set(progressDotRef.current,  { left: '0%', opacity: 0, scale: 0 });
                gsap.set(trackRef.current,        { x: 0 });

                // ── Master timeline ──
                const tl = gsap.timeline({
                    defaults: { ease: 'power3.out' },
                    onComplete: scheduleNext,
                });

                // 1 — Heading rises in
                tl.to(heading, {
                    y: 0, opacity: 1, duration: 0.65,
                });

                // 2 — Cards stagger up (only the first few are visible)
                tl.to(cardEls, {
                    y: 0, opacity: 1,
                    stagger: 0.09,
                    duration: 0.5,
                }, '-=0.35');

                // 3 — Ruler ticks grow upward from the baseline, left → right
                tl.to(tickEls, {
                    scaleY: 1,
                    duration: 0.5,
                    stagger: { each: 0.008, from: 'start' },
                    ease: 'power2.out',
                }, '-=0.3');

                // 4 — Year labels fade in
                tl.to(yearLabels, {
                    opacity: 1, y: 0,
                    stagger: 0.06,
                    duration: 0.4,
                }, '-=0.35');

                // 5 — Progress bar + dot appear
                tl.to([progressBarRef.current, progressDotRef.current], {
                    opacity: 1, scale: 1,
                    duration: 0.4,
                }, '-=0.2');

                // 6 — Active card reveals with a slight scale pulse
                tl.fromTo(cardEls[0], {
                    boxShadow: '0 0 0px rgba(255,250,250,0)',
                }, {
                    boxShadow: '0 0 24px rgba(255,250,250,0.08)',
                    duration: 0.6,
                    ease: 'power2.inOut',
                }, '-=0.1');
            },
            { threshold: 0.25 }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
            delayedCallRef.current?.kill();
            slideTweenRef.current?.kill();
        };
    }, [scheduleNext]);

    /* ─────────────────────────────────────────────────────────
       Manual click — pause auto-advance for 8 s then resume
    ───────────────────────────────────────────────────────── */
    const handleYearClick = (index: number) => {
        isUserPausedRef.current = true;
        delayedCallRef.current?.kill();
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

        slideTo(index);

        resumeTimerRef.current = setTimeout(() => {
            isUserPausedRef.current = false;
            scheduleNext();
        }, 8000);
    };

    return (
        <section ref={sectionRef} className="journey-section">

            {/* Noise overlay */}
            <div className="journey-noise" aria-hidden="true" />

            {/* Pattern overlay */}
            <div
                className="journey-pattern"
                style={{ backgroundImage: `url(${imgSeparatorPattern})` }}
                aria-hidden="true"
            />

            <div className="journey-inner">

                {/* ── Heading ─────────────────────────────────── */}
                <div ref={headingRef} className="journey-heading">
                    <div className="journey-badge">
                        <span>Our journey</span>
                    </div>
                    <h2 className="journey-title">
                        From product builds to long-term engineering partnerships
                    </h2>
                </div>

                {/* ── Card carousel ───────────────────────────── */}
                <div className="journey-cards-outer">
                    <div className="journey-cards__fade" aria-hidden="true" />
                    <div className="journey-cards-viewport">
                        <div ref={trackRef} className="journey-cards-track">
                            {milestones.map((m, i) => (
                                <div
                                    key={m.year}
                                    className={`journey-card ${i === activeIndex ? 'journey-card--active' : 'journey-card--inactive'}`}
                                    onClick={() => handleYearClick(i)}
                                >
                                    <p>{m.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Timeline ruler ──────────────────────────── */}
                <div className="journey-ruler">

                    {/* Progress track + animated fill bar */}
                    <div className="journey-ruler__track" aria-hidden="true">
                        <div ref={progressBarRef} className="journey-ruler__progress" />
                        {/* Glowing dot that rides the progress bar */}
                        <div ref={progressDotRef} className="journey-ruler__dot" />
                    </div>

                    {/* Measurement ticks */}
                    <div ref={ticksRef} className="journey-ruler__ticks" aria-hidden="true">
                        {Array.from({ length: 61 }).map((_, i) => {
                            const isMajor  = i % 10 === 0;
                            const isMedium = i % 5  === 0 && !isMajor;
                            return (
                                <div
                                    key={i}
                                    className={[
                                        'journey-tick',
                                        isMajor  ? 'journey-tick--major'  : '',
                                        isMedium ? 'journey-tick--medium' : '',
                                        !isMajor && !isMedium ? 'journey-tick--minor' : '',
                                    ].join(' ')}
                                />
                            );
                        })}
                    </div>

                    {/* Clickable year markers */}
                    <div className="journey-ruler__years">
                        {milestones.map((m, i) => {
                            const isActive = i === activeIndex;
                            const pct = (i / (milestones.length - 1)) * 100;
                            return (
                                <button
                                    key={m.year}
                                    className={`journey-year ${isActive ? 'journey-year--active' : ''}`}
                                    style={{ left: `${pct}%` }}
                                    onClick={() => handleYearClick(i)}
                                    aria-label={`Go to ${m.year}`}
                                >
                                    <div className="journey-year__glow" />
                                    <span className="journey-year__label">{m.year}</span>
                                </button>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
