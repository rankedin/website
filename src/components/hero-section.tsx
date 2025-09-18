"use client"

import { motion } from "framer-motion"
import { GitBranch, Hash, Search, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Suggestion {
  type: "user" | "repo" | "topic"
  name: string
  description?: string
  icon: React.ReactNode
}

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (searchQuery.length > 2) {
      // Simulate API call for suggestions
      setTimeout(() => {
        const mockSuggestions: Suggestion[] = [
          {
            type: "user",
            name: `${searchQuery}user`,
            description: "GitHub User",
            icon: <Users className="h-4 w-4" />,
          },
          {
            type: "repo",
            name: `${searchQuery}/repo`,
            description: "Repository",
            icon: <GitBranch className="h-4 w-4" />,
          },
          {
            type: "topic",
            name: searchQuery,
            description: "Topic",
            icon: <Hash className="h-4 w-4" />,
          },
        ]
        setSuggestions(mockSuggestions)
        setShowSuggestions(true)
      }, 300)
    } else {
      setShowSuggestions(false)
      setSuggestions([])
    }
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {
    router.push(
      `/search?q=${encodeURIComponent(suggestion.name)}&type=${suggestion.type}`,
    )
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px] dark:bg-grid-white/[0.02]" />

      <div className="container relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Hero Title */}
          <div className="space-y-4">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight pb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              GitHub Ranking
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Discover and rank the best GitHub users, repositories, and topics.
              Join the community and showcase your achievements.
            </motion.p>
          </div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto relative"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for users, repositories, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-24 h-14 text-lg rounded-full border-2 focus:border-primary transition-colors"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full mt-2 w-full bg-background border rounded-lg shadow-lg z-20"
              >
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={`${suggestion.type}-${suggestion.name}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 hover:bg-accent cursor-pointer border-b last:border-b-0"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center space-x-3">
                      {suggestion.icon}
                      <div className="text-left">
                        <div className="font-medium">{suggestion.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {suggestion.description}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Add to Ranking
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Quick Action Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
          >
            <Link href="/users/ranking" className="group">
              <Card className="group-hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                  <div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Users className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">Top Users</h3>
                    <p className="text-muted-foreground text-sm">
                      Discover the most influential GitHub users ranked by
                      followers and stars
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/repos/ranking" className="group">
              <Card className="group-hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                  <div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <GitBranch className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">
                      Top Repositories
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Explore the most starred and forked repositories across
                      all languages
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link
              href="/topics/ranking"
              className="group sm:col-span-2 lg:col-span-1"
            >
              <Card className="group-hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                  <div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Hash className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">Top Topics</h3>
                    <p className="text-muted-foreground text-sm">
                      Browse trending topics and technologies in the developer
                      community
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
