export const CTASection = () => {
  return (
    <section className="relative w-full py-8 sm:py-14 md:py-20 bg-regal-navy overflow-hidden flex flex-col items-center justify-center px-4 md:px-8">
      {/* Subtle Noise/Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
        }}
      />

      <div className="relative z-10 max-w-[800px] w-full flex flex-col items-center gap-4 sm:gap-6 text-center">
        {/* Text Content */}
        <div className="flex flex-col gap-4 sm:gap-[10px] items-center">
          <h2 className="font-['Sora',sans-serif] font-normal leading-[1.2] text-2xl md:text-3xl text-[#FFFAFA] capitalize max-w-[600px]">
            Doing everything and still not getting result
          </h2>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium leading-[26px] text-[16px] md:text-[18px] text-[#FFFAFA] opacity-90 max-w-[552px]">
            Let us audit your landing page
          </p>
        </div>

        {/* CTA Button */}
        <div className="sm:mt-4">
          <button className="bg-white hover:bg-gray-50 text-regal-navy font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-[16px] font-semibold px-[34px] py-3 sm:py-[18px] rounded-[4px] shadow-[0px_12px_12px_0px_rgba(0,0,0,0.13),0px_28px_17px_0px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1">
            Audit My Current Landing Page
          </button>
        </div>
      </div>
    </section>
  );
};
