import { useEffect } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SeparatorPattern } from '../components/SeparatorPattern';
import { ServiceCTASection } from '../components/ServiceCTASection';
import { RightFit } from '../components/RightFit';
import { ServiceScope } from '../components/ServiceScope';
import heroImg from '../assets/images/staff-augmentation-hero.svg';
import iconFrontend from '../assets/images/team-roles-section/fronted-dev.svg';
import iconBackend from '../assets/images/team-roles-section/backend-dev.svg';
import iconMobile from '../assets/images/team-roles-section/mobile-dev.svg';
import iconDevops from '../assets/images/team-roles-section/devops-engine.svg';
import iconQA from '../assets/images/team-roles-section/qa-engine.svg';
import iconAI from '../assets/images/team-roles-section/ai-automate-engine.svg';
import { FAQChat } from '../components/FAQChat';
import { BlogInsights } from '../components/BlogInsights';
import ClientLogos from '../components/ClientLogos';
import { Hero } from '../components/ServicesHero';
import Testimonials from '../components/Testimonials';
import { EngagementModels } from '../components/EngagementModels';
import { QualityGuarantee } from '../components/QualityGuarantee';
import { StaffAugmentationPageSEO } from '../components/SEO/StaffAugmentationPageSEO';

const StaffAug: React.FC = () => {
    useEffect(() => {
        document.title = "Staff Augmentation Company | Dedicated Developers";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Netizens provides on-demand engineering capacity: dedicated developers, team extension, pods, and a 2-week trial so you can ship faster with confidence.");
        }
    }, []);

    return (
        <div className="bg-[#FFFAFA] min-h-screen text-black font-sans selection:bg-black selection:text-white">
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Service', href: '/services' },
                    { label: 'Staff Augmentation' }
                ]}
                className="pt-[96px] max-w-7xl mx-auto px-4"
            />
            <main>
                <StaffAugmentationPageSEO />
                <Hero
                    badge="Scale delivery. Not headcount."
                    heading="A Staff Augmentation Company For Teams That Need Output Now"
                    description="Add vetted engineers or full pods in days, not weeks, with clear ownership, sprint cadence, and an easy trial start."
                    image={heroImg}
                    imageAlt="Staff Augmentation - Scale Your Team"
                />
                <ClientLogos />
                <RightFit
                    theme="light"
                    badge="Save the back-and-forth"
                    heading="The Best Fit Teams for Staff Augmentation"
                    goodFitItems={[
                        "You're a CTO or Engineering Manager who needs extra delivery capacity",
                        "Your team is blocked by hiring delays, attrition, or growing backlogs",
                        "You want engineers who plug directly into your sprints and tools",
                        "You need reliable execution and ownership, not freelancers",
                        "You want the flexibility to scale up or down without hiring risk",
                    ]}
                    notFitItems={[
                        "You're only looking for very short-term or task-based help",
                        "You don't have an internal product or engineering owner",
                        "You're optimizing purely for the lowest possible cost",
                        "You want external teams working in isolation from your process",
                        "You need design-only or advisory support without execution",
                    ]}
                />
                <SeparatorPattern />
                <EngagementModels
                    badge="Delivery-ready engineers"
                    heading="Dedicated developers with clear ownership and delivery"
                    cards={[
                        {
                            label: "Engagement",
                            title: "Dedicated Developers",
                            tags: ["Full-time", "Part-time"],
                            description: "Add vetted engineers in days, not weeks, and keep sprint ownership with you.",
                            color: "yellow",
                        },
                        {
                            label: "Engagement",
                            title: "Team Extension",
                            tags: ["Embedded engineers"],
                            description: "Embedded engineers who work inside your tools, sprints, and standards.",
                            color: "cyan",
                        },
                        {
                            label: "Engagement",
                            title: "Paid Trial",
                            tags: ["2-week trial"],
                            description: "Try us for 2 weeks. Continue only if quality and velocity match.",
                            color: "yellow",
                        },
                        {
                            label: "Engagement",
                            title: "Pod Model",
                            tags: ["Tech Lead", "Devs", "QA"],
                            description: "Ship faster with a pod that owns execution end-to-end.",
                            color: "cyan",
                        },
                    ]}
                />
                
                <ServiceScope
                    badge="Your team, plus our engineers"
                    heading="Roles we can add to your team"
                    cards={[
                        { icon: iconFrontend, title: "Frontend Developers", description: "Build fast, clean UIs that users actually enjoy." },
                        { icon: iconBackend, title: "Backend Engineers", description: "Design scalable APIs, systems, and business logic." },
                        { icon: iconMobile, title: "Mobile Developers", description: "Ship iOS and Android apps with smooth performance." },
                        { icon: iconDevops, title: "DevOps Engineers", description: "Set up reliable CI/CD, cloud, monitoring, and releases." },
                        { icon: iconQA, title: "QA Engineers", description: "Catch bugs early and ship with confidence every sprint." },
                        { icon: iconAI, title: "AI / Automation Engineers", description: "Add practical AI features and workflow automation when it fits." },
                    ]}
                    ctaCards={[
                        { title: "Workflow Automation", description: "Streamline operations with systems that talk to each other and reduce human handling.", ctaLabel: "Explore Workflow Digitization" },
                        { title: "Production Support", description: "Post-launch engineering that keeps releases clean, systems stable, and teams unblocked.", ctaLabel: "Explore Support & Scale" },
                    ]}
                    footerText="You get the right roles for your goals, not a fixed bundle."
                />
                <QualityGuarantee />
                <SeparatorPattern />
                <Testimonials />
                <FAQChat faqs={[
                    { question: "How fast can we onboard developers?", answer: "Most teams start in 1–2 weeks. We align on role, stack, timezone overlap, and your sprint cadence, then onboard into your tools and process with clear first-week deliverables." },
                    { question: "Is this staff augmentation or team extension?", answer: "Both. You can hire dedicated developers (full/part-time), use team extension (embedded engineers inside your team), or choose a pod model (lead + devs + QA) when you want output ownership." },
                    { question: "Can we try engineers before committing long-term?", answer: "Yes. We offer a 2-week paid trial so you can validate quality, communication, and velocity before you scale the engagement." },
                    { question: "Who manages delivery: us or you?", answer: "You can choose. If you have a PM/EM, our engineers plug into your sprints. If you need more ownership, we can provide a tech lead/pod and manage delivery outcomes with weekly reporting." },
                    { question: "What if an engineer isn't the right fit?", answer: "We replace quickly. If the fit or performance isn't working, we swap with minimal disruption and keep momentum on your roadmap." },
                    { question: "How do pricing and engagement models work?", answer: "We support part-time or full-time, and you can run it as dedicated individuals, team extension, or a pod. Pricing is straightforward and tied to the engagement type, duration, and seniority mix." },
                ]} />
                <BlogInsights />
                <SeparatorPattern />
                <ServiceCTASection
                    heading={<>Scale your team without <br className="hidden sm:block" /> the hiring overhead.</>}
                    description="Add vetted engineers to your team in days, not months. No recruitment delays, no ramp-up friction."
                    subtext="Tell us the skill gap. We'll match the right engineers."
                />
            </main>
        </div>
    );
};

export default StaffAug;
