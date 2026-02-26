import { useEffect, useRef } from 'react'
import { SidePattern } from './SidePattern'
import connectorTopSvg from '../assets/images/connector-top.svg'
import connectorBottomSvg from '../assets/images/connector-bottom.svg'
import connectorVerticalSvg from '../assets/images/connector-vertical.svg'

const ProofOverPitches = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      // Animate heading
      tl.fromTo(
        sectionRef.current.querySelector('.proof-heading'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )

      // Animate first stat card
      tl.fromTo(
        sectionRef.current.querySelector('.stat-card-1'),
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' },
        '-=0.2'
      )

      // Animate top connector
      tl.fromTo(
        sectionRef.current.querySelector('.connector-top'),
        { opacity: 0, scaleY: 0 },
        { opacity: 1, scaleY: 1, duration: 0.4, ease: 'power2.out', transformOrigin: 'top center' },
        '-=0.1'
      )

      // Animate info chips
      const chips = sectionRef.current.querySelectorAll('.info-chip')
      tl.fromTo(
        chips,
        { opacity: 0, y: 25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.2)' },
        '-=0.1'
      )

      // Animate bottom connector
      tl.fromTo(
        sectionRef.current.querySelector('.connector-bottom'),
        { opacity: 0, scaleY: 0 },
        { opacity: 1, scaleY: 1, duration: 0.4, ease: 'power2.out', transformOrigin: 'top center' },
        '-=0.1'
      )

      // Animate second stat card
      tl.fromTo(
        sectionRef.current.querySelector('.stat-card-2'),
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' },
        '-=0.1'
      )

      // Animate vertical line
      tl.fromTo(
        sectionRef.current.querySelector('.vertical-line-1'),
        { opacity: 0, scaleY: 0 },
        { opacity: 1, scaleY: 1, duration: 0.3, ease: 'power2.out', transformOrigin: 'top center' },
        '-=0.1'
      )

      // Animate additional stats
      const additionalChips = sectionRef.current.querySelectorAll('.additional-chip')
      tl.fromTo(
        additionalChips,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.2)' },
        '-=0.1'
      )

      // Animate second vertical line
      tl.fromTo(
        sectionRef.current.querySelector('.vertical-line-2'),
        { opacity: 0, scaleY: 0 },
        { opacity: 1, scaleY: 1, duration: 0.3, ease: 'power2.out', transformOrigin: 'top center' },
        '-=0.1'
      )

      // Animate third stat card
      tl.fromTo(
        sectionRef.current.querySelector('.stat-card-3'),
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' },
        '-=0.1'
      )
    }

    initAnimations()
  }, [])

  const infoChips = [
    {
      title: 'Security First',
      icon: (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 2.5L4 7.5V14.5C4 21.3 8.7 27.6 15 29C21.3 27.6 26 21.3 26 14.5V7.5L15 2.5ZM15 14.99H23.5C22.8 20.34 19.4 25.12 15 26.44V15H6.5V9.15L15 5.15V14.99Z" fill="#0E3572" />
        </svg>
      ),
    },
    {
      title: '2-Week Sprints',
      icon: (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 2.5C8.1 2.5 2.5 8.1 2.5 15C2.5 21.9 8.1 27.5 15 27.5C21.9 27.5 27.5 21.9 27.5 15C27.5 8.1 21.9 2.5 15 2.5ZM15 25C9.475 25 5 20.525 5 15C5 9.475 9.475 5 15 5C20.525 5 25 9.475 25 15C25 20.525 20.525 25 15 25Z" fill="#0E3572" />
          <path d="M15.625 8.75H13.75V16.25L20.3125 20.1875L21.25 18.65L15.625 15.3125V8.75Z" fill="#0E3572" />
        </svg>
      ),
    },
    {
      title: 'Weekly Updates',
      icon: (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 2.5C8.1 2.5 2.5 8.1 2.5 15C2.5 21.9 8.1 27.5 15 27.5C21.9 27.5 27.5 21.9 27.5 15C27.5 8.1 21.9 2.5 15 2.5ZM16.25 21.25H13.75V18.75H16.25V21.25ZM16.25 16.25H13.75V8.75H16.25V16.25Z" fill="#0E3572" />
          <circle cx="15" cy="15" r="11.5" stroke="#0E3572" strokeWidth="1.5" fill="none" />
        </svg>
      ),
    },
    {
      title: 'Support on Demand',
      icon: (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 2.5C8.1 2.5 2.5 8.1 2.5 15C2.5 21.9 8.1 27.5 15 27.5C21.9 27.5 27.5 21.9 27.5 15C27.5 8.1 21.9 2.5 15 2.5ZM7.5 15C7.5 10.8625 10.8625 7.5 15 7.5C17.0125 7.5 18.8375 8.2875 20.2125 9.5625L9.5625 20.2125C8.2875 18.8375 7.5 17.0125 7.5 15ZM15 22.5C12.9875 22.5 11.1625 21.7125 9.7875 20.4375L20.4375 9.7875C21.7125 11.1625 22.5 12.9875 22.5 15C22.5 19.1375 19.1375 22.5 15 22.5Z" fill="#0E3572" />
          <path d="M11 15H19M15 11V19" stroke="#0E3572" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Built to Scale',
      icon: (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="10" height="10" rx="2" stroke="#0E3572" strokeWidth="2" />
          <rect x="17" y="3" width="10" height="10" rx="2" stroke="#0E3572" strokeWidth="2" />
          <rect x="3" y="17" width="10" height="10" rx="2" stroke="#0E3572" strokeWidth="2" />
          <rect x="17" y="17" width="10" height="10" rx="2" stroke="#0E3572" strokeWidth="2" />
        </svg>
      ),
    },
  ]

  const additionalStats = [
    { value: '10+ Industries', sublabel: 'FinTech, HealthTech, Real Estate' },
    { value: '25+ Automations', sublabel: 'Zapier, n8n' },
    { value: '70% Repeat', sublabel: 'Clients continue post launch' },
    { value: '8–12 Weeks', sublabel: 'Typical MVP launch' },
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-24 bg-white relative overflow-hidden">
      {/* Side line patterns */}
      <SidePattern />

      <div className="max-w-[1320px] mx-auto px-5 md:px-10 relative">
        {/* Heading */}
        <div className="proof-heading text-center mb-8 pt-4">
          <div className="inline-flex items-center justify-center px-3 py-2 bg-[rgba(14,53,114,0.05)] border border-[rgba(14,53,114,0.1)] rounded mb-2">
            <span className="text-xs font-normal text-[#0E3572] font-['Plus_Jakarta_Sans']">Proof over pitches</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-normal text-[#16181B]">
            10 years of building and scaling custom software
          </h2>
        </div>

        {/* Vertical flow container */}
        <div className="flex flex-col items-center">
          {/* First stat card - 30+ specialists */}
          <div
            className="stat-card-1 flex flex-col items-center justify-center gap-2 px-8 py-[18px] rounded-[10px] overflow-hidden"
            style={{
              background: 'radial-gradient(ellipse at center top, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)',
              boxShadow: '0px 87px 24px 0px rgba(0,0,0,0), 0px 56px 22px 0px rgba(0,0,0,0.01), 0px 31px 19px 0px rgba(0,0,0,0.05), 0px 14px 14px 0px rgba(0,0,0,0.09), 0px 3px 8px 0px rgba(0,0,0,0.1)',
            }}
          >
            <p className="text-xl lg:text-2xl font-normal text-[#0E3572]">
              30+ specialists
            </p>
            <p className="text-xs lg:text-sm font-medium text-[rgba(14,53,114,0.6)] font-['Plus_Jakarta_Sans'] text-center leading-[22px]">
              Product, backend, frontend, DevOps, AI
            </p>
          </div>

          {/* Top connector - exact Figma SVG */}
          <div className="connector-top w-full max-w-[880px] h-[50px] sm:h-[80px] relative">
            <img
              src={connectorTopSvg}
              alt=""
              className="w-[80%] lg:w-full h-full mx-auto hidden sm:block"
            />
            <img
              src={connectorVerticalSvg}
              alt=""
              className="h-full w-[50px] mx-auto block sm:hidden"
            />
          </div>

          {/* Info Chips Row */}
          <div className="flex flex-wrap sm:flex-nowrap gap-[2px] items-stretch justify-center overflow-hidden rounded-[10px] w-full">
            {infoChips.map((chip, index) => (
              <div
                key={index}
                className="info-chip flex-1 flex flex-col gap-2 items-center justify-center px-4 lg:px-8 py-4 lg:py-[18px] bg-[rgba(14,53,114,0.1)] border border-[rgba(255,250,250,0.1)]"
              >
                <div className="w-[30px] h-[30px] flex items-center justify-center overflow-hidden">
                  {chip.icon}
                </div>
                <p className="text-xs lg:text-base font-medium text-[#0E3572] font-['Plus_Jakarta_Sans'] leading-[22px] text-center whitespace-nowrap">
                  {chip.title}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom connector - exact Figma SVG */}
          <div className="connector-bottom w-full max-w-[880px] h-[50px] sm:h-[80px] relative">
            <img
              src={connectorBottomSvg}
              alt=""
              className="w-[80%] lg:w-full h-full mx-auto hidden sm:block"
            />
            <img
              src={connectorVerticalSvg}
              alt=""
              className="h-full w-[50px] mx-auto block sm:hidden"
            />
          </div>

          {/* Second stat card - 70+ Projects Delivered */}
          <div
            className="stat-card-2 flex flex-col items-center justify-center gap-2 px-8 py-[18px] rounded-[10px] overflow-hidden"
            style={{
              background: 'radial-gradient(ellipse at center top, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)',
              boxShadow: '0px 87px 24px 0px rgba(0,0,0,0), 0px 56px 22px 0px rgba(0,0,0,0.01), 0px 31px 19px 0px rgba(0,0,0,0.05), 0px 14px 14px 0px rgba(0,0,0,0.09), 0px 3px 8px 0px rgba(0,0,0,0.1)',
            }}
          >
            <p className="text-xl lg:text-2xl font-normal text-[#0E3572]">
              70+ Projects Delivered
            </p>
            <p className="text-xs lg:text-sm font-medium text-[rgba(14,53,114,0.6)] font-['Plus_Jakarta_Sans'] text-center leading-[22px]">
              MVPs, internal tools, platforms
            </p>
          </div>

          {/* Vertical connector line 1 - exact Figma SVG */}
          <div className="vertical-line-1 flex items-center justify-center h-[50px] w-[6px] mx-auto">
            <img
              src={connectorVerticalSvg}
              alt=""
              className="h-full w-[50px]"
              style={{ display: 'block' }}
            />
          </div>

          {/* Additional stats row - red tinted */}
          <div className="flex flex-wrap sm:flex-nowrap gap-[2px] items-stretch justify-center overflow-hidden rounded-[10px] w-full">
            {additionalStats.map((stat, index) => (
              <div
                key={index}
                className="additional-chip flex-1 flex flex-col gap-2 items-center justify-center px-4 lg:px-8 py-[18px] bg-[rgba(237,28,36,0.1)] border border-[rgba(255,250,250,0.1)]"
              >
                <p className="text-sm lg:text-lg font-normal text-[#ED1C24] leading-[25px] text-center whitespace-nowrap">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-[rgba(88,89,91,0.75)] font-['Plus_Jakarta_Sans'] leading-[16px] text-center">
                  {stat.sublabel}
                </p>
              </div>
            ))}
          </div>

          {/* Vertical connector line 2 - exact Figma SVG */}
          <div className="vertical-line-2 flex items-center justify-center h-[50px] w-[6px] mx-auto">
            <img
              src={connectorVerticalSvg}
              alt=""
              className="h-full w-[50px]"
              style={{ display: 'block' }}
            />
          </div>

          {/* Third stat card - 10+ Countries */}
          <div
            className="stat-card-3 flex flex-col items-center justify-center gap-2 px-8 py-[18px] rounded-[10px] overflow-hidden w-full max-w-[410px]"
            style={{
              background: 'radial-gradient(ellipse at center top, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)',
              boxShadow: '0px 87px 24px 0px rgba(14,53,114,0), 0px 56px 22px 0px rgba(14,53,114,0.01), 0px 31px 19px 0px rgba(14,53,114,0.05), 0px 14px 14px 0px rgba(14,53,114,0.09), 0px 3px 8px 0px rgba(14,53,114,0.1)',
            }}
          >
            <p className="text-xl lg:text-2xl font-normal text-[#0E3572]">
              10+ Countries
            </p>
            <p className="text-xs lg:text-sm font-medium text-[rgba(14,53,114,0.6)] font-['Plus_Jakarta_Sans'] text-center leading-[22px]">
              Global Client Reach
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProofOverPitches
