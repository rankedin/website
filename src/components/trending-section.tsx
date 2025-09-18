'use client';

import { motion } from 'framer-motion';
import { ExternalLink, GitFork, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTrendingStore } from '@/store/trending';

export function TrendingSection() {
  const {
    trendingUsers,
    trendingRepos,
    trendingTopics,
    loading,
    error,
    fetchTrendingData,
  } = useTrendingStore();

  useEffect(() => {
    fetchTrendingData();
  }, [fetchTrendingData]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <section className='py-20 bg-gradient-to-b from-muted/30 to-background'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <Badge variant='outline' className='mb-4'>
            <TrendingUp className='w-4 h-4 mr-2' />
            Trending Now
          </Badge>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            What's hot in the developer community
          </h2>
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
            Discover the most popular users, repositories, and topics trending
            right now in the GitHub ecosystem
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Trending Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className='h-full'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
                  Top Users
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {loading ? (
                  // Loading skeleton for users
                  <>
                    <div className='flex items-center space-x-3 p-3 rounded-lg'>
                      <div className='h-10 w-10 bg-muted rounded-full animate-pulse'></div>
                      <div className='flex-1 space-y-2'>
                        <div className='h-4 bg-muted rounded animate-pulse'></div>
                        <div className='h-3 bg-muted rounded animate-pulse w-3/4'></div>
                      </div>
                    </div>
                    <div className='flex items-center space-x-3 p-3 rounded-lg'>
                      <div className='h-10 w-10 bg-muted rounded-full animate-pulse'></div>
                      <div className='flex-1 space-y-2'>
                        <div className='h-4 bg-muted rounded animate-pulse'></div>
                        <div className='h-3 bg-muted rounded animate-pulse w-3/4'></div>
                      </div>
                    </div>
                    <div className='flex items-center space-x-3 p-3 rounded-lg'>
                      <div className='h-10 w-10 bg-muted rounded-full animate-pulse'></div>
                      <div className='flex-1 space-y-2'>
                        <div className='h-4 bg-muted rounded animate-pulse'></div>
                        <div className='h-3 bg-muted rounded animate-pulse w-3/4'></div>
                      </div>
                    </div>
                  </>
                ) : error ? (
                  <div className='text-center text-muted-foreground py-8'>
                    <p>Failed to load trending users</p>
                  </div>
                ) : (
                  trendingUsers.map((user, index) => (
                    <motion.div
                      key={user.username}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className='flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer'
                    >
                      <Avatar className='h-10 w-10'>
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1 min-w-0'>
                        <h4 className='font-semibold truncate'>{user.name}</h4>
                        <p className='text-sm text-muted-foreground truncate'>
                          @{user.username}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          {user.bio || 'GitHub Developer'}
                        </p>
                      </div>
                      <div className='text-right text-xs'>
                        <div className='text-muted-foreground'>
                          {formatNumber(user.followers)} followers
                        </div>
                        <div className='text-yellow-500'>
                          {formatNumber(user.totalStars)} ⭐
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
                <Link href='/users/ranking'>
                  <Button variant='outline' className='w-full'>
                    View All Users
                    <ExternalLink className='ml-2 h-4 w-4' />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trending Repositories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className='h-full'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
                  Hot Repositories
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {loading ? (
                  // Loading skeleton for repositories
                  <>
                    <div className='p-3 rounded-lg border'>
                      <div className='space-y-2'>
                        <div className='h-4 bg-muted rounded animate-pulse'></div>
                        <div className='h-3 bg-muted rounded animate-pulse w-3/4'></div>
                        <div className='flex justify-between'>
                          <div className='h-3 bg-muted rounded animate-pulse w-1/4'></div>
                          <div className='h-3 bg-muted rounded animate-pulse w-1/4'></div>
                        </div>
                      </div>
                    </div>
                    <div className='p-3 rounded-lg border'>
                      <div className='space-y-2'>
                        <div className='h-4 bg-muted rounded animate-pulse'></div>
                        <div className='h-3 bg-muted rounded animate-pulse w-3/4'></div>
                        <div className='flex justify-between'>
                          <div className='h-3 bg-muted rounded animate-pulse w-1/4'></div>
                          <div className='h-3 bg-muted rounded animate-pulse w-1/4'></div>
                        </div>
                      </div>
                    </div>
                    <div className='p-3 rounded-lg border'>
                      <div className='space-y-2'>
                        <div className='h-4 bg-muted rounded animate-pulse'></div>
                        <div className='h-3 bg-muted rounded animate-pulse w-3/4'></div>
                        <div className='flex justify-between'>
                          <div className='h-3 bg-muted rounded animate-pulse w-1/4'></div>
                          <div className='h-3 bg-muted rounded animate-pulse w-1/4'></div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : error ? (
                  <div className='text-center text-muted-foreground py-8'>
                    <p>Failed to load trending repositories</p>
                  </div>
                ) : (
                  trendingRepos.map((repo, index) => (
                    <motion.div
                      key={repo.fullName}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className='p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border'
                    >
                      <div className='flex items-start justify-between mb-2'>
                        <h4 className='font-semibold text-sm'>
                          {repo.fullName}
                        </h4>
                        <Badge variant='secondary' className='text-xs'>
                          {repo.language || 'Unknown'}
                        </Badge>
                      </div>
                      <p className='text-xs text-muted-foreground mb-3 line-clamp-2'>
                        {repo.description || 'No description available'}
                      </p>
                      <div className='flex items-center justify-between text-xs'>
                        <div className='flex items-center space-x-3'>
                          <span className='flex items-center'>
                            <Star className='w-3 h-3 mr-1' />
                            {formatNumber(repo.stars)}
                          </span>
                          <span className='flex items-center'>
                            <GitFork className='w-3 h-3 mr-1' />
                            {formatNumber(repo.forks)}
                          </span>
                        </div>
                        <span className='text-green-600 font-medium'>
                          Trending
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
                <Link href='/repos/ranking'>
                  <Button variant='outline' className='w-full'>
                    View All Repositories
                    <ExternalLink className='ml-2 h-4 w-4' />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className='h-full'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <div className='w-2 h-2 bg-purple-500 rounded-full mr-3'></div>
                  Popular Topics
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                {loading ? (
                  // Loading skeleton for topics
                  <>
                    <div className='flex items-center justify-between p-3 rounded-lg'>
                      <div className='space-y-1'>
                        <div className='h-4 bg-muted rounded animate-pulse w-32'></div>
                        <div className='h-3 bg-muted rounded animate-pulse w-20'></div>
                      </div>
                      <div className='h-6 bg-muted rounded animate-pulse w-16'></div>
                    </div>
                    <div className='flex items-center justify-between p-3 rounded-lg'>
                      <div className='space-y-1'>
                        <div className='h-4 bg-muted rounded animate-pulse w-28'></div>
                        <div className='h-3 bg-muted rounded animate-pulse w-24'></div>
                      </div>
                      <div className='h-6 bg-muted rounded animate-pulse w-16'></div>
                    </div>
                    <div className='flex items-center justify-between p-3 rounded-lg'>
                      <div className='space-y-1'>
                        <div className='h-4 bg-muted rounded animate-pulse w-36'></div>
                        <div className='h-3 bg-muted rounded animate-pulse w-18'></div>
                      </div>
                      <div className='h-6 bg-muted rounded animate-pulse w-16'></div>
                    </div>
                  </>
                ) : error ? (
                  <div className='text-center text-muted-foreground py-8'>
                    <p>Failed to load trending topics</p>
                  </div>
                ) : (
                  trendingTopics.map((topic, index) => (
                    <motion.div
                      key={topic.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className='flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer'
                    >
                      <div>
                        <h4 className='font-medium text-sm'>#{topic.name}</h4>
                        <p className='text-xs text-muted-foreground'>
                          {formatNumber(topic.repositoryCount)} repos
                        </p>
                      </div>
                      <Badge
                        variant='outline'
                        className='text-xs text-green-600'
                      >
                        Score: {topic.score}
                      </Badge>
                    </motion.div>
                  ))
                )}
                <Link href='/topics/ranking'>
                  <Button variant='outline' className='w-full'>
                    View All Topics
                    <ExternalLink className='ml-2 h-4 w-4' />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
