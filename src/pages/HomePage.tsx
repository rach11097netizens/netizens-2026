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
import { ServiceCTASection } from '../components/ServiceCTASection'
import { HomePageSEO } from '../components/SEO/HomePageSEO'

const HomePage = () => {
  return (
    <>
      <HomePageSEO />
      <Hero />
      <ClientLogos />
      <WhatWeHelp />
      <WhoWeWorkWith />
      <HowWeEngage />
      <ProofOverPitches />
      <ForBuildersSection />
      <Testimonials />
      <FAQChat faqs={[
        { question: "Do you work with startups or enterprises?", answer: "Yes. We work with early-stage startups, growing SaaS teams, and enterprise teams. We adapt the team, process, and engagement model based on your timeline, scope, and internal owners." },
        { question: "Can we start small before committing long-term?", answer: " Absolutely. Many clients start with a sprint or a short assessment. You'll get a clear plan, a working deliverable, and confidence before you scale the engagement." },
        { question: "Do you provide ongoing support after launch?", answer: "Yes. Our Support & Scale option covers bug fixes, improvements, performance, security checks, and ongoing delivery. It’s for teams that want reliable support without hiring a full in-house team." },
        { question: "Do you help with AI and automation?", answer: "Yes. We help identify where AI will actually save time, then build and integrate it into your workflows. This can include AI workflow automation, LLM integration, and internal tools that reduce manual work." },
      ]} />
      <BlogInsights />
      <ServiceCTASection
        heading={<>Talk to a custom software development company that moves fast</>}
        description="Share what you’re building. We’ll recommend the best approach: MVP, AI automation, workflow digitization, staff augmentation, or support."
        ctaLabel="Book a Discovery Call"
        subtext="No sales script. Just a practical plan."
      />
    </>
  )
}

export default HomePage

