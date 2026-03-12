import { Breadcrumb } from "@/components/Breadcrumb";
import { CaseStudiesHero } from "@/components/CaseStudiesHero";

export default function CaseStudiesPage() {
    return (
        <>
            <div className="bg-[#FFFAFA] text-black font-sans selection:bg-black selection:text-white">
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Case Studies' }
                    ]}
                    className="pt-[96px] max-w-7xl mx-auto px-4"
                />
                <CaseStudiesHero />
            </div>
        </>
    );
}