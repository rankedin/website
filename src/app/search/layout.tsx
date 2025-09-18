import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search GitHub - Find Users, Repositories & Topics',
  description:
    'Search GitHub for users, repositories, and topics. Add interesting finds to our ranking system and help build comprehensive GitHub rankings.',
  keywords: [
    'GitHub search',
    'find repositories',
    'discover users',
    'GitHub topics',
    'search developers',
  ],
  openGraph: {
    title: 'Search GitHub - Find Users, Repositories & Topics | RankedIn',
    description: 'Search GitHub for users, repositories, and topics.',
    url: '/search',
    images: [
      {
        url: '/og-search.png',
        width: 1200,
        height: 630,
        alt: 'Search GitHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search GitHub - Find Users, Repositories & Topics | RankedIn',
    description: 'Search GitHub for users, repositories, and topics.',
    images: ['/og-search.png'],
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
