import { useState, useEffect, useRef } from 'react'
import { SidePattern } from './SidePattern'
import tabImg1 from '../assets/images/tab-img-1.svg'
import tabImg2 from '../assets/images/tab-img-2.svg'
import tabImg3 from '../assets/images/tab-img-3.svg'
import patternBg from '../assets/images/pattern-bg.png'

/* ─── Tab data ─── */
interface TabInfo {
  title: string
  description: string
  bullets: string[]
}

const tabsData: TabInfo[] = [
  {
    title: 'MVP to production',
    description: 'Turn your idea into a working MVP and a clear path to V2.',
    bullets: ['Startup & SaaS founders', 'Early-stage product teams'],
  },
  {
    title: 'On-Demand Team',
    description: 'Extend your team without hiring delays or risky contractors.',
    bullets: ['CTOs & engineering managers', 'Teams with deadlines/backlogs'],
  },
  {
    title: 'AI Readiness Check',
    description: 'Get a clear plan for LLM integration, automation, and rollout.',
    bullets: ['Ops/product leaders exploring AI', 'Teams stuck with manual workflows'],
  },
]

/* ─── Tab illustration images ─── */
const tabImages = [tabImg1, tabImg2, tabImg3]

/* ─── Checkmark bullet icon ─── */
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <circle cx="10" cy="10" r="9" stroke="rgba(255,250,250,0.4)" strokeWidth="1.2" />
    <path d="M6 10.5L8.5 13L14 7.5" stroke="#FFFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)


/* ─── Main Component ─── */
const ForBuildersSection = () => {
  const [activeTab, setActiveTab] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const illustrationRef = useRef<HTMLDivElement>(null)
  const gsapRef = useRef<typeof import('gsap').gsap | null>(null)

  // Tab switch with GSAP crossfade
  const handleTabClick = async (index: number) => {
    if (index === activeTab) return

    if (!gsapRef.current) {
      const { gsap } = await import('gsap')
      gsapRef.current = gsap
    }
    const gsap = gsapRef.current
    const el = illustrationRef.current
    if (!el) { setActiveTab(index); return }

    gsap.to(el, {
      opacity: 0,
      scale: 0.96,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTab(index)
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' },
        )
      },
    })
  }

  // Scroll‑reveal animation
  useEffect(() => {
    let killed = false

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsapRef.current = gsap

      if (killed || !sectionRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      // Heading fade-up
      tl.fromTo(
        sectionRef.current.querySelector('.builders-heading'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      )

      // Tab cards slide in from left
      const cards = sectionRef.current.querySelectorAll('.builders-tab')
      tl.fromTo(
        cards,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out' },
        '-=0.3',
      )

      // Illustration slide in from right
      tl.fromTo(
        sectionRef.current.querySelector('.builders-illustration'),
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4',
      )

      // CTA bar slide up
      tl.fromTo(
        sectionRef.current.querySelector('.builders-cta'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.2',
      )
    }

    init()
    return () => { killed = true }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#0E3572' }}
    >
      {/* Background texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-5"
        style={{
          backgroundImage: `url(${patternBg})`,
          backgroundSize: 'cover',
        }}
      />

      <SidePattern />

      <div className="max-w-[1320px] mx-auto px-5 md:px-10 py-[80px] relative">
        {/* ── Heading ── */}
        <div className="builders-heading flex flex-col gap-[8px] items-center text-center mb-[34px] px-[8px]">
          <div className="inline-flex items-center justify-center px-[18px] py-2 bg-[rgba(255,250,250,0.1)] border border-[rgba(14,53,114,0.1)] rounded-[4px]">
            <span className="text-xs font-normal text-[#FFFAFA]">
              Built for decision-makers who need results
            </span>
          </div>
          <h2
            className="text-2xl lg:text-3xl font-normal text-white"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            For builders, Operators &amp; Owners
          </h2>
          <p className="text-[14px] font-medium text-white leading-[22px]">
            We partner with people who want things shipped, not just discussed.
          </p>
        </div>

        {/* ── Two‑column layout ── */}
        <div className="flex flex-col md:flex-row justify-between mb-[34px]" style={{ gap: '24px' }}>
          {/* Left – tab cards */}
          <div className="flex flex-col gap-[18px] shrink-0 w-full md:w-[350px] lg:w-[424px]">
            {tabsData.map((tab, idx) => {
              const isActive = activeTab === idx
              return (
                <div
                  key={idx}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                  onClick={() => handleTabClick(idx)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleTabClick(idx) }}
                  className={`builders-tab cursor-pointer rounded-[10px] p-[18px] transition-colors duration-300 flex flex-col gap-[18px] ${
                    isActive
                      ? 'bg-[#0E3572] border-2 border-white'
                      : 'bg-[#274b83] border-2 border-[#274b83] hover:bg-[#33558a]'
                  }`}
                >
                  {/* Title + description */}
                  <div className="flex flex-col gap-[8px] text-[#FFFAFA]">
                    <h3
                      className="text-xl lg:text-2xl font-normal"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {tab.title}
                    </h3>
                    <p className="text-xs lg:text-sm font-medium leading-[22px]">{tab.description}</p>
                  </div>

                  {/* Bullets */}
                  <div className="flex flex-col gap-[8px]">
                    {tab.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-[8px]">
                        <CheckIcon />
                        <p className="text-xs lg:text-sm font-medium text-[#FFFAFA] leading-[22px]">
                          {b}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right – illustration */}
          <div
            className="builders-illustration flex-1 rounded-[10px] overflow-hidden relative"
            // style={{ height: '578px' }}
          >
            <div ref={illustrationRef} className="w-full h-full bg-[#274b83] rounded-xl">
              <img
                src={tabImages[activeTab]}
                alt={tabsData[activeTab].title}
                className="w-full h-full object-contain rounded-[10px]"
              />
            </div>
          </div>
        </div>

        {/* ── CTA Bar ── */}
        <div
          className="builders-cta bg-[#FFFAFA] rounded-[10px] border border-[rgba(88,89,91,0.4)] p-4 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden"
        >
          <div className="flex flex-col text-center md:text-left gap-[8px] flex-1">
            <p
              className="text-2xl lg:text-3xl font-normal text-[#16181B]"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Not sure where to start? Let's pick the right first step.
            </p>
            <p className="text-[14px] font-medium text-[rgba(88,89,91,0.75)] leading-[22px]">
              15-min call. Clear plan. No pressure.
            </p>
          </div>
          <button
            className="shrink-0 text-[14px] font-normal text-[#FFFAFA] px-4 sm:px-[34px] py-[18px] rounded-[4px] cursor-pointer hover:opacity-90 transition-opacity"
            style={{
              background:
                'radial-gradient(ellipse at center top, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%), #0E3572',
              boxShadow:
                '0px 77px 22px 0px rgba(0,0,0,0), 0px 49px 20px 0px rgba(0,0,0,0.02), 0px 28px 17px 0px rgba(0,0,0,0.08), 0px 12px 12px 0px rgba(0,0,0,0.13), 0px 3px 7px 0px rgba(0,0,0,0.15)',
            }}
          >
            Help me choose the right model
          </button>
        </div>
      </div>
    </section>
  )
}

export default ForBuildersSection

