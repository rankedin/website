import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { searchRepositories, searchTopics, searchUsers } from '@/lib/github';

interface SearchResults {
  users?: {
    items: unknown[];
    total_count: number;
  };
  repositories?: {
    items: unknown[];
    total_count: number;
  };
  topics?: {
    items: unknown[];
    total_count: number;
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type'); // 'users', 'repos', 'topics', or 'all'
    const page = parseInt(searchParams.get('page') || '1', 10);
    const perPage = parseInt(searchParams.get('per_page') || '30', 10);

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const results: SearchResults = {};

    if (type === 'users' || type === 'all' || !type) {
      try {
        const users = await searchUsers(query, page, perPage);
        results.users = users;
      } catch (error) {
        console.error('Error searching users:', error);
        results.users = { items: [], total_count: 0 };
      }
    }

    if (type === 'repos' || type === 'all' || !type) {
      try {
        const repos = await searchRepositories(query, page, perPage);
        results.repositories = repos;
      } catch (error) {
        console.error('Error searching repositories:', error);
        results.repositories = { items: [], total_count: 0 };
      }
    }

    if (type === 'topics' || type === 'all' || !type) {
      try {
        const topics = await searchTopics(query);
        results.topics = topics;
      } catch (error) {
        console.error('Error searching topics:', error);
        results.topics = { items: [], total_count: 0 };
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
