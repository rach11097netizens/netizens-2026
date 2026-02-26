import imgSeparatorPattern from "../assets/images/pattern.png";
import { SidePattern } from "./SidePattern";

interface ServiceCard {
    icon: string;
    title: string;
    description: string;
}

interface CtaCard {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref?: string;
}

interface ServiceScopeProps {
    badge: string;
    heading: string;
    cards: ServiceCard[];
    ctaCards?: CtaCard[];
    footerText?: string;
}

export function ServiceScope({ badge, heading, cards, ctaCards, footerText }: ServiceScopeProps) {
    return (
        <section className="relative w-full bg-regal-navy flex flex-col items-center py-16 md:py-20 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div
                    className="absolute inset-0 w-full h-full mix-blend-screen"
                    style={{
                        opacity: 0.5,
                        backgroundImage: `url(${imgSeparatorPattern})`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "1000px",
                    }}
                />
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: "linear-gradient(#ffffff0a 1px, transparent 1px)",
                        backgroundSize: "100% 32px",
                    }}
                />
            </div>

            <SidePattern />

            <div className="w-full max-w-[1320px] mx-auto px-4 relative z-10 flex flex-col gap-10">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="bg-white/10 border border-[#0E3572]/10 flex items-center justify-center px-4 py-2 rounded">
                        <span className="font-sans text-xs text-white/90">
                            {badge}
                        </span>
                    </div>
                    <h2 className="font-headings font-normal text-2xl md:text-3xl leading-snug text-white">
                        {heading}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full border border-white/10 overflow-hidden rounded-[8px]">
                    {cards.map((svc, idx) => (
                        <div
                            key={idx}
                            className="bg-regal-navy border-[0.5px] border-white/10 flex flex-col items-start p-6 md:p-8 hover:bg-[#081f47] transition-all duration-300 gap-6 min-h-[240px] hover:z-10 hover:shadow-[0_0_20px_rgba(122,252,255,0.15)] relative"
                        >
                            <div className="flex flex-col gap-4 relative z-10">
                                <div className="bg-white/10 rounded-[8px] p-1.5 w-fit">
                                    <img src={svc.icon} alt={svc.title} className="w-16 h-16 object-contain" />
                                </div>
                                <h3 className="font-headings font-normal text-lg md:text-[18px] text-white leading-[25px]">
                                    {svc.title}
                                </h3>
                            </div>
                            <p className="font-sans font-medium text-sm leading-[22px] text-white/75 relative z-10">
                                {svc.description}
                            </p>
                        </div>
                    ))}
                </div>

                {ctaCards && ctaCards.length > 0 && (
                    <div className={`grid grid-cols-1 ${ctaCards.length > 1 ? "md:grid-cols-2" : ""} gap-4 mt-2`}>
                        {ctaCards.map((cta, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative shadow-lg"
                            >
                                <div className="flex-1 flex flex-col gap-2 relative z-10">
                                    <h3 className="font-headings font-bold text-lg text-carbon-black leading-[25px]">
                                        {cta.title}
                                    </h3>
                                    <p className="font-sans font-medium text-sm text-carbon-black/70 leading-[22px]">
                                        {cta.description}
                                    </p>
                                </div>

                                <a href="#" className="px-8 py-4 bg-button-gradient text-white text-sm rounded-button transition-colors flex items-center justify-center gap-2 font-medium">
                                    {cta.ctaLabel}
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {footerText && (
                    <p className="font-headings font-normal italic text-center text-white/90 text-base md:text-lg">
                        {footerText}
                    </p>
                )}
            </div>
        </section>
    );
}
