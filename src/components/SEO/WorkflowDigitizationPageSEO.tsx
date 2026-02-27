import { Helmet } from 'react-helmet-async';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is workflow digitization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Workflow digitization converts manual, spreadsheet-based, or disconnected processes into structured digital systems with automation and real-time visibility."
      }
    },
    {
      "@type": "Question",
      "name": "Do you work with existing ERP or CRM systems?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We customize and integrate systems like Salesforce, HubSpot, NetSuite, and others to match your operational workflows."
      }
    },
    {
      "@type": "Question",
      "name": "Can you integrate multiple tools into one connected system?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. We build integration hubs that connect ERP, CRM, inventory, payments, reporting, and custom tools into one unified workflow."
      }
    },
    {
      "@type": "Question",
      "name": "Do you use tools like n8n, Zapier, or Make?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We implement n8n, Zapier, Make, and custom microservices depending on complexity, scalability, and control requirements."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a workflow digitization project take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most projects are delivered in phased rollouts, typically starting with a high-impact workflow within 4–8 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide ongoing support after implementation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We offer long-term support, monitoring, optimization, and continuous automation improvements."
      }
    }
  ]
};

// Service schema is ready but commented out — uncomment once the page goes live.
// const serviceSchema = {
//   "@context": "https://schema.org",
//   "@type": "Service",
//   "@id": "https://netizenstechnologies.com/workflow-digitization",
//   "name": "Workflow Digitization",
//   "description": "Netizens offers flexible staff augmentation services with on-demand engineering capacity to help businesses scale quickly and efficiently. We provide dedicated developers, team extensions, and fully managed pods, along with a 2-week trial to ensure the right fit. Our model enables startups and growing companies to accelerate delivery, reduce hiring risks, and ship high-quality products with confidence.",
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
//   "serviceType": "Workflow Digitization, Business Workflow Automation",
//   "audience": {
//     "@type": "Audience",
//     "audienceType": "Startup Owners, Business Owners"
//   }
// };

export function WorkflowDigitizationPageSEO() {
  return (
    <Helmet>
      {/* Primary */}
      <title>Workflow Digitization & Business Workflow Automation Services</title>
      <meta
        name="description"
        content="Streamline approvals, reporting, and handoffs with workflow digitization. Get ERP/CRM customization, system integrations, and automation that scales with your teams."
      />
      <link rel="canonical" href="https://netizenstechnologies.com/workflow-digitization" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://netizenstechnologies.com/workflow-digitization" />
      <meta property="og:title" content="Workflow Digitization & Business Workflow Automation Services" />
      <meta
        property="og:description"
        content="Streamline approvals, reporting, and handoffs with workflow digitization. Get ERP/CRM customization, system integrations, and automation that scales with your teams."
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Workflow Digitization & Business Workflow Automation Services" />
      <meta
        name="twitter:description"
        content="Streamline approvals, reporting, and handoffs with workflow digitization. Get ERP/CRM customization, system integrations, and automation that scales with your teams."
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
