import { Helmet } from 'react-helmet-async';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How fast can we onboard developers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most teams start in 1–2 weeks. We align on role, stack, timezone overlap, and your sprint cadence, then onboard into your tools and process with clear first-week deliverables."
      }
    },
    {
      "@type": "Question",
      "name": "Is this staff augmentation or team extension?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both. You can hire dedicated developers (full/part-time), use team extension (embedded engineers inside your team), or choose a pod model (lead + devs + QA) when you want output ownership."
      }
    },
    {
      "@type": "Question",
      "name": "Can we try engineers before committing long-term?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We offer a 2-week paid trial so you can validate quality, communication, and velocity before you scale the engagement."
      }
    },
    {
      "@type": "Question",
      "name": "Who manages delivery: us or you?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can choose. If you have a PM/EM, our engineers plug into your sprints. If you need more ownership, we can provide a tech lead/pod and manage delivery outcomes with weekly reporting."
      }
    },
    {
      "@type": "Question",
      "name": "What if an engineer isn't the right fit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We replace quickly. If the fit or performance isn't working, we swap with minimal disruption and keep momentum on your roadmap."
      }
    },
    {
      "@type": "Question",
      "name": "How do pricing and engagement models work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We support part-time or full-time, and you can run it as dedicated individuals, team extension, or a pod. Pricing is straightforward and tied to the engagement type, duration, and seniority mix."
      }
    }
  ]
};

// Service schema is ready but commented out — uncomment once the page goes live.
// const serviceSchema = {
//   "@context": "https://schema.org",
//   "@type": "Service",
//   "@id": "https://netizenstechnologies.com/staff-augmentation",
//   "name": "Staff Augmentation",
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
//   "serviceType": "IT Staff Augmentation, Dedicated Developers",
//   "audience": {
//     "@type": "Audience",
//     "audienceType": "Startup Owners, Business Owners"
//   }
// };

export function StaffAugmentationPageSEO() {
  return (
    <Helmet>
      {/* Primary */}
      <title>Staff Augmentation Company | Dedicated Developers</title>
      <meta
        name="description"
        content="Netizens provides on-demand engineering capacity: dedicated developers, team extension, pods, and a 2-week trial so you can ship faster with confidence."
      />
      <link rel="canonical" href="https://netizenstechnologies.com/staff-augmentation" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://netizenstechnologies.com/staff-augmentation" />
      <meta property="og:title" content="Staff Augmentation Company | Dedicated Developers" />
      <meta
        property="og:description"
        content="Netizens provides on-demand engineering capacity: dedicated developers, team extension, pods, and a 2-week trial so you can ship faster with confidence."
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Staff Augmentation Company | Dedicated Developers" />
      <meta
        name="twitter:description"
        content="Netizens provides on-demand engineering capacity: dedicated developers, team extension, pods, and a 2-week trial so you can ship faster with confidence."
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
