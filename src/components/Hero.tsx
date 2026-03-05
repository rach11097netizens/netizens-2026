import { useEffect, useRef, useMemo, useState } from 'react'
import { BookCallButton } from './BookCallButton'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import laravelLogo from '../assets/images/icons/logo/laravel.svg'
import oracleLogo from '../assets/images/icons/logo/oracle.svg'
import wordpressLogo from '../assets/images/icons/logo/wordpress.svg'
import pythonLogo from '../assets/images/icons/logo/python.svg'
import reactLogo from '../assets/images/icons/logo/react.svg'
import figmaLogo from '../assets/images/icons/logo/figma.svg'
import flutterLogo from '../assets/images/icons/logo/flutter.svg'
import shopifyLogo from '../assets/images/icons/logo/shopify.svg'

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const marqueeViewportRef = useRef<HTMLDivElement>(null)
  const marqueeTrackRef = useRef<HTMLDivElement>(null)

  // ── Breakpoints ───────────────────────────────────────────────────────────────
  const BP_SM = 640
  const BP_LG = 1024

  // ── useWindowWidth ────────────────────────────────────────────────────────────
  function useWindowWidth(): number {
    const [width, setWidth] = useState<number>(
      typeof window !== "undefined" ? window.innerWidth : BP_LG + 1
    )
    useEffect(() => {
      const handler = () => setWidth(window.innerWidth)
      window.addEventListener("resize", handler)
      return () => window.removeEventListener("resize", handler)
    }, [])
    return width
  }

  // Marquee grid configuration
  const gridCols = 6
  const cellsPerRow = gridCols
  const totalRows = 16
  const totalCells = totalRows * cellsPerRow
  const numLogos = 25

  const marqueeLogoPositions = useMemo(() => {
    const positions: number[] = []
    const usedPositions = new Set<number>()

    const numClusters = 6
    const logosPerCluster = Math.floor(numLogos / numClusters)

    for (let cluster = 0; cluster < numClusters; cluster++) {
      const areaStart = Math.floor((totalCells / numClusters) * cluster)
      const areaEnd = Math.floor((totalCells / numClusters) * (cluster + 1))
      const clusterStart = areaStart + Math.floor(Math.random() * (areaEnd - areaStart - 20))

      const clusterPositions: number[] = []
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const pos = clusterStart + (row * cellsPerRow) + col
          if (pos < totalCells && !usedPositions.has(pos)) {
            clusterPositions.push(pos)
          }
        }
      }

      clusterPositions.slice(0, logosPerCluster).forEach(pos => {
        positions.push(pos)
        usedPositions.add(pos)
      })
    }

    while (positions.length < numLogos) {
      let randomPos: number

      if (positions.length > 0 && Math.random() > 0.1) {
        const existingPos = positions[Math.floor(Math.random() * positions.length)]
        const existingRow = Math.floor(existingPos / cellsPerRow)
        const existingCol = existingPos % cellsPerRow

        const rowOffset = Math.floor(Math.random() * 5) - 2
        const colOffset = Math.floor(Math.random() * 5) - 2

        const newRow = Math.max(0, Math.min(totalRows - 1, existingRow + rowOffset))
        const newCol = Math.max(0, Math.min(cellsPerRow - 1, existingCol + colOffset))
        randomPos = newRow * cellsPerRow + newCol
      } else {
        randomPos = Math.floor(Math.random() * totalCells)
      }

      if (!usedPositions.has(randomPos)) {
        positions.push(randomPos)
        usedPositions.add(randomPos)
      }

      if (usedPositions.size >= totalCells * 0.6) break
    }

    return positions.sort((a, b) => a - b)
  }, [])

  const marqueeBlockFillPositions = useMemo(() => {
    const positions: number[] = []
    for (let i = 0; i < totalRows * cellsPerRow; i++) {
      const row = Math.floor(i / cellsPerRow)
      const col = i % cellsPerRow
      if (!marqueeLogoPositions.includes(i) && (row + col) % 4 === 0 && Math.random() > 0.5) {
        positions.push(i)
      }
    }
    return positions
  }, [marqueeLogoPositions, totalRows, cellsPerRow])

  const logos = [
    laravelLogo, oracleLogo, wordpressLogo, pythonLogo,
    reactLogo, figmaLogo, flutterLogo, shopifyLogo,
  ]

  const width = useWindowWidth()
  const isMobile = width < BP_SM
  const isDesktop = width >= BP_LG

  useEffect(() => {
    const section = heroRef.current
    if (!section || !headingRef.current) return

    // FIX: Track whether this effect is still alive.
    // If navigation happens during async callbacks, we bail out early
    // instead of letting GSAP touch already-unmounted DOM nodes.
    let isMounted = true

    // FIX: All GSAP logic, including the marquee, must live inside gsap.context()
    // so it gets killed synchronously on unmount. We pass the dependencies (isMounted,
    // images loaded, etc) into the context.
    const ctx = gsap.context((self) => {
      // Fade in hero content
      gsap.fromTo(
        headingRef.current!.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      )

      if (isDesktop && marqueeTrackRef.current && marqueeViewportRef.current) {
        const track = marqueeTrackRef.current
        const viewport = marqueeViewportRef.current
        let scrollAnimation: gsap.core.Tween | null = null

        const startMarquee = () => {
          if (!isMounted) return

          const totalHeight = track.scrollHeight
          const singleSetHeight = totalHeight / 2

          if (window.getComputedStyle(viewport).display === 'none' || singleSetHeight <= 0) return

          gsap.set(track, { y: 0 })

          scrollAnimation = gsap.fromTo(track,
            { y: 0 },
            { y: -singleSetHeight, duration: 40, ease: 'none', repeat: -1, immediateRender: true }
          )

          const handleMouseEnter = () => scrollAnimation?.timeScale(2.2)
          const handleMouseLeave = () => scrollAnimation?.timeScale(1)

          viewport.addEventListener('mouseenter', handleMouseEnter)
          viewport.addEventListener('mouseleave', handleMouseLeave)

          // Add cleanups to the context so ctx.revert() undoes the event listeners
          // FIX: Use `self.add` instead of closing over `ctx` to avoid ReferenceError
          // when startMarquee executes synchronously for already-cached images.
          self.add(() => {
            viewport.removeEventListener('mouseenter', handleMouseEnter)
            viewport.removeEventListener('mouseleave', handleMouseLeave)
          })
        }

        const images = track.querySelectorAll('img')
        if (images.length === 0) {
          // If no images, start immediately
          startMarquee()
        } else {
          // Wait for images to load before starting the marquee
          let loaded = 0
          const checkReady = () => {
            loaded++
            if (loaded >= images.length && isMounted) startMarquee()
          }

          images.forEach((img: HTMLImageElement) => {
            if (img.complete) {
              checkReady()
            } else {
              img.addEventListener('load', checkReady, { once: true })
              img.addEventListener('error', checkReady, { once: true })
            }
          })
        }
      }
    }, section)

    return () => {
      isMounted = false
      // Revert GSAP context — this instantly kills the fade-in, the marquee (if it started),
      // and removes the mouseenter/leave event listeners via the ctx.add() cleanup block.
      ctx.revert()
    }
  }, [isDesktop])

  return (
    <section ref={heroRef} className="relative flex items-center pt-20 md:pt-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Left Content */}
          <div ref={headingRef} className="col-span-12 lg:col-span-7 space-y-5 py-10 lg:py-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-gray-100 rounded-sm">
              <span className="text-xs sm:text-sm font-bold text-[#0E3572]">Not a vendor. Your tech delivery partner.</span>
            </div>

            <h1 className="text-2xl md:text-4xl xl:text-[46px] !leading-[1.2] font-normal text-black">
              A Custom Software Development Company Focused on Business Outcomes
            </h1>

            <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We design and build custom software, improve existing products, automate workflows with AI where it helps, and support teams as they scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <BookCallButton />
              <Link to="/how-we-work" className="px-8 py-4 border-2 border-gray-300 text-black text-sm rounded-md hover:bg-black hover:text-white hover:border-black transition-colors font-medium">
                How We Work
              </Link>
            </div>

            <p className="text-xs text-gray-500">
              You don't need a perfect brief. <span className='font-bold text-black'>You need the right questions</span>
            </p>
          </div>

          {/* Right Pattern - Marquee Animation (desktop only) */}
          <div ref={marqueeViewportRef} className="col-span-5 hidden lg:block marquee-viewport">
            <div ref={marqueeTrackRef} className="marquee-track">
              {Array.from({ length: totalRows * cellsPerRow }).map((_, i) => {
                const hasLogo = marqueeLogoPositions.includes(i)
                const positionIndex = hasLogo ? marqueeLogoPositions.indexOf(i) : -1
                const logoIndex = hasLogo ? positionIndex % logos.length : -1
                const hasBlockFill = marqueeBlockFillPositions.includes(i)
                return (
                  <div key={`first-${i}`} className="marquee-cell">
                    {hasBlockFill && <div className="marquee-block-fill" />}
                    {hasLogo && logoIndex >= 0 && (
                      <div className="icon-card">
                        <img src={logos[logoIndex]} alt={`Logo ${logoIndex + 1}`}
                          onError={(e) => { e.currentTarget.style.display = 'none' }} />
                      </div>
                    )}
                  </div>
                )
              })}
              {Array.from({ length: totalRows * cellsPerRow }).map((_, i) => {
                const hasLogo = marqueeLogoPositions.includes(i)
                const positionIndex = hasLogo ? marqueeLogoPositions.indexOf(i) : -1
                const logoIndex = hasLogo ? positionIndex % logos.length : -1
                const hasBlockFill = marqueeBlockFillPositions.includes(i)
                return (
                  <div key={`second-${i}`} className="marquee-cell">
                    {hasBlockFill && <div className="marquee-block-fill" />}
                    {hasLogo && logoIndex >= 0 && (
                      <div className="icon-card">
                        <img src={logos[logoIndex]} alt={`Logo ${logoIndex + 1}`}
                          onError={(e) => { e.currentTarget.style.display = 'none' }} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
