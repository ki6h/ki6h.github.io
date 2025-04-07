import type React from "react"
import { Inter, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import AnalyticsProvider from "@/components/analytics-provider"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "ki6h | Cybersecurity Expert & Exploit Developer",
  description:
    "Professional portfolio of ki6h, showcasing expertise in cybersecurity and exploit development for social media applications.",
  keywords: ["ki6h", "cybersecurity", "exploit development", "portfolio", "developer", "instagram tweaks"],
  authors: [{ name: "ki6h", url: "https://ki6h.github.io" }],
  creator: "ki6h",
  publisher: "ki6h",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ki6h.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ki6h | Cybersecurity Expert & Exploit Developer",
    description: "Professional portfolio showcasing expertise in cybersecurity and exploit development.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://ki6h.github.io",
    siteName: "ki6h Portfolio",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ki6h - Cybersecurity Expert & Exploit Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ki6h | Cybersecurity Expert & Exploit Developer",
    description: "Professional portfolio showcasing expertise in cybersecurity and exploit development.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AnalyticsProvider>
            <Navigation />
            {children}
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

