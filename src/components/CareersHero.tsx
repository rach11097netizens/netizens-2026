"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import heroIllustration from "@/assets/images/careers-hero-img.svg";
import { Upload, CheckCircle2 } from "lucide-react";

export function CareersHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const [cvName, setCvName] = useState<string>("");
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Animate content
            const items = section.querySelectorAll(".careers-hero-animate");
            gsap.fromTo(
                items,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: "power3.out",
                    delay: 0.1,
                }
            );

            // Animate illustration
            const illustration = section.querySelector(".careers-hero-illustration");
            if (illustration) {
                gsap.fromTo(
                    illustration,
                    { opacity: 0, x: 60, scale: 0.95 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 1,
                        ease: "power3.out",
                        delay: 0.4,
                    }
                );
            }

            // Animate roles/labels
            const labels = section.querySelectorAll(".role-label");
            gsap.fromTo(
                labels,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                    delay: 1,
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCvName(e.target.files[0].name);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!cvName) {
            alert("Please select a CV to upload.");
            return;
        }

        setSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSubmitting(false);
        setSubmitted(true);
    };

    return (
        <section
            ref={sectionRef}
            id="careers-hero"
            className="relative w-full overflow-hidden mt-4"
            style={{ backgroundColor: "#0E3572" }}
        >
            {/* Subtle background noise overlay - consistent with Case Studies */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-screen"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                }}
            />

            <div className="relative max-w-[1400px] mx-auto px-5 md:px-10 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-6">
                {/* ─── Left Column: Content ─── */}
                <div className="flex-1 flex flex-col gap-5 items-center lg:items-start text-center lg:text-left w-full min-w-0">
                    {/* Badge */}
                    <div className="careers-hero-animate inline-flex items-center justify-center px-[18px] py-[8px] bg-[rgba(255,250,250,0.1)] border border-[rgba(14,53,114,0.1)] rounded-[4px]">
                        <span className="font-sans font-bold text-[12px] text-[#FFFAFA] text-center tracking-wide">
                            Careers at Netizens Technologies
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="careers-hero-animate font-headings font-normal text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] !leading-[1.2] text-[#FFFAFA] capitalize">
                        Work on Ideas That Matter
                    </h1>

                    {/* CV Form Card */}
                    <div
                        className="careers-hero-animate w-full max-w-[536px] rounded-[10px] pt-[34px] pb-[18px] px-[18px] flex flex-col gap-6 items-start mx-auto lg:mx-0"
                        style={{
                            background:
                                "linear-gradient(90deg, #fff 0%, #fff 100%), linear-gradient(90deg, rgba(14,53,114,0.05) 0%, rgba(14,53,114,0.05) 100%)",
                            boxShadow:
                                "0px 8px 19px 0px rgba(0,0,0,0.05), 0px 34px 34px 0px rgba(0,0,0,0.04), 0px 76px 46px 0px rgba(0,0,0,0.03)",
                        }}
                    >
                        <p className="font-headings font-normal text-base sm:text-lg text-[#0E3572] leading-[25px]">
                            Share your CV and we&apos;ll reach out when roles open.
                        </p>

                        {submitted ? (
                            <div className="w-full flex items-center gap-3 py-4 px-5 bg-green-50 border border-green-200 rounded-[10px] animate-in fade-in slide-in-from-top-2 duration-500">
                                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-sans font-bold text-green-800">
                                        Application Received!
                                    </span>
                                    <span className="text-xs font-sans text-green-700">
                                        We&apos;ll review your CV and get in touch soon.
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <form 
                                onSubmit={handleSubmit}
                                className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-start"
                            >
                                <div className="flex-1 min-w-0 relative">
                                    <label className="cursor-pointer block">
                                        <div className="w-full h-[52px] px-4 py-3 rounded-[10px] border border-black/10 bg-white flex items-center justify-between transition-all hover:border-[#0E3572]/30">
                                            <span className="text-sm font-sans text-[#58595B] truncate">
                                                {cvName || "Upload your CV"}
                                            </span>
                                            <Upload size={18} className="text-[#58595B] shrink-0 ml-2" />
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx"
                                        />
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="shrink-0 h-[52px] px-[34px] py-4 rounded-[4px] bg-button-gradient text-white text-base font-sans font-normal leading-6 whitespace-nowrap transition-all hover:opacity-90 active:scale-[0.98] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                                >
                                    {submitting ? "Submitting..." : "Submit CV"}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Subtitle */}
                    <p className="careers-hero-animate font-sans font-medium text-sm leading-[22px] text-[rgba(255,250,250,0.75)] max-w-[536px] mx-auto lg:mx-0 lg:text-left text-center">
                        {`We're preparing exciting opportunities for designers, developers, and innovators who want to build impactful products.`}
                    </p>
                </div>

                {/* ─── Right Column: Illustration ─── */}
                <div className="careers-hero-illustration hidden lg:flex w-full lg:w-[54%] xl:w-[648px] shrink-0 items-center justify-center relative">
                    <div className="relative w-full aspect-[648/469]">
                        <Image
                            src={heroIllustration}
                            alt="Careers Illustration"
                            className="w-full h-full object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
