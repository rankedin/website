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
  Zap,
} from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function BentoGridSection() {
  const gridItems = [
    // Row 1: Large (2x2) + Small (1x1) + Small (1x1)
    {
      id: 1,
      title: "Top Developers",
      description: "Discover the most influential GitHub developers worldwide",
      icon: <Users className="h-6 w-6" />,
      stats: "50,000+ Ranked",
      gradient: "from-blue-500/20 to-cyan-500/20",
      size: "lg", // Large card - spans 2 columns, 2 rows
      content: (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback>LT</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Linus Torvalds</p>
              <p className="text-xs text-muted-foreground">150K followers</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback>DA</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Dan Abramov</p>
              <p className="text-xs text-muted-foreground">120K followers</p>
            </div>
          </div>
        </div>
      ),
      link: "/users/ranking",
    },
    {
      id: 2,
      title: "Stars Growth",
      description: "10M+ stars tracked",
      icon: <Star className="h-5 w-5" />,
      stats: "+2.3K today",
      gradient: "from-yellow-500/20 to-orange-500/20",
      size: "sm", // Small card - 1x1
      content: (
        <div className="flex items-center justify-center h-16">
          <div className="text-3xl font-bold text-yellow-500">⭐</div>
        </div>
      ),
      link: "/repos/ranking",
    },
    {
      id: 3,
      title: "Real-time Data",
      description: "Updated every hour",
      icon: <Globe className="h-5 w-5" />,
      stats: "Live Updates",
      gradient: "from-indigo-500/20 to-blue-500/20",
      size: "sm", // Small card - 1x1
      content: (
        <div className="flex items-center justify-center">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      ),
      link: "/search",
    },
    // Row 2: Small (1x1) + Medium (2x1)
    {
      id: 4,
      title: "Community",
      description: "Join our thriving developer community",
      icon: <Heart className="h-5 w-5" />,
      stats: "50K+ Members",
      gradient: "from-pink-500/20 to-rose-500/20",
      size: "sm", // Small card - 1x1
      content: (
        <div className="text-center">
          <div className="text-2xl">❤️</div>
        </div>
      ),
      link: "/contribute",
    },
    {
      id: 5,
      title: "Trending Repos",
      description: "Most starred repositories this week",
      icon: <TrendingUp className="h-5 w-5" />,
      stats: "125K+ Repos",
      gradient: "from-green-500/20 to-emerald-500/20",
      size: "md", // Medium card - spans 2 columns, 1 row
      content: (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span>microsoft/vscode</span>
            <span className="text-green-500">+2.3K</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>facebook/react</span>
            <span className="text-green-500">+1.8K</span>
          </div>
        </div>
      ),
      link: "/repos/ranking",
    },
    // Row 3: Large (2x2) + Small (1x1)
    {
      id: 6,
      title: "AI/ML Topics",
      description: "Explore trending AI and machine learning projects",
      icon: <Zap className="h-6 w-6" />,
      stats: "45K+ Projects",
      gradient: "from-purple-500/20 to-violet-500/20",
      size: "lg", // Large card - spans 2 columns, 2 rows
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              #artificial-intelligence
            </Badge>
            <span className="text-xs text-green-500">+15%</span>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              #machine-learning
            </Badge>
            <span className="text-xs text-green-500">+12%</span>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              #deep-learning
            </Badge>
            <span className="text-xs text-green-500">+18%</span>
          </div>
        </div>
      ),
      link: "/topics/ranking",
    },
    {
      id: 7,
      title: "Developer API",
      description: "Integrate rankings into your apps",
      icon: <Code2 className="h-5 w-5" />,
      stats: "RESTful API",
      gradient: "from-gray-500/20 to-slate-500/20",
      size: "sm", // Small card - 1x1
      content: (
        <div className="text-xs font-mono bg-muted p-2 rounded">
          <div>GET /api/users</div>
          <div>GET /api/repos</div>
          <div>GET /api/topics</div>
        </div>
      ),
      link: "/api-docs",
    },
    // Row 4: Medium (2x1) + Small (1x1)
    {
      id: 8,
      title: "Achievements",
      description: "Celebrate your milestones",
      icon: <Award className="h-5 w-5" />,
      stats: "Coming Soon",
      gradient: "from-amber-500/20 to-yellow-500/20",
      size: "md", // Medium card - spans 2 columns, 1 row
      content: (
        <div className="text-center">
          <div className="text-2xl">🏆</div>
        </div>
      ),
      link: "#",
    },
    {
      id: 9,
      title: "Explore Rankings",
      description: "Browse all categories and find what matters to you",
      icon: <Target className="h-5 w-5" />,
      stats: "All Categories",
      gradient: "from-teal-500/20 to-cyan-500/20",
      size: "sm", // Small card - 1x1
      content: (
        <div className="text-center">
          <div className="text-2xl">🔍</div>
        </div>
      ),
      link: "/search",
    },
  ]

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "lg":
        return "col-span-2 row-span-2"
      case "md":
        return "col-span-2 row-span-1"
      case "sm":
        return "col-span-1 row-span-1"
      default:
        return "col-span-1 row-span-1"
    }
  }

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

        {/* Bento Grid - 3x3 perfect grid */}
        <div className="grid grid-cols-3 gap-4 auto-rows-fr max-w-6xl mx-auto">
          {gridItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${getSizeClasses(item.size)}`}
            >
              <Link href={item.link} className="group block h-full">
                <Card
                  className={`h-full min-h-[160px] transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02] relative overflow-hidden`}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 transition-opacity group-hover:opacity-70`}
                  />

                  <CardContent className="p-4 h-full flex flex-col justify-between relative z-10">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-2 rounded-lg bg-background/80 backdrop-blur-sm">
                          {item.icon}
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>

                      <h3 className="font-semibold text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3">
                        {item.description}
                      </p>

                      {/* Dynamic content */}
                      <div className="flex-1">{item.content}</div>
                    </div>

                    <div className="mt-3">
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
