"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global error:", error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <Card className="border-destructive/20">
          <CardHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4"
            >
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-destructive">
              Oops! Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-muted-foreground"
            >
              We encountered an unexpected error. Don't worry, our team has been
              notified and is working on a fix.
            </motion.p>

            {process.env.NODE_ENV === "development" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-muted/50 p-4 rounded-lg text-left"
              >
                <p className="text-sm font-mono text-destructive break-all">
                  {error.message}
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button onClick={reset} className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Try again</span>
              </Button>
              <Button variant="outline" asChild>
                <a href="/" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Go home</span>
                </a>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
