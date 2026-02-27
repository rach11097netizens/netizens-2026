import { useEffect, useRef, useMemo } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
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
  // const patternRef = useRef<HTMLDivElement>(null) // For old static grid animation
  const marqueeViewportRef = useRef<HTMLDivElement>(null)
  const marqueeTrackRef = useRef<HTMLDivElement>(null)
  const scrollAnimationRef = useRef<any>(null)

  // Generate stable random positions for logos (8 logos randomly placed)
  // For old static grid animation
  const logoPositions = useMemo(() => {
    const positions = new Set<number>()
    while (positions.size < 8) {
      positions.add(Math.floor(Math.random() * 64))
    }
    return Array.from(positions)
  }, [])

  // Generate stable opacity values for pattern squares
  // Squares with logos always get opacity 1 for clear visibility
  // For old static grid animation
  const squareOpacities = useMemo(() => {
    return Array.from({ length: 64 }, (_, i) => {
      // If square has a logo, always use opacity 1
      if (logoPositions.includes(i)) {
        return 1
      }
      // Otherwise, random opacity
      return Math.random() > 0.7 ? 1 : 0.3
    })
  }, [logoPositions])

  // Marquee grid configuration
  const gridCols = 6
  const cellsPerRow = gridCols
  const totalRows = 16 // Total rows for the marquee (will be duplicated for infinite scroll)
  const totalCells = totalRows * cellsPerRow // 96 cells total
  const numLogos = 25 // Fill ~50% of cells with logos for dense, visually appealing grid

  // Fill grid densely with logos - no empty boxes!
  const marqueeLogoPositions = useMemo(() => {
    const positions: number[] = []
    const usedPositions = new Set<number>()

    // Fill the grid densely - create multiple clusters throughout
    // This ensures logos are everywhere, not just in a few spots

    // Create 5-6 large clusters spread across the grid
    const numClusters = 6
    const logosPerCluster = Math.floor(numLogos / numClusters)

    for (let cluster = 0; cluster < numClusters; cluster++) {
      // Spread clusters across different areas of the grid
      const areaStart = Math.floor((totalCells / numClusters) * cluster)
      const areaEnd = Math.floor((totalCells / numClusters) * (cluster + 1))
      const clusterStart = areaStart + Math.floor(Math.random() * (areaEnd - areaStart - 20))

      // Create a dense cluster (3x3 or 4x2 block)
      const clusterPositions: number[] = []
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const pos = clusterStart + (row * cellsPerRow) + col
          if (pos < totalCells && !usedPositions.has(pos)) {
            clusterPositions.push(pos)
          }
        }
      }

      // Add logos from this cluster
      clusterPositions.slice(0, logosPerCluster).forEach(pos => {
        positions.push(pos)
        usedPositions.add(pos)
      })
    }

    // Fill remaining logos - place them near existing clusters for density
    while (positions.length < numLogos) {
      let randomPos: number

      if (positions.length > 0 && Math.random() > 0.1) {
        // 90% chance to place near existing logo
        const existingPos = positions[Math.floor(Math.random() * positions.length)]
        const existingRow = Math.floor(existingPos / cellsPerRow)
        const existingCol = existingPos % cellsPerRow

        // Place within 2-3 cells for tight clustering
        const rowOffset = Math.floor(Math.random() * 5) - 2 // -2 to 2
        const colOffset = Math.floor(Math.random() * 5) - 2 // -2 to 2

        const newRow = Math.max(0, Math.min(totalRows - 1, existingRow + rowOffset))
        const newCol = Math.max(0, Math.min(cellsPerRow - 1, existingCol + colOffset))
        randomPos = newRow * cellsPerRow + newCol
      } else {
        // 10% chance for random placement
        randomPos = Math.floor(Math.random() * totalCells)
      }

      if (!usedPositions.has(randomPos)) {
        positions.push(randomPos)
        usedPositions.add(randomPos)
      }

      // Safety break
      if (usedPositions.size >= totalCells * 0.6) {
        break
      }
    }

    return positions.sort((a, b) => a - b) // Sort for consistency
  }, [])

  // Define block fill positions (checkered pattern)
  const marqueeBlockFillPositions = useMemo(() => {
    const positions: number[] = []
    for (let i = 0; i < totalRows * cellsPerRow; i++) {
      const row = Math.floor(i / cellsPerRow)
      const col = i % cellsPerRow
      // Add block fills in a checkered pattern, avoiding logo positions
      if (!marqueeLogoPositions.includes(i) && (row + col) % 4 === 0 && Math.random() > 0.5) {
        positions.push(i)
      }
    }
    return positions
  }, [marqueeLogoPositions, totalRows, cellsPerRow])

  // Placeholder logo images - replace with actual logos later
  const logos = [
    laravelLogo,
    oracleLogo,
    wordpressLogo,
    pythonLogo,
    reactLogo,
    figmaLogo,
    flutterLogo,
    shopifyLogo,
  ]

  useEffect(() => {
    const initAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      if (heroRef.current && headingRef.current) {
        // Fade in hero content
        gsap.fromTo(
          headingRef.current.children,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
          }
        )

        // OLD STATIC GRID ANIMATION - COMMENTED OUT (can be toggled)
        // Uncomment below to use the old static grid animation instead of marquee
        /*
        if (patternRef.current) {
          const squares = patternRef.current.querySelectorAll('.pattern-square')
          squares.forEach((square, index) => {
            const targetOpacity = squareOpacities[index]
            gsap.fromTo(
              square,
              {
                opacity: 0,
                scale: 0.8,
              },
              {
                opacity: targetOpacity,
                scale: 1,
                duration: 0.6,
                delay: 0.3 + (index * 0.02),
                ease: 'back.out(1.7)',
              }
            )
          })
        }
        */

        // NEW MARQUEE ANIMATION - Infinite vertical scroll
        if (marqueeTrackRef.current && marqueeViewportRef.current) {
          const track = marqueeTrackRef.current
          const viewport = marqueeViewportRef.current

          // Wait for layout to calculate accurate heights
          const initMarquee = () => {
            // Calculate the height of one set of content (half of total since duplicated)
            const totalHeight = track.scrollHeight
            const singleSetHeight = totalHeight / 2

            // Verify we have duplicated content
            if (singleSetHeight === 0 || totalHeight === 0) {
              // Retry if not ready
              setTimeout(initMarquee, 50)
              return
            }

            // Set initial position to start slightly below to hide the transition
            // This ensures the loop appears continuous from below
            gsap.set(track, { y: 0 })

            // Create seamless infinite scroll animation
            // The animation moves from 0 to -50% (one set height)
            // When it loops, the mask gradient at top hides the reset
            // and the content appears to continue from below seamlessly
            const scrollAnimation = gsap.fromTo(track,
              { y: 0 },
              {
                y: -singleSetHeight,
                duration: 40,
                ease: 'none',
                repeat: -1, // Infinite seamless loop
                yoyo: false,
                immediateRender: true,
                // Ensure smooth reset on repeat
                onRepeat: () => {
                  // The mask gradient will hide this transition
                  // Content appears to continue from below
                }
              }
            )

            // Store animation reference
            scrollAnimationRef.current = scrollAnimation

            // Speed up on hover - create handler functions for proper cleanup
            const handleMouseEnter = () => {
              if (scrollAnimationRef.current) {
                scrollAnimationRef.current.timeScale(2.2)
              }
            }

            const handleMouseLeave = () => {
              if (scrollAnimationRef.current) {
                scrollAnimationRef.current.timeScale(1)
              }
            }

            viewport.addEventListener('mouseenter', handleMouseEnter)
            viewport.addEventListener('mouseleave', handleMouseLeave)

              // Store handlers for cleanup
              ; (viewport as any).__marqueeHandlers = {
                enter: handleMouseEnter,
                leave: handleMouseLeave
              }
          }

          // Initialize after a short delay to ensure DOM is ready
          requestAnimationFrame(() => {
            requestAnimationFrame(initMarquee)
          })

          // Cleanup
          return () => {
            if (scrollAnimationRef.current) {
              scrollAnimationRef.current.kill()
              scrollAnimationRef.current = null
            }
            if (marqueeViewportRef.current && (marqueeViewportRef.current as any).__marqueeHandlers) {
              const handlers = (marqueeViewportRef.current as any).__marqueeHandlers
              marqueeViewportRef.current.removeEventListener('mouseenter', handlers.enter)
              marqueeViewportRef.current.removeEventListener('mouseleave', handlers.leave)
            }
          }
        }
      }
    }

    initAnimations()
  }, [squareOpacities])

  return (
    <section ref={heroRef} className="relative flex items-center pt-20 md:pt-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Left Content */}
          <div ref={headingRef} className="col-span-7 space-y-5 py-10 lg:py-0 text-center lg:text-left">
            {/* Pre-header */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-gray-100 rounded-sm">
              <span className="text-xs sm:text-sm font-bold text-[#0E3572]">Not a vendor. Your tech delivery partner.</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl md:text-4xl xl:text-[46px] !leading-[1.2] font-normal text-black">
              A Custom Software Development Company Focused on Business Outcomes
            </h1>

            {/* Description */}
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We design and build custom software, improve existing products, automate workflows with AI where it helps, and support teams as they scale.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/book-call" className="px-8 py-4 bg-button-gradient text-white text-sm rounded-button transition-colors flex items-center justify-center gap-2 font-medium">
                Book a Discovery Call
                <ArrowRight size={20} />
              </Link>
              <Link to="/how-we-work" className="px-8 py-4 border-2 border-gray-300 text-black text-sm rounded-md hover:bg-black hover:text-white hover:border-black transition-colors font-medium">
                How We Work
              </Link>
            </div>

            {/* Sub-text */}
            <p className="text-xs text-gray-500">
              You don't need a perfect brief. <span className='font-bold text-black'>You need the right questions</span>
            </p>
          </div>

          {/* Right Pattern - OLD STATIC GRID (commented out, can be toggled) */}
          {/* Uncomment below to use the old static grid instead of marquee */}
          {/*
          <div ref={patternRef} className="hidden lg:block relative">
            <div className="grid grid-cols-8 gap-0.5">
              {Array.from({ length: 64 }).map((_, i) => {
                const hasLogo = logoPositions.includes(i)
                const logoIndex = hasLogo ? logoPositions.indexOf(i) : -1
                
                return (
                  <div
                    key={i}
                    className={`pattern-square aspect-square bg-[#0e35721a] shadow-inset-custom ${
                      hasLogo ? 'flex items-center justify-center p-2' : ''
                    }`}
                  >
                    {hasLogo && (
                      <img
                        src={logos[logoIndex]}
                        alt={`Logo ${logoIndex + 1}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          */}

          {/* NEW MARQUEE ANIMATION - Moving Grid */}
          <div ref={marqueeViewportRef} className="col-span-5 hidden lg:block marquee-viewport">
            <div ref={marqueeTrackRef} className="marquee-track">
              {/* First set of cells - will be duplicated for infinite scroll */}
              {Array.from({ length: totalRows * cellsPerRow }).map((_, i) => {
                const hasLogo = marqueeLogoPositions.includes(i)
                const positionIndex = hasLogo ? marqueeLogoPositions.indexOf(i) : -1
                // Cycle through available logos when we have more positions than logos
                const logoIndex = hasLogo ? positionIndex % logos.length : -1
                const hasBlockFill = marqueeBlockFillPositions.includes(i)

                return (
                  <div key={`first-${i}`} className="marquee-cell">
                    {hasBlockFill && <div className="marquee-block-fill" />}
                    {hasLogo && logoIndex >= 0 && (
                      <div className="icon-card">
                        <img
                          src={logos[logoIndex]}
                          alt={`Logo ${logoIndex + 1}`}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Duplicate set for infinite scroll */}
              {Array.from({ length: totalRows * cellsPerRow }).map((_, i) => {
                const hasLogo = marqueeLogoPositions.includes(i)
                const positionIndex = hasLogo ? marqueeLogoPositions.indexOf(i) : -1
                // Cycle through available logos when we have more positions than logos
                const logoIndex = hasLogo ? positionIndex % logos.length : -1
                const hasBlockFill = marqueeBlockFillPositions.includes(i)

                return (
                  <div key={`second-${i}`} className="marquee-cell">
                    {hasBlockFill && <div className="marquee-block-fill" />}
                    {hasLogo && logoIndex >= 0 && (
                      <div className="icon-card">
                        <img
                          src={logos[logoIndex]}
                          alt={`Logo ${logoIndex + 1}`}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
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

