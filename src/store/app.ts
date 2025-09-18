import { create } from "zustand"
import { persist } from "zustand/middleware"

// User ranking state
interface User {
  id: string
  username: string
  name: string | null
  avatarUrl: string | null
  bio: string | null
  location: string | null
  company: string | null
  blog: string | null
  followers: number
  following: number
  publicRepos: number
  totalStars: number
  createdAt: Date
  updatedAt: Date
}

// Repository ranking state
interface Repository {
  id: string
  name: string
  fullName: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  watchers: number
  openIssues: number
  size: number
  topics: string[]
  owner: string
  ownerAvatar: string | null
  htmlUrl: string
  createdAt: string
  updatedAt: string
}

// Topic ranking state
interface Topic {
  id: string
  name: string
  displayName: string | null
  shortDescription: string | null
  description: string | null
  featured: boolean
  curated: boolean
  score: number
  repositoryCount: number
  repositories: number
  createdAt: Date
  updatedAt: Date
}

// Search state
interface SearchUser {
  login: string
  id: number
  avatar_url: string
  type: string
  score: number
}

interface SearchRepo {
  full_name: string
  name: string
  owner: {
    login: string
    avatar_url: string
  }
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  score: number
}

interface SearchTopic {
  name: string
  display_name: string | null
  short_description: string | null
  score: number
}

// Global app state
interface AppState {
  // Users ranking
  users: User[]
  usersLoading: boolean
  usersError: string | null
  usersSearch: string
  usersSort: string
  usersFilter: string
  usersPage: number
  usersHasMore: boolean

  // Repositories ranking
  repositories: Repository[]
  repositoriesLoading: boolean
  repositoriesError: string | null
  repositoriesSearch: string
  repositoriesSort: string
  repositoriesOrder: string
  repositoriesLanguageFilter: string
  repositoriesPage: number
  repositoriesTotalPages: number
  repositoriesHasMore: boolean

  // Topics ranking
  topics: Topic[]
  topicsLoading: boolean
  topicsError: string | null
  topicsSearch: string
  topicsSort: string
  topicsPage: number
  topicsHasMore: boolean

  // Search
  searchQuery: string
  searchUsers: SearchUser[]
  searchRepos: SearchRepo[]
  searchTopics: SearchTopic[]
  searchLoading: boolean
  searchError: string | null

  // Contribute
  contributeInput: string
  contributeProcessing: boolean
  contributeResults: Array<{
    type: "user" | "repo" | "topic"
    identifier: string
    status: "success" | "error"
    message: string
    rank?: number
    rankInfo?: {
      type: "user" | "repository" | "topic"
      position: number
      totalStars?: number
      followers?: number
      stars?: number
      forks?: number
      score?: number
      repositories?: number
    }
  }>

  // Adding to ranking states
  addingToRanking: Record<string, boolean>
  addedToRanking: Record<string, boolean>

  // Actions
  setUsers: (users: User[]) => void
  setUsersLoading: (loading: boolean) => void
  setUsersError: (error: string | null) => void
  setUsersSearch: (search: string) => void
  setUsersSort: (sort: string) => void
  setUsersFilter: (filter: string) => void
  setUsersPage: (page: number) => void
  setUsersHasMore: (hasMore: boolean) => void

  setRepositories: (repositories: Repository[]) => void
  setRepositoriesLoading: (loading: boolean) => void
  setRepositoriesError: (error: string | null) => void
  setRepositoriesSearch: (search: string) => void
  setRepositoriesSort: (sort: string) => void
  setRepositoriesOrder: (order: string) => void
  setRepositoriesLanguageFilter: (filter: string) => void
  setRepositoriesPage: (page: number) => void
  setRepositoriesTotalPages: (totalPages: number) => void
  setRepositoriesHasMore: (hasMore: boolean) => void

  setTopics: (topics: Topic[]) => void
  setTopicsLoading: (loading: boolean) => void
  setTopicsError: (error: string | null) => void
  setTopicsSearch: (search: string) => void
  setTopicsSort: (sort: string) => void
  setTopicsPage: (page: number) => void
  setTopicsHasMore: (hasMore: boolean) => void

  setSearchQuery: (query: string) => void
  setSearchUsers: (users: SearchUser[]) => void
  setSearchRepos: (repos: SearchRepo[]) => void
  setSearchTopics: (topics: SearchTopic[]) => void
  setSearchLoading: (loading: boolean) => void
  setSearchError: (error: string | null) => void

  setContributeInput: (input: string) => void
  setContributeProcessing: (processing: boolean) => void
  setContributeResults: (
    results: Array<{
      type: "user" | "repo" | "topic"
      identifier: string
      status: "success" | "error"
      message: string
      rank?: number
      rankInfo?: {
        type: "user" | "repository" | "topic"
        position: number
        totalStars?: number
        followers?: number
        stars?: number
        forks?: number
        score?: number
        repositories?: number
      }
    }>,
  ) => void

  setAddingToRanking: (key: string, adding: boolean) => void
  setAddedToRanking: (key: string, added: boolean) => void

  // Reset functions
  resetUsers: () => void
  resetRepositories: () => void
  resetTopics: () => void
  resetSearch: () => void
  resetContribute: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, _get) => ({
      // Initial state
      users: [],
      usersLoading: false,
      usersError: null,
      usersSearch: "",
      usersSort: "followers",
      usersFilter: "all",
      usersPage: 1,
      usersHasMore: true,

      repositories: [],
      repositoriesLoading: false,
      repositoriesError: null,
      repositoriesSearch: "",
      repositoriesSort: "stars",
      repositoriesOrder: "desc",
      repositoriesLanguageFilter: "all",
      repositoriesPage: 1,
      repositoriesTotalPages: 1,
      repositoriesHasMore: true,

      topics: [],
      topicsLoading: false,
      topicsError: null,
      topicsSearch: "",
      topicsSort: "score",
      topicsPage: 1,
      topicsHasMore: true,

      searchQuery: "",
      searchUsers: [],
      searchRepos: [],
      searchTopics: [],
      searchLoading: false,
      searchError: null,

      contributeInput: "",
      contributeProcessing: false,
      contributeResults: [],

      addingToRanking: {},
      addedToRanking: {},

      // Actions
      setUsers: (users) => set({ users }),
      setUsersLoading: (loading) => set({ usersLoading: loading }),
      setUsersError: (error) => set({ usersError: error }),
      setUsersSearch: (search) => set({ usersSearch: search }),
      setUsersSort: (sort) => set({ usersSort: sort }),
      setUsersFilter: (filter) => set({ usersFilter: filter }),
      setUsersPage: (page) => set({ usersPage: page }),
      setUsersHasMore: (hasMore) => set({ usersHasMore: hasMore }),

      setRepositories: (repositories) => set({ repositories }),
      setRepositoriesLoading: (loading) =>
        set({ repositoriesLoading: loading }),
      setRepositoriesError: (error) => set({ repositoriesError: error }),
      setRepositoriesSearch: (search) => set({ repositoriesSearch: search }),
      setRepositoriesSort: (sort) => set({ repositoriesSort: sort }),
      setRepositoriesOrder: (order) => set({ repositoriesOrder: order }),
      setRepositoriesLanguageFilter: (filter) =>
        set({ repositoriesLanguageFilter: filter }),
      setRepositoriesPage: (page) => set({ repositoriesPage: page }),
      setRepositoriesTotalPages: (totalPages) =>
        set({ repositoriesTotalPages: totalPages }),
      setRepositoriesHasMore: (hasMore) =>
        set({ repositoriesHasMore: hasMore }),

      setTopics: (topics) => set({ topics }),
      setTopicsLoading: (loading) => set({ topicsLoading: loading }),
      setTopicsError: (error) => set({ topicsError: error }),
      setTopicsSearch: (search) => set({ topicsSearch: search }),
      setTopicsSort: (sort) => set({ topicsSort: sort }),
      setTopicsPage: (page) => set({ topicsPage: page }),
      setTopicsHasMore: (hasMore) => set({ topicsHasMore: hasMore }),

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSearchUsers: (users) => set({ searchUsers: users }),
      setSearchRepos: (repos) => set({ searchRepos: repos }),
      setSearchTopics: (topics) => set({ searchTopics: topics }),
      setSearchLoading: (loading) => set({ searchLoading: loading }),
      setSearchError: (error) => set({ searchError: error }),

      setContributeInput: (input) => set({ contributeInput: input }),
      setContributeProcessing: (processing) =>
        set({ contributeProcessing: processing }),
      setContributeResults: (results) => set({ contributeResults: results }),

      setAddingToRanking: (key, adding) =>
        set((state) => ({
          addingToRanking: { ...state.addingToRanking, [key]: adding },
        })),
      setAddedToRanking: (key, added) =>
        set((state) => ({
          addedToRanking: { ...state.addedToRanking, [key]: added },
        })),

      // Reset functions
      resetUsers: () =>
        set({
          users: [],
          usersLoading: false,
          usersError: null,
          usersSearch: "",
          usersSort: "followers",
          usersFilter: "all",
          usersPage: 1,
          usersHasMore: true,
        }),

      resetRepositories: () =>
        set({
          repositories: [],
          repositoriesLoading: false,
          repositoriesError: null,
          repositoriesSearch: "",
          repositoriesSort: "stars",
          repositoriesLanguageFilter: "all",
          repositoriesPage: 1,
          repositoriesHasMore: true,
        }),

      resetTopics: () =>
        set({
          topics: [],
          topicsLoading: false,
          topicsError: null,
          topicsSearch: "",
          topicsSort: "score",
          topicsPage: 1,
          topicsHasMore: true,
        }),

      resetSearch: () =>
        set({
          searchQuery: "",
          searchUsers: [],
          searchRepos: [],
          searchTopics: [],
          searchLoading: false,
          searchError: null,
        }),

      resetContribute: () =>
        set({
          contributeInput: "",
          contributeProcessing: false,
          contributeResults: [],
        }),
    }),
    {
      name: "rankedin-app-store",
      partialize: (state) => ({
        // Only persist theme and search query
        usersSort: state.usersSort,
        usersFilter: state.usersFilter,
        repositoriesSort: state.repositoriesSort,
        repositoriesLanguageFilter: state.repositoriesLanguageFilter,
        topicsSort: state.topicsSort,
        searchQuery: state.searchQuery,
      }),
    },
  ),
)
