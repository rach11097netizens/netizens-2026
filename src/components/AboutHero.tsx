interface AboutHeroProps {
  badge: string;
  heading: string;
  description: string;
}

export function AboutHero({
  badge,
  heading,
  description,
}: AboutHeroProps) {
  return (
    <section className="relative w-full max-w-3xl mx-auto px-4 py-8 md:py-24 flex flex-col items-center justify-between overflow-hidden z-10">
      <div className="flex flex-col items-start justify-center w-full gap-6">
        <div className="flex items-center justify-center px-[18px] py-[8px] bg-[#0E3572]/5 border border-[#0E3572]/10 rounded-[4px]">
          <span className="font-sans font-bold text-[12px] text-regal-navy text-center uppercase tracking-wide">
            {badge}
          </span>
        </div>

        <h1 className="font-headings font-normal text-4xl md:text-[46px] leading-[1.1] md:leading-[1.1] text-carbon-black capitalize">
          {heading}
        </h1>

        <p className="font-sans font-medium text-[14px] md:text-base leading-[22px] md:leading-relaxed text-charcoal max-w-[90%]">
          {description}
        </p>
      </div>
    </section>
  );
}
