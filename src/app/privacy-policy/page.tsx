import { Breadcrumb } from "@/components/Breadcrumb";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy | Netizens Technologies",
  description: "Learn how Netizens Technologies collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Privacy Policy", href: "/privacy-policy" },
            ]} />
            <PrivacyPolicy />
        </>
    );
}