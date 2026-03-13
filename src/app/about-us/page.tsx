import { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AboutHero } from '@/components/AboutHero';
import { NetizensByNumbers } from '@/components/NetizensByNumbers';
import { OurJourneyTimeline } from '@/components/OurJourneyTimeline';
import { WhatDefinesUs } from '@/components/WhatDefinesUs';
import { EngineeringCultureSection } from '@/components/EngineeringCultureSection';
import { HowWeThinkPartnerships } from '@/components/HowWeThinkPartnerships';
import { JoinTheTeamSection } from '@/components/JoinTheTeamSection';
import { SeparatorPattern } from '@/components/SeparatorPattern';
import { ServiceCTASection } from '@/components/ServiceCTASection';

export const metadata: Metadata = {
    title: "About Us | Netizens Software Development & IT Services Company",
    description: "Netizens is an engineering-led software development company delivering MVPs, workflow automation, AI solutions, integrations, and long-term support. Built for teams who need reliable outcomes.",
    keywords: [
        "IT Services Company", "Software Development Company", "Engineering-Led Software Development Company", "IT services provider"
    ],
};

export default function AboutUsPage() {
    return (
        <div className="bg-[#FFFAFA] min-h-screen text-black font-sans selection:bg-black selection:text-white">
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'About Us' }
                ]}
                className="pt-[96px] max-w-[1400px] mx-auto px-5 md:px-10"
            />
            <main>
                <AboutHero
                    badge="About Netizens"
                    heading="An Engineering-Led Software Development Company Built For Long-Term Product Growth."
                    description="We design, build, and scale products and connected systems for founders, product teams, and operations leaders. From MVPs to AI automation to enterprise workflows — we stay involved long after launch."
                />
                <SeparatorPattern />
                <NetizensByNumbers />
                <SeparatorPattern />
                <WhatDefinesUs />
                <SeparatorPattern />
                <OurJourneyTimeline />
                <SeparatorPattern />
                <EngineeringCultureSection />
                <SeparatorPattern />
                <HowWeThinkPartnerships />
                <SeparatorPattern />
                <JoinTheTeamSection />
                <SeparatorPattern />
                <ServiceCTASection
                    heading={<>Looking for a long-term<br className="hidden sm:block" />  engineering partner?</>}
                    description="Let's build something structured, scalable, and sustainable."
                    ctaLabel="Book a Discovery Call"
                    subtext="We reply within 24 business hours."
                />
                <SeparatorPattern />
            </main>
        </div>
    );
}
