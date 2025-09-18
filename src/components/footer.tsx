'use client';

import { motion } from 'framer-motion';
import { BarChart3, Github, Heart, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className='border-t bg-background mt-auto'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='space-y-4 sm:col-span-2 lg:col-span-1'>
            <Link href='/' className='flex items-center space-x-2'>
              <BarChart3 className='h-6 w-6 text-primary' />
              <span className='font-bold text-xl'>RankedIn</span>
            </Link>
            <p className='text-sm text-muted-foreground max-w-xs'>
              Discover and rank the best GitHub users, repositories, and topics.
              Join the community and showcase your GitHub achievements.
            </p>
          </div>

          <div className='space-y-4'>
            <h4 className='text-sm font-semibold'>Rankings</h4>
            <nav className='space-y-2'>
              <Link
                href='/users/ranking'
                className='block text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                Top Users
              </Link>
              <Link
                href='/repos/ranking'
                className='block text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                Top Repositories
              </Link>
              <Link
                href='/topics/ranking'
                className='block text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                Top Topics
              </Link>
            </nav>
          </div>

          <div className='space-y-4'>
            <h4 className='text-sm font-semibold'>Community</h4>
            <nav className='space-y-2'>
              <Link
                href='/contribute'
                className='block text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                Contribute
              </Link>
              <Link
                href='/search'
                className='block text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                Search
              </Link>
              <Link
                href='/api-docs'
                className='block text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                API Docs
              </Link>
            </nav>
          </div>

          <div className='space-y-4'>
            <h4 className='text-sm font-semibold'>Legal</h4>
            <nav className='space-y-2'>
              <Link
                href='/privacy'
                className='block text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='block text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                Terms of Service
              </Link>
              <Link
                href='/contribution-guidelines'
                className='block text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                Guidelines
              </Link>
            </nav>
          </div>

          <div className='space-y-4'>
            <h4 className='text-sm font-semibold'>Connect</h4>
            <div className='flex space-x-4'>
              <Link
                href='https://github.com/rankedin'
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <Github className='h-5 w-5' />
                <span className='sr-only'>GitHub</span>
              </Link>
              <Link
                href='mailto:contact@muhammadfiaz.com'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <Mail className='h-5 w-5' />
                <span className='sr-only'>Email</span>
              </Link>
            </div>
          </div>
        </div>

        <div className='mt-8 pt-8 border-t'>
          <div className='flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0'>
            <p className='text-sm text-muted-foreground text-center sm:text-left'>
              © {new Date().getFullYear()} RankedIn. All rights reserved.
            </p>
            <p className='text-sm text-muted-foreground flex items-center justify-center sm:justify-end'>
              Made with <Heart className='h-4 w-4 mx-1 text-red-500' /> for the
              GitHub community
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
