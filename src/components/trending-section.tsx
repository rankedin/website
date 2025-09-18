"use client"

import { motion } from "framer-motion"
import { ExternalLink, GitFork, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TrendingSection() {
  const trendingUsers = [
    {
      username: "torvalds",
      name: "Linus Torvalds",
      avatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
      followers: "150K+",
      totalStars: "45K+",
      bio: "Creator of Linux and Git",
    },
    {
      username: "gaearon",
      name: "Dan Abramov",
      avatar: "https://avatars.githubusercontent.com/u/810438?v=4",
      followers: "120K+",
      totalStars: "65K+",
      bio: "React Core Team",
    },
    {
      username: "sindresorhus",
      name: "Sindre Sorhus",
      avatar: "https://avatars.githubusercontent.com/u/170270?v=4",
      followers: "95K+",
      totalStars: "85K+",
      bio: "Open Source Maintainer",
    },
  ]

  const trendingRepos = [
    {
      name: "microsoft/vscode",
      description: "Visual Studio Code - Open Source IDE",
      language: "TypeScript",
      stars: "155K",
      forks: "27K",
      trend: "+2.3K this week",
    },
    {
      name: "facebook/react",
      description: "A declarative, efficient library for building UIs",
      language: "JavaScript",
      stars: "215K",
      forks: "45K",
      trend: "+1.8K this week",
    },
    {
      name: "vercel/next.js",
      description: "The React Framework for Production",
      language: "JavaScript",
      stars: "118K",
      forks: "25K",
      trend: "+1.5K this week",
    },
  ]

  const trendingTopics = [
    { name: "artificial-intelligence", repos: "45K+", trend: "+15%" },
    { name: "machine-learning", repos: "38K+", trend: "+12%" },
    { name: "blockchain", repos: "22K+", trend: "+8%" },
    { name: "web3", repos: "18K+", trend: "+25%" },
    { name: "typescript", repos: "35K+", trend: "+10%" },
    { name: "rust", repos: "28K+", trend: "+18%" },
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
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending Now
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What's hot in the developer community
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the most popular users, repositories, and topics trending
            right now in the GitHub ecosystem
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trending Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Top Users
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingUsers.map((user, index) => (
                  <motion.div
                    key={user.username}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{user.name}</h4>
                      <p className="text-sm text-muted-foreground truncate">
                        @{user.username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.bio}
                      </p>
                    </div>
                    <div className="text-right text-xs">
                      <div className="text-muted-foreground">
                        {user.followers}
                      </div>
                      <div className="text-yellow-500">
                        {user.totalStars} ⭐
                      </div>
                    </div>
                  </motion.div>
                ))}
                <Link href="/users/ranking">
                  <Button variant="outline" className="w-full">
                    View All Users
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trending Repositories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Hot Repositories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingRepos.map((repo, index) => (
                  <motion.div
                    key={repo.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{repo.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {repo.language}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {repo.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          {repo.stars}
                        </span>
                        <span className="flex items-center">
                          <GitFork className="w-3 h-3 mr-1" />
                          {repo.forks}
                        </span>
                      </div>
                      <span className="text-green-600 font-medium">
                        {repo.trend}
                      </span>
                    </div>
                  </motion.div>
                ))}
                <Link href="/repos/ranking">
                  <Button variant="outline" className="w-full">
                    View All Repositories
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Popular Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div>
                      <h4 className="font-medium text-sm">#{topic.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {topic.repos} repos
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs text-green-600">
                      {topic.trend}
                    </Badge>
                  </motion.div>
                ))}
                <Link href="/topics/ranking">
                  <Button variant="outline" className="w-full">
                    View All Topics
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
