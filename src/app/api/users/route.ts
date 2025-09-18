import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getUserDetails, getUserTotalStars } from '@/lib/github';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'totalStars';
    const order = searchParams.get('order') || 'desc';

    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { username: { contains: search, mode: 'insensitive' as const } },
            { name: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const orderBy = {
      [sortBy]: order as 'asc' | 'desc',
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Users API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists in ranking' },
        { status: 409 }
      );
    }

    // Fetch user details from GitHub
    const githubUser = await getUserDetails(username);
    const totalStars = await getUserTotalStars(username);

    // Save to database
    const user = await prisma.user.create({
      data: {
        username: githubUser.login,
        name: githubUser.name,
        avatarUrl: githubUser.avatar_url,
        bio: githubUser.bio,
        location: githubUser.location,
        company: githubUser.company,
        blog: githubUser.blog,
        followers: githubUser.followers,
        following: githubUser.following,
        publicRepos: githubUser.public_repos,
        totalStars,
      },
    });

    // Get the user's ranking
    const ranking = await prisma.user.count({
      where: {
        totalStars: {
          gt: user.totalStars,
        },
      },
    });

    return NextResponse.json({
      user,
      ranking: ranking + 1,
      message: `User ${username} added and ranked #${ranking + 1}`,
    });
  } catch (error) {
    console.error('Add user error:', error);
    return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
  }
}
