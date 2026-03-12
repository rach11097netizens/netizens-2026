"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import ellingtonLogo from "@/assets/images/clients/elington.png";
import danubeLogo from "@/assets/images/clients/sharukhz.png";
import alphaLogo from "@/assets/images/clients/alpha.png";
import ajmalLogo from "@/assets/images/clients/ajmal.png";
import waslLogo from "@/assets/images/clients/wasl.png";
import cazeLogo from "@/assets/images/clients/caze.png";
import skylarkLogo from "@/assets/images/clients/skylark.png";

const clients = [
  {
    name: "Ellington Properties",
    src: ellingtonLogo,
    width: 110,
    height: 44.26,
  },
  { name: "Shahrukh Danube", src: danubeLogo, width: 108, height: 54 },
  { name: "Alpha", src: alphaLogo, width: 94, height: 24 },
  { name: "Ajmal", src: ajmalLogo, width: 31, height: 48 },
  { name: "Wasl", src: waslLogo, width: 80, height: 29.47 },
  { name: "Caze AI", src: cazeLogo, width: 96, height: 26.68 },
  { name: "Skylark AI", src: skylarkLogo, width: 120, height: 24.94 },
];

export const Clients = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;
    const description = descriptionRef.current;

    if (section && title && grid && description) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });

      tl.fromTo(
        title,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      )
        .fromTo(
          grid.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .fromTo(
          description,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white pt-8 sm:pt-16 md:pt-20 flex flex-col items-center justify-center gap-6"
    >
      <h2
        ref={titleRef}
        className="font-headings text-2xl md:text-3xl text-carbon-black text-center mb-2"
      >
        Chosen by teams that ship
      </h2>

      <div
        ref={gridRef}
        className="flex flex-wrap justify-center gap-1 w-full max-w-[844px] px-4"
      >
        {clients.map((client, index) => (
          <div
            key={index}
            className="bg-regal-navy/5 flex items-center justify-center w-[calc(50%-2px)] md:w-[200px] h-[62px] shrink-0 transition-colors duration-300 hover:bg-regal-navy/10 group px-4"
          >
            <div
              className="bg-regal-navy/60 transition-colors duration-300 group-hover:bg-regal-navy"
              // aria-label={client.name}
              style={{
                width: `${client.width}px`,
                height: `${client.height}px`,
                WebkitMaskImage: `url('${client.src.src}')`,
                maskImage: `url('${client.src.src}')`,
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
              title={client.name}
            />
          </div>
        ))}
      </div>

      <p
        ref={descriptionRef}
        className="font-sans font-medium text-xs md:text-sm text-regal-navy text-center mt-2 px-4 max-w-lg"
      >
        MVPs, workflow tools, AI automation, and long-term support.
      </p>
    </section>
  );
};
