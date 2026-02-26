import { useEffect, useRef } from 'react'
import React from 'react'
import { SidePattern } from './SidePattern'
import patternBg from '../assets/images/pattern-bg.png'

interface ChipItem {
  text: string
  rotation: number
  // Position of the chip (or its bounding container for rotated chips)
  bottom: string
  left?: string
  right?: string
  // For rotated chips: bounding container dimensions (chip is centered inside)
  containerW?: string
  containerH?: string
}

interface AudienceCard {
  title: string
  description: string
  chips: ChipItem[]
}

const WhoWeWorkWith = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardStackRef = useRef<HTMLDivElement>(null)

  const audiences: AudienceCard[] = [
    // Index 0 = Top of stack (highest z-index, flies away first)
    {
      title: 'Startup & SaaS Founders',
      description: 'You have an idea or early product and need a technical partner who can move fast, make smart decisions, and protect your runway.',
      chips: [
        // Figma: inset 38.97% -1.36% 14.6% 39.59%, rotate 23.31°
        { text: 'Weak UX or slow delivery', bottom: '14.6%', left: '39.6%', rotation: 23.31, containerW: '61.8%', containerH: '46.4%' },
        // Figma: inset 28.15% -0.95% 41.71% 52.56%, rotate 13.37°
        { text: 'Growing backlog', bottom: '41.7%', left: '52.6%', rotation: 13.37, containerW: '48.4%', containerH: '30.1%' },
        // Figma: inset 31.94% 59.33% -3.33% -1.59%, rotate -57.81°
        { text: 'Fundraising deadlines', bottom: '-3.3%', left: '-1.6%', rotation: -57.81, containerW: '42.3%', containerH: '71.4%' },
        // Figma: inset 60.56% 36.65% -0.51% 15.59%, rotate -24.63°
        { text: 'MVP → V2 scaling', bottom: '-0.5%', left: '15.6%', rotation: -24.63, containerW: '47.8%', containerH: '40%' },
        // Figma: inset 83.08% 0.06% -0.02% 46.12%, rotate 0°
        { text: 'Need to validate fast', bottom: '0%', left: '46.1%', rotation: 0 },
      ],
    },
    // Index 1 = Second from top
    {
      title: 'CTOs & Engineering Managers',
      description: "You're responsible for delivery quality and velocity, but hiring full-time is slow, risky, or expensive.",
      chips: [
        // Figma: bottom -0.36px, left 99.91px → ~0%, ~24.7%
        { text: 'Hiring delays risk', bottom: '0%', left: '24.7%', rotation: 0 },
        // Figma: bottom 49.61px, left 224.74px, container 187.31×144.28, rotate 31.79°
        { text: 'Release pressure', bottom: '15.6%', left: '55.6%', rotation: 31.79, containerW: '46.4%', containerH: '45.3%' },
        // Figma: bottom 53.15px, left 56.53px, container 150.67×93.72, rotate 17.49°
        { text: 'Delivery risk', bottom: '16.7%', left: '14%', rotation: 17.49, containerW: '37.3%', containerH: '29.4%' },
        // Figma: bottom -9.74px, left -9.65px, container 131.15×104.62, rotate -28.54°
        { text: 'Skill gaps', bottom: '-3.1%', left: '-2.4%', rotation: -28.54, containerW: '32.5%', containerH: '32.9%' },
        // Figma: bottom -9.48px, right -8.38px, container 186.22×132.09, rotate 27.63°
        { text: 'Team bandwidth', bottom: '-3%', right: '-2.1%', rotation: 27.63, containerW: '46.1%', containerH: '41.5%' },
      ],
    },
    // Index 2 = Third
    {
      title: 'Teams Adopting AI',
      description: 'You want AI applied to real workflows, not experiments. The goal is saving time, reducing cost, and improving output.',
      chips: [
        // Figma: bottom -7.49px, left 55.95px, container 196.67×143.63, rotate -30°
        { text: 'Disconnected tools', bottom: '-2.4%', left: '14.4%', rotation: -30, containerW: '50.7%', containerH: '47%' },
        // Figma: bottom 106.42px, left 199.33px, container 144.21×74.92, rotate 9.89°
        { text: 'No clear ROI', bottom: '34.8%', left: '51.4%', rotation: 9.89, containerW: '37.2%', containerH: '24.5%' },
        // Figma: bottom 23.43px, left -6.62px, container 216.88×156.59, rotate -30.36°
        { text: 'Manual repetitive work', bottom: '7.7%', left: '-1.7%', rotation: -30.36, containerW: '55.9%', containerH: '51.2%' },
        // Figma: bottom 54.43px, left 245.41px, rotate 0°
        { text: 'AI confusion', bottom: '17.8%', left: '63.3%', rotation: 0 },
        // Figma: bottom -0.04px, right 48.4px, rotate 0°
        { text: 'Slow operations', bottom: '0%', right: '12.5%', rotation: 0 },
      ],
    },
    // Index 3 = Bottom of stack (stays, never flies away)
    {
      title: 'Ops & IT Leaders',
      description: "You're managing growing systems and need better visibility, fewer errors, and connected workflows across tools.",
      chips: [
        // Figma: bottom -0.33px, left 68.62px, rotate 0°
        { text: 'Operational errors', bottom: '0%', left: '18.4%', rotation: 0 },
        // Figma: bottom 20.42px, left 11.44px, container 248.64×165.66, rotate -28.51°
        { text: 'Data scattered across tools', bottom: '7%', left: '3.1%', rotation: -28.51, containerW: '66.8%', containerH: '56.4%' },
        // Figma: bottom 49.5px, left 230.68px, container 148.26×100.48, rotate 23.13°
        { text: 'Poor visibility', bottom: '16.9%', left: '62%', rotation: 23.13, containerW: '39.8%', containerH: '34.2%' },
        // Figma: bottom -7px, left 187.15px, container 192.19×120.42, rotate 23.53°
        { text: 'Scaling complexity', bottom: '-2.4%', left: '50.3%', rotation: 23.53, containerW: '51.6%', containerH: '41%' },
        // Figma: bottom 110.89px, right 189.23px, container 186.63×89.26, rotate -13.21°
        { text: 'Manual processes', bottom: '37.8%', right: '50.8%', rotation: -13.21, containerW: '50.1%', containerH: '30.4%' },
      ],
    },
  ]

  useEffect(() => {
    const initAnimation = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current || !cardStackRef.current) return

      const cards = cardStackRef.current.querySelectorAll('.deck-card')
      const totalCards = cards.length

      // Set initial z-index and state
      cards.forEach((card, index) => {
        const el = card as HTMLElement
        el.style.zIndex = `${totalCards - index}`

        if (index === 0) {
          // Top card — fully visible and active
          el.style.transform = 'none'
          el.style.opacity = '1'
          el.style.filter = 'none'
          el.classList.add('is-active')
        } else {
          // Cards underneath — scaled down, shifted, dimmed
          el.style.transform = `translateY(${20}px) scale(${0.92})`
          el.style.opacity = '1'
          el.style.filter = 'brightness(0.85)'
        }
      })

      // ScrollTrigger monitors progress through the tall section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress

          cards.forEach((card, index) => {
            const el = card as HTMLElement
            const segmentSize = 1 / (totalCards - 0.5)
            const segStart = index * segmentSize
            const segEnd = segStart + segmentSize
            let localProgress = (progress - segStart) / (segEnd - segStart)
            localProgress = Math.max(0, Math.min(1, localProgress))

            if (localProgress > 0 && index < totalCards - 1) {
              // ---- FLYING AWAY ----
              const yMove = -120 * localProgress
              const rotMove = localProgress * 10 * (index % 2 === 0 ? 1 : -1)
              const opacity = Math.max(0, 1 - localProgress * 1.5)
              const blur = localProgress * 10

              el.style.transform = `translateY(${yMove}%) rotate(${rotMove}deg)`
              el.style.opacity = `${opacity}`
              el.style.filter = `blur(${blur}px)`
              el.classList.remove('is-active')
            } else if (localProgress <= 0) {
              // ---- WAITING UNDERNEATH ----
              if (index > 0) {
                const prevStart = (index - 1) * segmentSize
                const prevEnd = prevStart + segmentSize
                let prevProgress = (progress - prevStart) / (prevEnd - prevStart)
                prevProgress = Math.max(0, Math.min(1, prevProgress))

                const scale = 0.92 + (0.08 * prevProgress)
                const brightness = 0.85 + (0.15 * prevProgress)
                const yOffset = 20 * (1 - prevProgress)

                el.style.transform = `translateY(${yOffset}px) scale(${scale})`
                el.style.filter = `brightness(${brightness})`
                el.style.opacity = '1'

                if (prevProgress > 0.8) el.classList.add('is-active')
                else el.classList.remove('is-active')
              } else {
                // Top card reset
                el.style.transform = 'none'
                el.style.opacity = '1'
                el.style.filter = 'none'
                el.classList.add('is-active')
              }
            }
          })
        },
      })
    }

    initAnimation()

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === sectionRef.current) t.kill()
        })
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FFFAFA]"
      style={{ minHeight: '400vh' }}
    >
      {/* Separator Pattern Border at top - infinite repeating pattern */}
      <div className="separator-pattern absolute top-0 left-0 right-0 z-10"></div>

      <SidePattern invert={true} />

      {/* Sticky wrapper stays in viewport while scrolling through the section */}
      <div className="sticky overflow-hidden top-0 h-screen flex flex-col items-center justify-center gap-6 px-5 md:px-10 max-w-[1300px] mx-auto">

        {/* Heading */}
        <div className="text-center z-10">
          <div className="inline-flex items-center gap-2 px-[18px] py-2 bg-[rgba(14,53,114,0.05)] border border-[rgba(14,53,114,0.1)] rounded-[4px] mb-2">
            <span className="text-xs text-[#0E3572] font-normal">
              Built for decision-makers who need results
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-normal text-[#16181B] mb-2">
            For builders, Operators, & Owners
          </h2>
          <p className="text-sm text-[#58595B] font-medium leading-[22px]">
            We partner with people who want things shipped, not just discussed.
          </p>
        </div>

        {/* Card Stack */}
        <div
          ref={cardStackRef}
          className="relative w-full max-w-[1096px]"
          style={{ height: '380px', perspective: '1000px' }}
        >
          {audiences.map((audience, index) => {
            // Each card gets a different border radius for the stacking visual
            const cardRadius = index === 0 ? '34px' : index === 1 ? '28px' : index === 2 ? '24px' : '18px'
            const isFirstCard = index === 0

            return (
              <article
                key={index}
                className={`deck-card absolute top-0 left-0 w-full h-full ${!isFirstCard ? 'deck-card-reveal' : ''}`}
                style={{
                  transformOrigin: 'center bottom',
                  willChange: 'transform, opacity, filter',
                  borderRadius: cardRadius,
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 20px 25px -5px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)',
                }}
              >
                <div
                  className={`deck-card-inner pl-0 md:pl-[26px] flex items-center flex-col md:flex-row overflow-hidden relative h-full border-2 border-[rgba(255,250,250,0.4)] ${isFirstCard ? 'bg-white' : ''}`}
                  style={{
                    borderRadius: 'inherit',
                    gap: '34px',
                  }}
                >
                  {/* Text Content */}
                  <div className="flex flex-1 flex-col gap-[18px] items-start min-h-0 min-w-0 relative p-[18px] whitespace-pre-wrap z-[1]">
                    <h3
                      className={`deck-card-title text-base sm:text-lg lg:text-2xl font-normal relative shrink-0 w-full ${isFirstCard ? 'text-[#16181B]' : ''}`}
                      style={{ lineHeight: 'normal' }}
                    >
                      {audience.title}
                    </h3>
                    <p
                      className={`deck-card-desc text-xs sm:text-sm lg:text-base font-medium relative shrink-0 w-full ${isFirstCard ? 'text-[rgba(88,89,91,0.75)]' : ''}`}
                      style={{ lineHeight: '22px' }}
                    >
                      {audience.description}
                    </p>
                  </div>

                  {/* Chip Area — always dark blue with pattern */}
                  <div
                    className="relative shrink-0 w-full md:w-[350px] lg:w-[420px] h-[200px] sm:h-[250px] md:h-full"
                    style={{
                      borderRadius: `0 ${cardRadius} ${cardRadius} 0`,
                    }}
                  >
                    {/* Chip area dark background + pattern */}
                    <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 'inherit' }}>
                      <div
                        className="absolute inset-0"
                        style={{
                          borderRadius: 'inherit',
                          background: 'linear-gradient(180deg, rgba(14,53,114,0.7) 0%, rgb(14,53,114) 100%)',
                        }}
                      />
                      <div
                        className="absolute inset-0 background-cover background-center"
                        style={{
                          borderRadius: 'inherit',
                          backgroundImage: `url(${patternBg})`,
                          opacity: 0.15,
                        }}
                      />
                    </div>

                    {/* Chips */}
                    {audience.chips.map((chip, chipIndex) => {
                      const wrapperStyle: React.CSSProperties = {
                        bottom: chip.bottom,
                        opacity: 0,
                        animationDelay: `${chipIndex * 0.08}s`,
                      }
                      if (chip.left) wrapperStyle.left = chip.left
                      if (chip.right) wrapperStyle.right = chip.right
                      // Rotated chips need a bounding container with explicit dimensions
                      if (chip.containerW) wrapperStyle.width = chip.containerW
                      if (chip.containerH) wrapperStyle.height = chip.containerH

                      return (
                        <div
                          key={chipIndex}
                          className="deck-chip absolute flex items-center justify-center"
                          style={wrapperStyle}
                        >
                          <div
                            className="flex-none"
                            style={chip.rotation !== 0 ? { transform: `rotate(${chip.rotation}deg)` } : undefined}
                          >
                            <div
                              className="bg-[rgba(255,250,250,0.1)] flex items-center justify-center relative p-2 sm:px-[17px] sm:py-[14px] rounded-[60px]"
                              style={{
                                boxShadow: 'inset 0px 0px 13px 0px rgba(255,255,255,0.25)',
                              }}
                            >
                              <p className="font-normal leading-[normal] shrink-0 text-[#FFFAFA] text-center whitespace-nowrap text-xs sm:text-sm lg:text-[17px]">
                                {chip.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhoWeWorkWith
