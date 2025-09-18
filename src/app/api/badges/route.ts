import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface UserBadgeStats {
  username: string
  name: string | null
  rank: number
  totalUsers: number
  percentile: number
  totalStars: number
  followers: number
  publicRepos: number
  location: string | null
  company: string | null
  lastUpdated: Date
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username") || searchParams.get("name")
    const format = searchParams.get("format") || "json"
    const style = searchParams.get("style") || "default"

    if (!username) {
      return NextResponse.json(
        {
          error:
            "Username parameter is required. Use ?username=yourusername or ?name=yourusername",
        },
        { status: 400 },
      )
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    })

    if (!user) {
      return NextResponse.json(
        {
          error: `User '${username}' not found in our rankings. Please visit our website to add this user.`,
        },
        { status: 404 },
      )
    }

    // Calculate user's ranking
    const ranking = await prisma.user.count({
      where: {
        totalStars: {
          gt: user.totalStars,
        },
      },
    })

    const userRank = ranking + 1

    // Get total number of users for percentage calculation
    const totalUsers = await prisma.user.count()

    // Calculate percentile (higher is better)
    const percentile = Math.round(
      ((totalUsers - userRank + 1) / totalUsers) * 100,
    )

    const userStats = {
      username: user.username,
      name: user.name,
      rank: userRank,
      totalUsers,
      percentile,
      totalStars: user.totalStars,
      followers: user.followers,
      publicRepos: user.publicRepos,
      location: user.location,
      company: user.company,
      lastUpdated: user.updatedAt,
    }

    // Return different formats based on request
    if (
      format === "svg" ||
      request.headers.get("accept")?.includes("image/svg+xml")
    ) {
      return generateBadgeSVG(userStats, style)
    }

    // Default JSON response
    return NextResponse.json(userStats)
  } catch (error) {
    console.error("Badges API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}

function generateBadgeSVG(
  stats: UserBadgeStats,
  style: string = "default",
): NextResponse {
  const rank = stats.rank.toLocaleString()
  const stars = stats.totalStars.toLocaleString()
  const percentile = stats.percentile

  // Escape special characters for SVG
  const username = stats.username.replace(/[<>&'"]/g, (c) => {
    const escapeChars: { [key: string]: string } = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&#39;",
      '"': "&quot;",
    }
    return escapeChars[c] || c
  })

  let svg: string

  if (style === "flat") {
    // Flat style badge
    svg = `<svg width="320" height="28" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#555;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#333;stop-opacity:1"/>
    </linearGradient>
  </defs>
  <rect width="320" height="28" rx="6" fill="url(#gradient)"/>
  <rect x="8" y="6" width="50" height="16" rx="8" fill="#4c1"/>
  <text x="33" y="17" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white">#${rank}</text>
  <text x="70" y="17" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="white">${username}</text>
  <text x="180" y="17" font-family="Arial, sans-serif" font-size="10" fill="#ccc">⭐ ${stars} stars</text>
  <text x="280" y="17" font-family="Arial, sans-serif" font-size="10" fill="#4c1" text-anchor="end">Top ${percentile}%</text>
</svg>`
  } else if (style === "plastic") {
    // Plastic style badge
    svg = `<svg width="320" height="28" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#dfb317;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#fff;stop-opacity:0.3"/>
      <stop offset="50%" style="stop-color:#fff;stop-opacity:0"/>
      <stop offset="100%" style="stop-color:#000;stop-opacity:0.1"/>
    </linearGradient>
  </defs>
  <rect width="320" height="28" rx="6" fill="url(#gradient)"/>
  <rect width="320" height="28" rx="6" fill="url(#shine)"/>
  <rect x="8" y="6" width="50" height="16" rx="8" fill="#4c1"/>
  <text x="33" y="17" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white">#${rank}</text>
  <text x="70" y="17" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#000">${username}</text>
  <text x="180" y="17" font-family="Arial, sans-serif" font-size="10" fill="#000">⭐ ${stars} stars</text>
  <text x="280" y="17" font-family="Arial, sans-serif" font-size="10" fill="#4c1" text-anchor="end">Top ${percentile}%</text>
</svg>`
  } else {
    // Default style (modern dark theme)
    svg = `<svg width="320" height="28" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#334155;stop-opacity:1"/>
    </linearGradient>
  </defs>
  <rect width="320" height="28" rx="6" fill="url(#gradient)"/>
  <rect x="8" y="6" width="50" height="16" rx="8" fill="#3b82f6"/>
  <text x="33" y="17" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white">#${rank}</text>
  <text x="70" y="17" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#f1f5f9">${username}</text>
  <text x="180" y="17" font-family="Arial, sans-serif" font-size="10" fill="#64748b">⭐ ${stars} stars</text>
  <text x="280" y="17" font-family="Arial, sans-serif" font-size="10" fill="#3b82f6" text-anchor="end">Top ${percentile}%</text>
</svg>`
  }

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=300", // Cache for 5 minutes
      "Access-Control-Allow-Origin": "*", // Allow cross-origin requests
    },
  })
}
