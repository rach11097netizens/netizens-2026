"use client";
import { FC } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PolicySection {
    id: string;
    title: string;
    content: React.ReactNode;
}

// ─── Sections Data ────────────────────────────────────────────────────────────

const SECTIONS: PolicySection[] = [
    {
        id: "use-of-website",
        title: "1. Use of the Website",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">
                    You may use this website for lawful purposes only.
                </p>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">You agree not to:</p>
                <ul className="list-none flex flex-col gap-2 pl-0">
                    {[
                        "Use the site for illegal activities",
                        "Attempt unauthorized access to systems or data",
                        "Disrupt or damage website functionality",
                        "Copy or distribute website content without permission",
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-sans text-charcoal leading-[1.8]">
                            <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-regal-navy/40 inline-block" />
                            {item}
                        </li>
                    ))}
                </ul>
            </>
        ),
    },
    {
        id: "intellectual-property",
        title: "2. Intellectual Property",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">
                    All content on this website, including:
                </p>
                <ul className="list-none flex flex-col gap-2 mb-4 pl-0">
                    {["Text", "Graphics", "Logos", "Visual elements", "Software descriptions", "Service content"].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-sans text-charcoal leading-[1.8]">
                            <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-regal-navy/40 inline-block" />
                            {item}
                        </li>
                    ))}
                </ul>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">
                    is the intellectual property of Netizens Technologies unless otherwise stated.
                </p>
                <p className="text-charcoal font-sans text-sm leading-[1.8]">
                    You may not reproduce, distribute, or use this content without prior written permission.
                </p>
            </>
        ),
    },
    {
        id: "service-information",
        title: "3. Service Information",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">
                    Information on this website is provided for general informational purposes. While we strive for
                    accuracy, we do not guarantee that all information is complete, current, or free from errors.
                </p>
                <p className="text-charcoal font-sans text-sm leading-[1.8]">
                    Specific services, pricing, or project terms will always be defined through formal agreements.
                </p>
            </>
        ),
    },
    {
        id: "no-professional-advice",
        title: "4. No Professional Advice",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">
                    Content on this website should not be considered professional, legal, financial, or technical advice.
                </p>
                <p className="text-charcoal font-sans text-sm leading-[1.8]">
                    Any decisions based on information from this website are made at your own discretion.
                </p>
            </>
        ),
    },
    {
        id: "limitation-of-liability",
        title: "5. Limitation of Liability",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">
                    Netizens Technologies will not be liable for any damages arising from:
                </p>
                <ul className="list-none flex flex-col gap-2 mb-4 pl-0">
                    {[
                        "Website use",
                        "Website downtime",
                        "Errors or omissions in content",
                        "Third-party links or services",
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-sans text-charcoal leading-[1.8]">
                            <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-regal-navy/40 inline-block" />
                            {item}
                        </li>
                    ))}
                </ul>
                <p className="text-charcoal font-sans text-sm leading-[1.8]">
                    This includes direct, indirect, incidental, or consequential damages.
                </p>
            </>
        ),
    },
    {
        id: "third-party-links",
        title: "6. Third-Party Links",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">
                    Our website may contain links to external websites.
                </p>
                <p className="text-charcoal font-sans text-sm leading-[1.8]">
                    We are not responsible for the content, policies, or practices of third-party sites.
                </p>
            </>
        ),
    },
    {
        id: "changes-to-services",
        title: "7. Changes to Services",
        content: (
            <p className="text-charcoal font-sans text-sm leading-[1.8]">
                We reserve the right to modify or discontinue services, content, or website features without prior notice.
            </p>
        ),
    },
    {
        id: "governing-law",
        title: "8. Governing Law",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">
                    These Terms and Conditions shall be governed by and interpreted in accordance with the applicable
                    laws of the jurisdictions where Netizens Technologies operates.
                </p>
                <p className="text-charcoal font-sans text-sm leading-[1.8]">
                    Specific contractual engagements may define additional jurisdictional terms.
                </p>
            </>
        ),
    },
    {
        id: "updates-to-terms",
        title: "9. Updates to These Terms",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-3">
                    We may update these Terms and Conditions from time to time.
                </p>
                <p className="text-charcoal font-sans text-sm leading-[1.8]">
                    Continued use of the website after updates constitutes acceptance of the revised terms.
                </p>
            </>
        ),
    },
    {
        id: "contact",
        title: "10. Contact Information",
        content: (
            <>
                <p className="text-charcoal font-sans text-sm leading-[1.8] mb-4">
                    For questions regarding these Terms and Conditions, please contact us.
                </p>
                <div className="bg-[#0E3572]/5 border border-[#0E3572]/10 rounded-[10px] px-6 py-5 flex flex-col gap-2">
                    <p className="font-headings font-semibold text-regal-navy text-base">Netizens Technologies</p>
                    <p className="font-sans text-sm text-charcoal">
                        Email:{" "}
                        <a
                            href="mailto:services@netizenstechnologies.com"
                            className="text-regal-navy font-medium underline underline-offset-2 hover:opacity-75 transition-opacity"
                        >
                            services@netizenstechnologies.com
                        </a>
                    </p>
                    <p className="font-sans text-sm text-charcoal">
                        Website:{" "}
                        <a
                            href="https://netizenstechnologies.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-regal-navy font-medium underline underline-offset-2 hover:opacity-75 transition-opacity"
                        >
                            netizenstechnologies.com
                        </a>
                    </p>
                </div>
            </>
        ),
    },
];

// ─── TermsSection ─────────────────────────────────────────────────────────────

const TermsSection: FC<PolicySection> = ({ title, content }) => (
    <div className="flex flex-col gap-4 py-8 border-b border-black/5 last:border-0">
        <h3 className="font-headings font-semibold text-regal-navy text-lg md:text-xl leading-snug">
            {title}
        </h3>
        <div>{content}</div>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const TermsAndConditions: FC = () => {
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
                    Terms and Conditions
                </h1>

                <p className="font-sans text-sm text-charcoal/60 font-medium">
                    Last Updated: 6 March, 2026
                </p>

                <p className="font-sans text-sm leading-[1.8] text-charcoal max-w-3xl mt-1">
                    These Terms and Conditions govern your use of the Netizens Technologies website and services.
                </p>
                <p className="font-sans text-sm leading-[1.8] text-charcoal font-medium">
                    By accessing or using this website, you agree to comply with these terms.
                </p>
            </div>

            {/* ── Divider ──────────────────────────────────────────────────── */}
            <div className="w-full h-px bg-black/10 mb-2" />

            {/* ── Sections ─────────────────────────────────────────────────── */}
            <div className="flex flex-col">
                {SECTIONS.map((section) => (
                    <TermsSection key={section.id} {...section} />
                ))}
            </div>
        </section>
    );
};
