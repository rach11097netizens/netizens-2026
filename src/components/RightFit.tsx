import imgSeparatorPattern from "../assets/images/pattern.png";
import iconLightTick from "../assets/images/light-tick.svg";
import iconNavyTick from "../assets/images/navy-dark-tick.svg";

interface RightFitProps {
    theme?: "dark" | "light";
    badge: string;
    heading: string;
    goodFitItems: string[];
    notFitItems: string[];
    goodFitTitle?: string;
    notFitTitle?: string;
}

function CheckIconDark() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="23" stroke="rgba(255,250,250,0.4)" strokeWidth="1.5" />
            <path d="M15 24L21 30L33 18" stroke="#FFFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function CheckIconLight() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="23" fill="#3EAFD1" />
            <path d="M15 24L21 30L33 18" stroke="#FFFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function XIconDark() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="23" stroke="rgba(255,250,250,0.25)" strokeWidth="1.5" />
            <path d="M17 17L31 31M31 17L17 31" stroke="rgba(255,250,250,0.6)" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function XIconLight() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="23" fill="#ED1C24" />
            <path d="M17 17L31 31M31 17L17 31" stroke="#FFFAFA" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function ListXIcon({ theme }: { theme: "dark" | "light" }) {
    if (theme === "light") {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <circle cx="12" cy="12" r="11" fill="rgba(237,28,36,0.15)" />
                <path d="M8 8L16 16M16 8L8 16" stroke="#ED1C24" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        );
    }
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <circle cx="12" cy="12" r="11" stroke="rgba(255,90,90,0.6)" strokeWidth="1.5" />
            <path d="M8 8L16 16M16 8L8 16" stroke="#FF5A5A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

const styles = {
    dark: {
        section: "bg-regal-navy",
        hasPattern: true,
        badgeWrap: "bg-white/10 border border-regal-navy/10",
        badgeText: "text-white",
        heading: "text-white",
        goodCard: "bg-[#264980] border-2 border-snow-white",
        goodTitle: "text-white",
        goodDivider: "border-snow-white/20",
        goodItemText: "text-white",
        goodTickIcon: iconLightTick,
        notCard: "bg-[#0c2b5c]",
        notTitle: "text-white/75",
        notDivider: "border-snow-white/20",
        notItemText: "text-white/75",
    },
    light: {
        section: "bg-white",
        hasPattern: false,
        badgeWrap: "bg-[rgba(14,53,114,0.05)] border border-[rgba(14,53,114,0.1)]",
        badgeText: "text-regal-navy",
        heading: "text-carbon-black",
        goodCard: "bg-snow-white border-2 border-regal-navy",
        goodTitle: "text-carbon-black",
        goodDivider: "border-charcoal/20",
        goodItemText: "text-regal-navy",
        goodTickIcon: iconNavyTick,
        notCard: "bg-[rgba(237,28,36,0.1)]",
        notTitle: "text-carbon-black",
        notDivider: "border-charcoal/20",
        notItemText: "text-carbon-black/70",
    },
} as const;

export function RightFit({
    theme = "dark",
    badge,
    heading,
    goodFitItems,
    notFitItems,
    goodFitTitle = "This is a good fit if",
    notFitTitle = "This may not be a fit if",
}: RightFitProps) {
    const s = styles[theme];

    return (
        <section className={`relative w-full ${s.section} flex flex-col items-center py-16 md:py-20 overflow-hidden`}>

            {s.hasPattern && (
                <div className="absolute inset-0 pointer-events-none opacity-10">
                    <div
                        className="absolute inset-0 w-full h-full mix-blend-screen"
                        style={{
                            opacity: 0.5,
                            backgroundImage: `url(${imgSeparatorPattern})`,
                            backgroundRepeat: "repeat",
                            backgroundSize: "1000px",
                        }}
                    />
                    <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            backgroundImage: "linear-gradient(#ffffff0a 1px, transparent 1px)",
                            backgroundSize: "100% 32px",
                        }}
                    />
                </div>
            )}

            <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 flex flex-col items-center gap-10">

                <div className="flex flex-col items-center gap-3 text-center">
                    <div className={`${s.badgeWrap} inline-flex items-center justify-center px-[18px] py-[8px] rounded-[4px]`}>
                        <span className={`font-sans font-bold text-[12px] ${s.badgeText} text-center`}>
                            {badge}
                        </span>
                    </div>
                    <h2 className={`font-headings font-normal text-2xl md:text-3xl ${s.heading}`}>
                        {heading}
                    </h2>
                </div>

                <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch">

                    <div className={`flex-1 ${s.goodCard} rounded-[10px] p-[18px] flex flex-col gap-[18px]`}>
                        <div className="w-12 h-12 flex items-center justify-center">
                            {theme === "dark" ? <CheckIconDark /> : <CheckIconLight />}
                        </div>
                        <h3 className={`font-headings font-normal text-[24px] ${s.goodTitle}`}>
                            {goodFitTitle}
                        </h3>
                        <hr className={`border-t ${s.goodDivider} w-full`} />
                        <ul className="flex flex-col gap-2">
                            {goodFitItems.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <img src={s.goodTickIcon} alt="check" className="w-6 h-6 shrink-0" />
                                    <span className={`font-sans font-medium text-[14px] leading-[22px] ${s.goodItemText}`}>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`flex-1 ${s.notCard} rounded-[10px] p-[18px] flex flex-col gap-[18px] self-end w-full`}>
                        <div className="w-12 h-12 flex items-center justify-center">
                            {theme === "dark" ? <XIconDark /> : <XIconLight />}
                        </div>
                        <h3 className={`font-headings font-normal text-[24px] ${s.notTitle}`}>
                            {notFitTitle}
                        </h3>
                        <hr className={`border-t ${s.notDivider} w-full`} />
                        <ul className="flex flex-col gap-2">
                            {notFitItems.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <ListXIcon theme={theme} />
                                    <span className={`font-sans font-medium text-[14px] leading-[22px] ${s.notItemText}`}>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}
