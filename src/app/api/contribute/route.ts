import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import {
  getRepositoryDetails,
  getTopicDetails,
  getUserDetails,
  getUserTotalStars,
} from "@/lib/github"
import { prisma } from "@/lib/prisma"

// Helper function to calculate user rank based on total stars
async function calculateUserRank(
  totalStars: number,
  followers: number,
): Promise<number> {
  const rank = await prisma.user.count({
    where: {
      OR: [
        { totalStars: { gt: totalStars } },
        {
          totalStars: totalStars,
          followers: { gt: followers },
        },
      ],
    },
  })
  return rank + 1
}

// Helper function to calculate repository rank based on stars
async function calculateRepoRank(stars: number): Promise<number> {
  const rank = await prisma.repository.count({
    where: {
      stars: { gt: stars },
    },
  })
  return rank + 1
}

// Helper function to calculate topic rank based on score
async function calculateTopicRank(score: number): Promise<number> {
  const rank = await prisma.topic.count({
    where: {
      score: { gt: score },
    },
  })
  return rank + 1
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, identifier } = body

    if (!type || !identifier) {
      return NextResponse.json(
        { message: "Type and identifier are required" },
        { status: 400 },
      )
    }

    switch (type) {
      case "user":
        return await handleUserContribution(identifier)
      case "repo":
        return await handleRepoContribution(identifier)
      case "topic":
        return await handleTopicContribution(identifier)
      default:
        return NextResponse.json(
          { message: "Invalid type. Must be user, repo, or topic" },
          { status: 400 },
        )
    }
  } catch (error) {
    console.error("Contribute API error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}

async function handleUserContribution(username: string) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: `User ${username} already exists in rankings` },
        { status: 409 },
      )
    }

    // Fetch user details from GitHub
    const userDetails = await getUserDetails(username)

    if (!userDetails) {
      return NextResponse.json(
        { message: `User ${username} not found on GitHub` },
        { status: 404 },
      )
    }

    // Get total stars for the user
    const totalStars = await getUserTotalStars(username)

    // Create user in database
    const newUser = await prisma.user.create({
      data: {
        username: userDetails.login,
        name: userDetails.name,
        avatarUrl: userDetails.avatar_url,
        bio: userDetails.bio,
        location: userDetails.location,
        company: userDetails.company,
        blog: userDetails.blog,
        followers: userDetails.followers,
        following: userDetails.following,
        publicRepos: userDetails.public_repos,
        totalStars: totalStars,
      },
    })

    // Calculate rank position
    const rank = await calculateUserRank(totalStars, userDetails.followers)

    return NextResponse.json({
      message: `User ${username} successfully added to rankings`,
      data: newUser,
      rank: rank,
      rankInfo: {
        type: "user",
        position: rank,
        totalStars: totalStars,
        followers: userDetails.followers,
      },
    })
  } catch (error) {
    console.error("Error adding user:", error)
    return NextResponse.json(
      { message: `Failed to add user ${username}` },
      { status: 500 },
    )
  }
}

async function handleRepoContribution(fullName: string) {
  try {
    // Check if repository already exists
    const existingRepo = await prisma.repository.findUnique({
      where: { fullName },
    })

    if (existingRepo) {
      return NextResponse.json(
        { message: `Repository ${fullName} already exists in rankings` },
        { status: 409 },
      )
    }

    // Parse owner and repo from fullName (e.g., "facebook/react")
    const [owner, repo] = fullName.split("/")
    if (!owner || !repo) {
      return NextResponse.json(
        { message: `Invalid repository format. Use 'owner/repo'` },
        { status: 400 },
      )
    }

    // Fetch repository details from GitHub
    const repoDetails = await getRepositoryDetails(owner, repo)

    if (!repoDetails) {
      return NextResponse.json(
        { message: `Repository ${fullName} not found on GitHub` },
        { status: 404 },
      )
    }

    // Create repository in database
    const newRepo = await prisma.repository.create({
      data: {
        name: repoDetails.name,
        fullName: repoDetails.full_name,
        owner: repoDetails.owner.login,
        description: repoDetails.description,
        language: repoDetails.language,
        stars: repoDetails.stargazers_count,
        forks: repoDetails.forks_count,
        watchers: repoDetails.watchers_count,
        openIssues: repoDetails.open_issues_count,
        size: repoDetails.size,
        isPrivate: repoDetails.private,
        htmlUrl: repoDetails.html_url,
      },
    })

    // Calculate rank position
    const rank = await calculateRepoRank(repoDetails.stargazers_count)

    return NextResponse.json({
      message: `Repository ${fullName} successfully added to rankings`,
      data: newRepo,
      rank: rank,
      rankInfo: {
        type: "repository",
        position: rank,
        stars: repoDetails.stargazers_count,
        forks: repoDetails.forks_count,
      },
    })
  } catch (error) {
    console.error("Error adding repository:", error)
    return NextResponse.json(
      { message: `Failed to add repository ${fullName}` },
      { status: 500 },
    )
  }
}

async function handleTopicContribution(topicName: string) {
  try {
    // Check if topic already exists
    const existingTopic = await prisma.topic.findUnique({
      where: { name: topicName },
    })

    if (existingTopic) {
      return NextResponse.json(
        { message: `Topic ${topicName} already exists in rankings` },
        { status: 409 },
      )
    }

    // Fetch topic details from GitHub
    const topicDetails = await getTopicDetails(topicName)

    if (!topicDetails) {
      return NextResponse.json(
        { message: `Topic ${topicName} not found on GitHub` },
        { status: 404 },
      )
    }

    // Create topic in database
    const newTopic = await prisma.topic.create({
      data: {
        name: topicDetails.name,
        displayName: topicDetails.display_name,
        description: topicDetails.description,
        featured: topicDetails.featured,
        curated: topicDetails.curated,
        score: topicDetails.score,
        repositories: topicDetails.repositories || 0,
      },
    })

    // Calculate rank position
    const rank = await calculateTopicRank(topicDetails.score)

    return NextResponse.json({
      message: `Topic ${topicName} successfully added to rankings`,
      data: newTopic,
      rank: rank,
      rankInfo: {
        type: "topic",
        position: rank,
        score: topicDetails.score,
        repositories: topicDetails.repositories || 0,
      },
    })
  } catch (error) {
    console.error("Error adding topic:", error)
    return NextResponse.json(
      { message: `Failed to add topic ${topicName}` },
      { status: 500 },
    )
  }
}
