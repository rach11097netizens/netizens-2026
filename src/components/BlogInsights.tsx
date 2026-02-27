import { useState } from 'react';
import { SidePattern } from './SidePattern';
import blogImg1 from '../assets/images/blog/blog-1.png';
import blogImg2 from '../assets/images/blog/blog-2.png';
import blogImg3 from '../assets/images/blog/blog-3.png';
import blogImg4 from '../assets/images/blog/blog-4.png';
import blogImg5 from '../assets/images/blog/blog-5.png';

const blogPosts = [
    {
        title: 'From idea to MVP: what founders should focus on first',
        image: blogImg1,
    },
    {
        title: 'Why startups fail: the tech decisions that sink early-stage products',
        image: blogImg2,
    },
    {
        title: 'How to choose the right tech stack for your SaaS product',
        image: blogImg3,
    },
    {
        title: 'AI-powered automation: real use cases for growing businesses',
        image: blogImg4,
    },
    {
        title: 'Custom software vs off-the-shelf: when to build your own',
        image: blogImg5,
    },
];

export const BlogInsights = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="relative py-16 lg:py-20">
            <SidePattern invert />

            <div className="max-w-7xl mx-auto px-4 lg:px-[112px]">
                {/* Header row */}
                <div className="flex items-end justify-between mb-6">
                    {/* Title area */}
                    <div className="flex flex-col gap-2">
                        <div className="inline-flex items-center justify-center px-3 py-2 rounded-[4px] border border-[rgba(14,53,114,0.1)] bg-[rgba(14,53,114,0.05)] w-fit">
                            <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#0e3572] text-center">
                                From the blog
                            </span>
                        </div>
                        <h2 className="font-['Sora'] font-normal text-2xl md:text-3xl text-[#16181b] leading-normal">
                            Practical guides on custom software, AI, and automation
                        </h2>
                    </div>

                    {/* Navigation arrows */}
                    <div className="hidden md:flex gap-3 items-center flex-shrink-0 ml-8">
                        <button
                            onClick={() =>
                                setActiveIndex((prev) =>
                                    prev === 0 ? blogPosts.length - 1 : prev - 1
                                )
                            }
                            className="w-[44px] h-[44px] rounded-full border border-[rgba(22,24,27,0.1)] bg-[rgba(255,250,250,0.1)] flex items-center justify-center hover:bg-[rgba(22,24,27,0.05)] transition-colors"
                            aria-label="Previous blog post"
                        >
                            <svg
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="text-[#16181b]"
                            >
                                <path
                                    d="M15 18l-6-6 6-6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={() =>
                                setActiveIndex((prev) =>
                                    prev === blogPosts.length - 1 ? 0 : prev + 1
                                )
                            }
                            className="w-[44px] h-[44px] rounded-full border border-[rgba(22,24,27,0.1)] bg-[rgba(255,250,250,0.1)] flex items-center justify-center hover:bg-[rgba(22,24,27,0.05)] transition-colors"
                            aria-label="Next blog post"
                        >
                            <svg
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="text-[#16181b]"
                            >
                                <path
                                    d="M9 18l6-6-6-6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Accordion slider */}
                <div className="flex gap-1 lg:gap-[17px] items-center w-full h-[300px] md:h-[430px]">
                    {blogPosts.map((post, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <div
                                key={index}
                                onClick={() => !isActive && setActiveIndex(index)}
                                className={`
                  h-full rounded-[6px] overflow-hidden relative
                  transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                  ${isActive
                                        ? 'flex-[8] cursor-default'
                                        : 'flex-[1] cursor-pointer hover:opacity-80'
                                    }
                `}
                            >
                                {/* Blog image */}
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                {/* Gradient overlay for active card */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                )}
                                {/* Label at bottom */}
                                <div className="absolute inset-0 flex items-end p-4">
                                    {isActive && (
                                        <div className="bg-black/30 backdrop-blur-sm rounded px-3 py-2 transition-opacity duration-300">
                                            <span className="text-white text-xs font-['Plus_Jakarta_Sans']">
                                                Blog Post {index + 1}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom row: title + CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3">
                    <p className="font-['Sora'] font-normal text-center sm:text-left text-[18px] lg:text-[24px] text-[#58595b] leading-normal overflow-hidden sm:text-ellipsis sm:whitespace-nowrap sm:max-w-[70%]">
                        {blogPosts[activeIndex].title}
                    </p>
                    <button className="flex-shrink-0 bg-white border border-[rgba(22,24,27,0.4)] rounded-[4px] px-[34px] py-[18px] font-['Plus_Jakarta_Sans'] text-[14px] text-[#16181b] hover:bg-[#f5f5f5] transition-colors">
                        See what we're writing
                    </button>
                </div>

                {/* Mobile navigation arrows */}
                <div className="flex md:hidden gap-3 items-center justify-center mt-6">
                    <button
                        onClick={() =>
                            setActiveIndex((prev) =>
                                prev === 0 ? blogPosts.length - 1 : prev - 1
                            )
                        }
                        className="w-[44px] h-[44px] rounded-full border border-[rgba(22,24,27,0.1)] bg-[rgba(255,250,250,0.1)] flex items-center justify-center"
                        aria-label="Previous blog post"
                    >
                        <svg
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="text-[#16181b]"
                        >
                            <path
                                d="M15 18l-6-6 6-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() =>
                            setActiveIndex((prev) =>
                                prev === blogPosts.length - 1 ? 0 : prev + 1
                            )
                        }
                        className="w-[44px] h-[44px] rounded-full border border-[rgba(22,24,27,0.1)] bg-[rgba(255,250,250,0.1)] flex items-center justify-center"
                        aria-label="Next blog post"
                    >
                        <svg
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="text-[#16181b]"
                        >
                            <path
                                d="M9 18l6-6-6-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};
