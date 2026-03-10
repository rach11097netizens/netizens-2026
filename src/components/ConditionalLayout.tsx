"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import { Footer } from "./Footer";

const ROUTES_WITHOUT_LAYOUT = ["/thank-you"];

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideLayout = ROUTES_WITHOUT_LAYOUT.includes(pathname);

    return (
        <div className="flex flex-col min-h-screen">
            {!hideLayout && <Navbar />}
            <main className="flex-grow">{children}</main>
            {!hideLayout && <Footer />}
        </div>
    );
}