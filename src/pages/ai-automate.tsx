import { useEffect } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SeparatorPattern } from '../components/SeparatorPattern';
import { ServiceCTASection } from '../components/ServiceCTASection';
import { BlogInsights } from '../components/BlogInsights';
import { FAQChat } from '../components/FAQChat';
import heroImg from '../assets/images/ai-automation-hero-img.svg';
import { RightFit } from '../components/RightFit';
import { BusinessFirstAI } from '../components/BusinessFirstAI';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { ServiceScope } from '../components/ServiceScope';
import aiUseCaseIcon from '../assets/images/ai-consulting-scope/au-use-case.svg';
import llmIntegrationIcon from '../assets/images/ai-consulting-scope/llm-integration.svg';
import promptEngineIcon from '../assets/images/ai-consulting-scope/prompt-engine.svg';
import ragIcon from '../assets/images/ai-consulting-scope/rag-icon.svg';
import aiAgentIcon from '../assets/images/ai-consulting-scope/ai-agent-tool.svg';
import aiEvalIcon from '../assets/images/ai-consulting-scope/ai-evalutions.svg';
import { AICrossServiceCTA } from '../components/AICrossServiceCTA';
import { Hero } from '../components/ServicesHero';
import ClientLogos from '../components/ClientLogos';
import Testimonials from '../components/Testimonials';
import { AIConsultingPageSEO } from '../components/SEO/AIConsultingPageSEO';

const AiAutomate: React.FC = () => {
    useEffect(() => {
        document.title = "AI Consulting Company | LLM Integration & Automation";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Netizens is an AI consulting company that operationalizes AI in real workflows. LLM integration, pilots, prompt engineering, and measurable ROI.");
        }
    }, []);

    return (
        <div className="bg-[#FFFAFA] min-h-screen text-black font-sans selection:bg-black selection:text-white">
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Service', href: '/services' },
                    { label: 'AI Consulting & Automation' }
                ]}
                className="pt-[96px] max-w-7xl mx-auto px-4"
            />
            <main>
                <AIConsultingPageSEO />
                {/* Sections will be added here */}
                <Hero
                    badge="Applied AI, delivered"
                    heading="AI Consulting Firms Pitch. We Implement."
                    description="We apply AI to real workflows, LLM integrations, and automation systems that save time, reduce cost, and survive beyond the pilot."
                    primaryCta="Book a Discovery Call"
                    secondaryCta="How We Work"
                    image={heroImg}
                    imageAlt="AI Consulting & Automation"
                />
                <ClientLogos />
                <RightFit
                    theme="light"
                    badge="Quick Fit Check"
                    heading="For teams that need AI to add value to their operations"
                    goodFitItems={[
                        "You have repetitive workflows consuming real hours every week",
                        "Your team works across CRM, ERP, tickets, dashboards, or internal tools",
                        "You've tried AI tools, but they're not embedded in real operations",
                        "You want measurable gains: time saved, errors reduced, faster turnaround",
                        "You have access to your data and workflow owners",
                        "Leadership is asking, \"Where's the AI impact?\"",
                    ]}
                    notFitItems={[
                        "You only want ChatGPT prompts or quick hacks",
                        "You're exploring AI without defined workflows",
                        "You don't have internal ownership of the process",
                        "You're looking for a ready-made AI SaaS tool",
                        "You expect instant magic without process change",
                    ]}
                />
                <SeparatorPattern />

                <BusinessFirstAI />

                <ServiceScope
                    badge="AI consulting scope"
                    heading="What we deliver as your AI consulting partner"
                    cards={[
                        { icon: aiUseCaseIcon, title: "AI Use Case & ROI Assessment", description: "We identify the highest-impact AI use cases and define success metrics before building." },
                        { icon: llmIntegrationIcon, title: "LLM Integration Services", description: "We integrate LLMs into your product or internal tools with the right context and safeguards." },
                        { icon: promptEngineIcon, title: "Prompt Engineering Systems", description: "We build structured prompt workflows that are consistent, testable, and reusable across teams." },
                        { icon: ragIcon, title: "RAG (Retrieval-Augmented Generation)", description: "We connect your internal knowledge (docs, tickets, CRM notes) to LLMs for accurate answers." },
                        { icon: aiAgentIcon, title: "AI Agents & Tool Use", description: "We build agents that can take actions in tools (create tickets, update records) with controls." },
                        { icon: aiEvalIcon, title: "AI Evaluation, Monitoring & Governance", description: "We make AI reliable in production with testing, monitoring, and security guardrails." },
                    ]}
                />

                <ProcessTimeline
                    badge="Our AI Engagement Model"
                    heading="From AI Idea to Working Automation in Weeks"
                    steps={[
                        { title: "Map the Workflow", description: "We analyze where time, approvals, and decisions slow your team down." },
                        { title: "Identify High-Impact AI Use Case", description: "We score opportunities based on ROI, feasibility, and integration complexity." },
                        { title: "Build a Production-Ready Pilot", description: "We implement one focused AI automation inside your existing tools." },
                        { title: "Measure & Expand", description: "We track time saved, accuracy improved, and scale what proves valuable." },
                    ]}
                    ctaLabel="Start a Sprint"
                />
                <SeparatorPattern />

                <AICrossServiceCTA />
                <SeparatorPattern />

                <Testimonials />
                <FAQChat faqs={[
                    { question: "What does an AI consulting engagement typically deliver?", answer: "We deliver applied AI systems: LLM integrations, AI agents, automation workflows, and production-ready pilots with measurable impact." },
                    { question: "How is this different from workflow automation?", answer: "Workflow digitization structures processes. AI consulting adds intelligence—decision logic, language models, and automation that learns and adapts." },
                    { question: "Can you integrate AI into our existing CRM, ERP, or internal tools?", answer: "Yes. We integrate AI directly into your existing stack without disrupting current systems." },
                    { question: "Do you work with OpenAI, Anthropic, or open-source models?", answer: "Yes. We select models based on use case, performance, security, and cost considerations." },
                    { question: "How long does it take to see impact?", answer: "Most teams start with a focused AI sprint and see measurable results within 2-4 weeks." },
                    { question: "How do you ensure data security and reliability?", answer: "We implement access controls, structured outputs, testing, monitoring, and governance guardrails from day one." },
                ]} />
                <BlogInsights />
                <SeparatorPattern />
                <ServiceCTASection
                    heading={<>Stop Experimenting.<br /> Start Implementing.</>}
                    description="If AI is on your roadmap, let's make it work inside your real operations."
                    ctaLabel="Book a Discovery Call"
                    subtext="Start small. Scale what works."
                />
            </main>
        </div>
    );
};

export default AiAutomate;
