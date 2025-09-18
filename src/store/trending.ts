import { create } from "zustand"

interface TrendingUser {
  username: string
  name: string
  avatarUrl: string
  followers: number
  totalStars: number
  bio?: string
}

interface TrendingRepo {
  name: string
  fullName: string
  description: string
  language: string
  stars: number
  forks: number
  owner: {
    login: string
    avatar_url: string
  }
}

interface TrendingTopic {
  name: string
  displayName: string
  description?: string
  score: number
  repositoryCount: number
}

interface TrendingState {
  // Trending data
  trendingUsers: TrendingUser[]
  trendingRepos: TrendingRepo[]
  trendingTopics: TrendingTopic[]

  // Loading states
  loading: boolean
  error: string | null

  // Actions
  setTrendingUsers: (users: TrendingUser[]) => void
  setTrendingRepos: (repos: TrendingRepo[]) => void
  setTrendingTopics: (topics: TrendingTopic[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Fetch actions
  fetchTrendingData: () => Promise<void>
}

export const useTrendingStore = create<TrendingState>((set) => ({
  // Initial state
  trendingUsers: [],
  trendingRepos: [],
  trendingTopics: [],
  loading: true,
  error: null,

  // Setters
  setTrendingUsers: (users) => set({ trendingUsers: users }),
  setTrendingRepos: (repos) => set({ trendingRepos: repos }),
  setTrendingTopics: (topics) => set({ trendingTopics: topics }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Fetch trending data
  fetchTrendingData: async () => {
    try {
      set({ loading: true, error: null })

      // Fetch top 3 users
      const usersResponse = await fetch(
        "/api/users?page=1&limit=3&sortBy=totalStars&order=desc",
      )
      const usersData = await usersResponse.json()
      set({ trendingUsers: usersData.users || [] })

      // Fetch top 3 repositories
      const reposResponse = await fetch(
        "/api/repositories?page=1&limit=3&sortBy=stars&order=desc",
      )
      const reposData = await reposResponse.json()
      set({ trendingRepos: reposData.repositories || [] })

      // Fetch top 6 topics
      const topicsResponse = await fetch(
        "/api/topics?page=1&limit=6&sortBy=score&order=desc",
      )
      const topicsData = await topicsResponse.json()
      set({ trendingTopics: topicsData.topics || [] })
    } catch (err) {
      console.error("Error fetching trending data:", err)
      set({ error: "Failed to load trending data" })
    } finally {
      set({ loading: false })
    }
  },
}))
