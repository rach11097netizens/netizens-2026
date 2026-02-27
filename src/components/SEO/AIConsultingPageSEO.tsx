import { Helmet } from 'react-helmet-async';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does an AI consulting engagement typically deliver?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We deliver applied AI systems: LLM integrations, AI agents, automation workflows, and production-ready pilots with measurable impact."
      }
    },
    {
      "@type": "Question",
      "name": "How is this different from workflow automation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Workflow digitization structures processes. AI consulting adds intelligence—decision logic, language models, and automation that learns and adapts."
      }
    },
    {
      "@type": "Question",
      "name": "Can you integrate AI into our existing CRM, ERP, or internal tools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We integrate AI directly into your existing stack without disrupting current systems."
      }
    },
    {
      "@type": "Question",
      "name": "Do you work with OpenAI, Anthropic, or open-source models?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We select models based on use case, performance, security, and cost considerations."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to see impact?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most teams start with a focused AI sprint and see measurable results within 2–4 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "How do you ensure data security and reliability?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We implement access controls, structured outputs, testing, monitoring, and governance guardrails from day one."
      }
    }
  ]
};

// Service schema is ready but commented out — uncomment once the page goes live.
// const serviceSchema = {
//   "@context": "https://schema.org",
//   "@type": "Service",
//   "@id": "https://netizenstechnologies.com/ai-consulting",
//   "name": "AI Consulting",
//   "description": "Netizens is an AI consulting company that helps businesses operationalize AI within real-world workflows. We specialize in LLM integration, AI pilots, prompt engineering, and building practical solutions that drive measurable ROI. From strategy to deployment, our team ensures AI initiatives are scalable, efficient, and aligned with business goals.",
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
//   "serviceType": "AI Consulting, AI Workflow Automation",
//   "audience": {
//     "@type": "Audience",
//     "audienceType": "Startup Owners, Business Owners"
//   }
// };

export function AIConsultingPageSEO() {
  return (
    <Helmet>
      {/* Primary */}
      <title>AI Consulting Company | LLM Integration & Automation</title>
      <meta
        name="description"
        content="Netizens is an AI consulting company that operationalizes AI in real workflows. LLM integration, pilots, prompt engineering, and measurable ROI."
      />
      <link rel="canonical" href="https://netizenstechnologies.com/ai-consulting" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://netizenstechnologies.com/ai-consulting" />
      <meta property="og:title" content="AI Consulting Company | LLM Integration & Automation" />
      <meta
        property="og:description"
        content="Netizens is an AI consulting company that operationalizes AI in real workflows. LLM integration, pilots, prompt engineering, and measurable ROI."
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="AI Consulting Company | LLM Integration & Automation" />
      <meta
        name="twitter:description"
        content="Netizens is an AI consulting company that operationalizes AI in real workflows. LLM integration, pilots, prompt engineering, and measurable ROI."
      />

      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Service Schema — uncomment once page is live */}
      {/* <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script> */}
    </Helmet>
  );
}
