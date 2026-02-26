import { useState } from "react";
import { ChevronDown } from "lucide-react";
import logo from "../assets/images/logo.svg";

const FacebookIcon = () => (
    <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5957 10.125L10.0845 6.86742H7.02823V4.75348C7.02823 3.86227 7.45517 2.99355 8.82398 2.99355H10.2134V0.220078C10.2134 0.220078 8.95255 0 7.74702 0C5.23008 0 3.58489 1.56023 3.58489 4.38469V6.86742H0.787109V10.125H3.58489V18H7.02823V10.125H9.5957Z" fill="currentColor" /></svg>
);

const PinterestIcon = () => (
    <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.96875 0.253906C3.96094 0.253906 0 2.92578 0 7.25C0 10 1.54687 11.5625 2.48437 11.5625C2.87109 11.5625 3.09375 10.4844 3.09375 10.1797C3.09375 9.81641 2.16797 9.04297 2.16797 7.53125C2.16797 4.39063 4.55859 2.16406 7.65234 2.16406C10.3125 2.16406 12.2812 3.67578 12.2812 6.45312C12.2812 8.52734 11.4492 12.418 8.75391 12.418C7.78125 12.418 6.94922 11.7148 6.94922 10.707C6.94922 9.23047 7.98047 7.80078 7.98047 6.27734C7.98047 3.69141 4.3125 4.16016 4.3125 7.28516C4.3125 7.94141 4.39453 8.66797 4.6875 9.26562C4.14844 11.5859 3.04688 15.043 3.04688 17.4336C3.04688 18.1719 3.15234 18.8984 3.22266 19.6367C3.35547 19.7852 3.28906 19.7695 3.49219 19.6953C5.46094 17 5.39063 16.4727 6.28125 12.9453C6.76172 13.8594 8.00391 14.3516 8.98828 14.3516C13.1367 14.3516 15 10.3086 15 6.66406C15 2.78516 11.6484 0.253906 7.96875 0.253906Z" fill="currentColor" /></svg>
);

const XIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.6828 1.6875H16.1648L10.7438 7.88203L17.1211 16.3125H12.1289L8.21602 11.2008L3.74414 16.3125H1.25859L7.05586 9.68555L0.942187 1.6875H6.06094L9.59414 6.35977L13.6828 1.6875ZM12.8109 14.8289H14.1855L5.31211 3.09375H3.83555L12.8109 14.8289Z" fill="currentColor" /></svg>
);

const LinkedInIcon = () => (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.58143 15.7501H0.264286V5.23488H3.58143V15.7501ZM1.92107 3.80051C0.860357 3.80051 0 2.93566 0 1.89152C7.59214e-09 1.38998 0.202398 0.908987 0.562669 0.554346C0.92294 0.199704 1.41157 0.000468788 1.92107 0.000468788C2.43057 0.000468788 2.9192 0.199704 3.27947 0.554346C3.63974 0.908987 3.84214 1.38998 3.84214 1.89152C3.84214 2.93566 2.98143 3.80051 1.92107 3.80051ZM15.9964 15.7501H12.6864V10.6314C12.6864 9.41144 12.6614 7.84699 10.9618 7.84699C9.23714 7.84699 8.97286 9.17238 8.97286 10.5435V15.7501H5.65929V5.23488H8.84071V6.66926H8.88714C9.33 5.84309 10.4118 4.97121 12.0257 4.97121C15.3829 4.97121 16 7.14738 16 9.97395V15.7501H15.9964Z" fill="currentColor" /></svg>
);

const SkypeIcon = () => (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.0638 11.7109C17.1804 11.1641 17.2527 10.582 17.2527 10C17.2527 5.56641 13.5603 1.98047 9.00402 1.98047C8.40536 1.98047 7.81071 2.04688 7.2442 2.16406C6.4808 1.58984 5.53259 1.25 4.5 1.25C2.01696 1.25 0 3.21094 0 5.625C0 6.62891 0.349554 7.55078 0.936161 8.28906C0.819643 8.83594 0.747321 9.41797 0.747321 10C0.747321 14.4336 4.43973 18.0195 8.99598 18.0195C9.59464 18.0195 10.1893 17.9531 10.7558 17.8359C11.5192 18.4063 12.4674 18.7461 13.496 18.7461C15.979 18.7461 17.996 16.7852 17.996 14.3711C18 13.3711 17.6504 12.4492 17.0638 11.7109ZM9.24509 15.2852C6.60938 15.2852 4.40357 14.1445 4.40357 12.7461C4.40357 12.1211 4.76518 11.5508 5.58884 11.5508C6.84241 11.5508 6.95893 13.3047 9.12857 13.3047C10.1612 13.3047 10.8281 12.8594 10.8281 12.2773C10.8281 11.5469 10.1853 11.4336 9.14062 11.1836C6.62946 10.582 4.40759 10.3242 4.40759 7.77734C4.40759 5.46484 6.76205 4.60938 8.79107 4.60938C11.0049 4.60938 13.2429 5.46484 13.2429 6.77344C13.2429 7.43359 12.7848 8.01562 12.0254 8.01562C10.8884 8.01562 10.8522 6.70703 9.01205 6.70703C7.97946 6.70703 7.32455 6.98047 7.32455 7.58594C7.32455 8.35937 8.16027 8.4375 10.1009 8.875C11.7643 9.23828 13.7451 9.92187 13.7451 11.9062C13.7451 14.2148 11.4509 15.2852 9.24509 15.2852Z" fill="currentColor" /></svg>
);

const NewsletterArrow = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.7855 2.286C2.71805 2.25307 2.64224 2.24123 2.56795 2.25202C2.49367 2.26281 2.42436 2.29574 2.36907 2.3465C2.31377 2.39726 2.27505 2.46351 2.25796 2.5366C2.24087 2.60969 2.2462 2.68623 2.27325 2.75625L4.4055 8.4765C4.53125 8.81417 4.53125 9.18583 4.4055 9.5235L2.274 15.2438C2.24708 15.3137 2.24183 15.3901 2.25891 15.4631C2.27599 15.536 2.31463 15.6022 2.36979 15.6529C2.42495 15.7036 2.4941 15.7365 2.56823 15.7474C2.64237 15.7583 2.71807 15.7467 2.7855 15.714L16.2855 9.339C16.3497 9.30863 16.404 9.26064 16.442 9.20063C16.48 9.14061 16.5002 9.07104 16.5002 9C16.5002 8.92896 16.48 8.85939 16.442 8.79937C16.404 8.73936 16.3497 8.69137 16.2855 8.661L2.7855 2.286Z" fill="currentColor" /></svg>
);

const EmailIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V17C21 17.5304 20.7893 18.0391 20.4142 18.4142C20.0391 18.7893 19.5304 19 19 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V7Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /><path d="M3 7L12 13L21 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
);

const PhoneIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
);

const WhatsappIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 21L4.65 17.2C3.38766 15.4081 2.82267 13.217 3.06104 11.0381C3.29942 8.85918 4.32479 6.84214 5.94471 5.36552C7.56463 3.8889 9.66775 3.05421 11.8594 3.0181C14.051 2.98198 16.1805 3.74693 17.8482 5.16937C19.5159 6.59182 20.6071 8.57398 20.9172 10.7439C21.2272 12.9138 20.7347 15.1222 19.5321 16.9548C18.3295 18.7873 16.4994 20.118 14.3854 20.6971C12.2713 21.2762 10.0186 21.0639 8.05 20.1L3 21Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /><path d="M9 10C9 10.1326 9.05268 10.2598 9.14645 10.3536C9.24021 10.4473 9.36739 10.5 9.5 10.5C9.63261 10.5 9.75979 10.4473 9.85355 10.3536C9.94732 10.2598 10 10.1326 10 10V9C10 8.86739 9.94732 8.74021 9.85355 8.64645C9.75979 8.55268 9.63261 8.5 9.5 8.5C9.36739 8.5 9.24021 8.55268 9.14645 8.64645C9.05268 8.74021 9 8.86739 9 9V10ZM9 10C9 11.3261 9.52678 12.5979 10.4645 13.5355C11.4021 14.4732 12.6739 15 14 15M14 15H15C15.1326 15 15.2598 14.9473 15.3536 14.8536C15.4473 14.7598 15.5 14.6326 15.5 14.5C15.5 14.3674 15.4473 14.2402 15.3536 14.1464C15.2598 14.0527 15.1326 14 15 14H14C13.8674 14 13.7402 14.0527 13.6464 14.1464C13.5527 14.2402 13.5 14.3674 13.5 14.5C13.5 14.6326 13.5527 14.7598 13.6464 14.8536C13.7402 14.9473 13.8674 15 14 15Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
);

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
        {/* Mobile: clickable header with chevron */}
        <button
            onClick={onToggle}
            className="md:hidden flex items-center justify-between w-full py-3 border-b border-carbon-black/10"
        >
            <h4 className="font-sans font-bold text-sm text-[#0e3572]">{title}</h4>
            <ChevronDown
                size={18}
                className={`text-[#0e3572] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                    }`}
            />
        </button>
        {/* Desktop: static header */}
        <h4 className="hidden md:block font-sans font-bold text-sm text-[#0e3572] mb-4">{title}</h4>
        {/* Content: hidden on mobile unless open, always visible on lg+ */}
        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out md:!max-h-none md:!opacity-100 ${isOpen ? "max-h-96 opacity-100 mt-3 md:mt-0" : "max-h-0 opacity-0"
                }`}
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
                <div className="w-full max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_1fr_auto] gap-10 md:gap-8 lg:gap-10">

                    {/* Left: Branding & Newsletter */}
                    <div className="flex flex-col gap-8 w-full max-w-xs md:max-w-sm mx-auto">
                        <div className="h-[82px] w-[276px] overflow-hidden">
                            <img src={logo} alt="Netizens" className="w-full h-auto max-h-[82px] object-contain object-left" />
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
                                    <NewsletterArrow />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Middle: Links Grid — accordion on mobile, always open on md+ */}
                    <div className="flex flex-col md:flex-row gap-0 md:gap-8 xl:gap-16 w-full max-w-xs md:max-w-full mx-auto">
                        <AccordionSection
                            title="Services"
                            isOpen={openAccordion === 'services'}
                            onToggle={() => toggleAccordion('services')}
                        >
                            <div className="flex flex-col gap-3 font-sans font-normal text-sm text-carbon-black opacity-80 pb-2 md:pb-0">
                                <a href="#" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">Product Development</a>
                                <a href="#" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">Staff Augmentation</a>
                                <a href="#" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">AI Consulting & Automation</a>
                                <a href="#" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">Workflow Digitization</a>
                                <a href="#" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">Support & Scale</a>
                            </div>
                        </AccordionSection>

                        <AccordionSection
                            title="Company"
                            isOpen={openAccordion === 'company'}
                            onToggle={() => toggleAccordion('company')}
                        >
                            <div className="flex flex-col gap-3 font-sans font-normal text-sm text-carbon-black opacity-80 pb-2 md:pb-0">
                                <a href="#" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">About</a>
                                <a href="#" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">Case Studies</a>
                                <a href="#" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">How We Work</a>
                                <a href="#" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">Insights</a>
                                <a href="#" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">Careers</a>
                                <a href="#" className="hover:text-regal-navy hover:underline underline-offset-4 decoration-regal-navy/30 transition-all">Contact</a>
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
                                <a href="#" className="bg-regal-navy/10 hover:bg-regal-navy/20 transition-colors flex-1 flex items-center justify-between px-4 py-2 rounded-md group">
                                    <span className="font-sans font-medium text-sm text-regal-navy">Call Us</span>
                                    <span className="text-regal-navy w-5 h-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                        <PhoneIcon />
                                    </span>
                                </a>
                                <a href="#" className="bg-regal-navy/10 hover:bg-regal-navy/20 transition-colors flex-1 flex items-center justify-between px-4 py-2 rounded-md group">
                                    <span className="font-sans font-medium text-sm text-regal-navy">Whatsapp</span>
                                    <span className="text-regal-navy w-5 h-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                        <WhatsappIcon />
                                    </span>
                                </a>
                            </div>

                            <hr className="border-t border-carbon-black/10 my-1 w-full" />

                            <div className="flex items-center gap-2">
                                <a href="#" className="text-[#0e3572] border border-regal-navy/10 hover:bg-regal-navy hover:text-white transition-all w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                    <FacebookIcon />
                                </a>
                                <a href="#" className="text-[#0e3572] border border-regal-navy/10 hover:bg-regal-navy hover:text-white transition-all w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                    <PinterestIcon />
                                </a>
                                <a href="#" className="text-[#0e3572] border border-regal-navy/10 hover:bg-regal-navy hover:text-white transition-all w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                    <XIcon />
                                </a>
                                <a href="#" className="text-[#0e3572] border border-regal-navy/10 hover:bg-regal-navy hover:text-white transition-all w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                    <LinkedInIcon />
                                </a>
                                <a href="#" className="text-[#0e3572] border border-regal-navy/10 hover:bg-regal-navy hover:text-white transition-all w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                    <SkypeIcon />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Navy Section (Footnote) */}
            <div className="w-full bg-[#0B2A5B] py-4 px-4 md:px-8">
                <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Copyright info */}
                    <p className="font-sans text-xs md:text-sm text-[#FFFAFA] opacity-90 text-center md:text-left">
                        Copyright © {currentYear} netizenstechnologies.com - All rights reserved.
                    </p>

                    {/* Policy Links */}
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 font-sans text-xs md:text-sm text-[#FFFAFA] opacity-90">
                        <a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200">
                            Terms & Conditions
                        </a>
                        <a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
