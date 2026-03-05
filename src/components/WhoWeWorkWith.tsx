import { useEffect, useRef } from 'react'
import React from 'react'
import { SidePattern } from './SidePattern'
import patternBg from '../assets/images/pattern-bg.png'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ChipItem {
  text: string
  rotation: number
  bottom: string
  left?: string
  right?: string
  containerW?: string
  containerH?: string
}

interface AudienceCard {
  title: string
  description: string
  chips: ChipItem[]
}

const WhoWeWorkWith = () => {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const cardStackRef = useRef<HTMLDivElement>(null)

  const audiences: AudienceCard[] = [
    {
      title: 'Startup & SaaS Founders',
      description: 'You have an idea or early product and need a technical partner who can move fast, make smart decisions, and protect your runway.',
      chips: [
        { text: 'Weak UX or slow delivery', bottom: '14.6%', left: '39.6%', rotation: 23.31, containerW: '61.8%', containerH: '46.4%' },
        { text: 'Growing backlog', bottom: '41.7%', left: '52.6%', rotation: 13.37, containerW: '48.4%', containerH: '30.1%' },
        { text: 'Fundraising deadlines', bottom: '-3.3%', left: '-1.6%', rotation: -57.81, containerW: '42.3%', containerH: '71.4%' },
        { text: 'MVP → V2 scaling', bottom: '-0.5%', left: '15.6%', rotation: -24.63, containerW: '47.8%', containerH: '40%' },
        { text: 'Need to validate fast', bottom: '0%', left: '46.1%', rotation: 0 },
      ],
    },
    {
      title: 'CTOs & Engineering Managers',
      description: "You're responsible for delivery quality and velocity, but hiring full-time is slow, risky, or expensive.",
      chips: [
        { text: 'Hiring delays', bottom: '0%', left: '24.7%', rotation: 0 },
        { text: 'Release pressure', bottom: '15.6%', left: '55.6%', rotation: 31.79, containerW: '46.4%', containerH: '45.3%' },
        { text: 'Delivery risk', bottom: '16.7%', left: '14%', rotation: 17.49, containerW: '37.3%', containerH: '29.4%' },
        { text: 'Skill gaps', bottom: '-3.1%', left: '-2.4%', rotation: -28.54, containerW: '32.5%', containerH: '32.9%' },
        { text: 'Team bandwidth', bottom: '-3%', right: '-2.1%', rotation: 27.63, containerW: '46.1%', containerH: '41.5%' },
      ],
    },
    {
      title: 'Teams Adopting AI',
      description: 'You want AI applied to real workflows, not experiments. The goal is saving time, reducing cost, and improving output.',
      chips: [
        { text: 'Disconnected tools', bottom: '-2.4%', left: '14.4%', rotation: -30, containerW: '50.7%', containerH: '47%' },
        { text: 'No clear ROI', bottom: '34.8%', left: '51.4%', rotation: 9.89, containerW: '37.2%', containerH: '24.5%' },
        { text: 'Manual repetitive work', bottom: '7.7%', left: '-1.7%', rotation: -30.36, containerW: '55.9%', containerH: '51.2%' },
        { text: 'AI confusion', bottom: '17.8%', left: '63.3%', rotation: 0 },
        { text: 'Slow operations', bottom: '0%', right: '12.5%', rotation: 0 },
      ],
    },
    {
      title: 'Ops & IT Leaders',
      description: "You're managing growing systems and need better visibility, fewer errors, and connected workflows across tools.",
      chips: [
        { text: 'Operational errors', bottom: '0%', left: '18.4%', rotation: 0 },
        { text: 'Data scattered across tools', bottom: '7%', left: '3.1%', rotation: -28.51, containerW: '66.8%', containerH: '56.4%' },
        { text: 'Poor visibility', bottom: '16.9%', left: '62%', rotation: 23.13, containerW: '39.8%', containerH: '34.2%' },
        { text: 'Scaling complexity', bottom: '-2.4%', left: '50.3%', rotation: 23.53, containerW: '51.6%', containerH: '41%' },
        { text: 'Manual processes', bottom: '37.8%', right: '50.8%', rotation: -13.21, containerW: '50.1%', containerH: '30.4%' },
      ],
    },
  ]

  useEffect(() => {
    const section   = sectionRef.current
    const cardStack = cardStackRef.current
    if (!section || !cardStack) return

    // ── gsap.context() scoped to `section` ──────────────────────────────────
    // ctx.revert() in the cleanup:
    //   1. Kills all ScrollTriggers created inside this context
    //   2. Removes the pin spacer div ST injected into the DOM
    //   3. Restores the section element to its original DOM position
    // Without this, React's removeChild crashes when navigating away because
    // ST has moved the pinned element inside its own spacer wrapper.
    const ctx = gsap.context(() => {

      const cardEls = Array.from(cardStack.querySelectorAll<HTMLElement>('.deck-card'))
      const total   = cardEls.length

      cardEls.forEach((el, i) => {
        el.style.zIndex = `${total + i}`
        if (i === 0) {
          gsap.set(el, { y: 0, opacity: 1, scale: 1, force3D: true })
        } else {
          gsap.set(el, { y: '110%', opacity: 0, scale: 1, force3D: true })
        }
      })

      const animateChipsIn = (card: HTMLElement) => {
        gsap.to(card.querySelectorAll('.deck-chip'), {
          autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power3.out', force3D: true,
        })
      }

      cardEls.forEach((card) => {
        gsap.set(card.querySelectorAll('.deck-chip'), { autoAlpha: 0, y: 10, force3D: true })
      })

      const chipsRevealed = new Array(total).fill(false)
      const revealChipsIfNeeded = (index: number) => {
        if (index < 0 || index >= total || chipsRevealed[index]) return
        chipsRevealed[index] = true
        animateChipsIn(cardEls[index])
      }

      revealChipsIfNeeded(0)

      const SEG       = 1.3
      const HOLD      = 0.4
      const TOTAL_DUR = (total - 1) * SEG + HOLD

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:      section,
          start:        'top top',
          end:          `+=${total * 80}%`,
          pin:          true,
          pinSpacing:   true,
          scrub:        0.5,
          anticipatePin: 1,
          onUpdate(self) {
            const t         = self.progress * TOTAL_DUR
            const EARLY     = 0.15
            let activeIndex = 0
            for (let i = total - 1; i >= 1; i--) {
              if (t >= i * SEG - EARLY) { activeIndex = i; break }
            }
            revealChipsIfNeeded(activeIndex)
          },
        },
      })

      for (let i = 0; i < total - 1; i++) {
        tl.to(cardEls[i], { y: '-40%', opacity: 0, scale: 0.95, duration: 1, ease: 'power2.in' })
          .fromTo(
            cardEls[i + 1],
            { y: '110%', opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
            '<0.3',
          )
      }

      tl.to({}, { duration: HOLD })

    }, section) // ← scope to section element

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FFFAFA] min-h-screen"
    >
      <div className="separator-pattern absolute top-0 left-0 right-0 z-10" />
      <SidePattern invert={true} />

      <div className="h-screen overflow-hidden flex flex-col items-center justify-center gap-6 px-5 md:px-10 max-w-[1300px] mx-auto">

        <div className="text-center z-10">
          <div className="inline-flex items-center gap-2 px-[18px] py-2 bg-[rgba(14,53,114,0.05)] border border-[rgba(14,53,114,0.1)] rounded-[4px] mb-2">
            <span className="text-xs text-[#0E3572] font-normal">
              For builders, operators, and owners
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-normal text-[#16181B] mb-2">
            Who We Work With
          </h2>
          <p className="text-sm text-[#58595B] font-medium leading-[22px]">
            We partner with people who want things shipped, not just discussed.
          </p>
        </div>

        <div
          ref={cardStackRef}
          className="relative w-full max-w-[1096px]"
          style={{ height: '380px' }}
        >
          {audiences.map((audience, index) => (
            <article
              key={index}
              className="deck-card absolute top-0 left-0 w-full h-full"
              style={{
                transformOrigin: 'center center',
                willChange:      'transform, opacity',
                borderRadius:    '34px',
                boxShadow:       '0 4px 6px -1px rgba(0,0,0,0.06), 0 20px 25px -5px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
              }}
            >
              <div
                className="deck-card-inner pl-0 md:pl-[26px] flex items-center flex-col md:flex-row overflow-hidden relative h-full"
                style={{ borderRadius: 'inherit', gap: '34px', background: 'white' }}
              >
                <div className="flex flex-1 flex-col gap-[18px] items-start min-h-0 min-w-0 relative p-[18px] whitespace-pre-wrap z-[1]">
                  <h3
                    className="deck-card-title text-base sm:text-lg lg:text-2xl font-normal relative shrink-0 w-full text-[#16181B]"
                    style={{ lineHeight: 'normal' }}
                  >
                    {audience.title}
                  </h3>
                  <p
                    className="deck-card-desc text-xs sm:text-sm lg:text-base font-medium relative shrink-0 w-full text-[rgba(88,89,91,0.75)]"
                    style={{ lineHeight: '22px' }}
                  >
                    {audience.description}
                  </p>
                </div>

                <div
                  className="relative shrink-0 w-full md:w-[350px] lg:w-[420px] h-[200px] sm:h-[250px] md:h-full"
                  style={{ borderRadius: '0 34px 34px 0' }}
                >
                  <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 'inherit' }}>
                    <div
                      className="absolute inset-0"
                      style={{ borderRadius: 'inherit', background: 'linear-gradient(180deg, rgba(14,53,114,0.7) 0%, rgb(14,53,114) 100%)' }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{ borderRadius: 'inherit', backgroundImage: `url(${patternBg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }}
                    />
                  </div>

                  {audience.chips.map((chip, chipIndex) => {
                    const wrapperStyle: React.CSSProperties = {
                      bottom: chip.bottom,
                      visibility: 'visible',
                      animationDelay: `${chipIndex * 0.08}s`,
                    }
                    if (chip.left)       wrapperStyle.left   = chip.left
                    if (chip.right)      wrapperStyle.right  = chip.right
                    if (chip.containerW) wrapperStyle.width  = chip.containerW
                    if (chip.containerH) wrapperStyle.height = chip.containerH

                    return (
                      <div key={chipIndex} className="deck-chip absolute flex items-center justify-center" style={wrapperStyle}>
                        <div className="flex-none" style={chip.rotation !== 0 ? { transform: `rotate(${chip.rotation}deg)` } : undefined}>
                          <div
                            className="bg-[rgba(255,250,250,0.1)] flex items-center justify-center relative p-2 sm:px-[17px] sm:py-[14px] rounded-[60px]"
                            style={{ boxShadow: 'inset 0px 0px 13px 0px rgba(255,255,255,0.25)' }}
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhoWeWorkWith
