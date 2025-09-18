'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Frontend Developer',
      company: 'Tech Corp',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
      content:
        'RankedIn has completely transformed how I discover new projects and talented developers. The ranking system is incredibly accurate and helps me stay on top of emerging trends.',
      rating: 5,
      featured: true,
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Open Source Maintainer',
      company: 'GitHub',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
      content:
        "As someone who maintains several popular repositories, I love how RankedIn showcases projects based on real engagement metrics. It's helped our project gain incredible visibility.",
      rating: 5,
      featured: false,
    },
    {
      name: 'Alex Thompson',
      role: 'CTO',
      company: 'StartupXYZ',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
      content:
        'We use RankedIn to scout talent for our team. The detailed rankings and metrics make it easy to identify top performers in specific technologies.',
      rating: 5,
      featured: false,
    },
    {
      name: 'Priya Patel',
      role: 'Full Stack Developer',
      company: 'DevAgency',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
      content:
        "The community-driven approach of RankedIn means I always discover authentic, high-quality projects. It's become my go-to platform for finding inspiration.",
      rating: 5,
      featured: true,
    },
    {
      name: 'David Kim',
      role: 'ML Engineer',
      company: 'AI Solutions',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face',
      content:
        'Love how RankedIn tracks trending topics in AI and machine learning. It helps me stay current with the latest developments in my field.',
      rating: 5,
      featured: false,
    },
    {
      name: 'Emma Wilson',
      role: 'DevOps Engineer',
      company: 'CloudFirst',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face',
      content:
        'The real-time rankings and comprehensive metrics make RankedIn invaluable for discovering tools and libraries for our infrastructure stack.',
      rating: 5,
      featured: false,
    },
  ];

  return (
    <section className='py-20 bg-gradient-to-b from-background to-muted/30'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <Badge variant='outline' className='mb-4'>
            Testimonials
          </Badge>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Loved by developers worldwide
          </h2>
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
            Join thousands of developers who trust RankedIn to discover amazing
            projects and showcase their work
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={
                testimonial.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }
            >
              <Card
                className={`h-full group hover:shadow-lg transition-all duration-300 ${
                  testimonial.featured
                    ? 'ring-2 ring-primary/20 bg-primary/5'
                    : ''
                }`}
              >
                <CardContent className='p-6'>
                  <div className='flex items-start space-x-4 mb-4'>
                    <Avatar className='w-12 h-12'>
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <h4 className='font-semibold'>{testimonial.name}</h4>
                      <p className='text-sm text-muted-foreground'>
                        {testimonial.role}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {testimonial.company}
                      </p>
                    </div>
                    <Quote className='w-6 h-6 text-primary/30 flex-shrink-0' />
                  </div>

                  <blockquote className='text-sm leading-relaxed mb-4 text-muted-foreground'>
                    "{testimonial.content}"
                  </blockquote>

                  <div className='flex items-center'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={`star-${testimonial.name}-${i}`}
                        className='w-4 h-4 fill-yellow-400 text-yellow-400'
                      />
                    ))}
                  </div>
                </CardContent>

                {testimonial.featured && (
                  <div className='absolute top-4 right-4'>
                    <Badge className='bg-primary text-primary-foreground'>
                      Featured
                    </Badge>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='mt-16 text-center'
        >
          <div className='flex flex-wrap justify-center items-center gap-8 text-muted-foreground'>
            <div className='flex items-center space-x-2'>
              <Star className='w-5 h-5 fill-yellow-400 text-yellow-400' />
              <span className='text-lg font-semibold'>4.9/5</span>
              <span className='text-sm'>Average Rating</span>
            </div>
            <div className='w-px h-6 bg-border hidden sm:block' />
            <div className='text-sm'>
              <span className='font-semibold'>50,000+</span> Happy Developers
            </div>
            <div className='w-px h-6 bg-border hidden sm:block' />
            <div className='text-sm'>
              <span className='font-semibold'>99.9%</span> Uptime
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
