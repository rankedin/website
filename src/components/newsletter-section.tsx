"use client"

import { motion } from "framer-motion"
import { Gift, Mail, Sparkles } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsSubscribing(true)

    // Simulate newsletter subscription
    setTimeout(() => {
      toast.success("Successfully subscribed to the newsletter!")
      setEmail("")
      setIsSubscribing(false)
    }, 1000)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />

            <CardContent className="p-8 md:p-12 text-center relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Mail className="h-8 w-8 text-primary" />
              </motion.div>

              <Badge variant="outline" className="mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Stay Updated
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Never miss a trending repo
              </h2>

              <p className="text-lg text-muted-foreground mb-8">
                Get weekly insights on trending repositories, rising developers,
                and hot topics in the GitHub ecosystem.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-12"
                    disabled={isSubscribing}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubscribing}
                    className="group px-8"
                  >
                    {isSubscribing ? (
                      "Subscribing..."
                    ) : (
                      <>
                        Subscribe
                        <Gift className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-sm text-muted-foreground">
                <p>
                  Join 25,000+ developers • Unsubscribe anytime • No spam, ever
                </p>
              </div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm"
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Weekly Trends</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Developer Insights</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Exclusive Content</span>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
