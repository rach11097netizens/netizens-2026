import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "High-Performance Landing Pages for Dubai Real Estate | Netizens UAE",
  description:
    "Netizens UAE builds high-converting landing page systems specifically for Dubai real estate. Maximize your ROAS with our modular, fast-loading, and ad-ready architectures.",
  alternates: {
    canonical:
      "https://netizenstechnologies.com/real-estate-landing-page-design-services",
  },
  keywords: [
    "Dubai Real Estate Marketing",
    "Landing Page Design Dubai",
    "Lead Generation Dubai",
    "Real Estate Digital Marketing UAE",
    "Netizens UAE",
    "Performance Marketing Dubai",
  ],
  openGraph: {
    type: "website",
    url: "https://netizenstechnologies.com/real-estate-landing-page-design-services",
    title:
      "High-Performance Landing Pages for Dubai Real Estate | Netizens UAE",
    description:
      "Netizens UAE builds high-converting landing page systems specifically for Dubai real estate. Maximize your ROAS with our modular, fast-loading, and ad-ready architectures.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "High-Performance Landing Pages for Dubai Real Estate | Netizens UAE",
    description:
      "Netizens UAE builds high-converting landing page systems specifically for Dubai real estate. Maximize your ROAS with our modular, fast-loading, and ad-ready architectures.",
  },
  robots: "noindex",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
