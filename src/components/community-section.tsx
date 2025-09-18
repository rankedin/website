"use client"

import { motion } from "framer-motion"
import {
  Coffee,
  Github,
  Heart,
  MessageCircle,
  Twitter,
  Users,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function CommunitySection() {
  const communityStats = [
    {
      label: "Active Members",
      value: "50,000+",
      icon: <Users className="h-6 w-6" />,
    },
    {
      label: "Monthly Discussions",
      value: "12,500+",
      icon: <MessageCircle className="h-6 w-6" />,
    },
    {
      label: "Projects Shared",
      value: "125,000+",
      icon: <Github className="h-6 w-6" />,
    },
    {
      label: "Community Love",
      value: "99%",
      icon: <Heart className="h-6 w-6" />,
    },
  ]

  const communityLinks = [
    {
      title: "GitHub Discussions",
      description:
        "Join conversations about rankings, features, and development",
      icon: <Github className="h-8 w-8" />,
      link: "#",
      color: "bg-gray-900 text-white",
    },
    {
      title: "Twitter Community",
      description: "Follow for updates, tips, and trending discoveries",
      icon: <Twitter className="h-8 w-8" />,
      link: "#",
      color: "bg-blue-500 text-white",
    },
    {
      title: "Discord Server",
      description: "Real-time chat with developers and maintainers",
      icon: <MessageCircle className="h-8 w-8" />,
      link: "#",
      color: "bg-indigo-600 text-white",
    },
    {
      title: "Buy us a Coffee",
      description: "Support the development of RankedIn",
      icon: <Coffee className="h-8 w-8" />,
      link: "#",
      color: "bg-yellow-500 text-white",
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
            <Users className="w-4 h-4 mr-2" />
            Community
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join our thriving developer community
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with thousands of developers, share your projects, and
            discover amazing opportunities in our vibrant community
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {communityStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Community Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {communityLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={link.link}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-lg ${link.color} group-hover:scale-110 transition-transform duration-300`}
                      >
                        {link.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to be part of something amazing?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join our community today and start discovering, sharing, and
                ranking the best of GitHub with fellow developers from around
                the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contribute">
                  <Button size="lg" className="group">
                    Start Contributing
                    <Heart className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Join Discord
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
