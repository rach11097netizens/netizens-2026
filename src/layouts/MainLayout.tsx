import { Outlet, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'

const MainLayout = () => {
  const location = useLocation()

  useLayoutEffect(() => {
    // CRITICAL FIX: React Router unmounts the old page's components inside <Outlet />
    // immediately when the location changes. If any component used `pin: true` in GSAP,
    // the DOM was reparented. React throws "Failed to execute 'removeChild'" and crashes.
    // By calling killAll() here in a synchronously blocking useLayoutEffect, we force
    // GSAP to unwrap all pinned elements and restore the original DOM tree BEFORE
    // React's reconciler attempts to unmount them.
    ScrollTrigger.killAll()
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout

