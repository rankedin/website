import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { CookieConsentBanner } from "@/components/cookie-consent"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "RankedIn - GitHub Rankings",
    template: "%s | RankedIn",
  },
  description:
    "Discover and rank the best GitHub users, repositories, and topics. Join the community and showcase your GitHub achievements.",
  keywords: [
    "GitHub",
    "rankings",
    "developers",
    "repositories",
    "open source",
    "programming",
  ],
  authors: [{ name: "RankedIn Team" }],
  creator: "RankedIn",
  metadataBase: new URL(process.env.PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "RankedIn",
    title: "RankedIn - GitHub Rankings",
    description:
      "Discover and rank the best GitHub users, repositories, and topics.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RankedIn - GitHub Rankings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RankedIn - GitHub Rankings",
    description:
      "Discover and rank the best GitHub users, repositories, and topics.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsentBanner />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
