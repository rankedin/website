import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { github } from "@/lib/github"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = parseInt(searchParams.get("limit") || "20", 10)
    const search = searchParams.get("search") || ""
    const sortBy = searchParams.get("sortBy") || "score"
    const order = searchParams.get("order") || "desc"

    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { displayName: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}

    const orderBy = {
      [sortBy]: order as "asc" | "desc",
    }

    const [topics, total] = await Promise.all([
      prisma.topic.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.topic.count({ where }),
    ])

    return NextResponse.json({
      topics,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Topics API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()

    if (!name) {
      return NextResponse.json(
        { error: "Topic name is required" },
        { status: 400 },
      )
    }

    // Check if topic already exists
    const existingTopic = await prisma.topic.findUnique({
      where: { name },
    })

    if (existingTopic) {
      return NextResponse.json(
        { error: "Topic already exists in ranking" },
        { status: 409 },
      )
    }

    // Search for repositories with this topic to calculate score
    try {
      const reposResponse = await github.rest.search.repos({
        q: `topic:${name}`,
        sort: "stars",
        order: "desc",
        per_page: 100,
      })

      const repositories = reposResponse.data.total_count
      const score = reposResponse.data.items.reduce(
        (sum, repo) => sum + (repo.stargazers_count || 0),
        0,
      )

      // Save to database
      const topic = await prisma.topic.create({
        data: {
          name,
          displayName: name.charAt(0).toUpperCase() + name.slice(1),
          description: `Topic: ${name}`,
          repositories,
          score,
          featured: false,
          curated: false,
        },
      })

      // Get the topic's ranking
      const ranking = await prisma.topic.count({
        where: {
          score: {
            gt: topic.score,
          },
        },
      })

      return NextResponse.json({
        topic,
        ranking: ranking + 1,
        message: `Topic ${name} added and ranked #${ranking + 1}`,
      })
    } catch (githubError) {
      console.error("GitHub API error:", githubError)

      // Create topic with default values if GitHub API fails
      const topic = await prisma.topic.create({
        data: {
          name,
          displayName: name.charAt(0).toUpperCase() + name.slice(1),
          description: `Topic: ${name}`,
          repositories: 0,
          score: 0,
          featured: false,
          curated: false,
        },
      })

      return NextResponse.json({
        topic,
        ranking: null,
        message: `Topic ${name} added with default values`,
      })
    }
  } catch (error) {
    console.error("Add topic error:", error)
    return NextResponse.json({ error: "Failed to add topic" }, { status: 500 })
  }
}
