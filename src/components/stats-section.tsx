"use client"

import { motion } from "framer-motion"
import { GitFork, Star, Users, Zap } from "lucide-react"
import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useStatsStore } from "@/store/stats"

export function StatsSection() {
  const { stats, loading, error, fetchStats } = useStatsStore()

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const statsArray = stats
    ? [
        {
          title: "Users Ranked",
          value: stats.usersRanked?.value || "0",
          description:
            stats.usersRanked?.description ||
            "GitHub developers in our rankings",
          icon: <Users className="h-8 w-8" />,
          color: "text-blue-500",
        },
        {
          title: "Repositories",
          value: stats.repositories?.value || "0",
          description:
            stats.repositories?.description || "Open source projects tracked",
          icon: <GitFork className="h-8 w-8" />,
          color: "text-green-500",
        },
        {
          title: "Total Stars",
          value: stats.totalStars?.value || "0",
          description:
            stats.totalStars?.description || "Combined stars across all repos",
          icon: <Star className="h-8 w-8" />,
          color: "text-yellow-500",
        },
        {
          title: "Active Topics",
          value: stats.activeTopics?.value || "0",
          description:
            stats.activeTopics?.description || "Trending technologies tracked",
          icon: <Zap className="h-8 w-8" />,
          color: "text-purple-500",
        },
      ]
    : []

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Platform Statistics
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by developers worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who trust our platform to showcase
            their work and discover amazing projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // Loading skeleton
            ["users", "repos", "stars", "topics"].map((key) => (
              <motion.div
                key={`loading-${key}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="relative overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted animate-pulse"></div>
                    <div className="h-8 bg-muted rounded mb-2 animate-pulse"></div>
                    <div className="h-5 bg-muted rounded mb-1 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Failed to load statistics</p>
              <button
                type="button"
                onClick={fetchStats}
                className="mt-4 text-primary hover:underline"
              >
                Try again
              </button>
            </div>
          ) : (
            // Stats data
            statsArray.map((stat) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: statsArray.indexOf(stat) * 0.1,
                }}
                viewport={{ once: true }}
              >
                <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-background border-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${stat.color}`}
                    >
                      {stat.icon}
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                    <h4 className="text-lg font-semibold mb-1">{stat.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                  {/* Decorative gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
