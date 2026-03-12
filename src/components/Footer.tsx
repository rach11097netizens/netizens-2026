"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import logo from "../assets/images/logo.svg";
import Link from "next/link";
import uae from "../assets/images/icons/uae.svg";
import us from "../assets/images/icons/us.svg";
import india from "../assets/images/icons/in.svg";
import brazil from "../assets/images/icons/br.svg";
import Image from "next/image";

const FacebookIcon = () => (
    <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5957 10.125L10.0845 6.86742H7.02823V4.75348C7.02823 3.86227 7.45517 2.99355 8.82398 2.99355H10.2134V0.220078C10.2134 0.220078 8.95255 0 7.74702 0C5.23008 0 3.58489 1.56023 3.58489 4.38469V6.86742H0.787109V10.125H3.58489V18H7.02823V10.125H9.5957Z" fill="currentColor" /></svg>
);

const InstagramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_2594_397)">
            <path d="M17.9825 5.29205C17.9404 4.33561 17.7857 3.67813 17.5641 3.10835C17.3355 2.50358 16.9839 1.96214 16.5233 1.51201C16.0731 1.05489 15.5281 0.699676 14.9303 0.474702C14.3573 0.253174 13.7032 0.0984567 12.7468 0.0563313C11.7832 0.0105489 11.4773 0 9.0335 0C6.58966 0 6.28378 0.0105489 5.32379 0.0527447C4.36739 0.0949404 3.70987 0.249728 3.14026 0.471115C2.53532 0.699676 1.99388 1.05131 1.54375 1.51201C1.08663 1.9621 0.73159 2.50713 0.50644 3.1049C0.284913 3.67813 0.13023 4.3321 0.0880696 5.28846C0.0423224 6.25204 0.0317383 6.55792 0.0317383 9.00176C0.0317383 11.4456 0.0423224 11.7515 0.084483 12.7115C0.126679 13.6679 0.281467 14.3254 0.50303 14.8952C0.73159 15.4999 1.08663 16.0414 1.54375 16.4915C1.99388 16.9486 2.5389 17.3038 3.13668 17.5288C3.70984 17.7503 4.3638 17.9051 5.32038 17.9472C6.28019 17.9895 6.58625 17.9999 9.03009 17.9999C11.4739 17.9999 11.7798 17.9895 12.7398 17.9472C13.6962 17.905 14.3537 17.7504 14.9233 17.5288C15.5216 17.2975 16.0649 16.9438 16.5184 16.4902C16.972 16.0367 17.3258 15.4934 17.5571 14.8952C17.7785 14.322 17.9334 13.6679 17.9755 12.7115C18.0177 11.7515 18.0283 11.4456 18.0283 9.00176C18.0283 6.55792 18.0247 6.252 17.9825 5.29205ZM16.3616 12.6411C16.3228 13.5202 16.1752 13.9949 16.0521 14.3114C15.7497 15.0955 15.1273 15.7179 14.3431 16.0204C14.0267 16.1435 13.5485 16.2911 12.6729 16.3297C11.7235 16.372 11.4388 16.3824 9.03708 16.3824C6.63541 16.3824 6.3471 16.372 5.40111 16.3297C4.52203 16.2911 4.04733 16.1435 3.73086 16.0204C3.34066 15.8761 2.98548 15.6476 2.69714 15.3487C2.39825 15.0568 2.16969 14.7052 2.02545 14.315C1.90238 13.9985 1.75473 13.5202 1.71616 12.6447C1.67382 11.6953 1.66341 11.4104 1.66341 9.00876C1.66341 6.60708 1.67382 6.31878 1.71616 5.37296C1.75473 4.49388 1.90238 4.01918 2.02545 3.70271C2.16969 3.31233 2.39825 2.95722 2.70072 2.66881C2.99244 2.36992 3.34407 2.14136 3.73445 1.9973C4.05092 1.87423 4.52921 1.72654 5.4047 1.68783C6.3541 1.64563 6.63899 1.63508 9.04049 1.63508C11.4458 1.63508 11.7305 1.64563 12.6765 1.68783C13.5555 1.72658 14.0302 1.87419 14.3467 1.99726C14.7369 2.14136 15.0921 2.36992 15.3804 2.66881C15.6793 2.9607 15.9079 3.31233 16.0521 3.70271C16.1752 4.01918 16.3228 4.49729 16.3616 5.37296C16.4038 6.32236 16.4143 6.60708 16.4143 9.00876C16.4143 11.4104 16.4038 11.6917 16.3616 12.6411Z" fill="currentColor" />
            <path d="M9.03362 4.37801C6.48085 4.37801 4.40967 6.44905 4.40967 9.00196C4.40967 11.5549 6.48085 13.6259 9.03362 13.6259C11.5865 13.6259 13.6576 11.5549 13.6576 9.00196C13.6576 6.44905 11.5865 4.37801 9.03362 4.37801ZM9.03362 12.0014C7.37751 12.0014 6.03413 10.6582 6.03413 9.00196C6.03413 7.34571 7.37751 6.00254 9.03358 6.00254C10.6898 6.00254 12.033 7.34571 12.033 9.00196C12.033 10.6582 10.6898 12.0014 9.03362 12.0014ZM14.92 4.19516C14.92 4.79132 14.4366 5.27467 13.8403 5.27467C13.2442 5.27467 12.7609 4.79132 12.7609 4.19516C12.7609 3.59893 13.2442 3.11572 13.8404 3.11572C14.4366 3.11572 14.92 3.5989 14.92 4.19516Z" fill="currentColor" />
        </g>
        <defs>
            <clipPath id="clip0_2594_397">
                <rect width="18" height="18" fill="white" />
            </clipPath>
        </defs>
    </svg>

);

const XIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.6828 1.6875H16.1648L10.7438 7.88203L17.1211 16.3125H12.1289L8.21602 11.2008L3.74414 16.3125H1.25859L7.05586 9.68555L0.942187 1.6875H6.06094L9.59414 6.35977L13.6828 1.6875ZM12.8109 14.8289H14.1855L5.31211 3.09375H3.83555L12.8109 14.8289Z" fill="currentColor" /></svg>
);

const LinkedInIcon = () => (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.58143 15.7501H0.264286V5.23488H3.58143V15.7501ZM1.92107 3.80051C0.860357 3.80051 0 2.93566 0 1.89152C7.59214e-09 1.38998 0.202398 0.908987 0.562669 0.554346C0.92294 0.199704 1.41157 0.000468788 1.92107 0.000468788C2.43057 0.000468788 2.9192 0.199704 3.27947 0.554346C3.63974 0.908987 3.84214 1.38998 3.84214 1.89152C3.84214 2.93566 2.98143 3.80051 1.92107 3.80051ZM15.9964 15.7501H12.6864V10.6314C12.6864 9.41144 12.6614 7.84699 10.9618 7.84699C9.23714 7.84699 8.97286 9.17238 8.97286 10.5435V15.7501H5.65929V5.23488H8.84071V6.66926H8.88714C9.33 5.84309 10.4118 4.97121 12.0257 4.97121C15.3829 4.97121 16 7.14738 16 9.97395V15.7501H15.9964Z" fill="currentColor" /></svg>
);

const TeamsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5598 5.8815C16.4312 5.8815 17.1402 5.17266 17.1402 4.30128C17.0572 2.20626 14.062 2.2068 13.9796 4.30128C13.9794 5.17266 14.6882 5.8815 15.5598 5.8815ZM17.0356 7.2306H14.2571C14.3468 7.39188 14.3923 7.57548 14.3893 7.76052V12.4852C14.4 12.9702 14.3387 13.4541 14.2075 13.9212C14.1664 14.0622 14.1202 14.2017 14.0689 14.3393C14.3493 14.4401 14.6407 14.4911 14.9381 14.4909C16.3844 14.4909 17.5499 13.3252 17.5499 11.8926V7.74504C17.5498 7.60866 17.4956 7.4779 17.3992 7.38145C17.3027 7.285 17.172 7.23074 17.0356 7.2306ZM13.8523 7.65072C13.8109 7.4187 13.6039 7.23564 13.3667 7.2306H9.46949V12.7741C9.46921 13.0435 9.36206 13.3017 9.17157 13.4922C8.98107 13.6827 8.72279 13.7899 8.45339 13.7902H5.53613C6.71369 17.7656 12.0062 18.0101 13.5555 14.1966C13.7697 13.6542 13.8734 13.0744 13.8602 12.4913V7.7544C13.861 7.71967 13.8583 7.68494 13.8523 7.65072ZM8.45357 4.2417C8.72295 4.24194 8.98124 4.34904 9.17174 4.53951C9.36224 4.72997 9.46939 4.98824 9.46967 5.25762V5.85414C9.58847 5.87232 9.70583 5.8815 9.82013 5.8815C13.004 5.74992 13.004 1.2123 9.82013 1.0809C8.21165 1.05336 7.01087 2.7279 7.54331 4.2417H8.45357Z" fill="currentColor" />
        <path d="M8.94061 12.7743V5.25772C8.94047 5.12864 8.88912 5.0049 8.79784 4.91365C8.70655 4.8224 8.58279 4.77109 8.45372 4.771H0.937095C0.808036 4.77114 0.684302 4.82246 0.593026 4.9137C0.501751 5.00494 0.450386 5.12866 0.450195 5.25772V12.7743C0.450291 12.9034 0.50162 13.0272 0.59291 13.1185C0.684201 13.2098 0.807991 13.2611 0.937095 13.2612H8.45372C8.58281 13.2611 8.70657 13.2097 8.79785 13.1185C8.88913 13.0272 8.94047 12.9034 8.94061 12.7743ZM6.93776 7.36696C6.93776 7.43713 6.90988 7.50443 6.86026 7.55406C6.81063 7.60368 6.74333 7.63156 6.67315 7.63156H5.43512V11.4585C5.43512 11.5287 5.40724 11.596 5.35762 11.6456C5.30799 11.6953 5.24069 11.7231 5.17052 11.7231H4.21328C4.1431 11.7231 4.0758 11.6953 4.02617 11.6456C3.97655 11.596 3.94868 11.5287 3.94868 11.4585V7.63156H2.71766C2.64748 7.63156 2.58018 7.60368 2.53055 7.55406C2.48093 7.50443 2.45306 7.43713 2.45306 7.36696V6.57316C2.45306 6.427 2.5715 6.30856 2.71766 6.30856H6.67315C6.81931 6.30856 6.93776 6.427 6.93776 6.57316V7.36696Z" fill="currentColor" />
        <path d="M2.98242 7.10267H4.21344C4.3596 7.10267 4.47804 7.22111 4.47804 7.36727V11.1943H4.90608V7.36709C4.90608 7.22111 5.02452 7.10249 5.17068 7.10249H6.40872V6.83789H2.98242V7.10267Z" fill="currentColor" />
    </svg>

);

const NewsletterArrow = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.7855 2.286C2.71805 2.25307 2.64224 2.24123 2.56795 2.25202C2.49367 2.26281 2.42436 2.29574 2.36907 2.3465C2.31377 2.39726 2.27505 2.46351 2.25796 2.5366C2.24087 2.60969 2.2462 2.68623 2.27325 2.75625L4.4055 8.4765C4.53125 8.81417 4.53125 9.18583 4.4055 9.5235L2.274 15.2438C2.24708 15.3137 2.24183 15.3901 2.25891 15.4631C2.27599 15.536 2.31463 15.6022 2.36979 15.6529C2.42495 15.7036 2.4941 15.7365 2.56823 15.7474C2.64237 15.7583 2.71807 15.7467 2.7855 15.714L16.2855 9.339C16.3497 9.30863 16.404 9.26064 16.442 9.20063C16.48 9.14061 16.5002 9.07104 16.5002 9C16.5002 8.92896 16.48 8.85939 16.442 8.79937C16.404 8.73936 16.3497 8.69137 16.2855 8.661L2.7855 2.286Z" fill="currentColor" /></svg>
);

const EmailIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V17C21 17.5304 20.7893 18.0391 20.4142 18.4142C20.0391 18.7893 19.5304 19 19 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V7Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const PhoneIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const WhatsappIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 21L4.65 17.2C3.38766 15.4081 2.82267 13.217 3.06104 11.0381C3.29942 8.85918 4.32479 6.84214 5.94471 5.36552C7.56463 3.8889 9.66775 3.05421 11.8594 3.0181C14.051 2.98198 16.1805 3.74693 17.8482 5.16937C19.5159 6.59182 20.6071 8.57398 20.9172 10.7439C21.2272 12.9138 20.7347 15.1222 19.5321 16.9548C18.3295 18.7873 16.4994 20.118 14.3854 20.6971C12.2713 21.2762 10.0186 21.0639 8.05 20.1L3 21Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 10C9 10.1326 9.05268 10.2598 9.14645 10.3536C9.24021 10.4473 9.36739 10.5 9.5 10.5C9.63261 10.5 9.75979 10.4473 9.85355 10.3536C9.94732 10.2598 10 10.1326 10 10V9C10 8.86739 9.94732 8.74021 9.85355 8.64645C9.75979 8.55268 9.63261 8.5 9.5 8.5C9.36739 8.5 9.24021 8.55268 9.14645 8.64645C9.05268 8.74021 9 8.86739 9 9V10ZM9 10C9 11.3261 9.52678 12.5979 10.4645 13.5355C11.4021 14.4732 12.6739 15 14 15M14 15H15C15.1326 15 15.2598 14.9473 15.3536 14.8536C15.4473 14.7598 15.5 14.6326 15.5 14.5C15.5 14.3674 15.4473 14.2402 15.3536 14.1464C15.2598 14.0527 15.1326 14 15 14H14C13.8674 14 13.7402 14.0527 13.6464 14.1464C13.5527 14.2402 13.5 14.3674 13.5 14.5C13.5 14.6326 13.5527 14.7598 13.6464 14.8536C13.7402 14.9473 13.8674 15 14 15Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/*
  AccordionSection — single heading element, dual behaviour.

  The heading is rendered as ONE <h4> in the DOM.
  On mobile it wraps in a <button>-like row (pointer cursor, onClick).
  On desktop the click handler is a no-op and the chevron is hidden.
  Content visibility is controlled purely by CSS: always visible on md+
  via `md:max-h-none md:opacity-100`, toggled by state on mobile.
*/
const AccordionSection = ({
    title,
    children,
    isOpen,
    onToggle,
}: {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}) => (
    <div className="flex flex-col">
        {/* Single heading row — acts as accordion trigger on mobile, static on desktop */}
        <div
            role="button"
            tabIndex={0}
            onClick={onToggle}
            onKeyDown={(e) => e.key === 'Enter' && onToggle()}
            className="flex items-center justify-between w-full py-3 lg:py-0 border-b border-carbon-black/10 cursor-pointer md:cursor-default md:border-none md:pb-0 md:mb-4"
        >
            <h3 className="font-sans font-bold text-sm text-[#0e3572]">{title}</h3>
            {/* Chevron — decorative on mobile, hidden on desktop */}
            <ChevronDown
                size={18}
                aria-hidden="true"
                className={`md:hidden text-[#0e3572] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
        </div>

        {/* Content — CSS-toggled on mobile, always visible on md+ */}
        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out
                md:!max-h-none md:!opacity-100 md:overflow-visible
                ${isOpen ? "max-h-96 opacity-100 mt-3 md:mt-0" : "max-h-0 opacity-0"}`}
        >
            {children}
        </div>
    </div>
);

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const toggleAccordion = (key: string) => {
        setOpenAccordion((prev) => (prev === key ? null : key));
    };

    return (
        <footer className="w-full flex flex-col font-sans">
            {/* Top White Section */}
            <div className="w-full bg-white flex flex-col items-center py-10 md:py-16 px-4 md:px-8">
                <div className="w-full max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_1fr_auto] gap-3 md:gap-10 xl:gap-16 2xl:gap-20">

                    {/* Left: Branding & Newsletter */}
                    <div className="flex flex-col gap-8 w-full max-w-xs md:max-w-sm mx-auto">
                        <div className="h-[82px] w-[276px] overflow-hidden">
                            <Link href="/">
                                <Image src={logo} alt="Netizens" className="w-full h-auto max-h-[82px] object-contain object-left" />
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <p className="font-sans font-bold text-sm text-[#0e3572]">
                                Subscribe to our Newsletter
                            </p>
                            <div className="border-b border-charcoal/40 flex items-center justify-between py-1.5 w-full transition-colors focus-within:border-regal-navy">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-transparent border-none outline-none font-sans font-medium text-sm text-carbon-black/80 placeholder:text-gray-600/40 flex-1 w-full"
                                />
                                <button className="bg-[#0e3572] hover:bg-[#0b2a5b] transition-colors flex items-center justify-center rounded-full shrink-0 h-9 w-9 text-white outline-none active:scale-95">
                                    <NewsletterArrow aria-hidden="true" />
                                    <span className="sr-only">Arrow Submit Button</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Middle: Links Grid */}
                    <div className="flex flex-col md:flex-row gap-0 md:gap-10 xl:gap-16 2xl:gap-20 w-full max-w-xs md:max-w-full mx-auto">
                        <AccordionSection
                            title="Services"
                            isOpen={openAccordion === 'services'}
                            onToggle={() => toggleAccordion('services')}
                        >
                            <div className="flex flex-col gap-3 font-sans font-normal text-sm text-carbon-black opacity-80 pb-2 md:pb-0">
                                <Link href="/mvp-development" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">Product Development</Link>
                                <Link href="/staff-augmentation" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">Staff Augmentation</Link>
                                <Link href="/ai-consulting" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">AI Consulting & Automation</Link>
                                <Link href="/workflow-digitization" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">Workflow Digitization</Link>
                                <Link href="/support-and-scale" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">Support & Scale</Link>
                            </div>
                        </AccordionSection>

                        <AccordionSection
                            title="Company"
                            isOpen={openAccordion === 'company'}
                            onToggle={() => toggleAccordion('company')}
                        >
                            <div className="flex flex-col gap-3 font-sans font-normal text-sm text-carbon-black opacity-80 pb-2 md:pb-0">
                                <Link href="/about-us" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">About</Link>
                                <Link href="/case-studies" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">Case Studies</Link>
                                <Link href="/how-we-work" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">How We Work</Link>
                                <a href="#" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">Insights</a>
                                <a href="#" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">Careers</a>
                            </div>
                        </AccordionSection>

                        <AccordionSection
                            title="Our Presence"
                            isOpen={openAccordion === 'ourPresence'}
                            onToggle={() => toggleAccordion('ourPresence')}
                        >
                            <div className="flex flex-col gap-3 opacity-80 pb-2 md:pb-0">
                                <p className="flex flex-row-reverse justify-end items-center gap-2 font-sans font-normal text-sm text-carbon-black underline-offset-4 decoration-regal-navy/30 transition-all">India <Image src={india} width="24" alt="" /></p>
                                <p className="flex flex-row-reverse justify-end items-center gap-2 font-sans font-normal text-sm text-carbon-black underline-offset-4 decoration-regal-navy/30 transition-all">US <Image src={us} width="24" alt="" /></p>
                                <p className="flex flex-row-reverse justify-end items-center gap-2 font-sans font-normal text-sm text-carbon-black underline-offset-4 decoration-regal-navy/30 transition-all">UAE <Image src={uae} width="24" alt="" /></p>
                                <p className="flex flex-row-reverse justify-end items-center gap-2 font-sans font-normal text-sm text-carbon-black underline-offset-4 decoration-regal-navy/30 transition-all">Brazil <Image src={brazil} width="24" alt="" /></p>
                            </div>
                        </AccordionSection>
                    </div>

                    {/* Right: Reach Us */}
                    <div className="flex flex-col gap-4 w-full md:col-span-2 lg:col-span-1 max-w-xs md:max-w-full mx-auto">
                        <h4 className="font-sans font-bold text-sm text-[#0e3572]">Reach Us at</h4>

                        <div className="flex flex-col gap-4 w-full">
                            <a href="mailto:services@netizenstechnologies.com" className="flex items-center gap-2 text-carbon-black hover:text-regal-navy transition-colors">
                                <span className="text-carbon-black shrink-0 w-6 h-6 flex items-center justify-center">
                                    <EmailIcon />
                                </span>
                                <span className="font-sans font-normal text-sm break-all">services@netizenstechnologies.com</span>
                            </a>

                            <div className="flex items-center gap-4 w-full">
                                <a href="tel:+917777940642" className="bg-regal-navy/10 hover:bg-regal-navy/20 transition-colors flex-1 flex items-center justify-between px-4 py-2 rounded-md group">
                                    <span className="font-sans font-medium text-sm text-regal-navy">Call Us</span>
                                    <span className="text-regal-navy w-5 h-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                        <PhoneIcon />
                                    </span>
                                </a>
                                <a href="https://wa.me/+919313440642" className="bg-regal-navy/10 hover:bg-regal-navy/20 transition-colors flex-1 flex items-center justify-between px-4 py-2 rounded-md group">
                                    <span className="font-sans font-medium text-sm text-regal-navy">Whatsapp</span>
                                    <span className="text-regal-navy w-5 h-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                        <WhatsappIcon />
                                    </span>
                                </a>
                            </div>

                            <hr className="border-t border-carbon-black/10 my-1 w-full" />

                            <div className="flex items-center gap-2">
                                <a href="https://www.facebook.com/netizenstech" aria-label="Follow us on Facebook" className="text-[#0e3572] border border-regal-navy/10 hover:bg-regal-navy hover:text-white transition-all w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                    <FacebookIcon aria-hidden="true" />
                                </a>
                                <a href="https://www.instagram.com/lyrcomercialsrl/" aria-label="Follow us on Instagram" className="text-[#0e3572] border border-regal-navy/10 hover:bg-regal-navy hover:text-white transition-all w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                    <InstagramIcon aria-hidden="true" />
                                </a>
                                <a href="https://x.com/netizenstech" aria-label="Follow us on X" className="text-[#0e3572] border border-regal-navy/10 hover:bg-regal-navy hover:text-white transition-all w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                    <XIcon aria-hidden="true" />
                                </a>
                                <a href="https://www.linkedin.com/company/netizenstechnologies/posts/?feedView=all" aria-label="Follow us on LinkedIn" className="text-[#0e3572] border border-regal-navy/10 hover:bg-regal-navy hover:text-white transition-all w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                    <LinkedInIcon aria-hidden="true" />
                                </a>
                                <a href="#" aria-label="Follow us on Teams" className="text-[#0e3572] border border-regal-navy/10 hover:bg-regal-navy hover:text-white transition-all w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                    <TeamsIcon aria-hidden="true" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navy Section */}
            <div className="w-full bg-[#0B2A5B] py-4 px-4 md:px-8">
                <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-sans text-xs md:text-sm text-[#FFFAFA] opacity-90 text-center md:text-left">
                        Copyright © {currentYear} netizenstechnologies.com - All rights reserved.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 font-sans text-xs md:text-sm text-[#FFFAFA] opacity-90">
                        <a href="/privacy-policy" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200">Privacy Policy</a>
                        <a href="/terms-of-services" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200">Terms & Conditions</a>
                        {/* <a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200">Cookie Policy</a> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};
