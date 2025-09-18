"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function PartnersSection() {
  const partners = [
    {
      name: "GitHub",
      logo: "/api/placeholder/120/60",
      description: "Version control and collaboration",
    },
    {
      name: "Microsoft",
      logo: "/api/placeholder/120/60",
      description: "Cloud and developer tools",
    },
    {
      name: "Google",
      logo: "/api/placeholder/120/60",
      description: "AI and cloud services",
    },
    {
      name: "Vercel",
      logo: "/api/placeholder/120/60",
      description: "Frontend deployment platform",
    },
    {
      name: "AWS",
      logo: "/api/placeholder/120/60",
      description: "Cloud infrastructure",
    },
    {
      name: "Docker",
      logo: "/api/placeholder/120/60",
      description: "Containerization platform",
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            Trusted Partners
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Powered by industry leaders
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built on reliable infrastructure and integrated with the tools
            developers love
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-24 h-12 md:w-28 md:h-14 bg-muted rounded-lg flex items-center justify-center group-hover:shadow-md transition-all duration-300 mb-3">
                <div className="text-2xl font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                  {partner.name.substring(0, 3)}
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Integrated with 50+ developer tools and platforms
          </p>
        </motion.div>
      </div>
    </section>
  )
}
