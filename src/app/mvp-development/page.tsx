import { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import iconRoadmap from "@/assets/images/proto-to-prod-icons/mvp-roadmap.svg";
import iconUxDesign from "@/assets/images/proto-to-prod-icons/mvp-ux-design.svg";
import iconFullstack from "@/assets/images/proto-to-prod-icons/full-stack.svg";
import iconRapidIterate from "@/assets/images/proto-to-prod-icons/rapid-iterate.svg";
import iconV2Ready from "@/assets/images/proto-to-prod-icons/v2-readiness.svg";
import iconOngoingImprove from "@/assets/images/proto-to-prod-icons/on-going-improve.svg";
import { BlogInsights } from '@/components/BlogInsights';
import { FAQChat } from '@/components/FAQChat';
import heroImg from '@/assets/images/product-developement.svg';
import { Hero } from '@/components/ServicesHero';
import { SeparatorPattern } from '@/components/SeparatorPattern';
import ClientLogos from '@/components/ClientLogos';
import { MvpProblem } from '@/components/mvp-problem';
import { ServiceScope } from '@/components/ServiceScope';
import { ServiceCTASection } from '@/components/ServiceCTASection';
import Testimonials from '@/components/Testimonials';
import { BuildToLaunch } from '@/components/BuildToLaunch';
import { RightFit } from '@/components/RightFit';
import { TechStack } from '@/components/TechStack';

export const metadata: Metadata = {
    title: "MVP Development Company | From Idea to Scalable Product",
    description: "Launch your MVP faster without cutting corners. We deliver scalable MVP development services for startups and SaaS teams.",
    keywords: ['MVP development company'],
};

// FAQ schema for SEO
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Do you work with early-stage startups?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We work with early-stage founders, bootstrapped teams, and funded startups. What matters most is having a real problem to solve and a clear goal for the MVP."
            }
        },
        {
            "@type": "Question",
            "name": "Can we start small before committing long-term?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Many clients start with a short discovery sprint, prototype, or focused MVP build before moving into longer-term development."
            }
        },
        {
            "@type": "Question",
            "name": "How long does MVP development usually take?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most MVPs take 6–10 weeks, depending on scope, integrations, and feedback cycles. We focus on shipping a usable product fast, not overbuilding."
            }
        },
        {
            "@type": "Question",
            "name": "Do you help decide what features go into the MVP?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. MVP strategy and feature prioritization are core to our process. We help you focus on what validates the idea and avoid unnecessary features."
            }
        },
        {
            "@type": "Question",
            "name": "Do you handle both design and development?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We provide end-to-end MVP development, including UX/UI design, frontend, backend, and deployment."
            }
        },
        {
            "@type": "Question",
            "name": "What happens after the MVP is launched?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "After launch, we help with V2 planning, scaling, performance improvements, and ongoing support or team extension as needed."
            }
        }
    ]
}

// ── Uncomment this once the page is live and you have the final URL ──────────
// const serviceSchema = {
//   "@context": "https://schema.org",
//   "@type": "Service",
//   "@id": "", // ← add final page URL here when live
//   "name": "Product Development",
//   "description": "Netizens Technologies offers scalable product development and MVP development services...",
//   "provider": {
//     "@type": "Organization",
//     "name": "Netizens Technologies",
//     "url": "https://netizenstechnologies.com/",
//     "logo": "https://netizenstechnologies.com/wp-content/uploads/2024/07/logo.svg"
//   },
//   "areaServed": {
//     "@type": "Country",
//     "name": "India"
//   },
//   "serviceType": "MVP Development, Custom software development",
//   "audience": {
//     "@type": "Audience",
//     "audienceType": "Startup Owners"
//   }
// }

export default function MvpDevPage() {
    return (
        <div className="bg-[#FFFAFA] min-h-screen text-black font-sans selection:bg-black selection:text-white">
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Services', href: '/services' },
                    { label: 'Product Development' }
                ]}
                className="pt-[96px] max-w-7xl mx-auto px-4"
            />
            <main>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />

                {/* Uncomment the line below once the page is live */}
                {/* <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} /> */}

                <Hero
                    badge="Build → Validate → Scale"
                    heading="An MVP Development Company Built For Speed And Scale"
                    description="From rapid prototyping to production-ready MVPs, we build SaaS products that validate fast and scale without rewrites."
                    image={heroImg}
                    imageAlt="MVP Development Process"
                />
                <ClientLogos />
                <MvpProblem />
                <SeparatorPattern />
                <ServiceScope
                    badge="From prototype to production."
                    heading="The scope of our MVP development services"
                    cards={[
                        { icon: iconRoadmap, title: "MVP Feature Prioritization & Roadmap", description: "Decide what to build first and what to cut so your MVP stays lean and launchable." },
                        { icon: iconUxDesign, title: "MVP UX Design", description: "Simple, usable UI that reduces drop-offs and improves adoption from day one." },
                        { icon: iconFullstack, title: "Full-Stack Build", description: "Web and mobile MVP development with reliable engineering and clean code practices." },
                        { icon: iconRapidIterate, title: "Rapid Iterations", description: "Ship in short cycles, learn from feedback, and improve without rewrites." },
                        { icon: iconV2Ready, title: "V2 Readiness", description: "Prepare your MVP for scale: roadmap, architecture improvements, and tech upgrades." },
                        { icon: iconOngoingImprove, title: "Ongoing Improvements", description: "Support after launch: bug fixes, enhancements, monitoring, and stability work." },
                    ]}
                    ctaCards={[
                        { title: "Scale Your Team", description: "Add vetted engineers fast to ship V2 without hiring delays.", ctaLabel: "Explore Staff Augmentation" },
                        { title: "On-Demand Support", description: "Keep uptime high while you ship updates, handle traffic, and reduce tech debt.", ctaLabel: "Explore Support & Scale" },
                    ]}
                />
                <BuildToLaunch />
                <SeparatorPattern />
                <RightFit
                    theme="dark"
                    badge=""
                    heading="Is This the Right MVP Build for You?"
                    goodFitItems={[
                        "You're a founder or operator solving a real, validated problem",
                        "You want to launch fast, but not at the cost of quality or scalability",
                        "You care about what to build first, not building everything",
                        "You plan to iterate, improve, and scale after launch",
                        "You want a product team that thinks with you, not just executes tickets",
                    ]}
                    notFitItems={[
                        "You only need a clickable or visual-only prototype",
                        "You're looking for the cheapest possible build",
                        "You want to outsource thinking and just hand over specs",
                        "You're not planning to maintain or scale the product post-launch",
                    ]}
                />
                <SeparatorPattern />
                <Testimonials />
                <TechStack />
                <FAQChat faqs={[
                    { question: "Do you work with early-stage startups?", answer: "Yes. We work with early-stage founders, bootstrapped teams, and funded startups. What matters most is having a real problem to solve and a clear goal for the MVP." },
                    { question: "Can we start small before committing long-term?", answer: "Absolutely. Many clients start with a short discovery sprint, prototype, or focused MVP build before moving into longer-term development." },
                    { question: "How long does MVP development usually take?", answer: "Most MVPs take 6–10 weeks, depending on scope, integrations, and feedback cycles. We focus on shipping a usable product fast, not overbuilding." },
                    { question: "Do you help decide what features go into the MVP?", answer: "Yes. MVP strategy and feature prioritization are core to our process. We help you focus on what validates the idea and avoid unnecessary features." },
                    { question: "Do you handle both design and development?", answer: "Yes. We provide end-to-end MVP development, including UX/UI design, frontend, backend, and deployment." },
                    { question: "What happens after the MVP is launched?", answer: "After launch, we help with V2 planning, scaling, performance improvements, and ongoing support or team extension as needed." },
                ]} />
                <BlogInsights />
                <SeparatorPattern />
                <ServiceCTASection
                    heading={<>Build, launch, and <br className="hidden sm:block" /> validate your MVP.</>}
                    description="We help you ship an MVP that users can actually use, test, and pay for."
                    subtext="Bring the idea. We'll help shape the execution."
                />
            </main>
        </div>
    );
}
