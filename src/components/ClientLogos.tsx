import { useEffect, useRef } from 'react'

const ClientLogos = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      if (sectionRef.current) {
        const logos = sectionRef.current.querySelectorAll('.logo-item')

        gsap.fromTo(
          logos,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }

    initAnimations()
  }, [])

  const logos = Array.from({ length: 9 }, (_, i) => `Logo ${i + 1}`)

  return (
    <section ref={sectionRef} className="pb-5 md:pb-10 bg-white relative">
      {/* Separator Pattern Border at top - infinite repeating pattern */}
      <div className="separator-pattern absolute top-0 left-0 right-0"></div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 space-y-5">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-normal text-black">
            Chosen by teams that ship
          </h2>
        </div>

        {/* Logo Grid */}
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-1">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="w-[200px] logo-item flex items-center justify-center h-16 md:h-20"
            >
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                {logo}
              </div>
            </div>
          ))}
        </div>

        <p className="text-gray-600 text-center text-sm">
          MVPs, workflow tools, AI automation, and long-term support.
        </p>
      </div>
    </section>
  )
}

export default ClientLogos

