import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Top GitHub Users - User Rankings",
  description:
    "Discover the top GitHub users ranked by followers, contributions, and overall impact. Find the most influential developers in the GitHub community.",
  keywords: [
    "GitHub users",
    "developer rankings",
    "top developers",
    "GitHub followers",
    "programming influencers",
  ],
  openGraph: {
    title: "Top GitHub Users - User Rankings | RankedIn",
    description:
      "Discover the top GitHub users ranked by followers, contributions, and overall impact.",
    url: "/users/ranking",
    images: [
      {
        url: "/og-users.png",
        width: 1200,
        height: 630,
        alt: "Top GitHub Users Rankings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top GitHub Users - User Rankings | RankedIn",
    description:
      "Discover the top GitHub users ranked by followers, contributions, and overall impact.",
    images: ["/og-users.png"],
  },
}

export default function UsersRankingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
