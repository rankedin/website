import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top GitHub Repositories - Repository Rankings',
  description:
    'Explore the most starred and trending GitHub repositories. Discover popular open source projects and find inspiration for your next project.',
  keywords: [
    'GitHub repositories',
    'top repos',
    'open source',
    'trending projects',
    'GitHub stars',
    'popular repositories',
  ],
  openGraph: {
    title: 'Top GitHub Repositories - Repository Rankings | RankedIn',
    description: 'Explore the most starred and trending GitHub repositories.',
    url: '/repos/ranking',
    images: [
      {
        url: '/og-repos.png',
        width: 1200,
        height: 630,
        alt: 'Top GitHub Repositories Rankings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top GitHub Repositories - Repository Rankings | RankedIn',
    description: 'Explore the most starred and trending GitHub repositories.',
    images: ['/og-repos.png'],
  },
};

export default function ReposRankingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
