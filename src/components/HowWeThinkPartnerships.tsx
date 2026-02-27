import { Link } from "react-router-dom";
import imgSeparatorPattern from "../assets/images/pattern.png";
import { SidePattern } from "./SidePattern";
import iconBusinessConstraints from "../assets/images/about-partners/business-constraints.svg";
import iconBalance from "../assets/images/about-partners/balance.svg";
import iconDocument from "../assets/images/about-partners/document.svg";
import iconGrow from "../assets/images/about-partners/grow.svg";

const cards = [
  {
    icon: iconBusinessConstraints,
    description: "We understand business constraints",
    label: "HOW WE WORK",
  },
  {
    icon: iconBalance,
    description: "We balance speed with sustainability",
    label: "HOW WE WORK",
  },
  {
    icon: iconDocument,
    description: "We document and structure everything",
    label: "HOW WE WORK",
  },
  {
    icon: iconGrow,
    description: "We grow alongside their product",
    label: "HOW WE WORK",
  },
];

export function HowWeThinkPartnerships() {
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
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="bg-white/10 border border-[#0E3572]/10 flex items-center justify-center px-[18px] py-[8px] rounded-[4px]">
            <span className="font-sans text-[12px] text-white tracking-wide">
              How we think about partnerships
            </span>
          </div>
          <h2 className="font-headings font-normal text-3xl md:text-[36px] leading-snug text-white">
            We stay when others step away.
          </h2>
          <p className="font-sans text-sm text-white/70 leading-[22px]">
            Most vendors disappear after launch. We optimize, scale, and support long after version one ships.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#274A81] rounded-[10px] p-2 md:p-4 flex flex-col items-start gap-6 min-h-[240px]  transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <img src={card.icon} alt="" className="w-14 h-14 md:w-16 md:h-16 object-contain" />
              </div>
              <p className="font-headings text-base md:text-lg text-white leading-snug">
                {card.description}
              </p>
              <Link
                to="/how-we-work"
                className="font-sans text-[11px] font-semibold text-white/70 uppercase tracking-wider mt-auto hover:text-white transition-colors"
              >
                {card.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
