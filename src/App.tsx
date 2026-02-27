import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import MvpDev from './pages/mvp-dev'
import StaffAug from './pages/staff-aug'
import SupportScale from './pages/support-scale'
import WorkflowDigit from './pages/workflow-digit'
import AiAutomate from './pages/ai-automate'
import HowWeWork from './pages/how-we-work'
import BookCall from './pages/book-call'
import AboutUs from './pages/about-us'
import { ScrollToTop } from './components/ScrollToTop'
import FAQpage from './pages/faq'


function App() {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    const initScrollAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)
    }

    initScrollAnimations()
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* All pages share Navbar + Footer via MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mvp-development" element={<MvpDev />} />
          <Route path="/staff-augmentation" element={<StaffAug />} />
          <Route path="/support-and-scale" element={<SupportScale />} />
          <Route path="/workflow-digitization" element={<WorkflowDigit />} />
          <Route path="/ai-consulting" element={<AiAutomate />} />
          <Route path="/how-we-work" element={<HowWeWork />} />
          <Route path="/book-call" element={<BookCall />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faq" element={<FAQpage />} />
        </Route>

        {/* Pages without Navbar/Footer (e.g. 404) can go outside the layout:
        <Route path="*" element={<NotFoundPage />} />
        */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
