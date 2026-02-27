const stats = [
  {
    primary: "10+",
    category: "Years",
    description: "Building Products",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    primary: "150+",
    category: "Projects",
    description: "Delivered Across Industries",
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    primary: "50+",
    category: "AI, ERP & Workflow Systems",
    description: "Across SaaS, Fintech, Retail & Operations",
    className: "lg:col-span-1 lg:row-span-2", // Tall card on right, spans 2 cols
  },
  {
    primary: "8+",
    category: "Countries",
    description: "Served",
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    primary: "60%",
    category: "Long-Term Clients",
    description: "On Ongoing Retainers",
    className: "lg:col-span-1 lg:row-span-1",
  },
];

export function NetizensByNumbers() {
  return (
    <section className="w-full bg-[#FFFFFF] py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-headings font-normal text-[28px] md:text-[36px] text-carbon-black text-center mb-4 md:mb-6">
          Netizens by the numbers
        </h2>

        {/* Bento grid: 4 cols on desktop, 1 col on mobile. Layout: [1][2][3], [4][5][3] with 3 spanning 2 rows */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 auto-rows-fr px-2">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 md:p-8 rounded-[8px] border border-[rgba(14,53,114,0.1)] bg-white  flex flex-col gap-3 min-h-[140px] ${stat.className}`}
            >
              <span className="font-mono font-medium text-[32px] md:text-[44px] lg:text-[48px] leading-[1.1] text-[#103C87] tracking-tight">
                {stat.primary}
              </span>
              <span className="font-mono font-medium text-[15px] md:text-base text-[#103C87]">
                {stat.category}
              </span>
              <span className="font-sans text-[14px] leading-[22px] text-[#7B8599]">
                {stat.description}
              </span>
            </div>
          ))}
        </div>

        <p className="font-sans font-medium text-[15px] md:text-base text-regal-navy text-center mx-auto mt-4 md:mt-6 leading-relaxed">
          Built with structured delivery, sprint-based execution, and long-term product thinking.
        </p>
      </div>
    </section>
  );
}
