import imgSeparatorPattern from "../assets/images/pattern.png";
import { SidePattern } from "./SidePattern";
import iconTechExcellence from "../assets/images/engine-culture/tech-excellence.svg";
import iconMeasurableOutcomes from "../assets/images/engine-culture/measureable-outcomes.svg";
import iconCleanArch from "../assets/images/engine-culture/clean-arch.svg";
import iconMaintainCode from "../assets/images/engine-culture/maintain-code.svg";
import iconLongReliable from "../assets/images/engine-culture/long-reliable.svg";
import iconProdThinking from "../assets/images/engine-culture/prod-thinking.svg";

const cards = [
  {
    icon: iconTechExcellence,
    title: "Technical excellence",
    description: "We identify the highest-impact AI use cases and define success metrics before building.",
  },
  {
    icon: iconMeasurableOutcomes,
    title: "Measurable outcomes",
    description: "We integrate LLMs into your product or internal tools with the right context and safeguards.",
  },
  {
    icon: iconCleanArch,
    title: "Clean architecture",
    description: "We build structured prompt workflows that are consistent, testable, and reusable across teams.",
  },
  {
    icon: iconMaintainCode,
    title: "Maintainable code",
    description: "We connect your internal knowledge (docs, tickets, CRM notes) to LLMs for accurate answers.",
  },
  {
    icon: iconLongReliable,
    title: "Long-term reliability",
    description: "We build agents that take actions in tools (create tickets, update records) with controls.",
  },
  {
    icon: iconProdThinking,
    title: "Product-first thinking",
    description: "We make AI reliable in production with testing, monitoring, and security guardrails.",
  },
];

export function EngineeringCultureSection() {
  return (
    <section className="relative w-full bg-[#FFFAFA] flex flex-col items-center py-16 md:py-20 overflow-hidden">
      <SidePattern invert />
      <div className="w-full max-w-[1320px] mx-auto px-4 relative z-10 flex flex-col gap-10">
        {/* Header - matches ServiceScope structure */}
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="bg-[#0E3572]/5 border border-[#0E3572]/10 flex items-center justify-center px-4 py-2 rounded">
            <span className="font-sans text-xs text-regal-navy">
              Engineering culture
            </span>
          </div>
          <h2 className="font-headings font-normal text-3xl md:text-[30px] leading-snug text-carbon-black">
            Structured delivery. Clear ownership. No chaos.
          </h2>
          <p className="font-sans text-sm text-charcoal/80 leading-[22px] max-w-[640px]">
            We operate with sprint-based execution, clear accountability, and transparent reporting.
          </p>
        </div>

        {/* Grid - exact same layout as ServiceScope: single bordered container, cards share borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full border border-[rgba(14,53,114,0.1)] overflow-hidden rounded-[8px]">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border-[0.5px] border-[rgba(14,53,114,0.1)] flex flex-col items-start p-6 md:p-8 hover:bg-[#FFFAFA] transition-all duration-300 gap-6 min-h-[240px] hover:z-10 hover:shadow-[0_0_20px_rgba(14,53,114,0.08)] relative"
            >
              <div className="flex flex-col gap-4 relative z-10">
                <div className="bg-[#E8ECF0] rounded-[8px] p-1.5 w-fit">
                  <img src={card.icon} alt={card.title} className="w-16 h-16 object-contain" />
                </div>
                <h3 className="font-headings font-normal text-lg md:text-[18px] text-carbon-black leading-[25px]">
                  {card.title}
                </h3>
              </div>
              <p className="font-sans font-medium text-sm leading-[22px] text-charcoal/80 relative z-10">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA addon - navy bar, no button (replaces ctaCards) */}
        <div className="relative mt-2">
          <div className="relative bg-regal-navy rounded-[8px] overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: `url(${imgSeparatorPattern})`,
                backgroundRepeat: "repeat",
                backgroundSize: "1000px",
              }}
            />
            <div className="relative z-10 py-8 md:py-10 px-6 md:px-12 text-center">
              <p className="font-headings font-normal text-[22px] md:text-[28px] leading-[1.3] text-white">
                We Don&apos;t Just &quot;Deliver Projects.&quot; We Design Systems That Last.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
