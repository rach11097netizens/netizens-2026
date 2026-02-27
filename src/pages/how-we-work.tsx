import { useEffect } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SeparatorPattern } from '../components/SeparatorPattern';
import { ServiceCTASection } from '../components/ServiceCTASection';
import { FAQChat } from '../components/FAQChat';
import { FlexibleDeliverySection } from '../components/FlexibleDeliverySection';
import { OurPromiseSection } from '../components/OurPromiseSection';
import { PartnershipSection } from '../components/PartnershipSection';
import { WhereToStartSection } from '../components/WhereToStartSection';
import { ServiceModelsSection } from '../components/ServiceModelsSection';
import heroImg from '../assets/images/how-we-work-hero-img.svg';
import { Hero } from '../components/ServicesHero';
import { HowWeWorkPageSEO } from '../components/SEO/HowWeWorkPageSEO';
const HowWeWork: React.FC = () => {
    useEffect(() => {
        document.title = "How Netizens Delivers: Agile Sprints, Projects & Retainer Teams";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "From quick sprints to fixed-scope projects to ongoing retainers, Netizens delivers with clear ownership, transparent updates, and business outcomes.");
        }
    }, []);

    return (
        <div className="bg-[#FFFAFA] min-h-screen text-black font-sans selection:bg-black selection:text-white">
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Service', href: '/services' },
                    { label: 'How We Work' }
                ]}
                className="pt-[96px] max-w-7xl mx-auto px-4"
            />
            <main>
                <HowWeWorkPageSEO />
                <Hero
                    badge="How We Deliver"
                    heading="Agile Sprints When You Need Speed. Retainers When You Need Stability."
                    description="From agile development sprints to long-term retainers, we deliver with predictable cadence, transparent comms, and accountable execution."
                    image={heroImg}
                    imageAlt="How We Work"
                />
                <SeparatorPattern />
                <FlexibleDeliverySection />
                <OurPromiseSection />
                <SeparatorPattern />
                <PartnershipSection />
                <WhereToStartSection />
                <SeparatorPattern />
                <ServiceModelsSection />
                <FAQChat faqs={[
                    { question: "How do I know which engagement model is right for me?", answer: "If your scope is evolving or you need fast validation, start with sprint-based delivery. If your scope is clearly defined, project-based works best. If you need ongoing delivery capacity, a retainer model is the right fit. We'll guide you through this in one conversation." },
                    { question: "Can I switch models later?", answer: "Yes. Many clients start with sprints to validate direction, then move to project-based or retainer once priorities stabilize. The model adapts as your needs evolve." },
                    { question: "What's the difference between project-based and retainer?", answer: "Project-based delivery is fixed-scope, milestone-driven work with defined timelines. Retainer is ongoing delivery capacity with evolving priorities, roadmap alignment, and SLA-backed responsiveness." },
                    { question: "How transparent is progress tracking?", answer: "You get shared visibility into sprint plans, milestones, roadmaps, and delivery status. No black box. No \"we'll update you next month.\"" },
                    { question: "Do you provide a dedicated team?", answer: "Yes. Depending on the model, you'll have a clearly assigned delivery lead and engineering team aligned to your goals. Ownership is explicit, not implied." },
                    { question: "What if my priorities change mid-engagement?", answer: "In sprint and retainer models, priorities can shift between cycles. In project-based engagements, changes are managed through structured scope review to protect timelines and budgets." },
                ]} theme='light' />
                <SeparatorPattern />
                <ServiceCTASection
                    heading={<>Not sure which model fits?<br />We’ll make it obvious.</>}
                    description="In one call, we’ll map your scope to a sprint, project, or retainer and outline how delivery would work."
                    ctaLabel="Book a Discovery Call"
                    subtext="Leave with a recommendation, not a proposal."
                />
            </main>
        </div>
    );
};

export default HowWeWork;
