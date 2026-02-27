import { Helmet } from 'react-helmet-async';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I know which engagement model is right for me?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If your scope is evolving or you need fast validation, start with sprint-based delivery. If your scope is clearly defined, project-based works best. If you need ongoing delivery capacity, a retainer model is the right fit. We'll guide you through this in one conversation."
      }
    },
    {
      "@type": "Question",
      "name": "Can I switch models later?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Many clients start with a sprint or project, then move into a retainer once priorities stabilize. The model adapts as your needs evolve."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between project-based and retainer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Project-based delivery is fixed-scope, milestone-driven work with defined timelines. Retainer is ongoing delivery capacity with evolving priorities, roadmap alignment, and SLA-backed responsiveness."
      }
    },
    {
      "@type": "Question",
      "name": "How transparent is progress tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You get shared visibility into sprint plans, milestones, roadmaps, and delivery status. No black box. No 'we'll update you next month.'"
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide a dedicated team?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Depending on the model, you'll have a clearly assigned delivery lead and engineering team aligned to your goals. Ownership is explicit, not implied."
      }
    },
    {
      "@type": "Question",
      "name": "What if my priorities change mid-engagement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In sprint and retainer models, priorities can shift between cycles. In project-based engagements, changes are managed through structured scope review to protect timelines and budgets."
      }
    }
  ]
};

export function HowWeWorkPageSEO() {
  return (
    <Helmet>
      {/* Primary */}
      <title>How Netizens Delivers: Agile Sprints, Projects & Retainer Teams</title>
      <meta
        name="description"
        content="From quick sprints to fixed-scope projects to ongoing retainers, Netizens delivers with clear ownership, transparent updates, and business outcomes."
      />
      <link rel="canonical" href="https://netizenstechnologies.com/how-we-work" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://netizenstechnologies.com/how-we-work" />
      <meta property="og:title" content="How Netizens Delivers: Agile Sprints, Projects & Retainer Teams" />
      <meta
        property="og:description"
        content="From quick sprints to fixed-scope projects to ongoing retainers, Netizens delivers with clear ownership, transparent updates, and business outcomes."
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="How Netizens Delivers: Agile Sprints, Projects & Retainer Teams" />
      <meta
        name="twitter:description"
        content="From quick sprints to fixed-scope projects to ongoing retainers, Netizens delivers with clear ownership, transparent updates, and business outcomes."
      />

      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}
