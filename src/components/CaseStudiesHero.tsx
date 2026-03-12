"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import heroIllustration from "@/assets/images/case-studies-hero-img.svg";

export function CaseStudiesHero() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Animate left content with stagger
            const items = section.querySelectorAll(".cs-hero-animate");
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

            // Animate illustration from right
            const illustration = section.querySelector(".cs-hero-illustration");
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
        }, section);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubmitting(true);
        try {
            const res = await fetch("/api/notify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (data.success) {
                setSubmitted(true);
            } else {
                alert(data.message || "Something went wrong. Please try again.");
            }
        } catch {
            alert("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="case-studies-hero"
            className="relative w-full overflow-hidden mt-4"
            style={{ backgroundColor: "#0E3572" }}
        >
            {/* Subtle background noise overlay */}
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
                    <div className="cs-hero-animate inline-flex items-center justify-center px-[18px] py-[8px] bg-[rgba(255,250,250,0.1)] border border-[rgba(14,53,114,0.1)] rounded-[4px]">
                        <span className="font-sans font-bold text-[12px] text-[#FFFAFA] text-center tracking-wide">
                            Stories Behind the Work
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="cs-hero-animate font-headings font-normal text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] !leading-[1.2] text-[#FFFAFA] capitalize">
                        How Ideas Turn Into Real Solutions
                    </h1>

                    {/* Notification Form Card */}
                    <div
                        className="cs-hero-animate w-full max-w-[536px] rounded-[10px] pt-[34px] pb-[18px] px-[18px] flex flex-col gap-6 items-start mx-auto lg:mx-0"
                        style={{
                            background:
                                "linear-gradient(90deg, #fff 0%, #fff 100%), linear-gradient(90deg, rgba(14,53,114,0.05) 0%, rgba(14,53,114,0.05) 100%)",
                            boxShadow:
                                "0px 8px 19px 0px rgba(0,0,0,0.05), 0px 34px 34px 0px rgba(0,0,0,0.04), 0px 76px 46px 0px rgba(0,0,0,0.03)",
                        }}
                    >
                        <p className="font-headings font-normal text-base sm:text-lg text-[#0E3572] leading-[25px]">
                            Get notified when our case studies go live.
                        </p>

                        {submitted ? (
                            <div className="w-full flex items-center gap-3 py-3 px-4 bg-green-50 border border-green-200 rounded-[10px]">
                                <svg
                                    className="w-5 h-5 text-green-500 shrink-0"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-sm font-sans font-medium text-green-700">
                                    {`You'll be notified when we publish!`}
                                </span>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-start"
                            >
                                <div className="flex-1 min-w-0">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email Address"
                                        className="w-full h-[52px] px-4 py-3 rounded-[10px] border border-black/10 bg-white text-sm font-sans text-[#58595B] placeholder:text-[#58595B] focus:outline-none focus:ring-2 focus:ring-[#0E3572]/20 focus:border-[#0E3572]/30 transition-all"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="shrink-0 h-[52px] px-[34px] py-4 rounded-[4px] bg-button-gradient text-white text-base font-sans font-normal leading-6 whitespace-nowrap transition-all hover:opacity-90 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {submitting ? "Sending..." : "Notify Me"}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Subtitle */}
                    <p className="cs-hero-animate font-sans font-medium text-sm leading-[22px] text-[rgba(255,250,250,0.75)] max-w-[536px] mx-auto lg:mx-0 lg:text-left text-center">
                        {`We're documenting the stories behind our projects — from the initial challenge to the final outcome.`}
                    </p>
                </div>

                {/* ─── Right Column: Illustration ─── */}
                <div className="cs-hero-illustration hidden lg:flex w-full lg:w-[50%] xl:w-[648px] shrink-0 items-center justify-center">
                    <div className="relative w-full max-w-[648px] aspect-[648/469] rounded-[10px] overflow-hidden">
                        <Image
                            src={heroIllustration}
                            alt="Isometric illustration showing case studies in progress"
                            className="w-full h-full object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
