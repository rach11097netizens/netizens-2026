import { useEffect } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SeparatorPattern } from '../components/SeparatorPattern';
import { ServiceCTASection } from '../components/ServiceCTASection';
import { BlogInsights } from '../components/BlogInsights';
import { FAQChat } from '../components/FAQChat';
import { RightFit } from '../components/RightFit';
import { ServiceScope } from '../components/ServiceScope';
import heroImg from '../assets/images/workflow-digitization-hero-img.svg';
import erpCrmIcon from '../assets/images/scope-of-services/erp-crm-custom.svg';
import integrationHubIcon from '../assets/images/scope-of-services/integration-hub.svg';
import automateN8nIcon from '../assets/images/scope-of-services/automate-n8n-zapier.svg';
import apiArchIcon from '../assets/images/scope-of-services/api-architecture.svg';
import operationalDashIcon from '../assets/images/scope-of-services/operational-dashboard.svg';
import phasedRolloutIcon from '../assets/images/scope-of-services/phased-rolledout.svg';
import { Hero } from '../components/ServicesHero';
import ClientLogos from '../components/ClientLogos';
import Testimonials from '../components/Testimonials';
import { Problem } from '../components/Problem';
import { ProcessTimeline } from '../components/ProcessTimeline';
const WorkflowDigit: React.FC = () => {
    useEffect(() => {
        document.title = "Workflow Digitization & Business Workflow Automation Services";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Streamline approvals, reporting, and handoffs with workflow digitization. Get ERP/CRM customization, system integrations, and automation that scales with your teams.");
        }
    }, []);

    return (
        <div className="bg-[#FFFAFA] min-h-screen text-black font-sans selection:bg-black selection:text-white">
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Service', href: '/services' },
                    { label: 'Workflow Digitization' }
                ]}
                className="pt-[96px] max-w-7xl mx-auto px-4"
            />
            <main>
                {/* Sections will be added here */}
                <Hero
                    badge="Workflow Digitization"
                    heading="A Workflow Digitization Service for Connected, Scalable Systems"
                    description="We connect ERP, CRM, inventory, payments, and reporting systems so your operations run smoothly without manual workarounds."
                    primaryCta="Book a Discovery Call"
                    secondaryCta="How We Work"
                    image={heroImg}
                    imageAlt="Workflow Digitization"
                />
                <ClientLogos />
                <RightFit
                    theme="light"
                    badge="Quick Fit Check"
                    heading="For teams that need a connected, scalable system"
                    goodFitItems={[
                        "Your ERP, CRM, inventory, payments, and reporting tools don't talk to each other",
                        "Teams manually move data between spreadsheets, dashboards, and tools",
                        "You rely on Zapier or n8n automations that are now fragile or hard to manage",
                        "You need deeper ERP/CRM customization to match real workflows",
                        "Growth is exposing errors, bottlenecks, or lack of visibility",
                        "You're ready for phased rollout with proper integration and long-term support",
                        "You want API-driven or microservice-based architecture instead of patchwork fixes",
                    ]}
                    notFitItems={[
                        "You only need a simple one-step Zapier automation",
                        "You’re looking for an off-the-shelf SaaS tool instead of structured integration",
                        "Your workflows aren’t defined yet",
                        "You’re pre-operations and don’t have system complexity",
                        "You want a quick automation without addressing process structure",
                    ]}
                />
                <SeparatorPattern />

                <Problem
                    badge="What Slows Growing Teams Down"
                    heading="The Cost of Disconnected Systems"
                    cards={[
                        { title: "Data Lives Everywhere", description: "ERP, CRM, spreadsheets, and dashboards all hold different versions of the truth.", color: "yellow" },
                        { title: "Fragile Automations", description: "Early Zapier or n8n workflows break under scale and no one notices until something fails.", color: "cyan" },
                        { title: "ERP / CRM Doesn\u2019t Reflect Reality", description: "Out-of-the-box setups don\u2019t match real approvals, dependencies, or operational flows.", color: "yellow" },
                        { title: "Manual Workarounds Everywhere", description: "Teams copy, paste, export, and re-enter data because systems aren\u2019t properly integrated.", color: "cyan" },
                        { title: "No Real-Time Visibility", description: "Reporting requires manual effort, and leadership lacks clear operational insight.", color: "yellow" },
                    ]}
                    banner={{
                        content: (
                            <>
                                <h3 className="font-headings font-semibold text-xl md:text-2xl text-white leading-snug">
                                    Not sure what to digitize first? Let's map it.
                                </h3>
                                <p className="font-sans text-sm md:text-base text-white/70 mt-2">
                                    We'll help you choose the best first workflow to automate and estimate scope fast.
                                </p>
                            </>
                        ),
                        ctaLabel: "Book a Discovery Call",
                    }}
                />

                <ServiceScope
                    badge="Scope of Service"
                    heading="What We Deliver Under Workflow Digitization"
                    cards={[
                        { icon: erpCrmIcon, title: "ERP & CRM Customization", description: "We configure and customize ERP and CRM systems to match your real workflows, approvals, and operational logic." },
                        { icon: integrationHubIcon, title: "Integration Hub", description: "We connect core systems using APIs or middleware so data flows cleanly across tools without duplication or delays." },
                        { icon: automateN8nIcon, title: "Automation with n8n, Zapier & Custom Logic", description: "We implement workflow automation using n8n, Zapier, Make, or custom-built services depending on complexity and scale." },
                        { icon: apiArchIcon, title: "API & Microservices Architecture", description: "For growing environments, we design API-first and microservice-based integrations that scale without becoming brittle." },
                        { icon: operationalDashIcon, title: "Operational Dashboards & Reporting Systems", description: "We centralize data into clean dashboards and reporting layers for real-time visibility and decision-making." },
                        { icon: phasedRolloutIcon, title: "Phased Rollout & System Stabilization", description: "We implement changes in controlled phases with testing, monitoring, and long-term support to avoid operational disruption." },
                    ]}
                    ctaCards={[
                        { title: "Reliability, performance, and SLAs", description: "We fix issues, reduce tech debt, and improve reliability without slowing your roadmap.", ctaLabel: "Explore Support & Scale" },
                        { title: "LLMs applied to real operations", description: "We design and implement LLM integrations, agents, and AI automations that ship measurable outcomes.", ctaLabel: "Explore AI Consulting" },
                    ]}
                />

                <ProcessTimeline
                    badge="How We Digitize Workflows"
                    heading="How we digitize workflows without breaking operations"
                    steps={[
                        { title: "Workflow Audit & Mapping", description: "We document how work actually flows across ERP, CRM, spreadsheets, approvals, and reporting." },
                        { title: "Bottleneck & Risk Analysis", description: "We identify manual dependencies, fragile automations, data mismatches, and integration gaps." },
                        { title: "Architecture & Integration Design", description: "We design API connections, automation logic (n8n/Zapier/custom), and microservice layers where required." },
                        { title: "Build, Integrate & Test", description: "We implement integrations, configure ERP/CRM systems, deploy automation, and test across edge cases." },
                        { title: "Stabilize & Phase Rollout", description: "We release in controlled phases with monitoring, validation, and ongoing system refinement." },
                    ]}
                />

                <SeparatorPattern />
                <Testimonials />
                <FAQChat faqs={[
                    { question: "What is workflow digitization?", answer: "Workflow digitization converts manual, spreadsheet-based, or disconnected processes into structured digital systems with automation and real-time visibility." },
                    { question: "Do you work with existing ERP or CRM systems?", answer: "Yes. We customize and integrate systems like Salesforce, HubSpot, NetSuite, and others to match your operational workflows." },
                    { question: "Can you integrate multiple tools into one connected system?", answer: "Absolutely. We build integration hubs that connect ERP, CRM, inventory, payments, reporting, and custom tools into one unified workflow." },
                    { question: "Do you use tools like n8n, Zapier, or Make?", answer: "Yes. We implement n8n, Zapier, Make, and custom microservices depending on complexity, scalability, and control requirements." },
                    { question: "How long does a workflow digitization project take?", answer: "Most projects are delivered in phased rollouts, typically starting with a high-impact workflow within 4–8 weeks." },
                    { question: "Do you provide ongoing support after implementation?", answer: "Yes. We offer long-term support, monitoring, optimization, and continuous automation improvements." },
                ]} />
                <BlogInsights />
                <SeparatorPattern />
                <ServiceCTASection
                    heading={<>Ready to reduce <br className="hidden sm:block" /> manual work this month?</>}
                    description="We’ll map one high-impact workflow and outline a phased rollout with clear ROI."
                    ctaLabel="Book a Discovery Call"
                    subtext="No sales pitch, just a clear plan."
                />
            </main>
        </div>
    );
};

export default WorkflowDigit;
