import { Breadcrumb } from "@/components/Breadcrumb";
import { TermsAndConditions } from "@/components/TermsAndConditions";

export default function TermsOfServicesPage() {
    return (
        <>
            <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Terms of Services", href: "/terms-of-services" },
            ]} />
            <TermsAndConditions />
        </>
    );
}