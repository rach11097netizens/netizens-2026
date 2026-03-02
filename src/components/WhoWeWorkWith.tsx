import { useEffect, useRef } from 'react'
import React from 'react'
import { SidePattern } from './SidePattern'
import patternBg from '../assets/images/pattern-bg.png'

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
  const sectionRef = useRef<HTMLDivElement>(null)
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
        { text: 'Hiring delays risk', bottom: '0%', left: '24.7%', rotation: 0 },
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
    const initAnimation = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current || !cardStackRef.current) return

      const cards = Array.from(cardStackRef.current.querySelectorAll('.deck-card')) as HTMLElement[]
      const totalCards = cards.length

      // ── Set GPU-composited initial states ──
      // Using gsap.set() so state is applied before first paint in this tick.
      // force3D: true + will-change prevents subpixel blur on transform.
      cards.forEach((el, index) => {
        el.style.zIndex = `${totalCards - index}`

        if (index === 0) {
          // Top card — fully active, no transform
          gsap.set(el, {
            y: 0,
            scale: 1,
            opacity: 1,
            force3D: true,
          })
          // Activate text colours immediately for top card
          el.classList.add('is-active')
        } else {
          // Cards underneath — stacked behind, shifted down, slightly scaled
          const depthOffset = index * 6 // px offset per layer
          gsap.set(el, {
            y: depthOffset,
            scale: 1 - index * 0.03,
            opacity: 1,
            force3D: true,
          })
        }

        // All cards use the same white background — no tinting
      })

      // ── ScrollTrigger: drive card transitions via progress ──
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress
          // Each card (except the last) owns an equal slice of scroll progress
          const segmentSize = 1 / (totalCards - 1)

          cards.forEach((el, index) => {
            if (index === totalCards - 1) {
              // Bottom card never flies away — just rises into active state
              const prevProgress = Math.max(0, Math.min(1,
                (progress - (index - 1) * segmentSize) / segmentSize
              ))
              const scale = (1 - (totalCards - 1) * 0.03) + (totalCards - 1) * 0.03 * prevProgress
              const y = (totalCards - 1) * 6 * (1 - prevProgress)

              gsap.set(el, { y, scale, force3D: true })

              if (prevProgress > 0.7) el.classList.add('is-active')
              else el.classList.remove('is-active')
              return
            }

            const segStart = index * segmentSize
            const segEnd = segStart + segmentSize

            // How far through THIS card's flight segment are we?
            const localProgress = Math.max(0, Math.min(1,
              (progress - segStart) / (segEnd - segStart)
            ))

            // How far through the PREVIOUS card's flight are we?
            // (used to animate this card rising as the one above flies away)
            const prevStart = Math.max(0, (index - 1) * segmentSize)
            const prevEnd = Math.min(1, prevStart + segmentSize)
            const prevProgress = index === 0 ? 0 : Math.max(0, Math.min(1,
              (progress - prevStart) / (prevEnd - prevStart)
            ))

            if (localProgress > 0) {
              // ── Flying away ──
              // No blur — just translate up + gentle rotate + fade out.
              // Blur causes rendering artifacts and is visually noisy on cards.
              const direction = index % 2 === 0 ? 1 : -1
              const yMove = -160 * localProgress          // px upward
              const rotation = 8 * localProgress * direction
              // Fade starts at 60% through the flight so the card is clearly
              // visible while rising, then cleanly disappears.
              const opacity = localProgress < 0.6
                ? 1
                : 1 - ((localProgress - 0.6) / 0.4)

              gsap.set(el, {
                y: yMove,
                rotation,
                opacity,
                scale: 1,
                force3D: true,
              })
              el.classList.remove('is-active')

            } else {
              // ── Waiting underneath or becoming active ──
              const targetDepth = index      // natural stack depth
              // As previous card flies away, this card rises to full size
              const riseProgress = prevProgress

              const baseScale = 1 - targetDepth * 0.03
              const scale = baseScale + (1 - baseScale) * riseProgress
              const baseY = targetDepth * 6
              const y = baseY * (1 - riseProgress)

              // Reset any flight state cleanly
              gsap.set(el, {
                y,
                scale,
                rotation: 0,
                opacity: 1,
                force3D: true,
              })

              // Card 0 at rest has riseProgress=0 (no prev card), so we must
              // special-case it — it's always active until it starts flying away.
              if (index === 0 || riseProgress > 0.75) el.classList.add('is-active')
              else el.classList.remove('is-active')
            }
          })
        },
      })

      // ── Chips fade in on the active card ──
      // All chips start hidden. MutationObserver fires the reveal when
      // is-active is toggled. Card 0 is triggered manually after attaching
      // because is-active is already set before the observer exists.
      const animateChipsIn = (card: HTMLElement) => {
        const chips = card.querySelectorAll('.deck-chip')
        gsap.to(chips, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: 'power3.out',
          force3D: true,
        })
      }

      const animateChipsOut = (card: HTMLElement) => {
        const chips = card.querySelectorAll('.deck-chip')
        gsap.set(chips, { autoAlpha: 0, y: 10, force3D: true })
      }

      cards.forEach((card, i) => {
        // All chips start hidden
        animateChipsOut(card)

        // Track whether chips have been revealed for this card.
        // Once revealed, they stay visible — even as the card flies away.
        let chipsRevealed = false

        const observer = new MutationObserver(() => {
          if (card.classList.contains('is-active') && !chipsRevealed) {
            chipsRevealed = true
            animateChipsIn(card)
          }
          // No else — we never hide chips after they've appeared
        })
        observer.observe(card, { attributes: true, attributeFilter: ['class'] })

        // Card 0 already has is-active set before the observer was attached,
        // so trigger its chip reveal manually right now.
        if (i === 0) {
          chipsRevealed = true
          animateChipsIn(card)
        }
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
      <div className="separator-pattern absolute top-0 left-0 right-0 z-10" />
      <SidePattern invert={true} />

      {/* Sticky wrapper */}
      <div className="sticky overflow-hidden top-0 h-screen flex flex-col items-center justify-center gap-6 px-5 md:px-10 max-w-[1300px] mx-auto">

        {/* Heading */}
        <div className="text-center z-10">
          <div className="inline-flex items-center gap-2 px-[18px] py-2 bg-[rgba(14,53,114,0.05)] border border-[rgba(14,53,114,0.1)] rounded-[4px] mb-2">
            <span className="text-xs text-[#0E3572] font-normal">
              Built for decision-makers who need results
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-normal text-[#16181B] mb-2">
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
          style={{ height: '380px', perspective: '1200px' }}
        >
          {audiences.map((audience, index) => (
            <article
              key={index}
              className="deck-card absolute top-0 left-0 w-full h-full"
              style={{
                transformOrigin: 'center bottom',
                willChange: 'transform, opacity',
                borderRadius: '34px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.06), 0 20px 25px -5px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
              }}
            >
              <div
                className="deck-card-inner pl-0 md:pl-[26px] flex items-center flex-col md:flex-row overflow-hidden relative h-full"
                style={{
                  borderRadius: 'inherit',
                  gap: '34px',
                  background: 'white',
                }}
              >
                {/* Text Content */}
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

                {/* Chip Area */}
                <div
                  className="relative shrink-0 w-full md:w-[350px] lg:w-[420px] h-[200px] sm:h-[250px] md:h-full"
                  style={{ borderRadius: '0 34px 34px 0' }}
                >
                  {/* Dark background + pattern */}
                  <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 'inherit' }}>
                    <div
                      className="absolute inset-0"
                      style={{
                        borderRadius: 'inherit',
                        background: 'linear-gradient(180deg, rgba(14,53,114,0.7) 0%, rgb(14,53,114) 100%)',
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        borderRadius: 'inherit',
                        backgroundImage: `url(${patternBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.15,
                      }}
                    />
                  </div>

                  {/* Chips — opacity controlled by GSAP via MutationObserver above */}
                  {audience.chips.map((chip, chipIndex) => {
                    const wrapperStyle: React.CSSProperties = {
                      bottom: chip.bottom,
                      // Start invisible; GSAP will reveal on is-active
                      visibility: 'visible',
                      animationDelay: `${chipIndex * 0.08}s`,
                    }
                    if (chip.left) wrapperStyle.left = chip.left
                    if (chip.right) wrapperStyle.right = chip.right
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
