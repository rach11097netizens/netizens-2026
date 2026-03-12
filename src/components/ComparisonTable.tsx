import { Button } from "@/components/Button";

import { ExternalLink, BadgeCheck, X } from "lucide-react";
import { SidePattern } from "@/components/SidePattern";

import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import pattern from "@/assets/images/pattern.png";

const CheckIcon = () => (
  <BadgeCheck
    className="w-4 h-4 md:w-7 md:h-7 text-white shrink-0"
    fill="#3BAFDA"
    strokeWidth={2}
  />
);

const CrossIcon = () => (
  <div className="w-4 h-4 md:w-7 md:h-7 rounded-full bg-[#ED1C24]/10 flex items-center justify-center shrink-0">
    <X className="w-3.5 md:w-sm h-3.5 md:h-sm text-[#ED1C24]" strokeWidth={3} />
  </div>
);

export const ComparisonTable = () => {
  return (
    <section className="relative w-full bg-[#FDFDFD] overflow-hidden px-4 md:px-8 flex flex-col items-center py-10 md:py-16 lg:py-20">
      <SidePattern invert />

      <div className="max-w-[1320px] mx-auto flex flex-col items-center gap-2 sm:gap-[34px] relative z-10 w-full font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header title */}
        <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-2xl md:text-4xl text-[#16181B] text-center leading-tight">
          Not Just a Landing Page. A Scalable Launch System.
        </h2>

        {/* Mac Window Container */}
        <div className="w-full flex flex-col justify-center mt-4 sm:pb-4 pb-12">
          {/* Mac window shell — full width, no horizontal scroll */}
          <div className="w-full flex flex-col shadow-sm rounded-[12px] border border-gray-100">
            {/* Mac Window Header Bar — always full width, never scrolls */}
            <div className="flex items-center px-4 py-3 bg-white border-b w-full shrink-0 rounded-t-[12px]">
              <div className="flex gap-2">
                <div className="w-[15px] h-[15px] rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                <div className="w-[15px] h-[15px] rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                <div className="w-[15px] h-[15px] rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
              </div>
              <div className="flex-1 text-center font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[rgba(88,89,91,0.75)] tracking-wide uppercase">
                Transparency
              </div>
              <div className="">
                <button aria-label="Open in external link" type="button">
                  <ExternalLink size={20} className="text-charcoal" />
                </button>
              </div>
            </div>

            {/* Only the data grid scrolls horizontally on mobile */}
            <div className="overflow-x-auto custom-scrollbar">
              <div className="min-w-[700px] sm:min-w-[800px] md:min-w-full">
                {/* Data Grid Wrapper */}
                <div className="bg-white rounded-b-[12px] grid grid-cols-4 w-full h-full relative overflow-visible">
                  {/* ----------------------- */}
                  {/* Grid Headings (Row 1)   */}
                  {/* ----------------------- */}
                  <div className="p-2 sm:p-3.5 flex items-center justify-center border-b border-r border-[#EBEBEB] bg-white sticky -left-2.5 z-30 md:static md:z-auto md:shadow-none shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)]">
                    {/* Empty top-left cell */}
                  </div>
                  <div className="p-2 sm:p-3.5 flex items-center justify-center border-b border-[#EBEBEB] bg-[rgba(14,53,114,0.05)]">
                    <h3 className="font-['Sora',sans-serif] font-semibold text-sm md:text-lg text-[#16181B] text-center">
                      Traditional Agency
                    </h3>
                  </div>
                  <div className="p-2 sm:p-3.5 flex items-center justify-center border-b border-[#EBEBEB] bg-[rgba(237,28,36,0.05)]">
                    <h3 className="font-['Sora',sans-serif] font-semibold text-sm md:text-lg text-[#16181B] text-center">
                      Freelance Developer
                    </h3>
                  </div>
                  <div className="p-2 sm:p-3.5 flex items-center justify-center border-t-2 border-l-2 border-r-2 border-[#0E3572] bg-white shadow-[0px_0px_53.7px_0px_rgba(14,53,114,0.1)] relative z-20">
                    <Image
                      src={logo}
                      alt="Netizens Technologies"
                      className="h-12 w-auto max-w-24 md:max-w-40 xs:max-w-max"
                    />
                  </div>

                  {/* ----------------------- */}
                  {/* Built for real estate   */}
                  {/* ----------------------- */}
                  <div className="p-3 sm:p-3.5 border-b border-r border-[#EBEBEB] flex items-center bg-white sticky -left-2.5 z-30 md:static md:z-auto md:shadow-none shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)]">
                    <p className="font-['Sora',sans-serif] font-normal text-xs md:text-xl text-[#0E3572] sm:leading-tight">
                      Built for real estate performance
                    </p>
                  </div>
                  <div className="p-3 sm:p-3.5 border-b border-r border-[#EBEBEB] bg-[rgba(14,53,114,0.05)] flex items-center gap-3">
                    <CrossIcon />
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs md:text-base text-[#58595B]">
                      Generic templates
                    </p>
                  </div>
                  <div className="p-3 sm:p-3.5 border-b border-r border-[#EBEBEB] bg-[rgba(237,28,36,0.05)] flex items-center gap-3">
                    <CrossIcon />
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs md:text-base text-[#58595B]">
                      Design-focused only
                    </p>
                  </div>
                  <div className="p-2 sm:p-3.5 border-l-2 border-r-2 border-[#0E3572] bg-white shadow-[0px_0px_53.7px_0px_rgba(14,53,114,0.1)] flex items-center gap-3 relative z-20">
                    <CheckIcon />
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs md:text-base text-[#0E3572]">
                      Specific for Dubai real estate
                    </p>
                  </div>

                  {/* ----------------------- */}
                  {/* Reusable across projects*/}
                  {/* ----------------------- */}
                  <div className="p-3 sm:p-3.5 border-b border-r border-[#EBEBEB] flex items-center bg-white sticky -left-2.5 z-30 md:static md:z-auto md:shadow-none shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)]">
                    <p className="font-['Sora',sans-serif] font-normal text-xs md:text-xl text-[#0E3572]">
                      Reusable across projects
                    </p>
                  </div>
                  <div className="p-3 sm:p-3.5 border-b border-r border-[#EBEBEB] bg-[rgba(14,53,114,0.05)] flex items-center gap-3">
                    <CrossIcon />
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs md:text-base text-[#58595B]">
                      Rebuilt every launch
                    </p>
                  </div>
                  <div className="p-3 sm:p-3.5 border-b border-r border-[#EBEBEB] bg-[rgba(237,28,36,0.05)] flex items-center gap-3">
                    <CrossIcon />
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs md:text-base text-[#58595B]">
                      Manual rebuild
                    </p>
                  </div>
                  <div className="p-2 sm:p-3.5 border-l-2 border-r-2 border-[#0E3572] bg-white shadow-[0px_0px_53.7px_0px_rgba(14,53,114,0.1)] flex items-center gap-3 relative z-20">
                    <CheckIcon />
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs md:text-base text-[#0E3572]">
                      Modular architecture
                    </p>
                  </div>

                  {/* ----------------------- */}
                  {/* Ad tracking & pixel setup */}
                  {/* ----------------------- */}
                  <div className="p-3 sm:p-3.5 border-b border-r border-[#EBEBEB] flex items-center bg-white sticky -left-2.5 z-30 md:static md:z-auto md:shadow-none shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)]">
                    <p className="font-['Sora',sans-serif] font-normal text-xs md:text-xl text-[#0E3572]">
                      Ad tracking & pixel setup
                    </p>
                  </div>
                  <div className="p-3 sm:p-3.5 border-b border-r border-[#EBEBEB] bg-[rgba(14,53,114,0.05)] flex items-center gap-3">
                    <CrossIcon />
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs md:text-base text-[#58595B]">
                      Extra cost
                    </p>
                  </div>
                  <div className="p-3 sm:p-3.5 border-b border-r border-[#EBEBEB] bg-[rgba(237,28,36,0.05)] flex items-center gap-3">
                    <CrossIcon />
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs md:text-base text-[#58595B]">
                      Basic setup
                    </p>
                  </div>
                  <div className="p-2 sm:p-3.5 border-l-2 border-r-2 border-[#0E3572] bg-white shadow-[0px_0px_53.7px_0px_rgba(14,53,114,0.1)] flex items-center gap-3 relative z-20">
                    <CheckIcon />
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs md:text-base text-[#0E3572]">
                      Fully configured
                    </p>
                  </div>

                  {/* ----------------------- */}
                  {/* Lead quality optimization */}
                  {/* ----------------------- */}
                  <div className="p-3 sm:p-3.5 border-b border-r border-[#EBEBEB] flex items-center bg-white sticky -left-2.5 z-30 md:static md:z-auto md:shadow-none shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)]">
                    <p className="font-['Sora',sans-serif] font-normal text-xs md:text-xl text-[#0E3572]">
                      Lead quality optimization
                    </p>
                  </div>
                  <div className="p-3 sm:p-3.5 border-b border-r border-[#EBEBEB] bg-[rgba(14,53,114,0.05)] flex items-center gap-3">
                    <CrossIcon />
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs md:text-base text-[#58595B]">
                      Volume-focused
                    </p>
                  </div>
                  <div className="p-3 sm:p-3.5 border-b border-r border-[#EBEBEB] bg-[rgba(237,28,36,0.05)] flex items-center gap-3">
                    <CrossIcon />
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs md:text-base text-[#58595B]">
                      Not structured
                    </p>
                  </div>
                  <div className="p-2 sm:p-3.5 border-l-2 border-r-2 border-[#0E3572] bg-white shadow-[0px_0px_53.7px_0px_rgba(14,53,114,0.1)] flex items-center gap-3 relative z-20">
                    <CheckIcon />
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs md:text-base text-[#0E3572]">
                      High-intent filtering
                    </p>
                  </div>

                  {/* ----------------------- */}
                  {/* Long-term scalability */}
                  {/* ----------------------- */}
                  <div className="p-3 sm:p-3.5 border-b border-r border-[#EBEBEB] flex items-center bg-white sticky -left-2.5 z-30 md:static md:z-auto md:shadow-none shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)]">
                    <p className="font-['Sora',sans-serif] font-normal text-xs md:text-xl text-[#0E3572]">
                      Long-term scalability
                    </p>
                  </div>
                  <div className="p-3 sm:p-3.5 border-b border-r border-[#EBEBEB] bg-[rgba(14,53,114,0.05)] flex items-center gap-3">
                    <CrossIcon />
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs md:text-base text-[#58595B]">
                      Limited
                    </p>
                  </div>
                  <div className="p-3 sm:p-3.5 border-b border-r border-[#EBEBEB] bg-[rgba(237,28,36,0.05)] flex items-center gap-3">
                    <CrossIcon />
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs md:text-base text-[#58595B]">
                      No system
                    </p>
                  </div>
                  <div className="p-2 sm:p-3.5 border-l-2 border-r-2 border-[#0E3572] bg-white shadow-[0px_0px_53.7px_0px_rgba(14,53,114,0.1)] flex items-center gap-3 relative z-20">
                    <CheckIcon />
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-xs md:text-base text-[#0E3572]">
                      Built for multi-project scale
                    </p>
                  </div>

                  {/* ----------------------- */}
                  {/* Speed to launch */}
                  {/* ----------------------- */}
                  <div className="p-2 sm:p-3.5 flex items-center border-r border-[#EBEBEB] rounded-bl-[12px] bg-white sticky -left-2.5 z-30 md:static md:z-auto md:shadow-none shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)]">
                    <p className="font-['Sora',sans-serif] font-normal text-xs md:text-xl text-[#0E3572]">
                      Speed to launch
                    </p>
                  </div>
                  <div className="p-2 sm:p-3.5 border-r border-[#EBEBEB] bg-[rgba(14,53,114,0.05)] flex items-center justify-center">
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-sm text-[#58595B]">
                      2–4 weeks
                    </p>
                  </div>
                  <div className="p-2 sm:p-3.5 border-r border-[#EBEBEB] bg-[rgba(237,28,36,0.05)] flex items-center justify-center">
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-sm text-[#58595B]">
                      1–2 weeks
                    </p>
                  </div>
                  <div className="p-2 sm:p-3.5 border-b-2 border-l-2 border-r-2 border-[#0E3572] bg-white shadow-[0px_0px_53.7px_0px_rgba(14,53,114,0.1)] flex items-center justify-center relative z-20">
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base md:text-lg text-[#0E3572]">
                      3–5 days
                    </p>
                  </div>

                  {/* Empty placeholders for the first 3 columns */}
                  <div className="col-span-3"></div>
                  {/* Button inside table — visible on sm+ only */}
                  <div className="my-3 hidden sm:flex items-center justify-center relative z-20">
                    <Button
                      variant="primary"
                      className="w-full shadow-xl !text-xs md:!text-base max-w-[95%]"
                    >
                      Book a Discovery Call
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Button below table — visible on mobile only */}
          <div className="sm:hidden w-full mt-3">
            <Button variant="primary" className="w-full shadow-xl !text-xs">
              Book a Discovery Call
            </Button>
          </div>
        </div>

        {/* Final Problem Banner */}
        <div className="w-full max-w-[1016px] relative">
          {/* Content Box */}
          <div className="bg-regal-navy rounded-[10px] px-6 md:px-10 py-8 flex justify-center items-center text-center relative overflow-hidden shadow-lg w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none">
              <Image src={pattern} alt="" className="w-full opacity-10" />
            </div>

            <p className="font-['Sora',sans-serif] font-semibold text-sm md:text-2xl text-white leading-relaxed max-w-3xl relative z-10 px-4">
              Most landing pages are built for design.
              <br />
              Ours are built for performance and scale.
            </p>
          </div>

          {/* Left Rope */}
          <div className="absolute left-8 md:left-12 top-[-48px] w-[1px] md:w-[2px] h-[72px] bg-gradient-to-b from-[#E4E7ED] to-[#16181B] z-20 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[18px] h-[18px] md:w-[22px] md:h-[22px] bg-white border-[3px] md:border-[4px] border-[#3EAFD1] rounded-full shadow-sm"></div>
          </div>

          {/* Right Rope */}
          <div className="absolute right-8 md:right-12 top-[-48px] w-[1px] md:w-[2px] h-[72px] bg-gradient-to-b from-[#E4E7ED] to-[#16181B] z-20 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[18px] h-[18px] md:w-[22px] md:h-[22px] bg-white border-[3px] md:border-[4px] border-[#3EAFD1] rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
