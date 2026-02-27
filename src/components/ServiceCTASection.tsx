import imgSeparatorPattern from "../assets/images/pattern.png";
import { Link } from "react-router-dom";

interface ServiceCTASectionProps {
    heading: React.ReactNode;
    description: React.ReactNode;
    ctaLabel?: string;
    subtext?: string;
}

export function ServiceCTASection({
    heading,
    description,
    ctaLabel = "Book a Discovery Call",
    subtext,
}: ServiceCTASectionProps) {
    return (
        <section className="relative w-full bg-regal-navy flex flex-col items-center py-20 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div
                    className="absolute inset-0 w-full h-full mix-blend-screen"
                    style={{
                        opacity: 0.5,
                        backgroundImage: `url(${imgSeparatorPattern})`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "1000px"
                    }}
                />
                <div className="absolute inset-0 w-full h-full" style={{
                    backgroundImage: "linear-gradient(#ffffff0a 1px, transparent 1px)",
                    backgroundSize: "100% 32px"
                }} />
            </div>

            <div className="w-full max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center gap-8">
                <div className="flex flex-col gap-4 items-center">
                    <h2 className="font-headings font-normal text-2xl md:text-3xl leading-tight text-white">
                        {heading}
                    </h2>
                    <p className="font-sans font-medium text-sm sm:text-base leading-relaxed text-white/90 max-w-lg">
                        {description}
                    </p>
                </div>

                <div className="flex flex-col gap-4 items-center w-full max-w-[412px]">
                    <Link to="/book-call" className="rounded-md w-full sm:w-auto h-auto px-8 py-4 text-[14px] text-regal-navy hover:!text-regal-navy bg-white hover:bg-white/90">
                        {ctaLabel}
                    </Link>
                    {subtext && (
                        <p className="font-sans font-normal text-xs text-white/80">
                            {subtext}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
