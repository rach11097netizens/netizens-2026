import { Helmet } from 'react-helmet-async';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does \"Support & Scale\" include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ongoing maintenance, SLA-based support, performance improvements, DevOps monitoring, and continuous upgrades."
      }
    },
    {
      "@type": "Question",
      "name": "How is this different from basic maintenance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Maintenance is reactive. Support & Scale is proactive: monitoring, reliability, and improvements with clear ownership."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer SLAs and guaranteed response times?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We set response windows by priority (critical, high, normal) and follow a clear escalation process."
      }
    },
    {
      "@type": "Question",
      "name": "Can you take over an existing codebase or agency-built product?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We start with a quick audit, stabilize production, and then move into planned improvements."
      }
    },
    {
      "@type": "Question",
      "name": "Do you handle DevOps and monitoring too?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We support CI/CD, deployments, observability (logs/metrics/alerts), and incident response."
      }
    },
    {
      "@type": "Question",
      "name": "How do we get started?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Book a discovery call. We'll review your current setup, risks, and recommend the best support plan."
      }
    }
  ]
};

// Service schema is ready but commented out — uncomment once the page goes live.
// const serviceSchema = {
//   "@context": "https://schema.org",
//   "@type": "Service",
//   "@id": "https://netizenstechnologies.com/support-and-scale",
//   "name": "Support & Scale",
//   "description": "Netizens provides structured support and scale services for production applications through dedicated retainers. Our services include SLA-backed support, DevOps monitoring, performance optimization, security hardening, and continuous delivery improvements. We help businesses maintain stability, enhance performance, and scale confidently as their product grows.",
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
//   "serviceType": "DevOps Monitoring, Long-Term Product Reliability, Post-Launch Software Support",
//   "audience": {
//     "@type": "Audience",
//     "audienceType": "Startup Owners, Business Owners"
//   }
// };

export function SupportAndScalePageSEO() {
  return (
    <Helmet>
      {/* Primary */}
      <title>Post-Launch Support & DevOps for Scaling Products | Netizens</title>
      <meta
        name="description"
        content="Structured support retainers for production apps: SLAs, DevOps monitoring, performance optimization, security hardening, and continuous delivery improvements."
      />
      <link rel="canonical" href="https://netizenstechnologies.com/support-and-scale" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://netizenstechnologies.com/support-and-scale" />
      <meta property="og:title" content="Post-Launch Support & DevOps for Scaling Products | Netizens" />
      <meta
        property="og:description"
        content="Structured support retainers for production apps: SLAs, DevOps monitoring, performance optimization, security hardening, and continuous delivery improvements."
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Post-Launch Support & DevOps for Scaling Products | Netizens" />
      <meta
        name="twitter:description"
        content="Structured support retainers for production apps: SLAs, DevOps monitoring, performance optimization, security hardening, and continuous delivery improvements."
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
