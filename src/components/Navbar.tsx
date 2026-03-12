"use client";
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, PhoneIncoming } from 'lucide-react'
import { BookCallButton } from './BookCallButton'
import logoSvg from '../assets/images/logo.svg'
import Link from 'next/link'
import bulletIcon from "../assets/images/icons/bullet-icons.svg";
import Image from 'next/image';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [servicesOpen, setServicesOpen] = useState(false)
    const [companyOpen, setCompanyOpen] = useState(false)
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
    const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false)

    const servicesDropdownRef = useRef<HTMLDivElement>(null)
    const companyDropdownRef = useRef<HTMLDivElement>(null)

    const closeMenus = () => {
        setServicesOpen(false)
        setCompanyOpen(false)
    }

    const services = [
        { label: "Product Development", to: "/mvp-development" },
        { label: "Staff Augmentation", to: "/staff-augmentation" },
        { label: "AI Consulting & Automation", to: "/ai-consulting" },
        { label: "Workflow Digitization", to: "/workflow-digitization" },
        { label: "Support & Scale", to: "/support-and-scale" },
    ]

    const company = [
        { label: "About", to: "/about-us" },
        { label: "Careers", to: "#careers" },
        { label: "FAQ", to: "/faq" },
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node

            if (
                servicesDropdownRef.current &&
                !servicesDropdownRef.current.contains(target)
            ) {
                setServicesOpen(false)
            }

            if (
                companyDropdownRef.current &&
                !companyDropdownRef.current.contains(target)
            ) {
                setCompanyOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () =>
            document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-200 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'
            }`}>
            <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                <div className="flex items-center justify-between h-16 md:h-20 gap-2">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src={logoSvg}
                            alt="Netizens"
                            className="h-10 md:h-12 w-auto"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                        {/* Services Dropdown */}
                        <div
                            ref={servicesDropdownRef}
                            className=""
                        >
                            <button
                                onClick={() => {
                                    setServicesOpen(!servicesOpen)
                                    setCompanyOpen(false)
                                }}
                                className="flex items-center gap-1 text-gray-700 uppercase text-sm hover:text-black transition-colors"
                            >
                                Services
                                <ChevronDown size={16} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {servicesOpen && (
                                // <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                //     {services.map((service, index) => (
                                //         <Link
                                //             key={index}
                                //             href={`#${service.toLowerCase().replace(/\s+/g, '-')}`}
                                //             className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                                //             onClick={() => setServicesOpen(false)}
                                //         >
                                //             {service}
                                //         </Link>
                                //     ))}
                                // </div>
                                <div className="absolute top-[65px] left-1/2 -translate-x-1/2 w-full max-w-[1320px] bg-gray-100 border-[1.5px] border-[rgba(14,53,114,0.2)] shadow-[0px_20px_40px_rgba(0,0,0,0.08)] rounded-[18px] overflow-hidden grid grid-cols-3 grid-rows-2 gap-[1px] z-50">
                                    {/* Category 1 */}
                                    <Link href="/mvp-development" onClick={closeMenus} className="bg-white p-6 hover:bg-gray-50 transition-colors flex flex-col gap-4 group/card">
                                        <h3 className="flex justify-between items-center font-['Geist',sans-serif] text-lg text-[#0e3572] tracking-[0.8px] uppercase font-semibold">
                                            Product Development
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_1402_4100)">
                                                    <path d="M5 12H19" stroke="#58595B" strokeLinejoin="round" />
                                                    <path d="M15 16L19 12" stroke="#58595B" strokeLinejoin="round" />
                                                    <path d="M15 8L19 12" stroke="#58595B" strokeLinejoin="round" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1402_4100">
                                                        <rect width="24" height="24" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </h3>
                                        <ul className="flex flex-col gap-3 relative z-10">
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">MVP Design & Development</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">Prototype → V2</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">MVP Rescue Sprint</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">Web / Mobile / SaaS builds</span>
                                            </li>
                                        </ul>
                                    </Link>

                                    {/* Category 2 */}
                                    <Link href="/workflow-digitization" onClick={closeMenus} className="bg-white p-6 hover:bg-gray-50 transition-colors flex flex-col gap-4 group/card">
                                        <h3 className="flex justify-between items-center font-['Geist',sans-serif] text-lg text-[#0e3572] tracking-[0.8px] uppercase font-semibold">
                                            Workflow Digitization
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_1402_4100)">
                                                    <path d="M5 12H19" stroke="#58595B" strokeLinejoin="round" />
                                                    <path d="M15 16L19 12" stroke="#58595B" strokeLinejoin="round" />
                                                    <path d="M15 8L19 12" stroke="#58595B" strokeLinejoin="round" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1402_4100">
                                                        <rect width="24" height="24" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </h3>
                                        <ul className="flex flex-col gap-3 relative z-10">
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">ERP / CRM Customization</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">Integration Hub</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">Internal Tools</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">Reporting & Dashboards</span>
                                            </li>
                                        </ul>
                                    </Link>

                                    {/* Category 3 */}
                                    <Link href="/support-and-scale" onClick={closeMenus} className="bg-white p-6 hover:bg-gray-50 transition-colors flex flex-col gap-4 group/card">
                                        <h3 className="flex justify-between items-center font-['Geist',sans-serif] text-lg text-[#0e3572] tracking-[0.8px] uppercase font-semibold">
                                            Support & Scale
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_1402_4100)">
                                                    <path d="M5 12H19" stroke="#58595B" strokeLinejoin="round" />
                                                    <path d="M15 16L19 12" stroke="#58595B" strokeLinejoin="round" />
                                                    <path d="M15 8L19 12" stroke="#58595B" strokeLinejoin="round" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1402_4100">
                                                        <rect width="24" height="24" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </h3>
                                        <ul className="flex flex-col gap-3 relative z-10">
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">Maintenance & Support</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">SLAs</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">Performance</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">Cloud / DevOps</span>
                                            </li>
                                        </ul>
                                    </Link>

                                    {/* Category 4 */}
                                    <Link href="/staff-augmentation" onClick={closeMenus} className="bg-white p-6 hover:bg-gray-50 transition-colors flex flex-col gap-4 group/card">
                                        <h3 className="flex justify-between items-center font-['Geist',sans-serif] text-lg text-[#0e3572] tracking-[0.8px] uppercase font-semibold">
                                            Staff Augmentation
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_1402_4100)">
                                                    <path d="M5 12H19" stroke="#58595B" strokeLinejoin="round" />
                                                    <path d="M15 16L19 12" stroke="#58595B" strokeLinejoin="round" />
                                                    <path d="M15 8L19 12" stroke="#58595B" strokeLinejoin="round" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1402_4100">
                                                        <rect width="24" height="24" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </h3>
                                        <ul className="flex flex-col gap-3 relative z-10">
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">Hire Dedicated Developers</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">Team Extension</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">Pod Model</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">Trial Engagement</span>
                                            </li>
                                        </ul>
                                    </Link>

                                    {/* Category 5 */}
                                    <Link href="/ai-consulting" onClick={closeMenus} className="bg-white p-6 hover:bg-gray-50 transition-colors flex flex-col gap-4 group/card">
                                        <h3 className="flex justify-between items-center font-['Geist',sans-serif] text-lg text-[#0e3572] tracking-[0.8px] uppercase font-semibold">
                                            AI Consulting & Automation
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_1402_4100)">
                                                    <path d="M5 12H19" stroke="#58595B" strokeLinejoin="round" />
                                                    <path d="M15 16L19 12" stroke="#58595B" strokeLinejoin="round" />
                                                    <path d="M15 8L19 12" stroke="#58595B" strokeLinejoin="round" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1402_4100">
                                                        <rect width="24" height="24" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </h3>
                                        <ul className="flex flex-col gap-3 relative z-10">
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">Workflow Automation (AI-driven)</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">AI Integration (LLMs, APIs)</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">AI Prototyping & POCs</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">Prompt Engineering</span>
                                            </li>
                                            <li className="flex items-center gap-[6px] text-[12px] font-medium text-[#58595b] uppercase hover:text-regal-navy cursor-pointer transition-colors group">
                                                <Image src={bulletIcon} alt="" className="size-[16px] shrink-0" />
                                                <span className="flex-1">AI Automation Sprint</span>
                                            </li>
                                        </ul>
                                    </Link>

                                    {/* CTA 6th Card */}
                                    <div className="relative bg-regal-navy flex flex-col items-start justify-center p-8 gap-4 overflow-hidden group cursor-pointer">
                                        {/* Noise Texture Overlay exactly like CTASection */}
                                        <div
                                            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay transition-opacity duration-300 group-hover:opacity-[0.05]"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                                                backgroundRepeat: "repeat",
                                                backgroundSize: "150px 150px",
                                            }}
                                        />

                                        <h3 className="relative z-10 font-['Sora',sans-serif] text-[30px] leading-[36px] tracking-[-1.2px] text-white">
                                            From idea to impact delivered with precision
                                        </h3>
                                        <p className="relative z-10 font-sans font-medium text-[14px] leading-[22px] text-white/90">
                                            Design, build, and evolve your product with the right tech, the right team, and AI-powered workflows.
                                        </p>
                                        <div className="relative z-10 mt-2 font-sans font-medium text-[12px] text-white uppercase underline underline-offset-4 decoration-1 hover:text-gray-200 transition-colors">
                                            Explore
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Regular Menu Items */}
                        <Link href="/how-we-work" className="text-gray-700 uppercase text-sm hover:text-black transition-colors">How We Work</Link>
                        <Link href="/case-studies" className="text-gray-700 uppercase text-sm hover:text-black transition-colors">Case Studies</Link>
                        <Link href="#insights" className="text-gray-700 uppercase text-sm hover:text-black transition-colors">Insights</Link>

                        {/* Company Dropdown */}
                        <div
                            ref={companyDropdownRef}
                            className="relative"
                        >
                            <button
                                onClick={() => {
                                    setCompanyOpen(!companyOpen)
                                    setServicesOpen(false)
                                }}
                                className="flex items-center gap-1 text-gray-700 uppercase text-sm hover:text-black transition-colors"
                            >
                                Company
                                <ChevronDown size={16} className={`transition-transform ${companyOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {companyOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                    {company.map((item, index) => (
                                        item.label === 'About' ? (
                                            <Link
                                                key={index}
                                                href="/about-us"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                                                onClick={() => { setCompanyOpen(false); closeMenus() }}
                                            >
                                                About Us
                                            </Link>
                                        ) : (
                                            <Link
                                                key={index}
                                                href={item.to}
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                                                onClick={() => {
                                                    setCompanyOpen(false);
                                                    closeMenus();
                                                }}
                                            >
                                                {item.label}
                                            </Link>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <Link href="/book-call" className="px-2.5 lg:px-6 py-2.5 ml-auto lg:ml-0 bg-button-gradient text-sm text-white rounded-button transition-colors">
                        <span className="hidden md:block">Book a Discovery Call</span>
                        <span className="block md:hidden"><PhoneIncoming size={16} /></span>
                        <span className="sr-only">Book a discovery call</span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button aria-label="Menu"
                        className="lg:hidden text-gray-700"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-gray-200 bg-white">
                        <div className="flex flex-col space-y-4">
                            {/* Mobile Services Dropdown */}
                            <div>
                                <button
                                    onClick={() => {
                                        setMobileServicesOpen(!mobileServicesOpen)
                                        setMobileCompanyOpen(false)
                                    }}
                                    className="flex items-center justify-between w-full text-gray-700 hover:text-black"
                                >
                                    <span>Services</span>
                                    <ChevronDown size={16} className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {mobileServicesOpen && (
                                    <div className="pl-4 mt-2 space-y-2">
                                        {services.map((service, index) => (
                                            <Link
                                                key={index}
                                                href={service.to}
                                                className="block text-gray-600 hover:text-black text-sm"
                                                onClick={() => {
                                                    setMobileServicesOpen(false)
                                                    setIsMobileMenuOpen(false)
                                                    closeMenus()
                                                }}
                                            >
                                                {service.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Mobile Company Dropdown */}
                            <div>
                                <button
                                    onClick={() => {
                                        setMobileCompanyOpen(!mobileCompanyOpen)
                                        setMobileServicesOpen(false)
                                    }}
                                    className="flex items-center justify-between w-full text-gray-700 hover:text-black"
                                >
                                    <span>Company</span>
                                    <ChevronDown size={16} className={`transition-transform ${mobileCompanyOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {mobileCompanyOpen && (
                                    <div className="pl-4 mt-2 space-y-2">
                                        {company.map((item, index) => (
                                            item.label === 'About' ? (
                                                <Link
                                                    key={index}
                                                    href="/about-us"
                                                    className="block text-gray-600 hover:text-black text-sm"
                                                    onClick={() => {
                                                        setMobileCompanyOpen(false)
                                                        setIsMobileMenuOpen(false)
                                                        closeMenus()
                                                    }}
                                                >
                                                    About Us
                                                </Link>
                                            ) : (
                                                <Link
                                                    key={index}
                                                    href={item.to}
                                                    className="block text-gray-600 hover:text-black text-sm"
                                                    onClick={() => {
                                                        setMobileCompanyOpen(false)
                                                        setIsMobileMenuOpen(false)
                                                        closeMenus()
                                                    }}
                                                >
                                                    {item.label}
                                                </Link>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Regular Menu Items */}
                            <Link
                                href="/how-we-work"
                                className="text-gray-700 hover:text-black"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                How We Work
                            </Link>
                            <Link
                                href="#case-studies"
                                className="text-gray-700 hover:text-black"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Case Studies
                            </Link>
                            <Link
                                href="#insights"
                                className="text-gray-700 hover:text-black"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Insights
                            </Link>

                            <BookCallButton className="w-full text-left inline-block" showArrow={false} />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar

