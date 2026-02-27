import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroProps {
  badge: string;
  heading: string;
  description: string;
  primaryCta?: string;
  secondaryCta?: string;
  image: string;
  imageAlt: string;
}

export function Hero({
  badge,
  heading,
  description,
  primaryCta = "Book a Discovery Call",
  secondaryCta = "How We Work",
  image,
  imageAlt,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initAnimations = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      const section = sectionRef.current;

      // Animate left-side content elements with stagger
      const contentItems = section.querySelectorAll(".hero-animate-item");
      gsap.fromTo(
        contentItems,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate hero image from the right
      const heroImage = section.querySelector(".hero-animate-image");
      if (heroImage) {
        gsap.fromTo(
          heroImage,
          { opacity: 0, x: 60, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    };

    initAnimations();

    return () => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => {
          if (
            sectionRef.current &&
            t.trigger === sectionRef.current
          ) {
            t.kill();
          }
        });
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-between lg:flex-row gap-4 lg:gap-6 xl:gap-24 overflow-hidden z-10"
    >
      <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left w-full lg:w-[50%] gap-6">
        <div className="hero-animate-item flex items-center justify-center px-[18px] py-[8px] bg-[#0E3572]/5 border border-[#0E3572]/10 rounded-[4px]">
          <span className="font-sans font-bold text-[12px] text-regal-navy text-center uppercase tracking-wide">
            {badge}
          </span>
        </div>

        <h1 className="hero-animate-item font-headings font-normal text-2xl md:text-4xl xl:text-[46px] leading-[1.1] md:leading-[1.1] text-carbon-black capitalize">
          {heading}
        </h1>

        <p className="hero-animate-item font-sans font-normal text-xs md:text-sm leading-[22px] md:leading-relaxed text-gray-600 max-w-[90%]">
          {description}
        </p>

        <div className="hero-animate-item flex flex-col sm:flex-row items-center lg:items-start gap-4 mt-2 w-full sm:w-auto">
          <Link to="/book-call" className="px-8 py-4 bg-button-gradient text-white text-sm rounded-button transition-colors flex items-center justify-center gap-2 font-medium">
            {primaryCta}
            <ArrowRight size={20} />
          </Link>
          <Link to="/how-we-work" className="px-8 py-4 border-2 border-gray-300 text-black text-sm rounded-md hover:bg-black hover:text-white hover:border-black transition-colors font-medium">
            {secondaryCta}
          </Link>
        </div>
      </div>

      <div className="hero-animate-image w-full lg:w-[50%] flex items-center justify-center relative">
        <div className="relative w-full max-w-[648px] flex items-center justify-center">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
