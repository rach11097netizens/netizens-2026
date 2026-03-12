
import HeroService from "@/components/HeroService";
import { Metrics } from "@/components/Metrics";
import { SeparatorPattern } from "@/components/SeparatorPattern";
import { Clients } from "@/components/Clients";
import { RealEstateProblem } from "@/components/RealEstateProblem";
import { BuildOnceScale } from "@/components/BuildOnceScale";
import { WhatYouGet } from "@/components/WhatYouGet";
import { NumberMetrics } from "@/components/NumberMetrics";
import { CaseStudies } from "@/components/CaseStudies";
import { ComparisonTable } from "@/components/ComparisonTable";
import { CTASection } from "@/components/CTASection";

export default function RealEstateLandingPageDesignServicesPage() {
  return (
    <>
      <main id="home">
        <HeroService />
        <Metrics />
        <SeparatorPattern />
        <Clients />
        <RealEstateProblem />
        <SeparatorPattern />
        <BuildOnceScale />
        <WhatYouGet />
        <SeparatorPattern />
        <NumberMetrics />
        <SeparatorPattern />
        <CaseStudies />
        <ComparisonTable />
        <SeparatorPattern />
        <CTASection />
      </main>
    </>
  );
}
