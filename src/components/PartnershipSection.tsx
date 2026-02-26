import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SidePattern } from './SidePattern';
import partnershipCenterImg from '../assets/images/partnership-center-img.png';
import netIconSrc from '../assets/images/net-icon.svg';

gsap.registerPlugin(ScrollTrigger);

const CHECK_ICON = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="12" fill="#0E3572" />
        <path d="M7 12.5L10.5 16L17 9" stroke="#FFFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const LABEL_ITEMS = [
    'Regular Strategic Check-ins',
    'Shared Visibility in Real Time',
    'Clear Escalation & Ownership',
    'SLA-Aligned Responsiveness',
    'Embedded Product Thinking',
    'Seamless Tool Integration',
];

export function PartnershipSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);
    const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        const leftCol = leftColRef.current;
        const rightCol = rightColRef.current;

        if (section && leftCol && rightCol) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                },
            });

            tl.fromTo(
                leftCol,
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
            ).fromTo(
                rightCol,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.2)' },
                '-=0.3'
            );

            labelRefs.current.forEach((label, i) => {
                if (label) {
                    tl.fromTo(
                        label,
                        { x: 30, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
                        `-=${0.3 - i * 0.03}`
                    );
                }
            });
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#0E3572] overflow-hidden py-16 md:py-20"
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
            <SidePattern invert />

            <div className="relative z-10 max-w-[1320px] mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 items-center">
                    {/* Left Column */}
                    <div ref={leftColRef} className="flex flex-col gap-8 w-full lg:w-[450px] xl:w-[600px] 2xl:w-[648px] shrink-0">
                        {/* Heading group */}
                        <div className="flex flex-col gap-3">
                            <div className="inline-flex self-start items-center justify-center px-[18px] py-2 bg-[rgba(255,250,250,0.1)] border border-[rgba(14,53,114,0.1)] rounded">
                                <span className="font-sans text-xs text-[#FFFAFA] text-center leading-normal">
                                    Partnership, Not Patchwork
                                </span>
                            </div>
                            <h2 className="font-headings font-normal text-2xl md:text-3xl leading-normal text-[#FFFAFA]">
                                Built Into Your Team, Not Bolted On
                            </h2>
                            <p className="font-sans font-medium text-sm leading-[22px] text-[rgba(255,250,250,0.75)]">
                                We don't operate in isolation. We plug into your workflows, tools, and decision cycles; so delivery feels internal, not outsourced.
                            </p>
                        </div>

                        {/* Philosophy card */}
                        <div className="bg-[rgba(255,250,250,0.1)] rounded-[10px] p-[18px] flex flex-col gap-[18px]">
                            {/* Quote mark */}
                            <svg width="47" height="38" viewBox="0 0 47 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                <text x="0" y="38" fontFamily="Georgia, serif" fontSize="60" fill="#FFFAFA" opacity="0.6">"</text>
                            </svg>
                            <p className="font-headings font-normal text-lg leading-[25px] text-[#FFFAFA]">
                                We act like co-founders of your delivery, not contractors for hire. Our incentives are tied to your outcomes, velocity, and product health.
                            </p>
                            <div className="flex items-center justify-end gap-1 pr-[3px]">
                                <span className="font-sans font-normal text-base leading-6 text-white">
                                    The Netizens Philosophy
                                </span>
                                <img src={netIconSrc} alt="Netizens" className="w-8 h-8 object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Image + Labels with connector lines */}
                    <div ref={rightColRef} className="flex-1 w-full lg:w-auto flex items-center justify-center lg:justify-end">
                        {/* Mobile: simple stacked layout */}
                        <div className="flex flex-col items-center gap-6 lg:hidden">
                            <div className="w-[160px] h-[160px] rounded-full overflow-hidden"
                                style={{ boxShadow: '0 0 40px rgba(62,175,209,0.15), 0 0 80px rgba(14,53,114,0.3)' }}
                            >
                                <img src={partnershipCenterImg} alt="Partnership" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-3">
                                {LABEL_ITEMS.map((label, i) => (
                                    <div
                                        key={i}
                                        ref={(el) => { labelRefs.current[i] = el; }}
                                        className="bg-white border border-[rgba(88,89,91,0.1)] rounded-[6px] p-[18px] flex items-center gap-2 w-full"
                                    >
                                        <div className="shrink-0">{CHECK_ICON}</div>
                                        <span className="font-sans font-medium text-xs xl:text-base leading-[22px] text-[#58595B]">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Desktop: grid layout with precise SVG connector lines */}
                        <div className="hidden lg:block relative" style={{ width: 591, height: 430 }}>
                            {/* Partnership Image - centered vertically */}
                            <div
                                className="absolute rounded-full overflow-hidden w-[200px] aspect-ratio"
                                style={{ left: 0, top: '50%', transform: 'translateY(-50%)', boxShadow: '0 0 40px rgba(62,175,209,0.15), 0 0 80px rgba(14,53,114,0.3)' }}
                            >
                                <img src={partnershipCenterImg} alt="Partnership" className="w-full h-full object-cover" />
                            </div>

                            {/* SVG connector lines overlay - elbow lines from decagon edge points */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 591 430" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <style>
                                    {`
                                        @keyframes lineFlow {
                                            from { stroke-dashoffset: 28; }
                                            to { stroke-dashoffset: 0; }
                                        }
                                        .animated-line {
                                            stroke-dasharray: 10 4;
                                            animation: lineFlow 1s linear infinite;
                                        }
                                    `}
                                </style>
                                {/* 
                                    Image: 200×200 decagon, center at (100, 215) in viewBox, radius ~100
                                    Right-edge points (vertex/midpoint from top to bottom):
                                    1. Edge midpoint 72°–36°:  (156, 138)
                                    2. Vertex at 36°:          (181, 156)
                                    3. Edge midpoint 36°–0°:   (190, 186)
                                    4. Edge midpoint 0°–324°:  (190, 244)
                                    5. Vertex at 324°:         (181, 274)
                                    6. Edge midpoint 324°–288°:(156, 292)
                                */}

                                {/* Line from top-right edge → Card 1 */}
                                <path d="M156 138 C180 138, 220 30, 298 30" className="animated-line" stroke="rgba(255,250,250,0.4)" strokeWidth="1.5" fill="none" />

                                {/* Line from upper vertex → Card 2 */}
                                <path d="M181 156 C210 156, 230 104, 298 104" className="animated-line" stroke="rgba(255,250,250,0.4)" strokeWidth="1.5" fill="none" />

                                {/* Line from upper-mid edge → Card 3 */}
                                <path d="M190 186 C220 186, 240 178, 298 178" className="animated-line" stroke="rgba(255,250,250,0.4)" strokeWidth="1.5" fill="none" />

                                {/* Line from lower-mid edge → Card 4 */}
                                <path d="M190 244 C220 244, 240 252, 298 252" className="animated-line" stroke="rgba(255,250,250,0.4)" strokeWidth="1.5" fill="none" />

                                {/* Line from lower vertex → Card 5 */}
                                <path d="M181 274 C210 274, 230 326, 298 326" className="animated-line" stroke="rgba(255,250,250,0.4)" strokeWidth="1.5" fill="none" />

                                {/* Line from bottom-right edge → Card 6 */}
                                <path d="M156 292 C180 292, 220 400, 298 400" className="animated-line" stroke="rgba(255,250,250,0.4)" strokeWidth="1.5" fill="none" />
                            </svg>

                            {/* Label items - positioned on right */}
                            {LABEL_ITEMS.map((label, i) => (
                                <div
                                    key={i}
                                    ref={(el) => { labelRefs.current[i] = el; }}
                                    className="absolute bg-white border border-[rgba(88,89,91,0.1)] rounded-[6px] w-[200px] xl:w-[293px] p-2 xl:p-[18px] flex items-center gap-2 hover:shadow-md transition-shadow duration-300"
                                    style={{ left: 298, top: i * 74, height: 60 }}
                                >
                                    <div className="shrink-0">{CHECK_ICON}</div>
                                    <span className="font-sans font-medium text-xs xl:text-base leading-[22px] text-[#58595B]">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
