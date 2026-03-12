// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import newBgImage from "@/assets/images/new-bg-image.svg";
// import { RatingWidget } from "@/components/RatingWidget";
// import { EnquiryForm } from "@/components/EnquiryForm";

// export default function HeroService() {
//   const contentRef = useRef<HTMLDivElement>(null);
//   const formRef = useRef<HTMLDivElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);

//   useEffect(() => {
//     // Basic GSAP animation on load
//     const ctx = gsap.context(() => {
//       // Staggered word animation for title
//       if (titleRef.current) {
//         const words = titleRef.current.querySelectorAll(".word-wrapper");
//         gsap.fromTo(
//           words,
//           { yPercent: 120, opacity: 0 },
//           {
//             yPercent: 0,
//             opacity: 1,
//             duration: 1,
//             stagger: 0.05,
//             ease: "circ",
//             delay: 0.1,
//           },
//         );
//       }

//       gsap.fromTo(
//         contentRef.current,
//         { opacity: 0, y: 50 },
//         { opacity: 1, y: 0, duration: 1, ease: "circ", delay: 0.4 },
//       );

//       gsap.fromTo(
//         formRef.current,
//         { opacity: 0, x: 50 },
//         { opacity: 1, x: 0, duration: 1, ease: "circ", delay: 0.6 },
//       );
//     });

//     return () => ctx.revert();
//   }, []);

//   // Split words utility for the main headline
//   const line1 = "In Dubai Real Estate,";
//   const line2 = "Your";
//   const highlight = "Landing Page";
//   const line3 = "Decides The Deal.";

//   const renderWords = (text: string, customClass: string = "") => {
//     return text.split(" ").map((word, i) => (
//       <span
//         key={i}
//         className="inline-block overflow-hidden align-bottom pb-2 -mb-2"
//       >
//         <span className={`inline-block word-wrapper ${customClass}`}>
//           {word}
//         </span>
//         <span className="inline-block">&nbsp;</span>
//       </span>
//     ));
//   };

//   return (
//     <section className="relative w-full min-h-[80vh] pt-28 pb-9 sm:pb-20 flex items-center overflow-hidden">
//       {/* Hero Background - new-bg-image.svg (repeating pattern) */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none hidden md:block mix-blend-multiply"
//         style={{
//           backgroundImage: `url(${newBgImage.src})`,
//           backgroundRepeat: "repeat-x",
//           backgroundPosition: "bottom center",
//           backgroundSize: "auto 30%",
//         }}
//       />

//       <div className="max-w-[1320px] mx-auto px-4 w-full flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-8 z-10">
//         {/* Left Content */}
//         <div className="flex flex-col gap-6 lg:gap-10 max-w-4xl w-full order-1">
//           <h1
//             ref={titleRef}
//             className="text-3xl md:text-5xl lg:text-6xl md:leading-[1.1] lg:leading-snug 2xl:leading-20 font-['Plus_Jakarta_Sans',sans-serif] font-bold text-carbon-black flex flex-wrap"
//           >
//             {renderWords(line1)}
//             <span className="w-full hidden md:block" />
//             {renderWords(line2)}
//             {renderWords(
//               highlight,
//               "font-serif italic font-normal text-regal-navy",
//             )}
//             {renderWords(line3)}
//           </h1>

//           <div ref={contentRef} className="flex flex-col gap-4 lg:gap-10">
//             <div className="w-full h-px bg-black/10" />

//             <p className="text-base md:text-2xl text-carbon-black font-headings">
//               <span className="font-bold text-regal-navy">How? </span>
//               Scroll below or connect with an expert directly
//             </p>

//             {/* Desktop: widget in left column */}
//             <div className="hidden lg:block">
//               <RatingWidget />
//             </div>
//           </div>
//         </div>

//         {/* Right - Form Container */}
//         <div
//           ref={formRef}
//           className="w-full border lg:w-[424px] shrink-0 bg-white px-5 py-5 sm:py-8 rounded-[10px] shadow-xl relative order-2"
//         >
//           <EnquiryForm />
//         </div>

//         {/* Mobile: full-width widget below embed */}
//         <div className="w-full lg:hidden order-3">
//           <RatingWidget />
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { RatingWidget } from "@/components/RatingWidget";
import { EnquiryForm } from "@/components/EnquiryForm";
import newBgImage from "@/assets/images/new-bg-image.svg";

export default function HeroService() {
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Basic GSAP animation on load
    const ctx = gsap.context(() => {
      // Staggered word animation for title
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word-wrapper");
        gsap.fromTo(
          words,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.05,
            ease: "circ",
            delay: 0.1,
          },
        );
      }

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "circ", delay: 0.4 },
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: "circ", delay: 0.6 },
      );
    });

    return () => ctx.revert();
  }, []);

  // Split words utility for the main headline
  const line1 = "In Dubai Real Estate,";
  const line2 = "Your";
  const highlight = "Landing Page";
  const line3 = "Decides The Deal.";

  const renderWords = (text: string, customClass: string = "") => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className="inline-block overflow-hidden align-bottom pb-2 -mb-2"
      >
        <span className={`inline-block word-wrapper ${customClass}`}>
          {word}
        </span>
        <span className="inline-block">&nbsp;</span>
      </span>
    ));
  };

  return (
    <section className="relative w-full min-h-[80vh] pt-24 pb-9 sm:pb-20 flex items-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${newBgImage.src})`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom center",
          backgroundSize: "auto 30%",
        }}
      />

      <div className="max-w-[1320px] mx-auto px-4 w-full flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-8 z-10">
        {/* Left Content */}
        <div className="flex flex-col gap-6 lg:gap-10 max-w-4xl w-full order-1">
          <h1
            ref={titleRef}
            className="font-jakarta text-3xl md:text-5xl lg:text-6xl leading-normal md:leading-none lg:leading-snug 2xl:leading-snug font-bold text-carbon-black flex flex-wrap"
          >
            {renderWords(line1)}
            <span className="w-full hidden md:block" />
            {renderWords(line2)}
            {renderWords(
              highlight,
              "font-serif italic font-normal text-regal-navy",
            )}
            {renderWords(line3)}
          </h1>

          <div ref={contentRef} className="flex flex-col gap-4 lg:gap-10">
            <div className="w-full h-px bg-black/10" />

            <p className="text-base md:text-2xl text-carbon-black font-headings">
              <span className="font-bold text-regal-navy">How? </span>
              Scroll below or connect with an expert directly
            </p>

            {/* Desktop: widget in left column */}
            <div className="hidden lg:block">
              <RatingWidget />
            </div>
          </div>
        </div>

        {/* Right - Form Container */}
        <div
          id="enquiry-form"
          ref={formRef}
          className="w-full border lg:w-[424px] shrink-0 bg-white px-4 py-6 sm:py-8 rounded-[10px] shadow-xl relative order-2"
        >
          <EnquiryForm />
        </div>

        {/* Mobile: full-width widget below embed */}
        <div className="w-full lg:hidden order-3">
          <RatingWidget />
        </div>
      </div>
    </section>
  );
}
