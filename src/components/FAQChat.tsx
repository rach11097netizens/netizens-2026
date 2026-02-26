import { useState, useEffect, useCallback } from 'react';
import imgSeparatorPattern from '../assets/images/pattern.png';
import favIcon from '../assets/images/favicon.svg';
import { SidePattern } from './SidePattern';

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQChatProps {
    faqs: FAQItem[];
    theme?: 'dark' | 'light';
}

// Agent avatar using real favicon
const AgentAvatar = () => (
    <div className="flex-shrink-0 w-[36px] h-[36px] rounded-full border border-[#0e3572] bg-[rgba(179,179,179,0.09)] p-[4px] flex items-center justify-center">
        <div className="w-[28px] h-[28px] rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img src={favIcon} alt="Netizens" className="w-[22px] h-[22px] object-contain" />
        </div>
    </div>
);

// Arrow icon for question pills
const ClickIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 opacity-40 group-hover:opacity-70 transition-opacity">
        <path d="M19 12H5M5 12L9 8M5 12L9 16" stroke="#58595b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Typing effect hook
function useTypingEffect(text: string, isActive: boolean, speed: number = 12) {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const startTyping = useCallback(() => {
        setDisplayedText('');
        setIsTyping(true);
    }, []);

    useEffect(() => {
        if (!isActive) {
            setDisplayedText('');
            setIsTyping(false);
            return;
        }
        // Start typing with a slight delay after expand animation
        const startTimer = setTimeout(startTyping, 200);
        return () => clearTimeout(startTimer);
    }, [isActive, text, startTyping]);

    useEffect(() => {
        if (!isTyping || !isActive) return;

        if (displayedText.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, speed);
            return () => clearTimeout(timer);
        } else {
            setIsTyping(false);
        }
    }, [displayedText, isTyping, isActive, text, speed]);

    return { displayedText, isTyping };
}

// Typing dots indicator
const TypingIndicator = () => (
    <div className="flex items-center gap-1 py-1">
        <span className="w-1.5 h-1.5 bg-charcoal/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 bg-charcoal/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-1.5 h-1.5 bg-charcoal/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
);

// Individual FAQ item with inline typing
function FAQItemRow({ faq, index, isActive, onToggle }: {
    faq: FAQItem;
    index: number;
    isActive: boolean;
    onToggle: (i: number) => void;
}) {
    const { displayedText, isTyping } = useTypingEffect(faq.answer, isActive);
    const showTypingDots = isActive && displayedText.length === 0;

    return (
        <div className="w-full flex flex-col items-end">
            {/* Question bubble — always visible, right-aligned */}
            <button
                onClick={() => onToggle(index)}
                className={`
                    flex items-center gap-[10px] justify-end px-[18px] py-[15px]
                    rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px]
                    border border-[rgba(88,89,91,0.1)]
                    transition-all duration-200 cursor-pointer text-left group
                    ${isActive
                        ? 'bg-white shadow-sm'
                        : 'bg-[rgba(14,53,114,0.05)] hover:bg-[rgba(14,53,114,0.1)] hover:border-[rgba(14,53,114,0.2)]'
                    }
                `}
            >
                <p className="font-headings font-normal text-[18px] leading-[25px] text-carbon-black">
                    {faq.question}
                </p>
                {!isActive && <ClickIcon />}
            </button>

            {/* Answer + divider — smoothly expands below the active question */}
            <div
                className="w-full overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                    maxHeight: isActive ? '350px' : '0px',
                    opacity: isActive ? 1 : 0,
                }}
            >
                <div className="flex flex-col gap-[20px] pt-[20px] w-full">
                    {/* Agent answer — left aligned with avatar */}
                    <div className="flex gap-[17px] items-start w-full">
                        <AgentAvatar />
                        <div className="flex-1 min-h-[44px] flex items-start pt-1">
                            {showTypingDots ? (
                                <TypingIndicator />
                            ) : (
                                <p className="font-sans font-medium text-[16px] leading-[22px] text-gray-600">
                                    {displayedText}
                                    {isTyping && (
                                        <span className="inline-block w-[2px] h-[16px] bg-[#0e3572] ml-[1px] align-middle animate-pulse" />
                                    )}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-0 border-t border-[rgba(88,89,91,0.1)]" />
                </div>
            </div>
        </div>
    );
}

export const FAQChat = ({ faqs, theme = 'dark' }: FAQChatProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const isLight = theme === 'light';

    const handleToggle = (i: number) => {
        setActiveIndex(prev => (prev === i ? -1 : i));
    };

    return (
        <section className={`relative w-full flex flex-col items-center py-16 lg:py-20 overflow-hidden ${isLight ? 'bg-[#FFFAFA]' : 'bg-regal-navy'}`}>
            {isLight && <SidePattern invert />}

            {!isLight && (
                <div className="absolute inset-0 pointer-events-none opacity-10">
                    <div
                        className="absolute inset-0 w-full h-full mix-blend-screen"
                        style={{
                            opacity: 0.5,
                            backgroundImage: `url(${imgSeparatorPattern})`,
                            backgroundRepeat: 'repeat',
                            backgroundSize: '1000px',
                        }}
                    />
                    <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            backgroundImage: 'linear-gradient(#ffffff0a 1px, transparent 1px)',
                            backgroundSize: '100% 32px',
                        }}
                    />
                </div>
            )}

            <div className="relative z-10 w-full max-w-[1096px] mx-auto px-4 lg:px-0 flex flex-col gap-8 items-center">
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className={`inline-flex items-center justify-center px-[18px] py-2 rounded-[4px] border ${isLight ? 'border-regal-navy/10 bg-regal-navy/5' : 'border-white/10 bg-white/10'}`}>
                        <span className={`font-sans text-[12px] ${isLight ? 'text-regal-navy' : 'text-white'}`}>What People Ask</span>
                    </div>
                    <h2 className={`font-headings font-normal text-2xl md:text-3xl leading-normal ${isLight ? 'text-carbon-black' : 'text-white'}`}>
                        Questions? We've got answers
                    </h2>
                </div>

                <div className="w-full rounded-[10px] overflow-hidden shadow-[0px_434px_121px_0px_rgba(0,0,0,0),0px_278px_111px_0px_rgba(0,0,0,0.01),0px_156px_94px_0px_rgba(0,0,0,0.03),0px_69px_69px_0px_rgba(0,0,0,0.04),0px_17px_38px_0px_rgba(0,0,0,0.05)]">
                    <div
                        className="flex items-center gap-[10px] px-[10px] py-[10px] w-full"
                        style={{
                            backgroundImage: 'linear-gradient(90deg, rgba(88,89,91,0.1) 0%, rgba(88,89,91,0.1) 100%), linear-gradient(90deg, #fff 0%, #fff 100%)',
                        }}
                    >
                        <div className="flex gap-[10px] flex-1 items-center">
                            <div className="w-[15px] h-[15px] rounded-full bg-[#FF5F56]" />
                            <div className="w-[15px] h-[15px] rounded-full bg-[#FFBD2E]" />
                            <div className="w-[15px] h-[15px] rounded-full bg-[#27C93F]" />
                        </div>
                        <p className="flex-1 text-center font-sans font-bold text-[12px] text-gray-600/75">
                            Simply - Click the question
                        </p>
                        <div className="flex-1" />
                    </div>

                    <div className="bg-white px-8 md:px-[112px] py-[35px] min-h-[620px]">
                        <div className="flex flex-col gap-[13px] items-end w-full max-w-[872px] mx-auto">
                            {faqs.map((faq, i) => (
                                <FAQItemRow
                                    key={i}
                                    faq={faq}
                                    index={i}
                                    isActive={activeIndex === i}
                                    onToggle={handleToggle}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
