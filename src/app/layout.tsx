import type { Metadata } from 'next'
import './globals.css'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ConditionalLayout } from '@/components/ConditionalLayout'

export const metadata: Metadata = {
    title: 'Custom Software Development Company for MVPs, AI & Scaling | Netizens Technologies',
    description: 'Need a custom software development company? We design and build MVPs, integrate AI, digitize workflows, extend your team, and support systems on-demand.',
    keywords: ['Custom software development company'],
    icons: {
        icon: '/favicon.svg',        // or '/favicon.svg'
    },
}

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Netizens Technologies",
    "alternateName": "Custom Software Development Company",
    "url": "https://netizenstechnologies.com/",
    "logo": "https://netizenstechnologies.com/wp-content/uploads/2024/07/logo.svg",
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "93134 40642",
        "contactType": "sales",
        "areaServed": "IN",
        "availableLanguage": "en"
    },
    "sameAs": [
        "https://www.facebook.com/netizenstech",
        "https://x.com/netizenstech_",
        "https://www.instagram.com/lyrcomercialsrl/",
        "https://www.linkedin.com/company/netizenstechnologies/posts/?feedView=all"
    ]
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="font-sans">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <ConditionalLayout>
                    {children}
                </ConditionalLayout>
            </body>
        </html>
    )
}
