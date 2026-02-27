import { useEffect } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import heroImg from '../assets/images/support-scale-hero-image.svg';
import { SeparatorPattern } from '../components/SeparatorPattern';
import { ServiceCTASection } from '../components/ServiceCTASection';
import { BlogInsights } from '../components/BlogInsights';
import { FAQChat } from '../components/FAQChat';
import { RightFit } from '../components/RightFit';
import { ServiceScope } from '../components/ServiceScope';
import imgSLA from '../assets/images/delivery-model/sla-based-illustration.svg';
import imgRoadmap from '../assets/images/delivery-model/monthly-roadmap-illustration.svg';
import imgResponse from '../assets/images/delivery-model/predictable-response-time-illustrations.svg';
import iconMaintenance from '../assets/images/software-maintanance-devops/maintain-bug-fix.svg';
import iconSLA from '../assets/images/software-maintanance-devops/sla-app.svg';
import iconPerformance from '../assets/images/software-maintanance-devops/speed-opt.svg';
import iconDevops from '../assets/images/software-maintanance-devops/devops-monitor.svg';
import iconSecurity from '../assets/images/software-maintanance-devops/secure-patching.svg';
import iconCICD from '../assets/images/software-maintanance-devops/continue-delivery.svg';
import { Hero } from '../components/ServicesHero';
import ClientLogos from '../components/ClientLogos';
import Testimonials from '../components/Testimonials';
import { DeliveryModel } from '../components/DeliveryModel';
import { ProductPartner } from '../components/ProductPartner';
import { SupportAndScalePageSEO } from '../components/SEO/SupportAndScalePageSEO';

const SupportScale: React.FC = () => {
    useEffect(() => {
        document.title = "Post-Launch Support & DevOps for Scaling Products | Netizens";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Structured support retainers for production apps: SLAs, DevOps monitoring, performance optimization, security hardening, and continuous delivery improvements.");
        }
    }, []);

    return (
        <div className="bg-[#FFFAFA] min-h-screen text-black font-sans selection:bg-black selection:text-white">
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Service', href: '/services' },
                    { label: 'Support & Scale' }
                ]}
                className="pt-[96px] max-w-7xl mx-auto px-4"
            />
            <main>
                <SupportAndScalePageSEO />
                <Hero
                    badge="Long-Term Product Reliability"
                    heading="Software Maintenance Services For Products That Can't Go Down"
                    description="We handle maintenance, SLAs, cloud infrastructure, CI/CD, and long-term code health — so your team can focus on roadmap, not firefighting."
                    image={heroImg}
                    imageAlt="Support & Scale - Software Maintenance Services"
                />
                <SeparatorPattern />
                <ClientLogos />
                <RightFit
                    theme="light"
                    badge="Quick Fit Check"
                    heading="For products that can't afford downtime"
                    goodFitItems={[
                        "You have a live product and need it stable, fast, and reliable in production",
                        "You want predictable support with SLAs, response times, and clear ownership",
                        "You're dealing with bugs, performance issues, or recurring incidents",
                        "You need DevOps monitoring, CI/CD improvements, and release confidence",
                        "You want to reduce tech debt while still shipping improvements",
                        "You need a partner who can maintain, enhance, and hand off cleanly to your team",
                    ]}
                    notFitItems={[
                        "You only need a one time fix or a small patch",
                        "You don't have a production system yet (pre launch / prototype stage)",
                        "You want ad hoc help without process, SLAs, or accountability",
                        "You're optimizing purely for lowest cost, not reliability and ownership",
                        "You can't provide access to code, logs, infra, or stakeholders",
                        "You're not ready to invest in monitoring, CI/CD, or maintainable engineering practices",
                    ]}
                />
                <ServiceScope
                    badge="Software Maintenance & DevOps"
                    heading="Maintenance, DevOps & Continuous Improvements"
                    cards={[
                        { icon: iconMaintenance, title: "Maintenance & Bug Fixes", description: "Ongoing software maintenance services to keep your product stable, supported, and release-ready, without backlog chaos." },
                        { icon: iconSLA, title: "SLA-Based Application Support", description: "Predictable application support services with agreed response times for incidents, production issues, and urgent fixes." },
                        { icon: iconPerformance, title: "Performance & Speed Optimization", description: "Identify bottlenecks, improve load times, and tune APIs, queries, and infra so the product stays fast as usage grows." },
                        { icon: iconDevops, title: "DevOps Monitoring & Reliability", description: "DevOps monitoring, alerting, and on-call support to reduce downtime, catch issues early, and keep deployments safe." },
                        { icon: iconSecurity, title: "Security Patching & Hardening", description: "Regular dependency updates, vulnerability fixes, access controls, and baseline hardening to reduce operational risk." },
                        { icon: iconCICD, title: "Continuous Delivery & Release Improvements", description: "CI/CD upgrades, safer deployments, environment stability, and better handoffs so shipping becomes routine, not risky." },
                    ]}
                    ctaCards={[
                        { title: 'This isn\'t "maintenance."', description: "It's product ownership after launch: fixes, performance, reliability, and shipping improvements on an SLA.", ctaLabel: "Book a Discovery Call" },
                    ]}
                />
                <DeliveryModel
                    cards={[
                        { number: 1, title: "SLA-Based Retainers", description: "Support capacity with defined response windows, escalation paths, and ownership.", image: imgSLA },
                        { number: 2, title: "Monthly Roadmaps", description: "We plan fixes, improvements, and stability work in a monthly delivery cadence.", image: imgRoadmap },
                        { number: 3, title: "Predictable Response Times", description: "Clear severity tiers so you always know what gets handled when.", image: imgResponse },
                    ]}
                />
                <ProductPartner />
                <SeparatorPattern />
                <Testimonials />
                <FAQChat faqs={[
                    { question: 'What does "Support & Scale" include?', answer: "Ongoing maintenance, SLA-based support, performance improvements, DevOps monitoring, and continuous upgrades." },
                    { question: "How is this different from basic maintenance?", answer: "Maintenance is reactive. Support & Scale is proactive: monitoring, reliability, and improvements with clear ownership." },
                    { question: "Do you offer SLAs and guaranteed response times?", answer: "Yes. We set response windows by priority (critical, high, normal) and follow a clear escalation process." },
                    { question: "Can you take over an existing codebase or agency-built product?", answer: "Yes. We start with a quick audit, stabilize production, and then move into planned improvements." },
                    { question: "Do you handle DevOps and monitoring too?", answer: "Yes. We support CI/CD, deployments, observability (logs/metrics/alerts), and incident response." },
                    { question: "How do we get started?", answer: "Book a discovery call. We'll review your current setup, risks, and recommend the best support plan." },
                ]} />
                <BlogInsights />
                <SeparatorPattern />
                <ServiceCTASection
                    heading={<>Keep your product <br className="hidden sm:block" /> stable as you scale.</>}
                    description="Get a support plan with SLAs, DevOps monitoring, and continuous improvements."
                    ctaLabel="Book a Discovery Call"
                    subtext="Clear scope. Predictable support."
                />
            </main>
        </div>
    );
};

export default SupportScale;
