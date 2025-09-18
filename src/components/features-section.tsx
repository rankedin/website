'use client';

import { Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
  Github,
  Globe,
  Search,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: 'Smart Discovery',
      description:
        'Advanced algorithms to find trending repositories, influential users, and emerging topics in real-time.',
      icon: <Search className='h-6 w-6' />,
      details:
        'Our AI-powered discovery engine analyzes thousands of data points to surface the most relevant and impactful content for developers.',
      link: '/search',
    },
    {
      title: 'Real-time Rankings',
      description:
        'Live rankings updated continuously based on GitHub metrics, community engagement, and project momentum.',
      icon: <TrendingUp className='h-6 w-6' />,
      details:
        'Rankings are updated every hour, ensuring you always see the most current state of the developer ecosystem.',
      link: '/users/ranking',
    },
    {
      title: 'Community Driven',
      description:
        'Built by developers, for developers. Contribute your favorite projects and help grow the community.',
      icon: <Users className='h-6 w-6' />,
      details:
        'Every contribution makes the platform better. Submit repositories, users, and topics to help others discover great content.',
      link: '/contribute',
    },
    {
      title: 'Secure & Reliable',
      description:
        'Enterprise-grade security with 99.9% uptime. Your data is always safe and accessible.',
      icon: <Shield className='h-6 w-6' />,
      details:
        'Built on modern infrastructure with automated backups, SSL encryption, and SOC 2 compliance.',
      link: '#',
    },
    {
      title: 'Lightning Fast',
      description:
        'Optimized for speed with global CDN, caching, and efficient algorithms for instant search results.',
      icon: <Zap className='h-6 w-6' />,
      details:
        'Average response time under 100ms globally, with intelligent caching and optimized database queries.',
      link: '#',
    },
    {
      title: 'Global Reach',
      description:
        'Discover talent and projects from around the world with multi-language support and local insights.',
      icon: <Globe className='h-6 w-6' />,
      details:
        'Supporting developers from 195+ countries with localized content and regional trending insights.',
      link: '#',
    },
  ];

  return (
    <section className='py-20 bg-background'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <Badge variant='outline' className='mb-4'>
            Platform Features
          </Badge>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Everything you need to discover and rank
          </h2>
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
            Powerful features designed to help developers discover amazing
            projects, connect with talented individuals, and stay on top of
            trending technologies
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='space-y-4'
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardContent className='p-6'>
                    <div className='flex items-start space-x-4'>
                      <div
                        className={`p-2 rounded-lg ${
                          activeFeature === index
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-primary/10 text-primary'
                        } transition-colors duration-300`}
                      >
                        {feature.icon}
                      </div>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold mb-2'>
                          {feature.title}
                        </h3>
                        <p className='text-muted-foreground text-sm'>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='relative'
          >
            <div className='sticky top-20'>
              <Transition
                as={Fragment}
                show={true}
                enter='transition-opacity duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-150'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Card className='relative overflow-hidden'>
                  <CardHeader>
                    <div className='flex items-center space-x-3'>
                      <div className='p-3 rounded-lg bg-primary text-primary-foreground'>
                        {features[activeFeature].icon}
                      </div>
                      <CardTitle className='text-xl'>
                        {features[activeFeature].title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className='pb-8'>
                    <p className='text-muted-foreground mb-6 leading-relaxed'>
                      {features[activeFeature].details}
                    </p>
                    {features[activeFeature].link !== '#' && (
                      <Link href={features[activeFeature].link}>
                        <Button className='group'>
                          Explore Feature
                          <Github className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                  {/* Animated background */}
                  <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50' />
                  <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full' />
                </Card>
              </Transition>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
