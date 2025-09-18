import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Get all the statistics in parallel for better performance
    const [userCount, repoCount, totalStars, topicCount] = await Promise.all([
      // Count total users
      prisma.user.count(),

      // Count total repositories
      prisma.repository.count(),

      // Sum all stars from repositories
      prisma.repository.aggregate({
        _sum: {
          stars: true,
        },
      }),

      // Count total topics
      prisma.topic.count(),
    ])

    // Format the numbers nicely
    const formatNumber = (num: number): string => {
      if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`
      }
      if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`
      }
      return num.toString()
    }

    const stats = {
      usersRanked: {
        value: userCount > 0 ? formatNumber(userCount) : "0",
        raw: userCount,
        description: "GitHub developers in our rankings",
      },
      repositories: {
        value: repoCount > 0 ? formatNumber(repoCount) : "0",
        raw: repoCount,
        description: "Open source projects tracked",
      },
      totalStars: {
        value:
          (totalStars._sum.stars || 0) > 0
            ? formatNumber(totalStars._sum.stars || 0)
            : "0",
        raw: totalStars._sum.stars || 0,
        description: "Combined stars across all repos",
      },
      activeTopics: {
        value: topicCount > 0 ? formatNumber(topicCount) : "0",
        raw: topicCount,
        description: "Trending technologies tracked",
      },
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Stats API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 },
    )
  }
}
