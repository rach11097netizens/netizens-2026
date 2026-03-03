import { useEffect, useRef, useState } from 'react'
import { SidePattern } from './SidePattern'
import { Link } from 'react-router-dom'

interface Milestone {
  number: string
  title: string
  subtitle: string
  baseWidth: number
  bestFor: string
  youGet: string
  howItWorks: string
}

const milestones: Milestone[] = [
  {
    number: '01',
    title: 'Sprint',
    subtitle: '2–4 weeks',
    baseWidth: 435,
    bestFor: 'Quick wins, audits, MVP slices, fixes, AI/workflow pilots',
    youGet: 'A shipped release + next-step plan',
    howItWorks: '1 clear goal → weekly demos → delivery',
  },
  {
    number: '02',
    title: 'Project',
    subtitle: '1–6 months',
    baseWidth: 520,
    bestFor: 'Full MVP build, large modules, rebuilds, major integrations',
    youGet: 'End-to-end build with milestones + launch support',
    howItWorks: 'Roadmap → phases → QA → go-live',
  },
  {
    number: '03',
    title: 'Staff Augmentation',
    subtitle: 'Ongoing',
    baseWidth: 430,
    bestFor: 'Backlog pressure, skill gaps, scaling delivery capacity',
    youGet: 'Dedicated developers/QA/DevOps/AI roles (managed)',
    howItWorks: '2-week trial option → weekly reporting → easy scaling',
  },
  {
    number: '04',
    title: 'Retainer',
    subtitle: 'Monthly',
    baseWidth: 340,
    bestFor: 'Support & Scale, improvements, performance, reliability',
    youGet: 'On-demand help + planned upgrades every month',
    howItWorks: 'SLA + monthly priorities → continuous releases',
  },
]

const DESIGN_WIDTH = 1320
const INTER_BAR_GAP = 120
const BAR_WIDTH_FRACTION = 0.52
const BAR_MIN_WIDTH_PX   = 180

interface Dims {
  blockHeight: number
  rowGap: number
  topOffset: number
  titleSize: number
  subtitleSize: number
  padX: number
  padY: number
  fadeWidth: number
  dotSize: number
  lineWidth: number
  timelineHeight: number
}

const getDims = (w: number): Dims => {
  const t = Math.max(0, Math.min(1, (w - 320) / (DESIGN_WIDTH - 320)))
  const blockHeight   = Math.round(48 + 20 * t)
  const rowGap        = Math.round(55 + 26 * t)
  const topOffset     = Math.round(14 + 13 * t)
  const titleSize     = Math.round(13 + 5 * t)
  const subtitleSize  = Math.round(11 + 4 * t)
  const padX          = Math.round(8 + 7 * t)
  const padY          = Math.round(6 + 4 * t)
  const fadeWidth     = Math.round(30 + 90 * t)
  const dotSize       = Math.round(12 + 6 * t)
  const lineWidth     = +(2 + 1.7 * t).toFixed(1)
  const timelineHeight = topOffset + 3 * rowGap + blockHeight + 14
  return { blockHeight, rowGap, topOffset, titleSize, subtitleSize, padX, padY, fadeWidth, dotSize, lineWidth, timelineHeight }
}

const HowWeEngage = () => {
  const sectionRef       = useRef<HTMLDivElement>(null)
  const timelineRef      = useRef<HTMLDivElement>(null)
  const blockRefs        = useRef<(HTMLDivElement | null)[]>([])
  const containerWidthRef = useRef(DESIGN_WIDTH)
  const dimsRef          = useRef<Dims>(getDims(DESIGN_WIDTH))
  const cursorRef        = useRef(0)
  const animCleanupRef   = useRef<(() => void) | null>(null)

  // ── New refs for hover ──
  // Stores the gsap instance after dynamic import so hover handlers can use it
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gsapRef          = useRef<any>(null)
  // Whether the ticker should advance the cursor (pause on hover)
  const isPausedRef      = useRef(false)
  // The floating info panel DOM node (lives outside overflow-hidden timelineRef)
  const panelRef         = useRef<HTMLDivElement>(null)
  // Which milestone's content the panel is currently showing (-1 = hidden)
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1)

  const [dims, setDims] = useState<Dims>(() =>
    getDims(typeof window !== 'undefined' ? window.innerWidth : DESIGN_WIDTH)
  )

  // ── Hover handlers ────────────────────────────────────────────────────────
  // Called from JSX onMouseEnter on each bar wrapper div.
  // 1. Pause the cursor advance
  // 2. Read bar's true screen rect → compute panel position relative to section
  // 3. GSAP-animate the panel in
  const handleBarMouseEnter = (i: number) => {
    isPausedRef.current = true

    const bar     = blockRefs.current[i]
    const section = sectionRef.current
    const panel   = panelRef.current
    const gsap    = gsapRef.current
    if (!bar || !section || !panel || !gsap) return

    const barRect     = bar.getBoundingClientRect()
    const sectionRect = section.getBoundingClientRect()

    // Position panel directly below the bar, flush with its left edge
    panel.style.left  = `${barRect.left - sectionRect.left}px`
    panel.style.top   = `${barRect.bottom - sectionRect.top + 6}px`
    panel.style.width = `${barRect.width}px`

    // Switch content then animate in
    setHoveredIndex(i)
    gsap.fromTo(
      panel,
      { autoAlpha: 0, y: -8 },
      { autoAlpha: 1, y: 0, duration: 0.22, ease: 'power2.out' }
    )
  }

  const handleBarMouseLeave = () => {
    isPausedRef.current = false

    const panel = panelRef.current
    const gsap  = gsapRef.current
    if (!panel || !gsap) return

    gsap.to(panel, {
      autoAlpha: 0,
      y: -6,
      duration: 0.18,
      ease: 'power2.in',
      onComplete: () => setHoveredIndex(-1),
    })
  }

  // ── Main animation setup (unchanged except storing gsap + pausing cursor) ──
  useEffect(() => {
    let cancelled = false

    const initAnimation = async () => {
      const { gsap } = await import('gsap')
      if (cancelled || !timelineRef.current) return

      // Store instance for hover handlers
      gsapRef.current = gsap

      const cw = timelineRef.current.offsetWidth || DESIGN_WIDTH
      containerWidthRef.current = cw
      const newDims = getDims(cw)
      dimsRef.current = newDims
      setDims(newDims)

      const SPEED = 110

      const getBarWidth = (containerW: number) =>
        Math.max(BAR_MIN_WIDTH_PX, containerW * BAR_WIDTH_FRACTION)

      const getGap = (containerW: number) =>
        INTER_BAR_GAP * (containerW / DESIGN_WIDTH)

      const getSequenceLength = (containerW: number) => {
        const bw  = getBarWidth(containerW)
        const gap = getGap(containerW)
        return milestones.length * (bw + gap)
      }

      cursorRef.current = getBarWidth(cw)

      const tickHandler = (_time: number, deltaTime: number) => {
        const dt = Math.min(deltaTime / 1000, 0.05)
        const currentCw = containerWidthRef.current
        const cx = currentCw / 2
        const bw  = getBarWidth(currentCw)
        const gap = getGap(currentCw)

        // ── Only advance cursor when not hovered — bars freeze in place ──
        if (!isPausedRef.current) {
          cursorRef.current += SPEED * dt

          const seqLen = getSequenceLength(currentCw)
          if (cursorRef.current > seqLen + currentCw) {
            cursorRef.current = bw
          }
        }

        milestones.forEach((_, i) => {
          const el = blockRefs.current[i]
          if (!el) return

          const barStart = i * (bw + gap)
          const screenX  = currentCw - cursorRef.current + barStart

          el.style.transform = `translateX(${screenX}px)`
          el.style.width     = `${bw}px`

          const barLeft  = screenX
          const barRight = screenX + bw

          el.style.opacity = (barRight > 0 && barLeft < currentCw) ? '1' : '0'

          const loadedEl = el.querySelector('.engage-loaded') as HTMLElement
          if (!loadedEl) return

          if (barRight <= cx) {
            loadedEl.style.clipPath    = 'inset(0 0% 0 0)'
            loadedEl.style.borderColor = '#0E3572'
            loadedEl.style.color       = '#0E3572'
          } else if (barLeft >= cx) {
            loadedEl.style.clipPath    = 'inset(0 100% 0 0)'
            loadedEl.style.borderColor = '#ED1C24'
            loadedEl.style.color       = '#ED1C24'
          } else {
            const revealed = ((cx - barLeft) / bw) * 100
            loadedEl.style.clipPath    = `inset(0 ${100 - revealed}% 0 0)`
            loadedEl.style.borderColor = '#ED1C24'
            loadedEl.style.color       = '#ED1C24'
          }
        })
      }

      gsap.ticker.add(tickHandler)

      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width
          containerWidthRef.current = w
          const d = getDims(w)
          dimsRef.current = d
          setDims(d)
        }
      })
      if (timelineRef.current) ro.observe(timelineRef.current)

      animCleanupRef.current = () => {
        gsap.ticker.remove(tickHandler)
        ro.disconnect()
      }
    }

    initAnimation()

    return () => {
      cancelled = true
      animCleanupRef.current?.()
    }
  }, [])

  const dashedYs = [
    dims.topOffset - 6,
    dims.topOffset + dims.rowGap - 6,
    dims.topOffset + 2 * dims.rowGap - 6,
    dims.topOffset + 3 * dims.rowGap - 6,
    dims.timelineHeight - 8,
  ]

  const infoFontSize = Math.max(10, dims.subtitleSize - 1)

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0E3572] overflow-hidden"
    >
      <div className="separator-pattern absolute top-0 left-0 right-0 z-10" />
      <SidePattern />

      <div className="flex flex-col gap-5 sm:gap-6 md:gap-[34px] items-center py-10 sm:py-14 md:py-[80px] relative">

        {/* Heading */}
        <div className="flex flex-col gap-[8px] items-center text-center px-4">
          <div className="inline-flex items-center justify-center px-[18px] py-2 bg-[rgba(255,250,250,0.1)] border border-[rgba(14,53,114,0.1)] rounded-[4px]">
            <span className="text-xs font-normal text-[#FFFAFA]">How We Engage</span>
          </div>
          <h2
            className="text-2xl lg:text-3xl font-normal text-[#FFFAFA] px-2"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Predictable delivery, flexible engagement
          </h2>
        </div>

        {/* Timeline Area */}
        <div
          ref={timelineRef}
          className="relative w-full max-w-[1320px] mx-auto overflow-hidden"
          style={{ height: `${dims.timelineHeight}px` }}
        >
          {/* Background dashed lines */}
          <div className="absolute inset-0 pointer-events-none">
            {dashedYs.map((y, i) => (
              <div
                key={i}
                className="absolute left-0 right-0"
                style={{
                  top: `${y}px`,
                  height: 0,
                  borderTop: '1.24px dashed rgba(255,250,250,0.08)',
                }}
              />
            ))}
          </div>

          {/* Red center line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center z-10"
            style={{ height: `${dims.timelineHeight}px`, width: `${dims.dotSize}px` }}
          >
            <div
              className="shrink-0 rounded-full"
              style={{
                width: `${dims.dotSize}px`,
                height: `${dims.dotSize}px`,
                background: '#ED1C24',
                border: `${dims.dotSize > 14 ? 3 : 2}px solid #FFFAFA`,
              }}
            />
            <div
              className="flex-1"
              style={{ width: `${dims.lineWidth}px`, background: '#ED1C24' }}
            />
          </div>

          {/* Milestone rows */}
          {milestones.map((milestone, i) => (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: `${dims.topOffset + i * dims.rowGap}px`,
                height: `${dims.blockHeight}px`,
              }}
            >
              <div
                ref={(el) => { blockRefs.current[i] = el }}
                className="absolute top-0 cursor-pointer"
                style={{
                  width: `${Math.max(BAR_MIN_WIDTH_PX, DESIGN_WIDTH * BAR_WIDTH_FRACTION)}px`,
                  height: `${dims.blockHeight}px`,
                  willChange: 'transform, opacity',
                  opacity: 0,
                }}
                onMouseEnter={() => handleBarMouseEnter(i)}
                onMouseLeave={handleBarMouseLeave}
              >
                {/* Ghost state */}
                <div
                  className="absolute inset-0 rounded-[7px] flex flex-col justify-center"
                  style={{
                    background: 'rgba(255,250,250,0.12)',
                    border: '1.5px solid rgba(255,250,250,0.15)',
                    padding: `${dims.padY}px ${dims.padX}px`,
                    gap: `${Math.max(2, Math.round(dims.blockHeight * 0.06))}px`,
                  }}
                >
                  <p
                    className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{
                      fontSize: `${dims.titleSize}px`,
                      color: 'rgba(255,250,250,0.5)',
                      lineHeight: 'normal',
                      fontFamily: "'Sora', sans-serif",
                    }}
                  >
                    {milestone.number}. {milestone.title}
                  </p>
                  <p
                    className="font-normal whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{
                      fontSize: `${dims.subtitleSize}px`,
                      color: 'rgba(255,250,250,0.5)',
                      lineHeight: 'normal',
                    }}
                  >
                    {milestone.subtitle}
                  </p>
                </div>

                {/* Loaded state */}
                <div
                  className="engage-loaded absolute inset-0 rounded-[7px] flex flex-col justify-center"
                  style={{
                    background: '#FFFAFA',
                    border: '1.5px solid #0E3572',
                    clipPath: 'inset(0 100% 0 0)',
                    boxShadow: '0px 4px 24px 0px rgba(7,7,7,0.18), 0px 0px 0px 1px rgba(14,53,114,0.08)',
                    color: '#0E3572',
                    padding: `${dims.padY}px ${dims.padX}px`,
                    gap: `${Math.max(2, Math.round(dims.blockHeight * 0.06))}px`,
                    transition: 'border-color 0.1s',
                  }}
                >
                  <p
                    className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{
                      fontSize: `${dims.titleSize}px`,
                      color: 'inherit',
                      lineHeight: 'normal',
                      fontFamily: "'Sora', sans-serif",
                    }}
                  >
                    {milestone.number}. {milestone.title}
                  </p>
                  <p
                    className="font-normal whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{
                      fontSize: `${dims.subtitleSize}px`,
                      color: 'inherit',
                      opacity: 0.7,
                      lineHeight: 'normal',
                    }}
                  >
                    {milestone.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Edge fades */}
          <div
            className="absolute right-0 top-0 bottom-0 pointer-events-none z-[5]"
            style={{
              width: `${dims.fadeWidth}px`,
              background: 'linear-gradient(to right, rgba(14,53,114,0), #0E3572)',
            }}
          />
          <div
            className="absolute left-0 top-0 bottom-0 pointer-events-none z-[5]"
            style={{
              width: `${dims.fadeWidth}px`,
              background: 'linear-gradient(to left, rgba(14,53,114,0), #0E3572)',
            }}
          />
        </div>

        {/* ── Hover info panel ────────────────────────────────────────────────
             Lives OUTSIDE timelineRef so it's not clipped by overflow-hidden.
             Position is set directly via style in handleBarMouseEnter.
             GSAP controls autoAlpha (visibility + opacity) and y.
        ─────────────────────────────────────────────────────────────────── */}
        <div
          ref={panelRef}
          className="absolute pointer-events-none"
          style={{
            // Initial hidden state — GSAP will set autoAlpha on mount
            visibility: 'hidden',
            opacity: 0,
            zIndex: 20,
            // min-width guard so panel never collapses on very small bars
            minWidth: `${BAR_MIN_WIDTH_PX}px`,
          }}
          onMouseEnter={() => { isPausedRef.current = true }}
          onMouseLeave={handleBarMouseLeave}
        >
          {hoveredIndex >= 0 && (
            <div
              style={{
                background: '#FFFAFA',
                border: '1.5px solid #0E3572',
                borderRadius: '7px',
                padding: `${dims.padY + 6}px ${dims.padX + 2}px`,
                boxShadow: '0px 4px 24px 0px rgba(7,7,7,0.22), 0px 0px 0px 1px rgba(14,53,114,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
            >
              {/* Best for */}
              <p
                style={{
                  fontSize: `${infoFontSize}px`,
                  color: '#0E3572',
                  lineHeight: '1.5',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <span style={{ fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>Best for: </span>
                {milestones[hoveredIndex].bestFor}
              </p>

              {/* You get */}
              <p
                style={{
                  fontSize: `${infoFontSize}px`,
                  color: '#0E3572',
                  lineHeight: '1.5',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <span style={{ fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>You get: </span>
                {milestones[hoveredIndex].youGet}
              </p>

              {/* How it works */}
              <p
                style={{
                  fontSize: `${infoFontSize}px`,
                  color: '#0E3572',
                  lineHeight: '1.5',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <span style={{ fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>How it works: </span>
                {milestones[hoveredIndex].howItWorks}
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          to="/how-we-work"
          className="bg-white text-[#0E3572] text-xs sm:text-[14px] font-normal px-5 sm:px-[34px] py-3 sm:py-[18px] rounded-[4px] cursor-pointer hover:opacity-90 transition-opacity"
          style={{
            boxShadow:
              '0px 77px 22px 0px rgba(0,0,0,0), 0px 49px 20px 0px rgba(0,0,0,0.02), 0px 28px 17px 0px rgba(0,0,0,0.08), 0px 12px 12px 0px rgba(0,0,0,0.13), 0px 3px 7px 0px rgba(0,0,0,0.15)',
          }}
        >
          Help me choose the right model
        </Link>
      </div>
    </section>
  )
}

export default HowWeEngage
