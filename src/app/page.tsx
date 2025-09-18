'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Loading components for each section
const SectionLoader = ({ sectionName }: { sectionName: string }) => (
  <div className='py-20 flex items-center justify-center'>
    <div className='text-center'>
      <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
      <p className='text-muted-foreground'>Loading {sectionName}...</p>
    </div>
  </div>
);

// Lazy load all components
const HeroSection = dynamic(
  () =>
    import('@/components/hero-section').then(mod => ({
      default: mod.HeroSection,
    })),
  {
    ssr: true,
  }
);

const BentoGridSection = dynamic(
  () =>
    import('@/components/bento-grid-section').then(mod => ({
      default: mod.BentoGridSection,
    })),
  {
    ssr: false,
  }
);

const StatsSection = dynamic(
  () =>
    import('@/components/stats-section').then(mod => ({
      default: mod.StatsSection,
    })),
  {
    ssr: false,
  }
);

const FeaturesSection = dynamic(
  () =>
    import('@/components/features-section').then(mod => ({
      default: mod.FeaturesSection,
    })),
  {
    ssr: true,
  }
);

const TrendingSection = dynamic(
  () =>
    import('@/components/trending-section').then(mod => ({
      default: mod.TrendingSection,
    })),
  {
    ssr: false,
  }
);

const TestimonialsSection = dynamic(
  () =>
    import('@/components/testimonials-section').then(mod => ({
      default: mod.TestimonialsSection,
    })),
  {
    ssr: true,
  }
);

const CommunitySection = dynamic(
  () =>
    import('@/components/community-section').then(mod => ({
      default: mod.CommunitySection,
    })),
  {
    ssr: true,
  }
);

const FAQSection = dynamic(
  () =>
    import('@/components/faq-section').then(mod => ({
      default: mod.FAQSection,
    })),
  {
    ssr: false,
  }
);

const NewsletterSection = dynamic(
  () =>
    import('@/components/newsletter-section').then(mod => ({
      default: mod.NewsletterSection,
    })),
  {
    ssr: false,
  }
);

const CTASection = dynamic(
  () =>
    import('@/components/cta-section').then(mod => ({
      default: mod.CTASection,
    })),
  {
    ssr: true,
  }
);

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Suspense fallback={<SectionLoader sectionName='Hero' />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<SectionLoader sectionName='Dashboard' />}>
        <BentoGridSection />
      </Suspense>

      <Suspense fallback={<SectionLoader sectionName='Statistics' />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader sectionName='Features' />}>
        <FeaturesSection />
      </Suspense>

      <Suspense fallback={<SectionLoader sectionName='Trending' />}>
        <TrendingSection />
      </Suspense>

      <Suspense fallback={<SectionLoader sectionName='Testimonials' />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader sectionName='Community' />}>
        <CommunitySection />
      </Suspense>

      <Suspense fallback={<SectionLoader sectionName='FAQ' />}>
        <FAQSection />
      </Suspense>

      <Suspense fallback={<SectionLoader sectionName='Newsletter' />}>
        <NewsletterSection />
      </Suspense>

      <Suspense fallback={<SectionLoader sectionName='Call to Action' />}>
        <CTASection />
      </Suspense>
    </div>
  );
}
