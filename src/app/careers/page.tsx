import { Breadcrumb } from "@/components/Breadcrumb";
import { CareersHero } from "@/components/CareersHero";
import { JoinTheTeamSection } from "@/components/JoinTheTeamSection";

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-[#FFFAFA] text-black font-sans selection:bg-black selection:text-white">
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Careers' }
                ]}
                className="pt-[96px] max-w-[1400px] mx-auto px-5 md:px-10"
            />
            <CareersHero />
            
            {/* Reusing JoinTheTeamSection as a "Why Join Us" context for now, 
                as it fits the design pattern of the project */}
            <JoinTheTeamSection />
        </main>
    );
}
