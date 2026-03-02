import { useEffect, useRef, useState } from 'react'
import { SidePattern } from './SidePattern'

interface Milestone {
  number: string
  title: string
  subtitle: string
  baseWidth: number
}

const milestones: Milestone[] = [
  { number: '01', title: 'Sprint', subtitle: '2–4 weeks', baseWidth: 435 },
  { number: '02', title: 'Project', subtitle: '1–6 months', baseWidth: 520 },
  { number: '03', title: 'Staff Augmentation', subtitle: 'Ongoing', baseWidth: 430 },
  { number: '04', title: 'Retainer', subtitle: 'Monthly', baseWidth: 340 },
]

const DESIGN_WIDTH = 1320
// Gap between bars (in px at design width)
const INTER_BAR_GAP = 120
// Bar width as a fraction of container — ensures bars feel "present" for a
// comfortable duration regardless of screen size or speed.
const BAR_WIDTH_FRACTION = 0.52
const BAR_MIN_WIDTH_PX   = 180

/* ─── Responsive dimension calculator ─── */
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

  const blockHeight = Math.round(48 + 20 * t)
  const rowGap = Math.round(55 + 26 * t)
  const topOffset = Math.round(14 + 13 * t)
  const titleSize = Math.round(13 + 5 * t)
  const subtitleSize = Math.round(11 + 4 * t)
  const padX = Math.round(8 + 7 * t)
  const padY = Math.round(6 + 4 * t)
  const fadeWidth = Math.round(30 + 90 * t)
  const dotSize = Math.round(12 + 6 * t)
  const lineWidth = +(2 + 1.7 * t).toFixed(1)
  const timelineHeight = topOffset + 3 * rowGap + blockHeight + 14

  return { blockHeight, rowGap, topOffset, titleSize, subtitleSize, padX, padY, fadeWidth, dotSize, lineWidth, timelineHeight }
}

// ── Sequential animation state ──
// Each bar lives on its own row and runs one at a time.
// "position" = left edge of the bar in container px.
// Bars start off the right edge and move left at a fixed speed.
// When bar[i] exits left, bar[i+1] is queued to enter from the right — after a small gap.
//
// Sequence logic:
//  • All bars share one "cursor" position that advances continuously.
//  • Bar i occupies cursor range [i * (barWidth + gap), i * (barWidth + gap) + barWidth]
//  • containerX = cursorPos - barOffset  →  left edge of bar in screen space
//  • When cursorPos wraps past total length, it resets so the loop restarts.

const HowWeEngage = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerWidthRef = useRef(DESIGN_WIDTH)
  const dimsRef = useRef<Dims>(getDims(DESIGN_WIDTH))
  const cursorRef = useRef(0) // global cursor in "design px" equivalent
  const animCleanupRef = useRef<(() => void) | null>(null)

  const [dims, setDims] = useState<Dims>(() =>
    getDims(typeof window !== 'undefined' ? window.innerWidth : DESIGN_WIDTH)
  )

  useEffect(() => {
    let cancelled = false

    const initAnimation = async () => {
      const { gsap } = await import('gsap')
      if (cancelled || !timelineRef.current) return

      const cw = timelineRef.current.offsetWidth || DESIGN_WIDTH
      containerWidthRef.current = cw
      const newDims = getDims(cw)
      dimsRef.current = newDims
      setDims(newDims)

      // Speed in px/sec — slow and readable
      const SPEED = 110

      // Bar width = fixed fraction of container so bars always feel "substantial"
      // regardless of screen size. This is the key to preventing bars from
      // zipping past — a wider bar spends more time on screen at the same speed.
      const getBarWidth = (containerW: number) =>
        Math.max(BAR_MIN_WIDTH_PX, containerW * BAR_WIDTH_FRACTION)

      const getGap = (containerW: number) =>
        INTER_BAR_GAP * (containerW / DESIGN_WIDTH)

      // Total length of all bars + gaps in the sequence loop
      const getSequenceLength = (containerW: number) => {
        const bw  = getBarWidth(containerW)
        const gap = getGap(containerW)
        return milestones.length * (bw + gap)
      }

      // ── Cursor init ──
      // screenX formula: screenX = cw - cursor + barStart
      // For bar 0 (barStart = 0) we want its RIGHT edge flush with the
      // container's right edge so it's visible the instant the section loads:
      //   screenX + barWidth = cw  →  (cw - cursor) + barWidth = cw  →  cursor = barWidth
      cursorRef.current = getBarWidth(cw)

      const tickHandler = (_time: number, deltaTime: number) => {
        const dt = Math.min(deltaTime / 1000, 0.05)
        const currentCw = containerWidthRef.current
        const cx = currentCw / 2
        const bw  = getBarWidth(currentCw)
        const gap = getGap(currentCw)

        cursorRef.current += SPEED * dt

        // Loop: once the last bar's right edge has exited left (cursor > seqLen + cw),
        // reset so bar 0's right edge is back at the container's right edge.
        const seqLen = getSequenceLength(currentCw)
        if (cursorRef.current > seqLen + currentCw) {
          cursorRef.current = bw // bar 0 enters immediately from the right
        }

        milestones.forEach((_, i) => {
          const el = blockRefs.current[i]
          if (!el) return

          // Each bar has a fixed slot: bar i starts at i * (bw + gap) in the sequence
          const barStart = i * (bw + gap)
          // screenX = left edge of bar in screen coords
          // grows negative as cursor advances → bar moves left
          const screenX = currentCw - cursorRef.current + barStart

          el.style.transform = `translateX(${screenX}px)`
          el.style.width = `${bw}px`

          const barLeft  = screenX
          const barRight = screenX + bw

          // Hide bars that are fully off-screen (avoids ghost renders)
          el.style.opacity = (barRight > 0 && barLeft < currentCw) ? '1' : '0'

          const loadedEl = el.querySelector('.engage-loaded') as HTMLElement
          if (!loadedEl) return

          if (barRight <= cx) {
            // Fully past center — white/settled
            loadedEl.style.clipPath = 'inset(0 0% 0 0)'
            loadedEl.style.borderColor = '#0E3572'
            loadedEl.style.color = '#0E3572'
          } else if (barLeft >= cx) {
            // Not yet reached center — ghost
            loadedEl.style.clipPath = 'inset(0 100% 0 0)'
            loadedEl.style.borderColor = '#ED1C24'
            loadedEl.style.color = '#ED1C24'
          } else {
            // Crossing — reveal proportionally to how much has passed the line
            const revealed = ((cx - barLeft) / bw) * 100
            loadedEl.style.clipPath = `inset(0 ${100 - revealed}% 0 0)`
            loadedEl.style.borderColor = '#ED1C24'
            loadedEl.style.color = '#ED1C24'
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

  // Dashed line y-positions
  const dashedYs = [
    dims.topOffset - 6,
    dims.topOffset + dims.rowGap - 6,
    dims.topOffset + 2 * dims.rowGap - 6,
    dims.topOffset + 3 * dims.rowGap - 6,
    dims.timelineHeight - 8,
  ]

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
          {/* Background horizontal dashed lines */}
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

          {/* Red center line with dot */}
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

          {/* ── Milestone rows — each bar on its own track ── */}
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
                className="absolute top-0"
                style={{
                  width: `${Math.max(BAR_MIN_WIDTH_PX, DESIGN_WIDTH * BAR_WIDTH_FRACTION)}px`,
                  height: `${dims.blockHeight}px`,
                  willChange: 'transform, opacity',
                  opacity: 0,
                }}
              >
                {/* Unloaded state: ghost / semi-transparent */}
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

                {/* Loaded state: white card, colored border + text, revealed by clip-path */}
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

          {/* Edge fade gradients — sit above bars, below center line dot */}
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

        {/* CTA Button */}
        <button
          className="bg-white text-[#0E3572] text-xs sm:text-[14px] font-normal px-5 sm:px-[34px] py-3 sm:py-[18px] rounded-[4px] cursor-pointer hover:opacity-90 transition-opacity"
          style={{
            boxShadow:
              '0px 77px 22px 0px rgba(0,0,0,0), 0px 49px 20px 0px rgba(0,0,0,0.02), 0px 28px 17px 0px rgba(0,0,0,0.08), 0px 12px 12px 0px rgba(0,0,0,0.13), 0px 3px 7px 0px rgba(0,0,0,0.15)',
          }}
        >
          Help me choose the right model
        </button>
      </div>
    </section>
  )
}

export default HowWeEngage
