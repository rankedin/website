import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { CookieConsentBanner } from '@/components/cookie-consent';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'RankedIn - GitHub Rankings',
    template: '%s | RankedIn',
  },
  description:
    'Discover and rank the best GitHub users, repositories, and topics. Join the community and showcase your GitHub achievements.',
  keywords: [
    'GitHub',
    'rankings',
    'developers',
    'repositories',
    'open source',
    'programming',
  ],
  authors: [{ name: 'RankedIn Team' }],
  creator: 'RankedIn',
  // Ensure the PUBLIC_SITE_URL environment variable is a valid absolute URL.
  // Some CI/build environments mask or obfuscate env vars which can produce
  // invalid inputs like '****************.app'. Normalize by falling back to
  // a safe default and ensuring a scheme is present before calling `new URL`.
  metadataBase: (() => {
    const raw = process.env.PUBLIC_SITE_URL || 'https://rankedin.netlify.app';
    // If the raw value doesn't start with http:// or https://, prepend https://
    const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    try {
      return new URL(withScheme);
    } catch (_) {
      // As a last resort use the known good default
      return new URL('https://rankedin.netlify.app');
    }
  })(),
  icons: {
    icon: '/favicon.webp',
    shortcut: '/favicon.webp',
    apple: '/favicon.webp',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'RankedIn',
    title: 'RankedIn - GitHub Rankings',
    description:
      'Discover and rank the best GitHub users, repositories, and topics.',
    images: [
      {
        url: '/favicon.webp',
        width: 1200,
        height: 630,
        alt: 'RankedIn - GitHub Rankings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RankedIn - GitHub Rankings',
    description:
      'Discover and rank the best GitHub users, repositories, and topics.',
    images: ['/favicon.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Navbar />
          <main className='flex-1'>{children}</main>
          <Footer />
          <CookieConsentBanner />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
