"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Github, Menu, Plus, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={closeMobileMenu}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <span className="font-bold text-xl">RankedIn</span>
              <Github className="h-5 w-5 text-primary" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/users/ranking"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Users
            </Link>
            <Link
              href="/repos/ranking"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Repositories
            </Link>
            <Link
              href="/topics/ranking"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Topics
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Search
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/contribute" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Contribute</span>
              </Link>
            </Button>

            <Button asChild variant="ghost" size="sm">
              <Link
                href="https://github.com/rankedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="pb-4 pt-2 space-y-2">
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/users/ranking"
                    className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-muted rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Users
                  </Link>
                  <Link
                    href="/repos/ranking"
                    className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-muted rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Repositories
                  </Link>
                  <Link
                    href="/topics/ranking"
                    className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-muted rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Topics
                  </Link>
                  <Link
                    href="/search"
                    className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-muted rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Search
                  </Link>
                  <div className="flex flex-col space-y-2 pt-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Link
                        href="/contribute"
                        className="flex items-center space-x-2"
                        onClick={closeMobileMenu}
                      >
                        <Plus className="h-4 w-4" />
                        <span>Contribute</span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Link
                        href="https://github.com/rankedin"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMobileMenu}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        <span>GitHub</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
