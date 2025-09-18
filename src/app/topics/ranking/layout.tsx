import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Top GitHub Topics - Topic Rankings",
  description:
    "Discover the most popular GitHub topics and programming trends. Explore technologies, frameworks, and tools ranked by community engagement.",
  keywords: [
    "GitHub topics",
    "programming trends",
    "technology rankings",
    "popular frameworks",
    "development tools",
  ],
  openGraph: {
    title: "Top GitHub Topics - Topic Rankings | RankedIn",
    description:
      "Discover the most popular GitHub topics and programming trends.",
    url: "/topics/ranking",
    images: [
      {
        url: "/og-topics.png",
        width: 1200,
        height: 630,
        alt: "Top GitHub Topics Rankings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top GitHub Topics - Topic Rankings | RankedIn",
    description:
      "Discover the most popular GitHub topics and programming trends.",
    images: ["/og-topics.png"],
  },
}

export default function TopicsRankingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
