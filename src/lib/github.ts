import { Octokit } from '@octokit/rest';

export const github = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface GitHubUser {
  login: string;
  id: number;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  size: number;
  private: boolean;
  html_url: string;
  created_at: string;
  updated_at: string;
}

export interface GitHubTopic {
  name: string;
  display_name: string | null;
  short_description: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  featured: boolean;
  curated: boolean;
  score: number;
  repositories?: number;
}

export async function searchUsers(query: string, page = 1, perPage = 30) {
  try {
    const response = await github.rest.search.users({
      q: query,
      page,
      per_page: perPage,
      sort: 'followers',
      order: 'desc',
    });
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
}

export async function searchRepositories(
  query: string,
  page = 1,
  perPage = 30
) {
  try {
    const response = await github.rest.search.repos({
      q: query,
      page,
      per_page: perPage,
      sort: 'stars',
      order: 'desc',
    });
    return response.data;
  } catch (error) {
    console.error('Error searching repositories:', error);
    throw error;
  }
}

export async function searchTopics(query: string) {
  try {
    const response = await github.rest.search.topics({
      q: query,
    });
    return response.data;
  } catch (error) {
    console.error('Error searching topics:', error);
    throw error;
  }
}

export async function getUserDetails(username: string): Promise<GitHubUser> {
  try {
    const response = await github.rest.users.getByUsername({
      username,
    });
    return response.data as GitHubUser;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
}

export async function getRepositoryDetails(
  owner: string,
  repo: string
): Promise<GitHubRepository> {
  try {
    const response = await github.rest.repos.get({
      owner,
      repo,
    });
    return response.data as GitHubRepository;
  } catch (error) {
    console.error('Error fetching repository details:', error);
    throw error;
  }
}

export async function getUserTotalStars(username: string): Promise<number> {
  try {
    let totalStars = 0;
    let page = 1;
    const perPage = 100;

    while (true) {
      const response = await github.rest.repos.listForUser({
        username,
        page,
        per_page: perPage,
        type: 'owner',
      });

      if (response.data.length === 0) break;

      totalStars += response.data.reduce(
        (sum, repo) => sum + (repo.stargazers_count || 0),
        0
      );

      if (response.data.length < perPage) break;
      page++;
    }

    return totalStars;
  } catch (error) {
    console.error('Error calculating total stars:', error);
    return 0;
  }
}

export async function getTopicDetails(
  topicName: string
): Promise<GitHubTopic | null> {
  try {
    // Search for repositories with this topic to get info
    const searchResponse = await github.rest.search.repos({
      q: `topic:${topicName}`,
      sort: 'stars',
      order: 'desc',
      per_page: 1,
    });

    if (searchResponse.data.total_count === 0) {
      return null;
    }

    // Create a mock topic object since GitHub doesn't have a direct topics API
    return {
      name: topicName,
      display_name: topicName.charAt(0).toUpperCase() + topicName.slice(1),
      short_description: `Topic: ${topicName}`,
      description: `A collection of repositories related to ${topicName}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      featured: false,
      curated: false,
      score: Math.min(searchResponse.data.total_count / 100, 100),
      repositories: searchResponse.data.total_count,
    };
  } catch (error) {
    console.error('Error fetching topic details:', error);
    return null;
  }
}
