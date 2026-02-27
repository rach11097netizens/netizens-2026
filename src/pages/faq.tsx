import { Breadcrumb } from "../components/Breadcrumb"
import FAQSection from "../components/FAQSection"
import { ServiceCTASection } from "../components/ServiceCTASection"

const FAQpage: React.FC = () => {
    return (
        <div className="bg-[#FFFAFA] min-h-screen text-black font-sans selection:bg-black selection:text-white">
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'FAQ' }
                ]}
                className="pt-[96px] max-w-7xl mx-auto px-4"
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
    )
}

export default FAQpage