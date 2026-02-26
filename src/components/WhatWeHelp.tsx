import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import serviceImg1 from '../assets/images/service-img-1.svg'
import serviceImg2 from '../assets/images/service-img-2.svg'
import serviceImg3 from '../assets/images/service-img-3.svg'
import serviceImg4 from '../assets/images/service-img-4.svg'
import serviceImg5 from '../assets/images/service-img-5.svg'

const WhatWeHelp = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      if (sectionRef.current) {
        const cards = sectionRef.current.querySelectorAll('.service-card')

        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }

    initAnimations()
  }, [])

  const services = [
    {
      title: 'Scalable MVPs',
      description: 'Launch a product people can use, with clean UX and strong engineering.',
      link: 'Explore MVP Development',
      image: serviceImg1,
    },
    {
      title: 'Ship More Weekly',
      description: 'Add vetted developers who plug into your team fast and deliver weekly.',
      link: 'Explore Staff Augmentation',
      image: serviceImg2,
    },
    {
      title: 'AI, In Production',
      description: 'From prompt engineering to LLM integration, we ship practical AI solutions.',
      link: 'Explore AI Consulting',
      image: serviceImg3,
    },
    {
      title: 'Digitize Workflows',
      description: 'Build internal portals, dashboards, and integrations that save time daily.',
      link: 'Explore Workflow Digitization',
      image: serviceImg4,
    },
    {
      title: 'On-Demand DevOps',
      description: 'Monitoring, performance, and DevOps support to keep systems running smoothly.',
      link: 'Explore Support & Scale',
      image: serviceImg5,
    },
  ]

  return (
    <section ref={sectionRef} id="services" className="py-5 md:py-10 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Heading */}
        <div className="text-center mb-5 md:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-gray-100 rounded-sm mb-2">
            <span className="text-xs text-[#0E3572]">Build. Automate. Scale</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-normal text-center text-black">
            One team to build your MVP, stabilize it, and scale it as you grow
          </h2>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {services.map((service, index) => {
            // First 3 cards: col-span-4, Next 2 cards: col-span-6
            const colSpan = index < 3 ? 'md:col-span-4' : 'md:col-span-6'

            return (
              <div
                key={index}
                className={`service-card group p-4 lg:p-8 bg-[#FFFAFA] border border-gray-200 rounded-md transition-all duration-300 ${colSpan}`}
              >
                {/* Icon Placeholder */}
                <img src={service.image} alt={service.title} className="w-full h-[180px] lg:h-[220px] object-contain object-center mb-5" />

                <div className="space-y-2 lg:space-y-4">
                  {/* Content */}
                  <h3 className="text-base md:text-lg font-semibold text-black">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Link */}
                  <a
                    href="#"
                    className="uppercase inline-flex items-center gap-2 text-xs text-[#0E3572] font-medium hover:gap-3 transition-all group-hover:underline"
                  >
                    {service.link}
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhatWeHelp

