import Hero from '../components/Hero'
import ClientLogos from '../components/ClientLogos'
import WhatWeHelp from '../components/WhatWeHelp'
import WhoWeWorkWith from '../components/WhoWeWorkWith'
import HowWeEngage from '../components/HowWeEngage'
import ProofOverPitches from '../components/ProofOverPitches'
import ForBuildersSection from '../components/ForBuildersSection'
import Testimonials from '../components/Testimonials'
import { FAQChat } from '../components/FAQChat'
import { BlogInsights } from '../components/BlogInsights'
import { CTASection } from '../components/CTASection'

const HomePage = () => {
  return (
    <>
      <Hero />
      <ClientLogos />
      <WhatWeHelp />
      <WhoWeWorkWith />
      <HowWeEngage />
      <ProofOverPitches />
      <ForBuildersSection />
      <Testimonials />
      <FAQChat faqs={[
        { question: "Do you work with early-stage startups?", answer: "Yes. We work with early-stage founders, bootstrapped teams, and funded startups. What matters most is having a real problem to solve and a clear goal for the MVP." },
        { question: "Can we start small before committing long-term?", answer: "Absolutely. Many clients start with a short discovery sprint, prototype, or focused MVP build before moving into longer-term development." },
        { question: "How long does MVP development usually take?", answer: "Most MVPs take 6–10 weeks, depending on scope, integrations, and feedback cycles. We focus on shipping a usable product fast, not overbuilding." },
        { question: "Do you help decide what features go into the MVP?", answer: "Yes. MVP strategy and feature prioritization are core to our process. We help you focus on what validates the idea and avoid unnecessary features." },
        { question: "Do you handle both design and development?", answer: "Yes. We provide end-to-end MVP development, including UX/UI design, frontend, backend, and deployment." },
        { question: "What happens after the MVP is launched?", answer: "After launch, we help with V2 planning, scaling, performance improvements, and ongoing support or team extension as needed." },
      ]} />
      <BlogInsights />
      <CTASection />
    </>
  )
}

export default HomePage

