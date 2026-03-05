import React, { useEffect, useState } from "react";

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
import { SidePattern } from "./SidePattern";

// ── Design Tokens ─────────────────────────────────────────────────────────────
const NAVY = "#0e3572";
const CYAN = "#3eafd1";
const RED = "#ed1c24";
const NAVY_10 = "rgba(14,53,114,0.10)";
const NAVY_60 = "rgba(14,53,114,0.60)";
const CHARCOAL = "#58595b";
const CHARCOAL_40 = "rgba(88,89,91,0.40)";
const fontSans = "'Plus Jakarta Sans', 'Segoe UI', sans-serif";
const fontHead = "'Sora', 'Segoe UI', sans-serif";

// ── Breakpoints ───────────────────────────────────────────────────────────────
const BP_SM = 640;   // 2-col card grid
const BP_LG = 1024;  // full desktop bento

// ── Types ─────────────────────────────────────────────────────────────────────
interface TechItem {
    src: string;
    label: string;
    border?: boolean;
}

interface CategoryCardProps {
    title: string;
    items: TechItem[];
    vertical?: boolean;
    autoHeight?: boolean;
    iconSize?: number;
}

interface TintProps { r: number; c: number; }
interface AccentCellDef { r: number; c: number; color: string; }
interface TintCellDef { r: number; c: number; }

// ── useWindowWidth ────────────────────────────────────────────────────────────
function useWindowWidth(): number {
    const [width, setWidth] = useState<number>(
        typeof window !== "undefined" ? window.innerWidth : BP_LG + 1
    );
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);
    return width;
}

// ── TechIcon ──────────────────────────────────────────────────────────────────
const TechIcon: React.FC<TechItem & { size?: number }> = ({
    src, label, border = true, size = 60,
}) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{
            width: size, height: size,
            background: "#fff",
            border: border ? `1px solid ${CHARCOAL_40}` : "none",
            borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 8, boxSizing: "border-box", flexShrink: 0,
        }}>
            <img src={src} alt={label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <span style={{
            fontFamily: fontSans, fontSize: 11, color: CHARCOAL,
            textAlign: "center", lineHeight: "1.3", maxWidth: size + 20,
        }}>
            {label}
        </span>
    </div>
);

// ── CategoryCard ──────────────────────────────────────────────────────────────
const CategoryCard: React.FC<CategoryCardProps> = ({
    title, items, vertical = false, autoHeight = false, iconSize = 60,
}) => (
    <div style={{
        background: "#fff",
        border: `1px solid ${NAVY_60}`,
        borderBottom: `4px solid ${NAVY_60}`,
        borderRadius: 10,
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        alignItems: "center",
        padding: "15px 10px",
        position: "relative",
        height: autoHeight ? "auto" : "100%",
        boxSizing: "border-box",
        gap: 10,
    }}>
        <h3 style={{
            fontFamily: fontHead, fontSize: 16, fontWeight: 400,
            color: NAVY, textAlign: "center", lineHeight: "25px",
            margin: 0, whiteSpace: "pre-line", flexShrink: 0,
            minHeight: 44,
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%",
        }}>
            {title}
        </h3>

        <div style={{
            display: "flex",
            flexDirection: vertical ? "column" : "row",
            flexWrap: vertical ? "nowrap" : "wrap",
            gap: vertical ? 28 : 12,
            alignItems: "center", justifyContent: "center",
            flex: autoHeight ? undefined : 1,
            width: "100%",
            paddingBottom: 8,
        }}>
            {items.map((item) => (
                <TechIcon key={item.label} {...item} size={iconSize} />
            ))}
        </div>

        <div style={{
            position: "absolute", inset: 0,
            borderRadius: "inherit", pointerEvents: "none",
            boxShadow: "inset 0px -10px 12px 0px rgba(14,53,114,0.12)",
        }} />
    </div>
);

// ── Tinted Cell ───────────────────────────────────────────────────────────────
const Tint: React.FC<TintProps> = ({ r, c }) => (
    <div style={{ gridRow: r, gridColumn: c, background: NAVY_10, position: "relative" }}>
        <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            boxShadow: "inset 3px 6px 21px 0px rgba(14,53,114,0.08)",
        }} />
    </div>
);

// ── Static Data ───────────────────────────────────────────────────────────────
const tintCells: TintCellDef[] = [
    { r: 1, c: 1 }, { r: 1, c: 5 }, { r: 1, c: 6 }, { r: 1, c: 12 },
    { r: 2, c: 1 }, { r: 2, c: 5 }, { r: 2, c: 6 }, { r: 2, c: 12 }, { r: 2, c: 13 },
    { r: 3, c: 1 }, { r: 3, c: 2 }, { r: 3, c: 3 }, { r: 3, c: 4 },
    { r: 3, c: 8 }, { r: 3, c: 9 }, { r: 3, c: 10 }, { r: 3, c: 11 },
    { r: 3, c: 12 }, { r: 3, c: 13 }, { r: 3, c: 14 },
    { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 },
    { r: 4, c: 8 }, { r: 4, c: 9 }, { r: 4, c: 10 }, { r: 4, c: 11 }, { r: 4, c: 14 },
    { r: 5, c: 1 }, { r: 5, c: 6 }, { r: 5, c: 7 }, { r: 5, c: 11 }, { r: 5, c: 14 },
    { r: 6, c: 6 }, { r: 6, c: 7 }, { r: 6, c: 11 }, { r: 6, c: 14 },
    { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 5 }, { r: 7, c: 6 },
    { r: 7, c: 7 }, { r: 7, c: 8 }, { r: 7, c: 9 }, { r: 7, c: 10 },
    { r: 7, c: 11 }, { r: 7, c: 14 },
];

const accentCells: AccentCellDef[] = [
    { r: 1, c: 13, color: CYAN },
    { r: 1, c: 14, color: NAVY },
    { r: 2, c: 14, color: RED },
    { r: 6, c: 1, color: CYAN },
    { r: 7, c: 1, color: NAVY },
    { r: 7, c: 2, color: RED },
];

// Mobile card data sorted by mobileOrder (matching original JSX component)
const mobileCategories = [
    {
        mobileOrder: 1,
        title: "Frontend",
        items: [
            { src: imgReact, label: "React" },
            { src: imgNextjsFrontend, label: "Next.js", border: false },
        ],
    },
    {
        mobileOrder: 2,
        title: "DevOps & Infrastructure",
        items: [
            { src: imgAws, label: "AWS" },
            { src: imgGoogleCloud, label: "Google Cloud" },
            { src: imgCicd, label: "CI/CD" },
            { src: imgMonitoring, label: "Monitoring & Logging" },
        ],
    },
    {
        mobileOrder: 3,
        title: "Mobile",
        items: [
            { src: imgFlutter, label: "Flutter", border: false },
            { src: imgReactNative, label: "React Native", border: false },
        ],
    },
    {
        mobileOrder: 4,
        title: "Backend",
        items: [
            { src: imgNodejs, label: "Node.js", border: false },
            { src: imgNextjs, label: "Next.js", border: false },
        ],
    },
    {
        mobileOrder: 5,
        title: "Database",
        items: [
            { src: imgPostgresql, label: "PostgreSQL" },
            { src: imgMysql, label: "MySQL" },
            { src: imgMongodb, label: "MongoDB" },
            { src: imgFirebase, label: "Firebase" },
        ],
    },
    {
        mobileOrder: 6,
        title: "Agentic Workflows / AI\n(when relevant)",
        items: [
            { src: imgLlm, label: "LLM integrations" },
            { src: imgAiWorkflows, label: "AI-powered workflows" },
            { src: imgAutomation, label: "Automation agents" },
        ],
    },
].sort((a, b) => a.mobileOrder - b.mobileOrder);

// ── Main Component ────────────────────────────────────────────────────────────
export const TechStack: React.FC = () => {
    const width = useWindowWidth();
    const isMobile = width < BP_SM;
    const isDesktop = width >= BP_LG;

    return (
        <section style={{ width: "100%", background: "#f9f9f9", fontFamily: fontSans }}>
            <div style={{ display: "flex", alignItems: "stretch", width: "100%" }}>

                {/* Left gutter — desktop only */}
                {isDesktop && (
                    <div className="hidden lg:block flex-1 relative overflow-hidden">
                        <SidePattern side="left" invert />
                    </div>
                )}

                {/* ── Center content ── */}
                <div style={{
                    width: isDesktop ? 1320 : "100%",
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: isDesktop ? 34 : 24,
                    paddingTop: isDesktop ? 80 : 48,
                    paddingBottom: isDesktop ? 80 : 48,
                    paddingLeft: isDesktop ? 0 : 16,
                    paddingRight: isDesktop ? 0 : 16,
                    boxSizing: "border-box",
                }}>

                    {/* Header */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                        <div style={{
                            background: "rgba(14,53,114,0.05)",
                            border: "1px solid rgba(14,53,114,0.10)",
                            borderRadius: 4, padding: "8px 12px",
                        }}>
                            <span style={{ fontFamily: fontSans, fontSize: 12, color: NAVY }}>Built With</span>
                        </div>
                        <h2 style={{
                            fontFamily: fontHead,
                            fontSize: isMobile ? 22 : isDesktop ? 30 : 26,
                            fontWeight: 400, color: "#16181b",
                            margin: 0, textAlign: "center",
                        }}>
                            Technologies we work with
                        </h2>
                    </div>

                    {/* ── Desktop bento grid ── */}
                    {isDesktop && (
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(14, 1fr)",
                            gridTemplateRows: "repeat(7, 1fr)",
                            gap: 4,
                            width: "100%",
                            aspectRatio: "1320 / 673",
                            background: "#fff",
                            position: "relative",
                        }}>
                            {tintCells.map(({ r, c }, i) => <Tint key={`t-${i}`} r={r} c={c} />)}
                            {accentCells.map(({ r, c, color }, i) => (
                                <div key={`a-${i}`} style={{ gridRow: r, gridColumn: c, background: color }} />
                            ))}

                            {/* Frontend — col 2–4, row 1–2 */}
                            <div style={{ gridColumn: "2 / span 3", gridRow: "1 / span 2", zIndex: 10 }}>
                                <CategoryCard title="Frontend" iconSize={68} items={[
                                    { src: imgReact, label: "React" },
                                    { src: imgNextjsFrontend, label: "Next.js", border: false },
                                ]} />
                            </div>

                            {/* DevOps — col 7–11, row 1–2 */}
                            <div style={{ gridColumn: "7 / span 5", gridRow: "1 / span 2", zIndex: 10 }}>
                                <CategoryCard title="DevOps & Infrastructure" iconSize={68} items={[
                                    { src: imgAws, label: "AWS" },
                                    { src: imgGoogleCloud, label: "Google Cloud" },
                                    { src: imgCicd, label: "CI/CD" },
                                    { src: imgMonitoring, label: "Monitoring & Logging" },
                                ]} />
                            </div>

                            {/* Mobile — col 5–7, row 3–4 */}
                            <div style={{ gridColumn: "5 / span 3", gridRow: "3 / span 2", zIndex: 10 }}>
                                <CategoryCard title="Mobile" iconSize={68} items={[
                                    { src: imgFlutter, label: "Flutter", border: false },
                                    { src: imgReactNative, label: "React Native", border: false },
                                ]} />
                            </div>

                            {/* Database — col 2–5, row 5–6 */}
                            <div style={{ gridColumn: "2 / span 4", gridRow: "5 / span 2", zIndex: 10 }}>
                                <CategoryCard title="Database" iconSize={68} items={[
                                    { src: imgPostgresql, label: "PostgreSQL" },
                                    { src: imgMysql, label: "MySQL" },
                                    { src: imgMongodb, label: "MongoDB" },
                                    { src: imgFirebase, label: "Firebase" },
                                ]} />
                            </div>

                            {/* Backend — col 8–10, row 5–6 */}
                            <div style={{ gridColumn: "8 / span 3", gridRow: "5 / span 2", zIndex: 10 }}>
                                <CategoryCard title="Backend" iconSize={68} items={[
                                    { src: imgNodejs, label: "Node.js", border: false },
                                    { src: imgNextjs, label: "Next.js", border: false },
                                ]} />
                            </div>

                            {/* Agentic — col 12–13, row 4–7 */}
                            <div style={{ gridColumn: "12 / span 2", gridRow: "4 / span 4", zIndex: 10 }}>
                                <CategoryCard
                                    title={"Agentic Workflows / AI\n(when relevant)"}
                                    vertical iconSize={68}
                                    items={[
                                        { src: imgLlm, label: "LLM integrations" },
                                        { src: imgAiWorkflows, label: "AI-powered workflows" },
                                        { src: imgAutomation, label: "Automation agents" },
                                    ]}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Mobile / Tablet: responsive card grid ── */}
                    {!isDesktop && (
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                            gap: 12,
                            width: "100%",
                        }}>
                            {mobileCategories.map((cat) => (
                                <CategoryCard
                                    key={cat.title}
                                    title={cat.title}
                                    items={cat.items}
                                    vertical={cat.title.includes("Agentic")}
                                    autoHeight
                                    iconSize={isMobile ? 52 : 60}
                                />
                            ))}
                        </div>
                    )}

                    {/* Footer */}
                    <p style={{
                        fontFamily: fontHead,
                        fontSize: isMobile ? 14 : isDesktop ? 18 : 16,
                        fontWeight: 400, color: "#16181b",
                        textAlign: "center", lineHeight: "25px",
                        margin: 0, width: "100%",
                    }}>
                        We choose tools based on product needs, not preferences.
                    </p>
                </div>

                {/* Right gutter — desktop only */}
                {isDesktop && (
                    <div className="hidden lg:block flex-1 relative overflow-hidden">
                        <SidePattern side="right" invert />
                    </div>
                )}

            </div>
        </section>
    );
};

export default TechStack;
