import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contribute to Rankings - Add GitHub Entities',
  description:
    'Help us build comprehensive GitHub rankings by contributing users, repositories, and topics. Easily add GitHub entities to our ranking system.',
  keywords: [
    'contribute',
    'add GitHub users',
    'submit repositories',
    'GitHub rankings contribution',
  ],
  openGraph: {
    title: 'Contribute to Rankings - Add GitHub Entities | RankedIn',
    description:
      'Help us build comprehensive GitHub rankings by contributing users, repositories, and topics.',
    url: '/contribute',
    images: [
      {
        url: '/og-contribute.png',
        width: 1200,
        height: 630,
        alt: 'Contribute to GitHub Rankings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contribute to Rankings - Add GitHub Entities | RankedIn',
    description: 'Help us build comprehensive GitHub rankings.',
    images: ['/og-contribute.png'],
  },
};

export default function ContributeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
