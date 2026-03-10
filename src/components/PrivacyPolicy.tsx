"use client";
import { FC } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PolicySection {
    id: string;
    title: string;
    content: React.ReactNode;
}

// ─── Policy Sections Data ─────────────────────────────────────────────────────

const SECTIONS: PolicySection[] = [
    {
        id: "information-we-collect",
        title: "1. Information We Collect",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-4">
                    We may collect the following types of information when you interact with our website or services.
                </p>

                <h4 className="font-headings font-semibold text-regal-navy text-base mb-2">1.1 Personal Information</h4>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">This may include:</p>
                <ul className="list-none flex flex-col gap-2 mb-4 pl-0">
                    {["Name", "Email address", "Phone number", "Company name", "Job title", "Project details or inquiry information"].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-sans text-charcoal leading-[1.8]">
                            <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-regal-navy/40 inline-block" />
                            {item}
                        </li>
                    ))}
                </ul>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">This information is typically collected when you:</p>
                <ul className="list-none flex flex-col gap-2 mb-4 pl-0">
                    {["Submit a contact form", "Book a discovery call", "Subscribe to updates", "Request information about our services"].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-sans text-charcoal leading-[1.8]">
                            <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-regal-navy/40 inline-block" />
                            {item}
                        </li>
                    ))}
                </ul>

                <h4 className="font-headings font-semibold text-regal-navy text-base mb-2">1.2 Non-Personal Information</h4>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">We may also collect non-personal information such as:</p>
                <ul className="list-none flex flex-col gap-2 mb-4 pl-0">
                    {["Browser type", "Device information", "IP address", "Pages visited", "Time spent on pages", "Referral source"].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-sans text-charcoal leading-[1.8]">
                            <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-regal-navy/40 inline-block" />
                            {item}
                        </li>
                    ))}
                </ul>
                <p className="text-charcoal font-sans text-sm leading-[1.8]">
                    This helps us understand how visitors use our website and improve the user experience.
                </p>
            </>
        ),
    },
    {
        id: "how-we-use",
        title: "2. How We Use Your Information",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">We use the information we collect to:</p>
                <ul className="list-none flex flex-col gap-2 mb-4 pl-0">
                    {[
                        "Respond to inquiries or requests",
                        "Schedule and conduct discovery calls",
                        "Provide information about our services",
                        "Improve our website and offerings",
                        "Analyze website performance",
                        "Communicate updates or relevant insights",
                        "Maintain security and prevent misuse",
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-sans text-charcoal leading-[1.8]">
                            <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-regal-navy/40 inline-block" />
                            {item}
                        </li>
                    ))}
                </ul>
                <p className="text-charcoal font-sans text-sm leading-[1.8] font-medium">
                    We do not sell your personal data to third parties.
                </p>
            </>
        ),
    },
    {
        id: "cookies",
        title: "3. Cookies and Tracking Technologies",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">Our website may use cookies and similar tracking technologies to:</p>
                <ul className="list-none flex flex-col gap-2 mb-4 pl-0">
                    {["Understand user behavior", "Improve website functionality", "Measure marketing performance", "Enhance user experience"].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-sans text-charcoal leading-[1.8]">
                            <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-regal-navy/40 inline-block" />
                            {item}
                        </li>
                    ))}
                </ul>
                <p className="text-charcoal font-sans text-sm leading-[1.8]">
                    You can adjust your browser settings to refuse cookies if you prefer. However, some parts of the website may not function properly without them.
                </p>
            </>
        ),
    },
    {
        id: "third-party",
        title: "4. Third-Party Services",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">We may use third-party services such as:</p>
                <ul className="list-none flex flex-col gap-2 mb-4 pl-0">
                    {["Analytics platforms (e.g., Google Analytics)", "Scheduling tools", "Marketing platforms", "Hosting providers"].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-sans text-charcoal leading-[1.8]">
                            <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-regal-navy/40 inline-block" />
                            {item}
                        </li>
                    ))}
                </ul>
                <p className="text-charcoal font-sans text-sm leading-[1.8]">
                    These services may collect information according to their own privacy policies. We recommend reviewing the privacy policies of any third-party services you interact with through our website.
                </p>
            </>
        ),
    },
    {
        id: "data-security",
        title: "5. Data Security",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">
                    We implement appropriate technical and organizational measures to protect your personal data from:
                </p>
                <ul className="list-none flex flex-col gap-2 mb-4 pl-0">
                    {["Unauthorized access", "Loss", "Misuse", "Alteration"].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-sans text-charcoal leading-[1.8]">
                            <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-regal-navy/40 inline-block" />
                            {item}
                        </li>
                    ))}
                </ul>
                <p className="text-charcoal font-sans text-sm leading-[1.8]">
                    While we take reasonable precautions, no internet transmission is completely secure.
                </p>
            </>
        ),
    },
    {
        id: "data-retention",
        title: "6. Data Retention",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">
                    We retain personal information only for as long as necessary to:
                </p>
                <ul className="list-none flex flex-col gap-2 mb-4 pl-0">
                    {["Respond to inquiries", "Provide services", "Maintain records", "Meet legal or business obligations"].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-sans text-charcoal leading-[1.8]">
                            <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-regal-navy/40 inline-block" />
                            {item}
                        </li>
                    ))}
                </ul>
                <p className="text-charcoal font-sans text-sm leading-[1.8]">
                    After this period, information may be securely deleted.
                </p>
            </>
        ),
    },
    {
        id: "your-rights",
        title: "7. Your Rights",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">
                    Depending on your location, you may have the right to:
                </p>
                <ul className="list-none flex flex-col gap-2 mb-4 pl-0">
                    {[
                        "Request access to your personal data",
                        "Request correction of inaccurate information",
                        "Request deletion of your information",
                        "Withdraw consent to communications",
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-sans text-charcoal leading-[1.8]">
                            <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-regal-navy/40 inline-block" />
                            {item}
                        </li>
                    ))}
                </ul>
                <p className="text-charcoal font-sans text-sm leading-[1.8]">
                    To make a request, you may contact us using the details below.
                </p>
            </>
        ),
    },
    {
        id: "international",
        title: "8. International Data Transfers",
        content: (
            <p className="text-charcoal font-sans text-sm leading-[1.8]">
                As we work with clients across multiple countries, your information may be processed in different jurisdictions.
                We take appropriate steps to ensure your data is handled securely regardless of location.
            </p>
        ),
    },
    {
        id: "links",
        title: "9. Links to Other Websites",
        content: (
            <p className="text-charcoal font-sans text-sm leading-[1.8]">
                Our website may contain links to external websites. We are not responsible for the privacy practices of other sites and encourage you to review their policies.
            </p>
        ),
    },
    {
        id: "updates",
        title: "10. Updates to This Privacy Policy",
        content: (
            <p className="text-charcoal font-sans text-sm leading-[1.8]">
                We may update this policy from time to time. Changes will be reflected by updating the "Last Updated" date on this page.
            </p>
        ),
    },
    {
        id: "contact",
        title: "11. Contact Us",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-4">
                    If you have questions about this Privacy Policy, please contact us.
                </p>
                <div className="bg-[#0E3572]/5 border border-[#0E3572]/10 rounded-[10px] px-6 py-5 flex flex-col gap-2">
                    <p className="font-headings font-semibold text-regal-navy text-base">Netizens Technologies</p>
                    <p className="font-sans text-sm text-charcoal">
                        Email:{" "}
                        <a href="mailto:services@netizenstechnologies.com" className="text-regal-navy font-medium underline underline-offset-2 hover:opacity-75 transition-opacity">
                            services@netizenstechnologies.com
                        </a>
                    </p>
                    <p className="font-sans text-sm text-charcoal">
                        Website:{" "}
                        <a href="https://netizenstechnologies.com" target="_blank" rel="noopener noreferrer" className="text-regal-navy font-medium underline underline-offset-2 hover:opacity-75 transition-opacity">
                            netizenstechnologies.com
                        </a>
                    </p>
                </div>
            </>
        ),
    },
];

// ─── PrivacyPolicySection ─────────────────────────────────────────────────────

const PrivacyPolicySection: FC<PolicySection> = ({ title, content }) => (
    <div className="flex flex-col gap-4 py-8 border-b border-black/5 last:border-0">
        <h3 className="font-headings font-semibold text-regal-navy text-lg md:text-xl leading-snug">
            {title}
        </h3>
        <div>{content}</div>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const PrivacyPolicy: FC = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">

            {/* ── Page Header ──────────────────────────────────────────────── */}
            <div className="mb-10 flex flex-col gap-3 pt-20">
                {/* Badge */}
                {/* <div className="inline-flex w-fit items-center justify-center px-[18px] py-[8px] bg-[#0E3572]/5 border border-[#0E3572]/10 rounded-[4px]">
                    <span className="font-sans font-bold text-[12px] text-regal-navy uppercase tracking-wide">
                        Legal
                    </span>
                </div> */}

                <h1 className="font-headings font-normal text-3xl md:text-4xl leading-[1.2] text-carbon-black">
                    Privacy Policy
                </h1>

                <p className="font-sans text-sm text-charcoal/60 font-medium">
                    Last Updated: 6 March, 2026
                </p>

                {/* Intro */}
                <p className="font-sans text-sm leading-[1.8] text-charcoal max-w-3xl mt-1">
                    Netizens Technologies ("Netizens", "we", "our", or "us") respects your privacy and is committed to
                    protecting your personal information. This Privacy Policy explains how we collect, use, disclose,
                    and safeguard your information when you visit our website or interact with our services.
                </p>
                <p className="font-sans text-sm leading-[1.8] text-charcoal font-medium">
                    By using our website, you agree to the practices described in this policy.
                </p>
            </div>

            {/* ── Divider ──────────────────────────────────────────────────── */}
            <div className="w-full h-px bg-black/10 mb-2" />

            {/* ── Sections ─────────────────────────────────────────────────── */}
            <div className="flex flex-col">
                {SECTIONS.map((section) => (
                    <PrivacyPolicySection key={section.id} {...section} />
                ))}
            </div>
        </section>
    );
};
