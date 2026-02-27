import { Helmet } from 'react-helmet-async';

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
};

// Service schema is ready but commented out — uncomment once the page goes live.
// const serviceSchema = {
//   "@context": "https://schema.org",
//   "@type": "Service",
//   "@id": "https://netizenstechnologies.com/product-development",
//   "name": "Product Development",
//   "description": "Netizens Technologies offers scalable product development and MVP development services for startups and SaaS teams. We help businesses launch their MVP faster without cutting corners, delivering high-quality, user-focused, and future-ready digital products. From strategy and design to development and deployment, our team ensures your product is built to scale and ready for market success.",
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
//   "serviceType": "MVP Development, Custom Software Development",
//   "audience": {
//     "@type": "Audience",
//     "audienceType": "Startup Owners"
//   }
// };

export function ProductDevelopmentPageSEO() {
  return (
    <Helmet>
      {/* Primary */}
      <title>MVP Development Company | From Idea to Scalable Product</title>
      <meta
        name="description"
        content="Launch your MVP faster without cutting corners. We deliver scalable MVP development services for startups and SaaS teams."
      />
      <link rel="canonical" href="https://netizenstechnologies.com/product-development" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://netizenstechnologies.com/product-development" />
      <meta property="og:title" content="MVP Development Company | From Idea to Scalable Product" />
      <meta
        property="og:description"
        content="Launch your MVP faster without cutting corners. We deliver scalable MVP development services for startups and SaaS teams."
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="MVP Development Company | From Idea to Scalable Product" />
      <meta
        name="twitter:description"
        content="Launch your MVP faster without cutting corners. We deliver scalable MVP development services for startups and SaaS teams."
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
