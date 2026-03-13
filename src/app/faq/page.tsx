import { Metadata } from 'next';
import { Breadcrumb } from "@/components/Breadcrumb"
import FAQSection from "@/components/FAQSection"
import { ServiceCTASection } from "@/components/ServiceCTASection"

export const metadata: Metadata = {
    title: "Frequently Asked Questions | Netizens Technologies – Engineering & AI Partner",
    description: "Get answers about MVP development, AI consulting, CRM/ERP implementation, pricing, and delivery models. Speak with Netizens Technologies today.",
    keywords: [
        "custom software development FAQs", "Product Development FAQs", "staff augmentation FAQs", "AI consulting FAQs", "Workflow Digitalization FAQs"
    ],
};

export default function FAQPage() {
    return (
        <div className="bg-[#FFFAFA] min-h-screen text-black font-sans selection:bg-black selection:text-white">
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'FAQ' }
                ]}
                className="pt-[96px] max-w-[1400px] mx-auto px-5 md:px-10"
            />
            <main>
                <FAQSection />
                <ServiceCTASection
                    heading={<>Planning an MVP, AI Initiative, or Workflow Upgrade?</>}
                    description="Let's map the right approach before you commit to development."
                    ctaLabel="Book a Discovery Call"
                    subtext="We reply within 24 business hours."
                />
            </main>
        </div>
    );
}
