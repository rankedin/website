"use client"

import { motion } from "framer-motion"
import { GitFork, Star, Users, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function StatsSection() {
  const stats = [
    {
      title: "Users Ranked",
      value: "50,000+",
      description: "GitHub developers in our rankings",
      icon: <Users className="h-8 w-8" />,
      color: "text-blue-500",
    },
    {
      title: "Repositories",
      value: "125,000+",
      description: "Open source projects tracked",
      icon: <GitFork className="h-8 w-8" />,
      color: "text-green-500",
    },
    {
      title: "Total Stars",
      value: "10M+",
      description: "Combined stars across all repos",
      icon: <Star className="h-8 w-8" />,
      color: "text-yellow-500",
    },
    {
      title: "Active Topics",
      value: "2,500+",
      description: "Trending technologies tracked",
      icon: <Zap className="h-8 w-8" />,
      color: "text-purple-500",
    },
  ]

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
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
          ))}
        </div>
      </div>
    </section>
  )
}
