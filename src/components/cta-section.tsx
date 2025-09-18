"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Sparkles } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Ready to get started?
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Join the GitHub
            <br />
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Ranking Revolution
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Discover amazing projects, showcase your work, and connect with the
            global developer community today.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/contribute">
              <Button
                size="lg"
                variant="secondary"
                className="group px-8 py-4 text-lg font-semibold"
              >
                Start Contributing
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/search">
              <Button
                size="lg"
                variant="outline"
                className="group px-8 py-4 text-lg font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Github className="mr-2 h-5 w-5" />
                Explore Rankings
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-sm text-primary-foreground/60"
          >
            <p>
              Join 50,000+ developers • Free forever • No credit card required
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
