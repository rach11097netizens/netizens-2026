"use client";
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import { SidePattern } from './SidePattern'
import quoteMarkSvg from '../assets/images/quote-mark.svg'
import testimonialAvatar1 from '../assets/images/testimonial-avatar-1.png'
import testimonialAvatar2 from '../assets/images/testimonial-avatar-2.png'
import testimonialAvatar3 from '../assets/images/testimonial-avatar-3.png'
import testimonialAvatar4 from '../assets/images/testimonial-avatar-4.png'
import Image from 'next/image';

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context((self) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Animate heading group with stagger
      tl.fromTo(
        '.testimonial-badge',
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }
      )
        .fromTo(
          '.testimonial-title',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.testimonial-subtitle',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
          '-=0.2'
        );

      // Animate cards
      tl.fromTo(
        '.card-tall-left',
        { opacity: 0, x: -50, rotateY: 5 },
        { opacity: 1, x: 0, rotateY: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.2'
      )
        .fromTo(
          '.card-short-top',
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.card-short-bottom',
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.card-tall-right',
          { opacity: 0, x: 50, rotateY: -5 },
          { opacity: 1, x: 0, rotateY: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.5'
        );

      // Animate quote marks and text
      tl.fromTo(
        '.quote-mark',
        { opacity: 0, scale: 0, rotation: -15 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(2.5)' },
        '-=0.4'
      )
        .fromTo(
          '.testimonial-text',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          '.author-info',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(
          '.avatar-circle',
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)' },
          '-=0.3'
        );

      // Subtle hover animations for cards using GSAP
      const cards = section.querySelectorAll('.testimonial-card');
      cards.forEach((card) => {
        const hoverIn = () => {
          gsap.to(card, {
            y: -6,
            boxShadow: '0px 14px 28px rgba(0,0,0,0.12), 0px 4px 10px rgba(0,0,0,0.08)',
            duration: 0.3,
            ease: 'power2.out',
          });
        };
        const hoverOut = () => {
          gsap.to(card, {
            y: 0,
            boxShadow: 'none',
            duration: 0.3,
            ease: 'power2.out',
          });
        };
        card.addEventListener('mouseenter', hoverIn);
        card.addEventListener('mouseleave', hoverOut);

        // Cleanup event listeners
        self.add(() => {
          card.removeEventListener('mouseenter', hoverIn);
          card.removeEventListener('mouseleave', hoverOut);
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-[80px] relative overflow-hidden">
      {/* Side line patterns */}
      <SidePattern />

      <div className="max-w-[1320px] mx-auto px-5 md:px-10 relative">
        {/* Heading */}
        <div className="flex flex-col gap-[8px] items-center justify-center mb-[34px]">
          <div className="testimonial-badge inline-flex items-center justify-center px-3 py-2 bg-[rgba(14,53,114,0.05)] border border-[rgba(14,53,114,0.1)] rounded">
            <span className="text-xs font-normal text-[#0E3572] font-['Plus_Jakarta_Sans']">
              Results from the wild
            </span>
          </div>
          <h2 className="testimonial-title text-2xl lg:text-3xl text-center font-normal text-[#16181B]">
            What it's like to work with us
          </h2>
          <p className="testimonial-subtitle text-sm font-medium text-[#58595B] font-['Plus_Jakarta_Sans'] text-center leading-[22px] w-full max-w-[460px]">
            {` Real projects. Real teams. Real results across product development, AI consulting, and support.`}
          </p>
        </div>

        {/* Testimonials Grid - Asymmetric 3-column layout */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-6 lg:justify-between max-w-[1096px] mx-auto">
          {/* Left tall card - Sarah Jones */}
          <div
            className="testimonial-card card-tall-left flex flex-col gap-[18px] p-[18px] rounded-[10px] w-full lg:w-[312px] h-auto lg:h-[384px] backdrop-blur-[2px] bg-[#EEECF0] border border-[rgba(88,89,91,0.1)] transition-colors duration-300"
          >
            <div className="quote-mark w-[27px] h-[22px] shrink-0">
              <Image
                src={quoteMarkSvg}
                alt=""
                className="w-full h-full block"
              />
            </div>
            <p className="testimonial-text flex-1 text-base font-medium text-[#16181B] font-['Plus_Jakarta_Sans'] leading-[24px]">
              Netizens turned a messy idea into a working MVP fast. Clear weekly progress, no drama, and the UX came out better than we expected."
            </p>
            <div className="author-info flex gap-2 items-center w-full">
              <div className="avatar-circle w-[42px] h-[42px] rounded-[80px] shrink-0 overflow-hidden relative">
                <Image
                  src={testimonialAvatar1}
                  alt="Sarah Jones"
                  className="absolute w-[168.42%] h-[252.38%] max-w-none"
                  style={{ left: '-43.14%', top: '-36.21%' }}
                />
              </div>
              <div className="flex flex-col gap-[6px] flex-1 justify-center min-w-0 text-[#16181B]">
                <p className="text-base font-medium font-['Plus_Jakarta_Sans'] leading-[24px]">
                  Sarah Jones
                </p>
                <p className="text-xs font-normal font-['Plus_Jakarta_Sans']">
                  Founder, SaaS Startup
                </p>
              </div>
            </div>
          </div>

          {/* Center column - Two stacked shorter cards */}
          <div className="flex flex-col gap-6 w-full lg:w-[424px]">
            {/* Ben - Ops Lead */}
            <div
              className="testimonial-card card-short-top flex flex-col gap-[18px] p-[18px] rounded-[10px] w-full h-auto lg:h-[180px] bg-[rgba(22,24,27,0.05)] border border-[rgba(88,89,91,0.1)] transition-colors duration-300"
            >
              <p className="testimonial-text flex-1 text-sm font-medium text-[#58595B] font-['Plus_Jakarta_Sans'] leading-[22px]">
                We replaced spreadsheets and follow-ups with one workflow that actually matches how our team works. Errors dropped and reporting finally makes sense.
              </p>
              <div className="author-info flex gap-2 items-center w-full">
                <div className="avatar-circle w-[42px] h-[42px] rounded-[80px] shrink-0 overflow-hidden relative">
                  <Image src={testimonialAvatar2} alt="Ben" className="absolute h-full max-w-none"
                    style={{ width: '150.26%', left: '-30.33%', top: '-0.91%' }} />
                </div>
                <div className="flex flex-col gap-[6px] justify-center text-[#58595B] w-[313px]">
                  <p className="text-base font-medium font-['Plus_Jakarta_Sans'] leading-[24px]">
                    Ben
                  </p>
                  <p className="text-xs font-normal font-['Plus_Jakarta_Sans']">
                    Ops Lead
                  </p>
                </div>
              </div>
            </div>

            {/* Myra - CTO */}
            <div
              className="testimonial-card card-short-bottom flex flex-col gap-[18px] p-[18px] rounded-[10px] w-full h-auto lg:h-[180px] bg-[rgba(22,24,27,0.05)] border border-[rgba(88,89,91,0.1)] transition-colors duration-300"
            >
              <p className="testimonial-text flex-1 text-sm font-medium text-[#58595B] font-['Plus_Jakarta_Sans'] leading-[22px]">
                We added engineers in days, not weeks. They wrote production-quality code and fit into our sprint cadence without hand-holding
              </p>
              <div className="author-info flex gap-2 items-center w-full">
                <div className="avatar-circle w-[42px] h-[42px] rounded-[100px] shrink-0 overflow-hidden relative">
                  <Image
                    src={testimonialAvatar3}
                    alt="Myra"
                    className="absolute h-full max-w-none"
                    style={{ width: '149.87%', left: '-48.13%', top: '-0.4%' }}
                  />
                </div>
                <div className="flex flex-col gap-[6px] justify-center text-[#58595B] w-[313px]">
                  <p className="text-base font-medium font-['Plus_Jakarta_Sans'] leading-[24px]">
                    Myra
                  </p>
                  <p className="text-xs font-normal font-['Plus_Jakarta_Sans']">
                    CTO
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right tall card - Jeremiah */}
          <div
            className="testimonial-card card-tall-right flex flex-col gap-[18px] p-[18px] rounded-[10px] w-full lg:w-[312px] h-auto lg:h-[384px] bg-[#EEECF0] border border-[rgba(88,89,91,0.1)] transition-colors duration-300"
          >
            <div className="quote-mark w-[27px] h-[22px] shrink-0">
              <Image
                src={quoteMarkSvg}
                alt=""
                className="w-full h-full block"
              />
            </div>
            <p className="testimonial-text flex-1 text-base font-medium text-[#16181B] font-['Plus_Jakarta_Sans'] leading-[24px]">
              The AI workflow assessment was practical. We left with 3 clear use cases, effort estimates, and one automation we could deploy."
            </p>
            <div className="author-info flex gap-2 items-center w-full">
              <div className="avatar-circle w-[42px] h-[42px] rounded-[100px] shrink-0 overflow-hidden relative">
                <Image
                  src={testimonialAvatar4}
                  alt="Jeremiah"
                  className="absolute max-w-none"
                  style={{ width: '267.76%', height: '178.58%', left: '-139.23%', top: '-1.67%' }}
                />
              </div>
              <div className="flex flex-col gap-[6px] flex-1 justify-center min-w-0 text-[#16181B]">
                <p className="text-base font-medium font-['Plus_Jakarta_Sans'] leading-[24px]">
                  Jeremiah
                </p>
                <p className="text-xs font-normal font-['Plus_Jakarta_Sans']">
                  Head of Operations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
