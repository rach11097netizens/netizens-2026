import iconNavyTick from "../assets/images/navy-dark-tick.svg";
import imgWhatDefinesUs from "../assets/images/what-defines-us-img.svg";

const services = [
  "MVP design & development",
  "ERP/CRM customization and integrations",
  "Workflow digitization and automation",
  "AI consulting & implementation",
  "Ongoing support & scaling",
];

interface WhatDefinesUsProps {
  image?: string;
  imageAlt?: string;
}

export function WhatDefinesUs({ image = imgWhatDefinesUs, imageAlt = "Netizens team at work" }: WhatDefinesUsProps) {
  return (
    <section className="w-full bg-[#FFFFFF] py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Image / Media */}
          <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-sans text-[14px] text-charcoal/60">
                  Image placeholder
                </span>
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#0E3572]/10 border border-[#0E3572]/15 w-fit">
              <span className="font-sans font-semibold text-[12px] text-regal-navy uppercase tracking-wide">
                What defines us
              </span>
            </div>

            <h2 className="font-headings font-normal text-[28px] md:text-[36px] lg:text-[40px] leading-[1.2] text-carbon-black">
              We build systems, not just features.
            </h2>

            <p className="font-sans text-[15px] md:text-base leading-[26px] text-carbon-black/90">
              Netizens started as a product-focused engineering company. Over the years, we evolved into a full-stack software development and IT solutions partner for businesses that need more than outsourced coding.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <h3 className="font-sans font-semibold text-[16px] md:text-[18px] text-carbon-black">
                We work across:
              </h3>
              <div className="flex flex-wrap gap-3">
                {services.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-regal-navy/20 bg-[#0E3572]/5"
                  >
                    <img src={iconNavyTick} alt="" className="w-4 h-4 shrink-0" />
                    <span className="font-sans font-medium text-[14px] text-regal-navy">
                      {label}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <p className="font-sans text-[15px] md:text-base leading-[26px] text-carbon-black/90 mt-2">
              Our approach blends technical depth with product thinking. Every engagement is structured around outcomes, not just deliverables.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
