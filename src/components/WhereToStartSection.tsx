import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import sprintImg from '../assets/images/where-to-start-image/sprint-based-image.svg';
import projectImg from '../assets/images/where-to-start-image/prject-based-delivery-image.svg';
import retainerImg from '../assets/images/where-to-start-image/try-retainer-based-delivery-image.svg';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const ARROW_ICON = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#FFFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

interface DeliveryCard {
    question: string;
    title: string;
    image: string;
    description: string;
}

const DELIVERY_CARDS: DeliveryCard[] = [
    {
        question: 'Need to move fast with flexibility?',
        title: 'Try Sprint-based delivery',
        image: sprintImg,
        description: 'Short cycles to test, learn, and adjust before committing.',
    },
    {
        question: 'Have a defined scope and deadline?',
        title: 'Try Project-based delivery',
        image: projectImg,
        description: 'Clear outcomes, clear timeline, fixed direction.',
    },
    {
        question: 'Need ongoing delivery capacity?',
        title: 'Try Retainer delivery',
        image: retainerImg,
        description: 'Ongoing support for evolving priorities and long-term momentum.',
    },
];

export function WhereToStartSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const cta = ctaRef.current;

        if (section && cta) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                },
            });

            tl.fromTo(
                cta,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
            );

            cardRefs.current.forEach((card, i) => {
                if (card) {
                    tl.fromTo(
                        card,
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
                        `-=${0.3 - i * 0.05}`
                    );
                }
            });
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#0E3572] overflow-hidden pb-16 md:pb-20"
        >
            {/* Subtle background grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '64px 64px',
                }}
            />

            <div className="relative z-10 max-w-[1320px] mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* CTA Card - "Not sure where to start?" */}
                    <div
                        ref={ctaRef}
                        className="bg-white rounded-[10px] p-[18px] flex flex-col gap-[18px] w-full"
                    >
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="font-headings font-normal text-[26px] md:text-[30px] leading-normal text-[#0E3572]">
                                <p>Not sure</p>
                                <p>where to start?</p>
                            </div>
                            <p className="font-sans font-medium text-sm leading-[22px] text-[rgba(88,89,91,0.75)]">
                                Answer one question and we'll point you to the best delivery model.
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-[rgba(88,89,91,0.15)]" />

                        <p className="font-sans font-medium text-sm leading-[22px] text-[rgba(88,89,91,0.75)]">
                            We'll help you choose.
                        </p>

                        {/* CTA Button */}
                        <Link
                            to="/book-call"
                            className="btn-primary w-full flex items-center justify-center py-[18px] px-[18px] text-sm font-sans font-normal text-[#FFFAFA] leading-normal no-underline"
                        >
                            Book a Discovery Call
                        </Link>
                    </div>

                    {/* Delivery Model Cards */}
                    {DELIVERY_CARDS.map((card, i) => (
                        <div
                            key={i}
                            ref={(el) => { cardRefs.current[i] = el; }}
                            className="bg-[rgba(255,250,250,0.1)] border border-[rgba(255,250,250,0.75)] rounded-[10px] p-[18px] flex flex-col gap-[10px] w-full group hover:bg-[rgba(255,250,250,0.15)] transition-colors duration-300"
                        >
                            <p className="font-sans font-normal text-sm leading-normal text-[rgba(255,250,250,0.75)]">
                                {card.question}
                            </p>
                            <h3 className="font-headings font-normal text-lg leading-[25px] text-white">
                                {card.title}
                            </h3>

                            {/* Illustration */}
                            <div className="w-full h-[145px] rounded-lg overflow-hidden bg-gradient-to-b from-[#1a3f79] to-[#002a6b] flex items-center justify-center">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Bottom row */}
                            <div className="flex items-end justify-between gap-[10px] mt-auto">
                                <p className="font-sans font-medium text-sm leading-[22px] text-white flex-1">
                                    {card.description}
                                </p>
                                <div className="bg-[rgba(255,250,250,0.1)] rounded-full p-2 shrink-0 group-hover:bg-[rgba(255,250,250,0.2)] transition-colors duration-300">
                                    {ARROW_ICON}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
