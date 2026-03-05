import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Kill all ScrollTrigger instances FIRST — this removes pin spacers and
    // restores the DOM tree to its original structure before React tries to
    // unmount the old page's components.  Without this, components that use
    // `pin: true` (e.g. WhoWeWorkWith) crash with "removeChild" because
    // ScrollTrigger reparents pinned elements inside spacer wrappers.
    ScrollTrigger.killAll()

    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}