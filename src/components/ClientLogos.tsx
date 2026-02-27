import { useEffect, useRef } from 'react'
import alDentalStudio from "../assets/images/client-logos/aldentalstudio.svg"
import athleticSolutions from "../assets/images/client-logos/athleticsolutions.svg"
import cazeAI from "../assets/images/client-logos/cazeai.svg"
import coconutFilms from "../assets/images/client-logos/coconutfilms.svg"
import danceplace from "../assets/images/client-logos/danceplace.svg"
import eggholic from "../assets/images/client-logos/eggholic.svg"
import emilyWeldCollins from "../assets/images/client-logos/emilyweldcollins.svg"
import eShine from "../assets/images/client-logos/eshine.svg"
import froodelite from "../assets/images/client-logos/froodelite.svg"
import intention from "../assets/images/client-logos/intention.svg"
import ketoVitals from "../assets/images/client-logos/ketovitals.svg"
import kidDental from "../assets/images/client-logos/kiddental.svg"
import losComales from "../assets/images/client-logos/loscomales.svg"
import lrt from "../assets/images/client-logos/lrt.svg"
import modifox from "../assets/images/client-logos/modifox.svg"
import momipop from "../assets/images/client-logos/momipop.svg"
import okButFirst from "../assets/images/client-logos/okbutfirstcoffee.svg"
import pharmaLife from "../assets/images/client-logos/pharmalife.svg"
import ppc from "../assets/images/client-logos/ppc.svg"
import rankscience from "../assets/images/client-logos/rankscience.svg"
import rinseroo from "../assets/images/client-logos/rinseroo.svg"
import silberstern from "../assets/images/client-logos/silberstern.svg"
import skylarkAI from "../assets/images/client-logos/skylarkai.svg"
import smileyFacesDental from "../assets/images/client-logos/smileyfacesdental.svg"
import sweetCircle from "../assets/images/client-logos/sweetcircle.svg"
import tacoPros from "../assets/images/client-logos/tacopros.svg"
import takeoutKit from "../assets/images/client-logos/takeoutkit.svg"
import tarotTeas from "../assets/images/client-logos/tarotteas.svg"
import uppTeam from "../assets/images/client-logos/uppteam.svg"
import voiceApps from "../assets/images/client-logos/voiceapps.svg"

interface LogoItem {
  src: string
  alt: string
  href: string
  /** optional: render as CSS mask (for navy-tinted logos) */
  isMask?: boolean
}

const LOGOS: LogoItem[] = [
  { src: danceplace, alt: "Danceplace", href: "https://danceplace.com/" },
  { src: okButFirst, alt: "Ok But First", href: "https://okbutfirst.com/" },
  { src: rankscience, alt: "RankScience", href: "https://www.rankscience.com/" },
  { src: eggholic, alt: "Eggholic", href: "https://eggholic.com/" },
  { src: intention, alt: "Intention", href: "https://intentionfashion.com/" },
  { src: uppTeam, alt: "UPP Team", href: "https://www.uppteam.com/" },
  { src: tacoPros, alt: "Taco Pros", href: "https://tacopros.com/" },
  { src: sweetCircle, alt: "Sweet Circle", href: "https://sweetcircle.com/" },
  { src: losComales, alt: "Los Comales", href: "https://www.loscomales.com/" },
  { src: ketoVitals, alt: "Keto Vitals", href: "https://www.ketovitals.com/" },
  { src: tarotTeas, alt: "Tarot Teas", href: "https://tarotteas.com/" },
  { src: emilyWeldCollins, alt: "Emily Weld Collins", href: "https://emilyweldcollins.com/" },
  { src: alDentalStudio, alt: "AL Dental Studio", href: "https://aldentalstudio.com/" },
  { src: skylarkAI, alt: "Skylark AI", href: "https://skylarkai.com/", isMask: true },
  { src: cazeAI, alt: "Caze AI", href: "https://napsys.ai/", isMask: true },
  { src: coconutFilms, alt: "Coconut Films", href: "https://www.coconutfilms.co.in/" },
  { src: ppc, alt: "Pitch Perfekt Collective", href: "https://pitchperfektcollective.com/" },
  { src: athleticSolutions, alt: "Athletic Solutions", href: "https://athsolutions.shop/" },
  { src: modifox, alt: "Modifox", href: "https://modifox.com/" },
  { src: pharmaLife, alt: "Pharma Life", href: "https://nupharmalife.com/" },
  { src: froodelite, alt: "Froodelite", href: "https://froodelite.com/" },
  { src: kidDental, alt: "My First Dentist", href: "https://www.myfirstdentistny.com/" },
  { src: smileyFacesDental, alt: "Smiley Faces Dental", href: "https://smileyfacesdental.com/" },
  { src: rinseroo, alt: "Rinseroo", href: "https://rinseroo.com/" },
  { src: silberstern, alt: "Silberstern", href: "https://www.silberstern.tv/" },
  { src: takeoutKit, alt: "Takeout Kit", href: "https://takeoutkit.com/" },
  { src: lrt, alt: "Little Rad Things", href: "https://littleradthings.com/" },
  { src: eShine, alt: "Eshine Store", href: "http://eshinestore.com/" },
  { src: voiceApps, alt: "Voice Apps", href: "https://voiceapps.com/" },
  { src: momipop, alt: "Momipop", href: "https://momipop.co/" },
]

const ClientLogos = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: gsap.Context

    const init = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Fade-in
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
            },
          }
        )

        // ✅ helper for perfect marquee
        const createMarquee = (
          el: HTMLElement | null,
          direction = 1
        ) => {
          if (!el) return // ✅ prevents runtime & TS error

          const distance = el.scrollWidth / 2
          const speed = 60
          const duration = distance / speed

          gsap.fromTo(
            el,
            { x: direction === 1 ? 0 : -distance },
            {
              x: direction === 1 ? -distance : 0,
              duration,
              ease: "none",
              repeat: -1,
            }
          )
        }

        createMarquee(track1Ref.current, 1)  // left
        createMarquee(track2Ref.current, -1) // right
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  // Split logos into two rows for the two tracks
  const row1 = LOGOS.slice(0, 10)
  const row2 = LOGOS.slice(10)

  const LogoCell = ({ logo }: { logo: LogoItem }) => (
    <a
      href={logo.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-[180px] md:w-[200px] h-[62px] flex items-center justify-center
                 bg-[rgba(14,53,114,0.05)] hover:bg-[rgba(14,53,114,0.09)]
                 transition-colors duration-200 rounded-sm"
      aria-label={logo.alt}
    >
      {logo.isMask ? (
        // Navy-tinted logos use CSS mask so the colour matches Figma
        <div
          className="w-[96px] h-[28px]"
          style={{
            backgroundColor: 'rgba(14,53,114,0.6)',
            maskImage: `url('${logo.src}')`,
            WebkitMaskImage: `url('${logo.src}')`,
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
          }}
        />
      ) : (
        <img
          src={logo.src}
          alt={logo.alt}
          className="w-[130px] h-[44px] object-contain"
          loading="lazy"
        />
      )}
    </a>
  )

  return (
    <section ref={sectionRef} className="pb-5 md:pb-10 bg-white relative overflow-hidden">
      {/* Separator Pattern Border at top */}
      <div className="separator-pattern absolute top-0 left-0 right-0" />

      <div className="">
        {/* Heading */}
        <div className="text-center px-5 pt-8 md:pt-10 mb-5">
          <h2 className="text-2xl md:text-3xl font-normal text-black">
            Chosen by teams that ship
          </h2>
        </div>

        {/* ── Marquee Row 1 — scrolls left ── */}
        <div className="overflow-hidden w-full mb-1">
          <div
            ref={track1Ref}
            className="flex gap-1 w-max"
            style={{ willChange: 'transform' }}
          >
            {/* Duplicate for seamless loop */}
            {[...row1, ...row1].map((logo, i) => (
              <LogoCell key={`r1-${i}`} logo={logo} />
            ))}
          </div>
        </div>

        {/* ── Marquee Row 2 — scrolls right ── */}
        <div className="overflow-hidden w-full">
          <div
            ref={track2Ref}
            className="flex gap-1 w-max"
            style={{ willChange: 'transform' }}
          >
            {/* Duplicate for seamless loop */}
            {[...row2, ...row2].map((logo, i) => (
              <LogoCell key={`r2-${i}`} logo={logo} />
            ))}
          </div>
        </div>

        {/* Sub-copy */}
        <p className="text-gray-500 text-center text-sm px-5 mt-5">
          MVPs, workflow tools, AI automation, and long-term support.
        </p>
      </div>
    </section>
  )
}

export default ClientLogos
