"use client"

import { motion } from "framer-motion"
import {
  ArrowUpDown,
  Building,
  Filter,
  GitBranch,
  MapPin,
  Search,
  Star,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect } from "react"
import { UserCardSkeleton } from "@/components/skeletons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

export default function UsersRankingPage() {
  const {
    users,
    usersLoading,
    usersSearch,
    usersSort,
    usersPage,
    usersHasMore,
    setUsers,
    setUsersLoading,
    setUsersSearch,
    setUsersSort,
    setUsersPage,
    setUsersHasMore,
  } = useAppStore()

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true)
    try {
      const params = new URLSearchParams({
        page: usersPage.toString(),
        limit: "20",
        search: usersSearch,
        sortBy: usersSort,
        order: "desc",
      })

      const response = await fetch(`/api/users?${params}`)
      const data = await response.json()

      if (response.ok) {
        setUsers(data.users || [])
        setUsersHasMore(data.pagination?.hasMore || false)
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setUsersLoading(false)
    }
  }, [
    usersPage,
    usersSearch,
    usersSort,
    setUsers,
    setUsersLoading,
    setUsersHasMore,
  ])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleSearch = () => {
    setUsersPage(1)
    fetchUsers()
  }

  const toggleSort = () => {
    setUsersPage(1)
    fetchUsers()
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
            Top GitHub Users
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto px-4"
          >
            Discover the most influential developers and their contributions to
            the GitHub community
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
                placeholder="Search users..."
                value={usersSearch}
                onChange={(e) => setUsersSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={usersSort} onValueChange={setUsersSort}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="followers">Followers</SelectItem>
                <SelectItem value="totalStars">Total Stars</SelectItem>
                <SelectItem value="publicRepos">Repositories</SelectItem>
                <SelectItem value="following">Following</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={toggleSort} size="sm">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Users Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid gap-6 px-4 sm:px-0"
        >
          {usersLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <UserCardSkeleton key={`user-skeleton-${i}-${Date.now()}`} />
              ))
            : users.map((user, index) => (
                <motion.div
                  key={user.id}
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
                              #{(usersPage - 1) * 20 + index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <Avatar className="h-10 w-10 ring-1 ring-border group-hover:ring-primary/50 transition-colors">
                            <AvatarImage
                              src={user.avatarUrl || ""}
                              alt={user.username}
                            />
                            <AvatarFallback className="text-sm">
                              {user.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                              <h3 className="text-base font-semibold truncate group-hover:text-primary transition-colors">
                                {user.name || user.username}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                @{user.username}
                              </p>
                            </div>

                            {/* Compact Stats */}
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center space-x-1 text-muted-foreground">
                                <Star className="h-3 w-3" />
                                <span className="font-medium">
                                  {user.totalStars.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1 text-muted-foreground">
                                <Users className="h-3 w-3" />
                                <span className="font-medium">
                                  {user.followers.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1 text-muted-foreground">
                                <GitBranch className="h-3 w-3" />
                                <span className="font-medium">
                                  {user.publicRepos.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Bio and Meta (collapsed) */}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                              {user.location && (
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate max-w-20">
                                    {user.location}
                                  </span>
                                </div>
                              )}
                              {user.company && (
                                <div className="flex items-center space-x-1">
                                  <Building className="h-3 w-3" />
                                  <span className="truncate max-w-20">
                                    {user.company}
                                  </span>
                                </div>
                              )}
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-3 opacity-0 group-hover:opacity-100 transition-opacity"
                              asChild
                            >
                              <Link
                                href={`https://github.com/${user.username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
        </motion.div>

        {/* Pagination */}
        {usersHasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center px-4 sm:px-0"
          >
            <Button
              onClick={() => setUsersPage(usersPage + 1)}
              disabled={usersLoading}
              className="px-8"
            >
              {usersLoading ? "Loading..." : "Load More"}
            </Button>
          </motion.div>
        )}

        {/* Empty State */}
        {!usersLoading && users.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 px-4"
          >
            <p className="text-lg text-muted-foreground">No users found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
