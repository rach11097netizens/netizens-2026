import { Helmet } from 'react-helmet-async';

export function AboutUsPageSEO() {
  return (
    <Helmet>
      {/* Primary */}
      <title>About Netizens | Engineering-Led Software Development Company</title>
      <meta
        name="description"
        content="Netizens is an engineering-led software development company delivering MVPs, workflow automation, AI solutions, integrations, and long-term support. Built for teams who need reliable outcomes."
      />
      <link rel="canonical" href="https://netizenstechnologies.com/about-us" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://netizenstechnologies.com/about-us" />
      <meta property="og:title" content="About Netizens | Engineering-Led Software Development Company" />
      <meta
        property="og:description"
        content="Netizens is an engineering-led software development company delivering MVPs, workflow automation, AI solutions, integrations, and long-term support. Built for teams who need reliable outcomes."
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="About Netizens | Engineering-Led Software Development Company" />
      <meta
        name="twitter:description"
        content="Netizens is an engineering-led software development company delivering MVPs, workflow automation, AI solutions, integrations, and long-term support. Built for teams who need reliable outcomes."
      />
    </Helmet>
  );
}
