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
const BASE_POSITIONS = [100, 450, 250, 700]
const BASE_SPEEDS = [42, 36, 39, 33]

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
  // Smoothly interpolate between mobile and desktop values
  const t = Math.max(0, Math.min(1, (w - 320) / (1320 - 320))) // 0 = 320px, 1 = 1320px

  const blockHeight = Math.round(48 + 20 * t)        // 48 → 68
  const rowGap = Math.round(55 + 26 * t)              // 55 → 81
  const topOffset = Math.round(14 + 13 * t)            // 14 → 27
  const titleSize = Math.round(13 + 5 * t)             // 13 → 18
  const subtitleSize = Math.round(11 + 4 * t)          // 11 → 15
  const padX = Math.round(8 + 7 * t)                   // 8 → 15
  const padY = Math.round(6 + 4 * t)                   // 6 → 10
  const fadeWidth = Math.round(30 + 90 * t)             // 30 → 120
  const dotSize = Math.round(12 + 6 * t)                // 12 → 18
  const lineWidth = +(2 + 1.7 * t).toFixed(1)           // 2 → 3.7
  const timelineHeight = topOffset + 3 * rowGap + blockHeight + 14

  return { blockHeight, rowGap, topOffset, titleSize, subtitleSize, padX, padY, fadeWidth, dotSize, lineWidth, timelineHeight }
}

const HowWeEngage = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])
  const positionsRef = useRef<number[]>([...BASE_POSITIONS])
  const animCleanupRef = useRef<(() => void) | null>(null)
  const containerWidthRef = useRef(DESIGN_WIDTH)
  const dimsRef = useRef<Dims>(getDims(DESIGN_WIDTH))

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

      // Scale initial positions to container
      const scale = cw / DESIGN_WIDTH
      positionsRef.current = BASE_POSITIONS.map(p => p * scale)

      const tickHandler = (_: number, deltaTime: number) => {
        const dt = Math.min(deltaTime / 600, 0.1)
        const currentCw = containerWidthRef.current
        const currentScale = currentCw / DESIGN_WIDTH
        const cx = currentCw / 2

        milestones.forEach((m, i) => {
          const el = blockRefs.current[i]
          if (!el) return

          // Scale block width proportionally, with a minimum
          const scaledWidth = Math.max(160, m.baseWidth * currentScale)

          // Move left
          positionsRef.current[i] -= BASE_SPEEDS[i] * Math.max(0.4, currentScale) * dt

          // Wrap: when fully off-screen left, reappear from right
          if (positionsRef.current[i] < -scaledWidth - 60) {
            positionsRef.current[i] = currentCw + 60
          }

          // Apply position & width
          el.style.transform = `translateX(${positionsRef.current[i]}px)`
          el.style.width = `${scaledWidth}px`

          // Calculate clip for loaded overlay
          const blockLeft = positionsRef.current[i]
          const blockRight = positionsRef.current[i] + scaledWidth
          const loadedEl = el.querySelector('.engage-loaded') as HTMLElement
          if (!loadedEl) return

          if (blockRight <= cx) {
            loadedEl.style.clipPath = 'inset(0 0% 0 0)'
            loadedEl.style.borderColor = '#0E3572'
            loadedEl.style.color = '#0E3572'
          } else if (blockLeft >= cx) {
            loadedEl.style.clipPath = 'inset(0 100% 0 0)'
          } else {
            const clipPercent = ((cx - blockLeft) / scaledWidth) * 100
            loadedEl.style.clipPath = `inset(0 ${100 - clipPercent}% 0 0)`
            loadedEl.style.borderColor = '#ED1C24'
            loadedEl.style.color = '#ED1C24'
          }
        })
      }

      gsap.ticker.add(tickHandler)

      // Resize observer to adapt on viewport changes
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width
          containerWidthRef.current = w
          const d = getDims(w)
          dimsRef.current = d
          setDims(d)

          // Clamp any out-of-bounds positions
          positionsRef.current = positionsRef.current.map(p =>
            p > w + 200 ? w + 60 : p
          )
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

  // Compute dashed line y-positions from dims
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
      {/* Separator Pattern Border at top */}
      <div className="separator-pattern absolute top-0 left-0 right-0 z-10" />

      <SidePattern />

      <div className="flex flex-col gap-5 sm:gap-6 md:gap-[34px] items-center py-10 sm:py-14 md:py-[80px] relative">
        {/* Heading */}
        <div className="flex flex-col gap-[8px] items-center text-center px-4">
          <div className="inline-flex items-center justify-center px-[18px] py-2 bg-[rgba(255,250,250,0.1)] border border-[rgba(14,53,114,0.1)] rounded-[4px]">
            <span className="text-xs font-normal text-[#FFFAFA]">
              How We Engage
            </span>
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
            {/* Circle dot at top */}
            <div
              className="shrink-0 rounded-full"
              style={{
                width: `${dims.dotSize}px`,
                height: `${dims.dotSize}px`,
                background: '#ED1C24',
                border: `${dims.dotSize > 14 ? 3 : 2}px solid #FFFAFA`,
              }}
            />
            {/* Vertical line */}
            <div
              className="flex-1"
              style={{
                width: `${dims.lineWidth}px`,
                background: '#ED1C24',
              }}
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
                className="absolute top-0"
                style={{
                  width: `${milestone.baseWidth}px`, // overridden by animation
                  height: `${dims.blockHeight}px`,
                  willChange: 'transform',
                }}
              >
                {/* Unloaded state: semi-transparent bg, white text */}
                <div
                  className="absolute inset-0 rounded-[7px] flex flex-col justify-center"
                  style={{
                    background: 'rgba(255,250,250,0.15)',
                    border: '1.5px solid rgba(255,250,250,0.1)',
                    padding: `${dims.padY}px ${dims.padX}px`,
                    gap: `${Math.max(2, Math.round(dims.blockHeight * 0.06))}px`,
                  }}
                >
                  <p
                    className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{
                      fontSize: `${dims.titleSize}px`,
                      color: 'rgba(255,250,250,0.75)',
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
                      color: 'rgba(255,250,250,0.75)',
                      lineHeight: 'normal',
                    }}
                  >
                    {milestone.subtitle}
                  </p>
                </div>

                {/* Loaded state: white bg, colored border + text — clipped via clip-path */}
                <div
                  className="engage-loaded absolute inset-0 rounded-[7px] flex flex-col justify-center"
                  style={{
                    background: '#FFFAFA',
                    border: '1.5px solid #0E3572',
                    clipPath: 'inset(0 100% 0 0)',
                    boxShadow: '0px 0px 34px 0px rgba(7,7,7,0.25)',
                    color: '#0E3572',
                    padding: `${dims.padY}px ${dims.padX}px`,
                    gap: `${Math.max(2, Math.round(dims.blockHeight * 0.06))}px`,
                  }}
                >
                  <p
                    className="font-normal whitespace-nowrap overflow-hidden text-ellipsis"
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
                      lineHeight: 'normal',
                    }}
                  >
                    {milestone.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Right fade gradient */}
          <div
            className="absolute right-0 top-0 bottom-0 pointer-events-none z-[5]"
            style={{
              width: `${dims.fadeWidth}px`,
              background: 'linear-gradient(to right, rgba(14,53,114,0), #0E3572)',
            }}
          />
          {/* Left fade gradient */}
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
            boxShadow: '0px 77px 22px 0px rgba(0,0,0,0), 0px 49px 20px 0px rgba(0,0,0,0.02), 0px 28px 17px 0px rgba(0,0,0,0.08), 0px 12px 12px 0px rgba(0,0,0,0.13), 0px 3px 7px 0px rgba(0,0,0,0.15)',
          }}
        >
          Help me choose the right model
        </button>
      </div>
    </section>
  )
}

export default HowWeEngage
