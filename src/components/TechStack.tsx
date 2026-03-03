import { SidePattern } from "./SidePattern";

import imgReact from "../assets/images/tech-stack/react.png";
import imgNextjsFrontend from "../assets/images/tech-stack/nextjs-frontend.png";
import imgAws from "../assets/images/tech-stack/aws.png";
import imgGoogleCloud from "../assets/images/tech-stack/google-cloud.png";
import imgCicd from "../assets/images/tech-stack/cicd.png";
import imgMonitoring from "../assets/images/tech-stack/monitoring.png";
import imgFlutter from "../assets/images/tech-stack/flutter.png";
import imgReactNative from "../assets/images/tech-stack/react-native.png";
import imgPostgresql from "../assets/images/tech-stack/postgresql.png";
import imgMysql from "../assets/images/tech-stack/mysql.png";
import imgMongodb from "../assets/images/tech-stack/mongodb.png";
import imgFirebase from "../assets/images/tech-stack/firebase.png";
import imgNodejs from "../assets/images/tech-stack/nodejs.png";
import imgNextjs from "../assets/images/tech-stack/nextjs.png";
import imgLlm from "../assets/images/tech-stack/llm-integrations.png";
import imgAiWorkflows from "../assets/images/tech-stack/ai-workflows.png";
import imgAutomation from "../assets/images/tech-stack/automation-agents.png";

interface TechItem {
    icon: string;
    label: string;
}

interface TechCategory {
    title: string;
    items: TechItem[];
    gridArea: string;
    mobileOrder: number;
}

const categories: TechCategory[] = [
    {
        title: "Frontend",
        items: [
            { icon: imgReact, label: "React" },
            { icon: imgNextjsFrontend, label: "Next.js" },
        ],
        gridArea: "1 / 2 / span 2 / span 3",
        mobileOrder: 1,
    },
    {
        title: "DevOps & Infrastructure",
        items: [
            { icon: imgAws, label: "AWS" },
            { icon: imgGoogleCloud, label: "Google Cloud" },
            { icon: imgCicd, label: "CI/CD" },
            { icon: imgMonitoring, label: "Monitoring & Logging" },
        ],
        gridArea: "1 / 7 / span 2 / span 5",
        mobileOrder: 2,
    },
    {
        title: "Mobile",
        items: [
            { icon: imgFlutter, label: "Flutter" },
            { icon: imgReactNative, label: "React Native" },
        ],
        gridArea: "3 / 5 / span 2 / span 3",
        mobileOrder: 3,
    },
    {
        title: "Database",
        items: [
            { icon: imgPostgresql, label: "PostgreSQL" },
            { icon: imgMysql, label: "MySQL" },
            { icon: imgMongodb, label: "MongoDB" },
            { icon: imgFirebase, label: "Firebase" },
        ],
        gridArea: "5 / 2 / span 2 / span 4",
        mobileOrder: 5,
    },
    {
        title: "Backend",
        items: [
            { icon: imgNodejs, label: "Node.js" },
            { icon: imgNextjs, label: "Next.js" },
        ],
        gridArea: "5 / 8 / span 2 / span 3",
        mobileOrder: 4,
    },
    {
        title: "Agentic Workflows / AI\n(when relevant)",
        items: [
            { icon: imgLlm, label: "LLM integrations" },
            { icon: imgAiWorkflows, label: "AI-powered workflows" },
            { icon: imgAutomation, label: "Automation agents" },
        ],
        gridArea: "4 / 12 / span 4 / span 2",
        mobileOrder: 6,
    },
];

function TechIcon({ icon, label }: TechItem) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] bg-white border border-charcoal/40 rounded-[6px] flex items-center justify-center p-2.5">
                <img src={icon} alt={label} className="w-full h-full object-contain" />
            </div>
            <span className="font-sans text-[11px] sm:text-[12px] text-charcoal text-center leading-tight">
                {label}
            </span>
        </div>
    );
}

function CategoryCard({ category }: { category: TechCategory }) {
    const isVertical = category.title.includes("Agentic");

    return (
        <div className="bg-white border border-regal-navy/60 border-b-4 rounded-[10px] overflow-hidden relative flex flex-col items-center px-3 py-4 sm:px-4 sm:py-5 h-full">

            <h3 className="font-headings text-[16px] sm:text-[18px] text-regal-navy text-center leading-[25px] mb-3 whitespace-pre-line">
                {category.title}
            </h3>
            <div
                className={`flex ${isVertical ? "flex-col gap-8" : "flex-row flex-wrap gap-4 sm:gap-6"} items-center justify-center flex-1`}
            >
                {category.items.map((item) => (
                    <TechIcon key={item.label} {...item} />
                ))}
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-10px_12px_0px_rgba(14,53,114,0.12)]" />
        </div>
    );
}

const accentCells = [
    { row: 1, col: 13, color: "bg-[#3eafd1]" },
    { row: 1, col: 14, color: "bg-regal-navy" },
    { row: 2, col: 14, color: "bg-[#ed1c24]" },
    { row: 7, col: 1, color: "bg-regal-navy" },
    { row: 7, col: 2, color: "bg-[#ed1c24]" },
    { row: 6, col: 1, color: "bg-[#3eafd1]" },
];

const tintedCells = [
    { row: 1, col: 1 }, { row: 2, col: 1 }, { row: 3, col: 1 },
    { row: 1, col: 5 }, { row: 2, col: 5 }, { row: 1, col: 6 },
    { row: 2, col: 6 }, { row: 1, col: 12 }, { row: 2, col: 12 },
    { row: 2, col: 13 }, { row: 3, col: 12 }, { row: 3, col: 13 },
    { row: 3, col: 14 }, { row: 4, col: 14 },
    { row: 5, col: 14 }, { row: 6, col: 14 }, { row: 7, col: 14 },
    { row: 3, col: 2 }, { row: 3, col: 3 }, { row: 3, col: 4 },
    { row: 3, col: 8 }, { row: 3, col: 9 }, { row: 3, col: 10 },
    { row: 3, col: 11 }, { row: 4, col: 1 }, { row: 4, col: 2 },
    { row: 4, col: 3 }, { row: 4, col: 4 }, { row: 4, col: 8 },
    { row: 4, col: 9 }, { row: 4, col: 10 }, { row: 4, col: 11 },
    { row: 5, col: 1 }, { row: 5, col: 6 }, { row: 5, col: 7 },
    { row: 5, col: 11 }, { row: 6, col: 6 }, { row: 6, col: 7 },
    { row: 6, col: 11 }, { row: 7, col: 3 }, { row: 7, col: 4 },
    { row: 7, col: 5 }, { row: 7, col: 6 }, { row: 7, col: 7 },
    { row: 7, col: 8 }, { row: 7, col: 9 }, { row: 7, col: 10 },
    { row: 7, col: 11 },
];

export function TechStack() {
    return (
        <section className="relative w-full bg-snow-white flex flex-col items-center py-16 md:py-20 overflow-hidden">
            <SidePattern invert />

            <div className="w-full max-w-[1320px] mx-auto px-4 relative z-10 flex flex-col items-center gap-8">
                {/* Header */}
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center justify-center px-3 py-2 bg-regal-navy/5 border border-regal-navy/10 rounded-[4px]">
                        <span className="font-sans font-normal text-[12px] text-regal-navy text-center">
                            Built With
                        </span>
                    </div>
                    <h2 className="font-headings text-[24px] sm:text-[30px] text-carbon-black text-center">
                        Technologies we work with
                    </h2>
                </div>

                {/* Desktop bento grid */}
                <div
                    className="hidden lg:grid grid-cols-14 gap-1 w-full bg-white relative"
                    style={{
                        gridTemplateRows: "repeat(7, 1fr)",
                        aspectRatio: "1320 / 673",
                    }}
                >
                    {/* Tinted background cells */}
                    {tintedCells.map(({ row, col }, i) => (
                        <div
                            key={`tint-${i}`}
                            className="bg-regal-navy/10 relative"
                            style={{ gridRow: row, gridColumn: col }}
                        >
                            <div className="absolute inset-0 shadow-[inset_3px_6px_21px_0px_rgba(14,53,114,0.08)]" />
                        </div>
                    ))}

                    {/* Accent colored cells */}
                    {accentCells.map(({ row, col, color }, i) => (
                        <div
                            key={`accent-${i}`}
                            className={`${color}`}
                            style={{ gridRow: row, gridColumn: col }}
                        />
                    ))}

                    {/* Category cards */}
                    {categories.map((cat) => (
                        <div
                            key={cat.title}
                            style={{ gridArea: cat.gridArea }}
                            className="z-10 min-h-0"
                        >
                            <CategoryCard category={cat} />
                        </div>
                    ))}
                </div>

                {/* Mobile/Tablet grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:hidden">
                    {[...categories]
                        .sort((a, b) => a.mobileOrder - b.mobileOrder)
                        .map((cat) => (
                            <CategoryCard key={cat.title} category={cat} />
                        ))}
                </div>

                {/* Footer text */}
                <p className="font-headings text-[16px] sm:text-[18px] text-carbon-black text-center leading-[25px]">
                    We choose tools based on product needs, not preferences.
                </p>
            </div>
        </section>
    );
}
