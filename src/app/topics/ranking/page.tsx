"use client"

import { motion } from "framer-motion"
import {
  ArrowUpDown,
  Award,
  Crown,
  Filter,
  GitBranch,
  Hash,
  Search,
  Star,
} from "lucide-react"
import { useCallback, useEffect } from "react"
import { TopicCardSkeleton } from "@/components/skeletons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppStore } from "@/store/app"

export default function TopicsRankingPage() {
  const {
    topics,
    topicsLoading,
    topicsSearch,
    topicsSort,
    topicsPage,
    topicsHasMore,
    setTopics,
    setTopicsLoading,
    setTopicsSearch,
    setTopicsSort,
    setTopicsPage,
    setTopicsHasMore,
  } = useAppStore()

  const fetchTopics = useCallback(async () => {
    setTopicsLoading(true)
    try {
      const params = new URLSearchParams({
        page: topicsPage.toString(),
        limit: "20",
        search: topicsSearch,
        sortBy: topicsSort,
        order: "desc",
      })

      const response = await fetch(`/api/topics?${params}`)
      const data = await response.json()

      if (response.ok) {
        setTopics(data.topics || [])
        setTopicsHasMore(data.pagination?.hasMore || false)
      }
    } catch (error) {
      console.error("Failed to fetch topics:", error)
    } finally {
      setTopicsLoading(false)
    }
  }, [
    topicsPage,
    topicsSearch,
    topicsSort,
    setTopics,
    setTopicsLoading,
    setTopicsHasMore,
  ])

  useEffect(() => {
    fetchTopics()
  }, [fetchTopics])

  const handleSearch = () => {
    setTopicsPage(1)
    fetchTopics()
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Trending GitHub Topics
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto px-4"
          >
            Discover the most popular and trending topics in the GitHub
            ecosystem
          </motion.p>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-between px-4 sm:px-0"
        >
          <div className="flex flex-1 items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search topics..."
                value={topicsSearch}
                onChange={(e) => setTopicsSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={topicsSort} onValueChange={setTopicsSort}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Score</SelectItem>
                <SelectItem value="repositories">Repositories</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="curated">Curated</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => fetchTopics()} size="sm">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Topics List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4 px-4 sm:px-0"
        >
          {topicsLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <TopicCardSkeleton key={`topic-skeleton-${i}-${Date.now()}`} />
              ))
            : topics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-all duration-200 hover:scale-[1.01] group">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        {/* Ranking Number */}
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">
                              #{index + 1 + (topicsPage - 1) * 20}
                            </span>
                          </div>
                        </div>

                        {/* Topic Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-full flex items-center justify-center">
                            <Hash className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                          </div>
                        </div>

                        {/* Topic Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-2">
                                <h3 className="text-base font-semibold truncate group-hover:text-primary transition-colors">
                                  {topic.displayName || topic.name}
                                </h3>
                                <div className="flex gap-1">
                                  {topic.featured && (
                                    <Badge
                                      variant="default"
                                      className="text-xs px-2 py-0.5"
                                    >
                                      <Crown className="h-3 w-3 mr-1" />
                                      Featured
                                    </Badge>
                                  )}
                                  {topic.curated && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs px-2 py-0.5"
                                    >
                                      <Award className="h-3 w-3 mr-1" />
                                      Curated
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              {topic.description && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                  {topic.description}
                                </p>
                              )}
                            </div>

                            {/* Compact Stats */}
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center space-x-1 text-muted-foreground">
                                <Star className="h-3 w-3" />
                                <span className="font-medium">
                                  {formatNumber(topic.score)}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1 text-muted-foreground">
                                <GitBranch className="h-3 w-3" />
                                <span className="font-medium">
                                  {formatNumber(topic.repositories)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="mt-2 flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-3 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() =>
                                window.open(
                                  `https://github.com/topics/${topic.name}`,
                                  "_blank",
                                )
                              }
                            >
                              Explore
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
        </motion.div>

        {/* Load More */}
        {topicsHasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center px-4 sm:px-0"
          >
            <Button
              onClick={() => setTopicsPage(topicsPage + 1)}
              disabled={topicsLoading}
              className="px-8"
            >
              {topicsLoading ? "Loading..." : "Load More"}
            </Button>
          </motion.div>
        )}

        {/* Empty State */}
        {!topicsLoading && topics.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 px-4"
          >
            <p className="text-lg text-muted-foreground">No topics found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
