import shieldVector from "../assets/images/quality-shield-vector.svg";
import tickIcon from "../assets/images/big-single-tick.svg";
import { SidePattern } from "./SidePattern";

interface QualityItem {
    title: string;
    description: string;
}

interface QualityGuaranteeProps {
    badge?: string;
    heading?: string;
    centerTitle?: string;
    centerDescription?: string;
    items?: QualityItem[];
    chips?: string[];
}

const defaults: Required<QualityGuaranteeProps> = {
    badge: "Quality You Can Trust",
    heading: "What keeps work moving at Netizens",
    centerTitle: "Quality Guaranteed",
    centerDescription: "We stand behind every engineer and every sprint.",
    items: [
        { title: "Vetted talent", description: "Pre-screened engineers with a structured onboarding plan." },
        { title: "Code standards", description: "Reviews, conventions, and checks so quality stays consistent." },
        { title: "Easy replacement", description: "If the fit isn't right, we swap quickly with minimal disruption." },
        { title: "Weekly updates", description: "Weekly check-ins and clear reporting on progress and risks." },
    ],
    chips: ["Quality Assurance", "Risk-free"],
};

function CheckBadge() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#0E3572" />
            <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function QualityGuarantee(props: QualityGuaranteeProps) {
    const badge = props.badge ?? defaults.badge;
    const heading = props.heading ?? defaults.heading;
    const centerTitle = props.centerTitle ?? defaults.centerTitle;
    const centerDescription = props.centerDescription ?? defaults.centerDescription;
    const items = props.items ?? defaults.items;
    const chips = props.chips ?? defaults.chips;

    const leftItems = items.slice(0, 2);
    const rightItems = items.slice(2, 4);

    return (
        <section className="relative w-full bg-white py-16 md:py-20 overflow-hidden">
            <SidePattern invert />
            <div className="max-w-[1200px] mx-auto px-4 flex flex-col items-center gap-8 md:gap-10 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="bg-regal-navy/5 border border-regal-navy/10 flex items-center justify-center px-[18px] py-[8px] rounded-[4px]">
                        <span className="font-sans font-bold text-[12px] text-regal-navy text-center">
                            {badge}
                        </span>
                    </div>
                    <h2 className="font-headings font-normal text-2xl md:text-3xl leading-snug text-carbon-black">
                        {heading}
                    </h2>
                </div>

                {/* Mobile layout: stacked cards + shield */}
                <div className="flex flex-col items-center gap-6 md:hidden w-full">
                    {/* Shield */}
                    <div className="relative flex flex-col items-center">
                        {chips[0] && (
                            <div className="absolute -top-3 right-0 bg-white/30 backdrop-blur-sm shadow-[0_8px_24px_rgba(14,53,114,0.31)] rounded-full px-4 py-2 z-10">
                                <span className="font-sans text-[13px] text-carbon-black">{chips[0]}</span>
                            </div>
                        )}
                        <div className="relative w-[200px] h-[240px] flex items-center justify-center">
                            <img src={shieldVector} alt="" className="absolute inset-0 w-full h-full object-contain" />
                            <div className="relative flex flex-col items-center gap-2 px-4 -mt-7">
                                <img src={tickIcon} alt="" className="w-10 h-10" />
                                <h3 className="font-headings font-normal text-base text-white text-center leading-snug">
                                    {centerTitle}
                                </h3>
                                <p className="font-sans font-medium text-xs text-white/75 text-center leading-relaxed">
                                    {centerDescription}
                                </p>
                            </div>
                        </div>
                        {chips[1] && (
                            <div className="absolute -bottom-3 left-0 bg-white/30 backdrop-blur-sm shadow-[0_8px_24px_rgba(14,53,114,0.31)] rounded-full px-4 py-2 z-10">
                                <span className="font-sans text-[13px] text-carbon-black">{chips[1]}</span>
                            </div>
                        )}
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="bg-white border border-regal-navy/60 rounded-[6px] p-[18px] flex flex-col gap-2"
                            >
                                <div className="flex items-center gap-2">
                                    <CheckBadge />
                                    <span className="font-sans font-medium text-base text-regal-navy leading-[22px]">
                                        {item.title}
                                    </span>
                                </div>
                                <p className="font-sans font-medium text-sm text-carbon-black/70 leading-[22px]">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop layout: cards — lines — shield — lines — cards */}
                <div className="hidden md:flex items-center justify-center w-full">
                    {/* Left cards */}
                    <div className="flex flex-col gap-14 items-end shrink-0">
                        {leftItems.map((item, i) => (
                            <div key={i} className="flex items-center">
                                <div className="bg-white border border-regal-navy/60 rounded-[6px] p-[18px] flex flex-col gap-2 w-[280px]">
                                    <div className="flex items-center gap-2">
                                        <CheckBadge />
                                        <span className="font-sans font-medium text-base text-regal-navy leading-[22px]">
                                            {item.title}
                                        </span>
                                    </div>
                                    <p className="font-sans font-medium text-sm text-carbon-black/70 leading-[22px]">
                                        {item.description}
                                    </p>
                                </div>
                                <div className={`h-px bg-regal-navy/20 ${i === 0 ? "w-[110px]" : "w-[160px]"}`} />
                            </div>
                        ))}
                    </div>

                    {/* Center shield */}
                    <div className="relative flex flex-col items-center shrink-0 mx-[-40px]">
                        {chips[0] && (
                            <div className="absolute -top-2 right-[-30px] bg-white/30 backdrop-blur-sm shadow-[0_8px_24px_rgba(14,53,114,0.31)] rounded-full px-4 py-2 z-10">
                                <span className="font-sans text-[13px] text-carbon-black">{chips[0]}</span>
                            </div>
                        )}
                        <div className="relative w-[250px] h-[300px] flex items-center justify-center">
                            <img src={shieldVector} alt="" className="absolute inset-0 w-full h-full object-contain" />
                            <div className="relative flex flex-col items-center gap-3 px-4 -mt-10">
                                <img src={tickIcon} alt="" className="w-[50px] h-[50px]" />
                                <h3 className="font-headings font-normal text-lg text-white text-center leading-[25px]">
                                    {centerTitle}
                                </h3>
                                <p className="font-sans font-medium text-sm text-white/75 text-center leading-[22px]">
                                    {centerDescription}
                                </p>
                            </div>
                        </div>
                        {chips[1] && (
                            <div className="absolute -bottom-2 left-[-10px] bg-white/30 backdrop-blur-sm shadow-[0_8px_24px_rgba(14,53,114,0.31)] rounded-full px-4 py-2 z-10">
                                <span className="font-sans text-[13px] text-carbon-black">{chips[1]}</span>
                            </div>
                        )}
                    </div>

                    {/* Right cards */}
                    <div className="flex flex-col gap-14 items-start shrink-0">
                        {rightItems.map((item, i) => (
                            <div key={i} className="flex items-center">
                                <div className={`h-px bg-regal-navy/20 ${i === 0 ? "w-[110px]" : "w-[160px]"}`} />
                                <div className="bg-white border border-regal-navy/60 rounded-[6px] p-[18px] flex flex-col gap-2 w-[280px]">
                                    <div className="flex items-center gap-2">
                                        <CheckBadge />
                                        <span className="font-sans font-medium text-base text-regal-navy leading-[22px]">
                                            {item.title}
                                        </span>
                                    </div>
                                    <p className="font-sans font-medium text-sm text-carbon-black/70 leading-[22px]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
