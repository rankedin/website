"use client"

import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Award,
  Code2,
  Globe,
  Heart,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useStatsStore } from "@/store/stats"
import { useTrendingStore } from "@/store/trending"

export function BentoGridSection() {
  const { stats, fetchStats } = useStatsStore()
  const { trendingUsers, trendingRepos, fetchTrendingData } = useTrendingStore()

  useEffect(() => {
    fetchStats()
    fetchTrendingData()
  }, [fetchStats, fetchTrendingData])

  // Generate dynamic grid items based on real data
  const gridItems = [
    // Row 1: Top Developers (dynamic)
    {
      id: 1,
      title: "Top Developers",
      description: "Discover the most influential GitHub developers worldwide",
      icon: <Users className="h-5 w-5" />,
      stats: stats ? `${stats.usersRanked.value} Ranked` : "",
      gradient: "from-blue-500/20 to-cyan-500/20",
      size: "sm",
      content:
        trendingUsers.length > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="text-xs">
                  {trendingUsers[0]?.username?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-medium">
                  {trendingUsers[0]?.name || trendingUsers[0]?.username || ""}
                </p>
                <p className="text-xs text-muted-foreground">
                  {trendingUsers[0]?.followers || 0}K followers
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-6 h-6 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        ),
      link: "/users/ranking",
    },
    // Stars Growth (dynamic)
    {
      id: 2,
      title: "Stars Growth",
      description: stats ? `${stats.totalStars.value} stars tracked` : "",
      icon: <Star className="h-5 w-5" />,
      stats: stats ? `+${Math.floor(stats.totalStars.raw / 1000)}K today` : "",
      gradient: "from-yellow-500/20 to-orange-500/20",
      size: "sm",
      content: stats ? (
        <div className="flex items-center justify-center h-12">
          <div className="text-2xl font-bold text-yellow-500">⭐</div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-12">
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      ),
      link: "/repos/ranking",
    },
    // Real-time Data
    {
      id: 3,
      title: "Real-time Data",
      description: "Updated every hour",
      icon: <Globe className="h-5 w-5" />,
      stats: "Live Updates",
      gradient: "from-indigo-500/20 to-blue-500/20",
      size: "sm",
      content: (
        <div className="flex items-center justify-center">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      ),
      link: "/search",
    },
    // Community (static for now)
    {
      id: 4,
      title: "Community",
      description: "Join our thriving developer community",
      icon: <Heart className="h-5 w-5" />,
      stats: "50K+ Members",
      gradient: "from-pink-500/20 to-rose-500/20",
      size: "sm",
      content: (
        <div className="flex items-center justify-center h-12">
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      ),
      link: "/contribute",
    },
    // Trending Repos (dynamic)
    {
      id: 5,
      title: "Trending Repos",
      description: "Most starred repositories this week",
      icon: <TrendingUp className="h-5 w-5" />,
      stats: stats ? `${stats.repositories.value} Repos` : "",
      gradient: "from-green-500/20 to-emerald-500/20",
      size: "sm",
      content:
        trendingRepos.length > 0 ? (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>{trendingRepos[0]?.fullName || ""}</span>
              <span className="text-green-500">
                +{Math.floor((trendingRepos[0]?.stars || 0) / 1000)}K
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        ),
      link: "/repos/ranking",
    },
    // Platform Stats (dynamic)
    {
      id: 6,
      title: "Platform Stats",
      description: "Real-time platform statistics",
      icon: <Target className="h-5 w-5" />,
      stats: "Live Data",
      gradient: "from-purple-500/20 to-violet-500/20",
      size: "sm",
      content: stats ? (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs">Users</span>
            <span className="text-sm font-bold text-purple-500">
              {stats.usersRanked.value}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">Repos</span>
            <span className="text-sm font-bold text-purple-500">
              {stats.repositories.value}
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs">Users</span>
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">Repos</span>
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      ),
      link: "/stats",
    },
    // Developer API (static)
    {
      id: 7,
      title: "Developer API",
      description: "Integrate rankings into your apps",
      icon: <Code2 className="h-5 w-5" />,
      stats: "RESTful API",
      gradient: "from-gray-500/20 to-slate-500/20",
      size: "sm",
      content: (
        <div className="text-xs font-mono bg-muted p-1 rounded text-center">
          <div>GET /api/users</div>
        </div>
      ),
      link: "/api-docs",
    },
    // Achievements (static)
    {
      id: 8,
      title: "Achievements",
      description: "Celebrate your milestones",
      icon: <Award className="h-5 w-5" />,
      stats: "Coming Soon",
      gradient: "from-amber-500/20 to-yellow-500/20",
      size: "sm",
      content: (
        <div className="flex items-center justify-center h-12">
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      ),
      link: "#",
    },
    // Explore Rankings (static)
    {
      id: 9,
      title: "Explore Rankings",
      description: "Browse all categories",
      icon: <Target className="h-5 w-5" />,
      stats: "All Categories",
      gradient: "from-teal-500/20 to-cyan-500/20",
      size: "sm",
      content: (
        <div className="flex items-center justify-center h-12">
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      ),
      link: "/search",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Platform Overview
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything GitHub, beautifully organized
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover trending developers, repositories, and topics in our
            interactive dashboard
          </p>
        </motion.div>

        {/* Bento Grid - Dynamic layout with varying columns */}
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Row 1: 3 columns */}
          <div className="grid grid-cols-3 gap-4">
            {gridItems.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="col-span-1"
              >
                <Link href={item.link} className="group block h-full">
                  <Card className="h-full min-h-[140px] transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02] relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 transition-opacity group-hover:opacity-70`}
                    />
                    <CardContent className="p-3 h-full flex flex-col justify-between relative z-10">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1.5 rounded-lg bg-background/80 backdrop-blur-sm">
                            {item.icon}
                          </div>
                          <ArrowUpRight className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                        <h3 className="font-semibold text-xs mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        <div className="flex-1">{item.content}</div>
                      </div>
                      <div className="mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.stats}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Row 2: 2 columns */}
          <div className="grid grid-cols-2 gap-4">
            {gridItems.slice(3, 5).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                viewport={{ once: true }}
                className="col-span-1"
              >
                <Link href={item.link} className="group block h-full">
                  <Card className="h-full min-h-[140px] transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02] relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 transition-opacity group-hover:opacity-70`}
                    />
                    <CardContent className="p-3 h-full flex flex-col justify-between relative z-10">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1.5 rounded-lg bg-background/80 backdrop-blur-sm">
                            {item.icon}
                          </div>
                          <ArrowUpRight className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                        <h3 className="font-semibold text-xs mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        <div className="flex-1">{item.content}</div>
                      </div>
                      <div className="mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.stats}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Row 3: 1 column */}
          <div className="grid grid-cols-1 gap-4">
            {gridItems.slice(5, 6).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 5) * 0.1 }}
                viewport={{ once: true }}
                className="col-span-1"
              >
                <Link href={item.link} className="group block h-full">
                  <Card className="h-full min-h-[140px] transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02] relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 transition-opacity group-hover:opacity-70`}
                    />
                    <CardContent className="p-3 h-full flex flex-col justify-between relative z-10">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1.5 rounded-lg bg-background/80 backdrop-blur-sm">
                            {item.icon}
                          </div>
                          <ArrowUpRight className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                        <h3 className="font-semibold text-xs mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        <div className="flex-1">{item.content}</div>
                      </div>
                      <div className="mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.stats}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Row 4: 3 columns */}
          <div className="grid grid-cols-3 gap-4">
            {gridItems.slice(6, 9).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 6) * 0.1 }}
                viewport={{ once: true }}
                className="col-span-1"
              >
                <Link href={item.link} className="group block h-full">
                  <Card className="h-full min-h-[140px] transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02] relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 transition-opacity group-hover:opacity-70`}
                    />
                    <CardContent className="p-3 h-full flex flex-col justify-between relative z-10">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1.5 rounded-lg bg-background/80 backdrop-blur-sm">
                            {item.icon}
                          </div>
                          <ArrowUpRight className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                        <h3 className="font-semibold text-xs mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        <div className="flex-1">{item.content}</div>
                      </div>
                      <div className="mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.stats}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/search">
            <Button size="lg" className="group">
              Explore All Rankings
              <Target className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
