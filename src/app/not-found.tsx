"use client"

import { motion } from "framer-motion"
import { FileQuestion, Home, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <Card>
          <CardHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4"
            >
              <FileQuestion className="h-8 w-8 text-muted-foreground" />
            </motion.div>
            <CardTitle className="text-3xl font-bold">
              404 - Page Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground"
            >
              The page you're looking for doesn't exist or has been moved.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild>
                <Link href="/" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Go home</span>
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/search" className="flex items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>Search GitHub</span>
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-sm text-muted-foreground"
            >
              <p>Popular pages:</p>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                <Link
                  href="/users/ranking"
                  className="hover:text-primary transition-colors"
                >
                  User Rankings
                </Link>
                <Link
                  href="/repos/ranking"
                  className="hover:text-primary transition-colors"
                >
                  Repository Rankings
                </Link>
                <Link
                  href="/topics/ranking"
                  className="hover:text-primary transition-colors"
                >
                  Topic Rankings
                </Link>
                <Link
                  href="/contribute"
                  className="hover:text-primary transition-colors"
                >
                  Contribute
                </Link>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
