import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Removed SVG icon imports
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const problems = [
    {
        title: "Demo-only MVPs",
        description: "Looks great in a demo, fails with real users. We rebuild the foundation so it holds up in production.",
        color: "bg-[#feff9c]", // Pastel Yellow
        delay: 0,
    },
    {
        title: "Poor UX",
        description: "Confusing UX kills retention. We simplify journeys so users reach value faster.",
        color: "bg-[#7afcff]", // Pastel Cyan
        delay: 0.1,
    },
    {
        title: "Overbuilt MVPs",
        description: "Too many features, too little progress. We cut scope, ship the essentials, and save weeks of build time.",
        color: "bg-[#7afcff]", // Pastel Cyan
        delay: 0.2,
    },
    {
        title: "Unclear priorities",
        description: "If everything is “urgent,” nothing ships. We help you pick the right features and sequence them.",
        color: "bg-[#7afcff]", // Pastel Cyan
        delay: 0.3,
    },
    {
        title: "Unscalable builds",
        description: "Hard-to-maintain code slows every release. We refactor for clean architecture and long-term speed.",
        color: "bg-[#feff9c]", // Pastel Yellow
        delay: 0.4,
    },
];

export const MvpProblem = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const windowRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const finalBannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const header = headerRef.current;
        const macWindow = windowRef.current;
        const banner = finalBannerRef.current;

        if (section && header && macWindow && banner) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                },
            });

            // Animate Header
            tl.fromTo(
                header,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            )
                // Animate Mac Window Container
                .fromTo(
                    macWindow,
                    { y: 40, opacity: 0, scale: 0.98 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
                    "-=0.2",
                );

            // Animate individual sticky notes
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    tl.fromTo(
                        card,
                        { y: 30, opacity: 0, rotation: gsap.utils.random(-2, 2) },
                        {
                            y: 0,
                            opacity: 1,
                            rotation: gsap.utils.random(-1, 1), // slight randomized rotation for sticky note feel
                            duration: 0.5,
                            ease: "back.out(1.2)",
                        },
                        `-=${0.5 - index * 0.05}`, // Staggered overlap
                    );
                }
            });

            // Animate Final Banner
            tl.fromTo(
                banner,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.1",
            );
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-white py-8 sm:py-16 md:py-20 flex flex-col items-center justify-center gap-6 sm:gap-12 overflow-hidden px-4"
        >
            {/* Header Area */}
            <div
                ref={headerRef}
                className="flex flex-col items-center justify-center gap-4 relative max-w-3xl text-center z-10"
            >
                <div className="bg-regal-navy/5 border border-regal-navy/10 flex items-center justify-center px-[18px] py-[8px] rounded-[4px] shrink-0">
                    <span className="font-sans text-[12px] text-regal-navy text-center">
                        Where MVPs fail
                    </span>
                </div>

                <h2 className="font-sans font-normal text-2xl md:text-3xl leading-[48px] tracking-tight text-carbon-black relative max-w-[1200px] mx-auto text-center w-full">
                    What breaks MVPs (and how we prevent it)
                </h2>
            </div>

            {/* Mac Window Area */}
            <div
                ref={windowRef}
                className="w-full max-w-[1016px] flex flex-col rounded-xl overflow-hidden shadow-2xl border border-gray-200 z-10 bg-white"
            >
                {/* Window Top Bar */}
                <div className="flex items-center px-4 py-3 bg-gradient-to-r from-gray-100 to-white border-b border-gray-200 w-full shrink-0">
                    <div className="flex gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                    </div>
                    <div className="flex-1 text-center">
                        <span className="font-sans font-bold text-xs text-gray-600/70">
                            Notes
                        </span>
                    </div>
                    {/* Placeholder for right side alignment */}
                    <div className="w-[42px]">
                        <button>
                            <ExternalLink size={20} className="text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Window Content / Sticky Notes Grid */}
                <div className="p-6 md:p-12 sm:min-h-[500px] relative bg-gray-50/30 flex flex-col">
                    {/* Scrollable Container for Cards */}
                    <div className="w-[calc(100%+3rem)] -ml-6 md:w-full md:ml-0 overflow-x-auto custom-scrollbar pb-6 px-6 md:px-0 md:overflow-visible">
                        <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 md:gap-6 w-max md:w-auto pt-2 after:content-[''] after:w-2 after:shrink-0 md:after:hidden">
                            {problems.map((problem, index) => (
                                <div
                                    key={index}
                                    ref={(el) => {
                                        cardsRef.current[index] = el;
                                    }}
                                    className={`
                                    ${problem.color} 
                                    transition-all
                                    duration-300
                                    border border-regal-navy/20 
                                    flex flex-col gap-2 p-6 rounded-md 
                                    w-[265px] h-[223px] shrink-0 transform 
                                    hover:scale-105 hover:shadow-lg shadow-sm cursor-default
                                    relative overflow-hidden
                                `}
                                >
                                    {/* Sticky Note Fold Illusion using CSS borders on a pseudo-element block */}
                                    <div
                                        className="absolute bottom-0 right-0 w-0 h-0"
                                        style={{
                                            borderStyle: "solid",
                                            borderWidth: "0 0 20px 20px",
                                            borderColor:
                                                "transparent transparent #f9fafb rgba(0,0,0,0.1)", // f9fafb is general bg color
                                        }}
                                    >
                                        <div
                                            className="absolute right-0 bottom-[-20px] w-0 h-0"
                                            style={{
                                                borderStyle: "solid",
                                                borderWidth: "20px 20px 0 0",
                                                borderColor:
                                                    "transparent rgba(0,0,0,0.05) transparent transparent",
                                            }}
                                        ></div>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-[20px] h-[20px] bg-gradient-to-tl from-black/5 to-transparent pointer-events-none"></div>

                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-[family-name:var(--sans-serif,'Figma_Hand:Regular',sans-serif)] text-xs text-gray-600 opacity-70">
                                            Problem
                                        </span>
                                    </div>
                                    <h3 className="font-headings font-normal text-lg text-carbon-black leading-snug">
                                        {problem.title}
                                    </h3>
                                    <p className="font-sans font-medium text-sm text-gray-600/80 leading-relaxed flex-1">
                                        {problem.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
};
