import { create } from "zustand"

interface StatsData {
  usersRanked: {
    value: string
    raw: number
    description: string
  }
  repositories: {
    value: string
    raw: number
    description: string
  }
  totalStars: {
    value: string
    raw: number
    description: string
  }
  activeTopics: {
    value: string
    raw: number
    description: string
  }
}

interface StatsState {
  // Stats data
  stats: StatsData | null

  // Loading states
  loading: boolean
  error: string | null

  // Actions
  setStats: (stats: StatsData) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Fetch action
  fetchStats: () => Promise<void>
}

export const useStatsStore = create<StatsState>((set) => ({
  // Initial state
  stats: null,
  loading: true,
  error: null,

  // Setters
  setStats: (stats) => set({ stats }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Fetch stats
  fetchStats: async () => {
    try {
      set({ loading: true, error: null })

      const response = await fetch("/api/stats")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Validate that we have the expected data structure
      if (!data || typeof data !== "object") {
        throw new Error("Invalid response format")
      }

      set({ stats: data })
    } catch (err) {
      console.error("Error fetching stats:", err)
      set({
        error: err instanceof Error ? err.message : "Failed to load statistics",
        stats: null,
      })
    } finally {
      set({ loading: false })
    }
  },
}))
