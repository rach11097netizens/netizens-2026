import { Helmet } from 'react-helmet-async';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you work with startups or enterprises?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We work with early-stage startups, growing SaaS teams, and enterprise teams. We adapt the team, process, and engagement model based on your timeline, scope, and internal owners."
      }
    },
    {
      "@type": "Question",
      "name": "Can we start small before committing long-term?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Many clients start with a sprint or a short assessment. You'll get a clear plan, a working deliverable, and confidence before you scale the engagement."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide ongoing support after launch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our Support & Scale option covers bug fixes, improvements, performance, security checks, and ongoing delivery. It's for teams that want reliable support without hiring a full in-house team."
      }
    },
    {
      "@type": "Question",
      "name": "Do you help with AI and automation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We help identify where AI will actually save time, then build and integrate it into your workflows. This can include AI workflow automation, LLM integration, and internal tools that reduce manual work."
      }
    }
  ]
};

export function HomePageSEO() {
  return (
    <Helmet>
      {/* Primary */}
      <title>Custom Software Development Company for MVPs, AI & Scaling</title>
      <meta
        name="description"
        content="Need a custom software development company? We design and build MVPs, integrate AI, digitize workflows, extend your team, and support systems on-demand."
      />
      <link rel="canonical" href="https://netizenstechnologies.com/" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://netizenstechnologies.com/" />
      <meta property="og:title" content="Custom Software Development Company for MVPs, AI & Scaling" />
      <meta
        property="og:description"
        content="Need a custom software development company? We design and build MVPs, integrate AI, digitize workflows, extend your team, and support systems on-demand."
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Custom Software Development Company for MVPs, AI & Scaling" />
      <meta
        name="twitter:description"
        content="Need a custom software development company? We design and build MVPs, integrate AI, digitize workflows, extend your team, and support systems on-demand."
      />

      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}
