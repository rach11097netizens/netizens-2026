"use client";
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import logoSrc from '../assets/images/logo.svg';
import { PhoneIncoming } from 'lucide-react';

// ─── ThankYouHero ─────────────────────────────────────────────────────────────

export const ThankYouHero: FC = () => {
    return (
        <div className="relative min-h-screen w-full bg-[#fffafa] flex flex-col overflow-hidden">

            {/* ── Navigation ─────────────────────────────────────────────────── */}
            <nav className="relative z-10 w-full flex items-center justify-between px-10 py-[14px]">
                {/* Logo */}
                <Link href="/" aria-label="Netizens Technologies Home">
                    <Image
                        src={logoSrc}
                        alt="Netizens Technologies"
                        className="h-12 w-auto"
                        priority
                    />
                </Link>

                {/* CTA */}
                <Link href="/book-call" className="px-2.5 lg:px-6 py-2.5 ml-auto lg:ml-0 bg-button-gradient text-sm text-white rounded-button transition-colors">
                    <span className="hidden md:block">Book a Discovery Call</span>
                    <span className="block md:hidden"><PhoneIncoming size={16} /></span>
                    <span className="sr-only">Book a discovery call</span>
                </Link>
            </nav>

            {/* ── Main content ────────────────────────────────────────────────── */}
            <main className="relative flex-1 flex flex-col items-center justify-center px-4 pb-32">

                {/* Large outlined "Thank You" background text */}
                <p
                    className="select-none pointer-events-none w-full text-center font-headings font-bold capitalize whitespace-nowrap"
                    aria-hidden="true"
                    style={{
                        fontSize: 'clamp(50px, 18vw, 220px)',
                        lineHeight: 1,
                        color: 'transparent',
                        WebkitTextStroke: '1.5px #0e3572',
                        opacity: 0.6,
                        letterSpacing: '-0.02em',
                    }}
                >
                    Thank You
                </p>

                {/* Copy */}
                <div className="relative z-10 flex flex-col gap-2 items-center text-center max-w-[759px] mt-8">
                    <h1
                        className="font-headings font-semibold text-[#0e3572] leading-normal"
                        style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}
                    >
                        We'll Be in Touch Soon
                    </h1>
                    <p
                        className="font-sans font-medium text-[rgba(88,89,91,0.75)] leading-[24px]"
                        style={{ fontSize: '16px' }}
                    >
                        Our team will analyze your requirements and get back to you with a customized solution.
                    </p>
                </div>
            </main>

            {/* ── Bottom gradient blob ─────────────────────────────────────────── */}
            <div
                className="pointer-events-none absolute bottom-[48px] left-0 right-0 h-[240px]"
                aria-hidden="true"
                style={{
                    background: 'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(237,28,36,0.25) 0%, rgba(255,255,255,0) 70%)',
                }}
            />

            {/* ── Footer ──────────────────────────────────────────────────────── */}
            <footer className="w-full flex flex-col font-sans relative z-10">
                {/* Bottom Navy Section */}
                <div className="w-full bg-[#0B2A5B] py-4 px-4 md:px-8">
                    <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="font-sans text-xs md:text-sm text-[#FFFAFA] opacity-90 text-center md:text-left">
                            Copyright © {new Date().getFullYear()} netizenstechnologies.com - All rights reserved.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 font-sans text-xs md:text-sm text-[#FFFAFA] opacity-90">
                            <a href="/privacy-policy" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200">Privacy Policy</a>
                            <a href="/terms-of-services" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200">Terms & Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
