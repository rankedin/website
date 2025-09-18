import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getRepositoryDetails } from '@/lib/github';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'stars';
    const order = searchParams.get('order') || 'desc';

    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { fullName: { contains: search, mode: 'insensitive' as const } },
            { owner: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const orderBy = {
      [sortBy]: order as 'asc' | 'desc',
    };

    const [repositories, total] = await Promise.all([
      prisma.repository.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.repository.count({ where }),
    ]);

    return NextResponse.json({
      repositories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Repositories API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { fullName } = await request.json();

    if (!fullName || !fullName.includes('/')) {
      return NextResponse.json(
        { error: 'Valid repository full name (owner/repo) is required' },
        { status: 400 }
      );
    }

    const [owner, repo] = fullName.split('/');

    // Check if repository already exists
    const existingRepo = await prisma.repository.findUnique({
      where: { fullName },
    });

    if (existingRepo) {
      return NextResponse.json(
        { error: 'Repository already exists in ranking' },
        { status: 409 }
      );
    }

    // Fetch repository details from GitHub
    const githubRepo = await getRepositoryDetails(owner, repo);

    // Save to database
    const repository = await prisma.repository.create({
      data: {
        name: githubRepo.name,
        fullName: githubRepo.full_name,
        owner: githubRepo.owner.login,
        description: githubRepo.description,
        language: githubRepo.language,
        stars: githubRepo.stargazers_count,
        forks: githubRepo.forks_count,
        watchers: githubRepo.watchers_count,
        openIssues: githubRepo.open_issues_count,
        size: githubRepo.size,
        isPrivate: githubRepo.private,
        htmlUrl: githubRepo.html_url,
      },
    });

    // Get the repository's ranking
    const ranking = await prisma.repository.count({
      where: {
        stars: {
          gt: repository.stars,
        },
      },
    });

    return NextResponse.json({
      repository,
      ranking: ranking + 1,
      message: `Repository ${fullName} added and ranked #${ranking + 1}`,
    });
  } catch (error) {
    console.error('Add repository error:', error);
    return NextResponse.json(
      { error: 'Failed to add repository' },
      { status: 500 }
    );
  }
}
