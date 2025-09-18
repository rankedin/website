"use client"

import { BentoGridSection } from "@/components/bento-grid-section"
import { CommunitySection } from "@/components/community-section"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"
import { FeaturesSection } from "@/components/features-section"
import { HeroSection } from "@/components/hero-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { PartnersSection } from "@/components/partners-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TrendingSection } from "@/components/trending-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BentoGridSection />
      <StatsSection />
      <FeaturesSection />
      <TrendingSection />
      <TestimonialsSection />
      <PartnersSection />
      <CommunitySection />
      <FAQSection />
      <NewsletterSection />
      <CTASection />
    </div>
  )
}
