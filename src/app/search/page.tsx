'use client';

import { motion } from 'framer-motion';
import {
  Check,
  GitBranch,
  GitFork,
  Hash,
  Plus,
  Search,
  Star,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/store/app';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const {
    searchQuery,
    searchUsers,
    searchRepos,
    searchTopics,
    searchLoading,
    addingToRanking,
    addedToRanking,
    setSearchQuery,
    setSearchUsers,
    setSearchRepos,
    setSearchTopics,
    setSearchLoading,
    setAddingToRanking,
    setAddedToRanking,
  } = useAppStore();

  const performSearch = useCallback(
    async (query?: string) => {
      const searchTerm = query || searchQuery;
      if (!searchTerm.trim()) return;

      setSearchLoading(true);
      try {
        // Search for users
        const usersResponse = await fetch(
          `https://api.github.com/search/users?q=${encodeURIComponent(searchTerm)}&per_page=10`
        );
        const usersData = await usersResponse.json();
        setSearchUsers(usersData.items || []);

        // Search for repositories
        const reposResponse = await fetch(
          `https://api.github.com/search/repositories?q=${encodeURIComponent(searchTerm)}&per_page=10&sort=stars`
        );
        const reposData = await reposResponse.json();
        setSearchRepos(reposData.items || []);

        // Search for topics
        const topicsResponse = await fetch(
          `https://api.github.com/search/topics?q=${encodeURIComponent(searchTerm)}&per_page=10`
        );
        const topicsData = await topicsResponse.json();
        setSearchTopics(topicsData.items || []);
      } catch (error) {
        console.error('Search failed:', error);
        toast.error('Search failed. Please try again.');
      } finally {
        setSearchLoading(false);
      }
    },
    [
      searchQuery,
      setSearchLoading,
      setSearchUsers,
      setSearchRepos,
      setSearchTopics,
    ]
  );

  useEffect(() => {
    const q = searchParams.get('q');
    if (q && q !== searchQuery) {
      setSearchQuery(q);
      performSearch(q);
    }
  }, [searchParams, performSearch, searchQuery, setSearchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      performSearch();
      // Update URL without page reload
      const url = new URL(window.location.href);
      url.searchParams.set('q', searchQuery);
      window.history.pushState({}, '', url.toString());
    }
  };

  const addToRanking = async (
    type: 'user' | 'repo' | 'topic',
    identifier: string
  ) => {
    const key = `${type}-${identifier}`;
    setAddingToRanking(key, true);

    try {
      const response = await fetch('/api/contribute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          identifier,
        }),
      });

      if (response.ok) {
        setAddedToRanking(key, true);
        toast.success(
          `${type === 'user' ? 'User' : type === 'repo' ? 'Repository' : 'Topic'} added to ranking!`
        );
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to add to ranking');
      }
    } catch (error) {
      console.error('Failed to add to ranking:', error);
      toast.error('Failed to add to ranking');
    } finally {
      setAddingToRanking(key, false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className='container mx-auto px-4 py-8 max-w-7xl'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='space-y-8'
      >
        {/* Header */}
        <div className='text-center space-y-4'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
          >
            GitHub Search
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-xl text-muted-foreground max-w-2xl mx-auto px-4'
          >
            Search for users, repositories, and topics across GitHub
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex flex-col sm:flex-row gap-4 items-center justify-center px-4 sm:px-0'
        >
          <div className='relative flex-1 max-w-2xl'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5' />
            <Input
              placeholder='Search GitHub...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className='pl-12 py-3 text-lg'
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={searchLoading}
            size='lg'
            className='px-8'
          >
            {searchLoading ? 'Searching...' : 'Search'}
          </Button>
        </motion.div>

        {/* Results */}
        {(searchUsers.length > 0 ||
          searchRepos.length > 0 ||
          searchTopics.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='px-4 sm:px-0'
          >
            <Tabs defaultValue='users' className='w-full'>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger
                  value='users'
                  className='flex items-center space-x-2'
                >
                  <Users className='h-4 w-4' />
                  <span>Users ({searchUsers.length})</span>
                </TabsTrigger>
                <TabsTrigger
                  value='repos'
                  className='flex items-center space-x-2'
                >
                  <GitBranch className='h-4 w-4' />
                  <span>Repos ({searchRepos.length})</span>
                </TabsTrigger>
                <TabsTrigger
                  value='topics'
                  className='flex items-center space-x-2'
                >
                  <Hash className='h-4 w-4' />
                  <span>Topics ({searchTopics.length})</span>
                </TabsTrigger>
              </TabsList>

              {/* Users Tab */}
              <TabsContent value='users' className='space-y-4'>
                {searchUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className='hover:shadow-lg transition-shadow duration-300'>
                      <CardContent className='p-6'>
                        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                          <div className='flex items-center space-x-4'>
                            <Avatar className='h-10 w-10'>
                              <AvatarImage
                                src={user.avatar_url}
                                alt={user.login}
                              />
                              <AvatarFallback>
                                {user.login.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className='font-semibold text-lg'>
                                {user.login}
                              </h3>
                              <Badge variant='secondary'>{user.type}</Badge>
                            </div>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <Button variant='outline' size='sm' asChild>
                              <Link
                                href={`https://github.com/${user.login}`}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                View Profile
                              </Link>
                            </Button>
                            <Button
                              size='sm'
                              onClick={() => addToRanking('user', user.login)}
                              disabled={
                                addingToRanking[`user-${user.login}`] ||
                                addedToRanking[`user-${user.login}`]
                              }
                            >
                              {addingToRanking[`user-${user.login}`] ? (
                                'Adding...'
                              ) : addedToRanking[`user-${user.login}`] ? (
                                <>
                                  <Check className='h-3 w-3 mr-1' />
                                  Added
                                </>
                              ) : (
                                <>
                                  <Plus className='h-3 w-3 mr-1' />
                                  Add to Ranking
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              {/* Repositories Tab */}
              <TabsContent value='repos' className='space-y-4'>
                {searchRepos.map((repo, index) => (
                  <motion.div
                    key={repo.full_name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className='hover:shadow-lg transition-shadow duration-300'>
                      <CardContent className='p-6'>
                        <div className='space-y-4'>
                          <div className='flex flex-col sm:flex-row items-start justify-between gap-4'>
                            <div className='flex-1'>
                              <div className='flex items-center space-x-2 mb-2'>
                                <Avatar className='h-6 w-6'>
                                  <AvatarImage
                                    src={repo.owner.avatar_url}
                                    alt={repo.owner.login}
                                  />
                                  <AvatarFallback>
                                    {repo.owner.login.charAt(0).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <h3 className='font-semibold text-lg'>
                                  {repo.full_name}
                                </h3>
                                {repo.language && (
                                  <Badge variant='secondary'>
                                    {repo.language}
                                  </Badge>
                                )}
                              </div>
                              {repo.description && (
                                <p className='text-muted-foreground'>
                                  {repo.description}
                                </p>
                              )}
                            </div>
                            <div className='flex items-center space-x-2'>
                              <Button variant='outline' size='sm' asChild>
                                <Link
                                  href={`https://github.com/${repo.full_name}`}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                >
                                  View Repository
                                </Link>
                              </Button>
                              <Button
                                size='sm'
                                onClick={() =>
                                  addToRanking('repo', repo.full_name)
                                }
                                disabled={
                                  addingToRanking[`repo-${repo.full_name}`] ||
                                  addedToRanking[`repo-${repo.full_name}`]
                                }
                              >
                                {addingToRanking[`repo-${repo.full_name}`] ? (
                                  'Adding...'
                                ) : addedToRanking[`repo-${repo.full_name}`] ? (
                                  <>
                                    <Check className='h-3 w-3 mr-1' />
                                    Added
                                  </>
                                ) : (
                                  <>
                                    <Plus className='h-3 w-3 mr-1' />
                                    Add to Ranking
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                          <div className='flex items-center space-x-4 text-sm text-muted-foreground'>
                            <div className='flex items-center space-x-1'>
                              <Star className='h-3 w-3' />
                              <span>{formatNumber(repo.stargazers_count)}</span>
                            </div>
                            <div className='flex items-center space-x-1'>
                              <GitFork className='h-3 w-3' />
                              <span>{formatNumber(repo.forks_count)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              {/* Topics Tab */}
              <TabsContent value='topics' className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {searchTopics.map((topic, index) => (
                    <motion.div
                      key={topic.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className='hover:shadow-lg transition-shadow duration-300 h-full'>
                        <CardContent className='p-6'>
                          <div className='space-y-4'>
                            <div className='flex items-center space-x-2'>
                              <Hash className='h-4 w-4 text-muted-foreground' />
                              <h3 className='font-semibold'>
                                {topic.display_name || topic.name}
                              </h3>
                            </div>
                            {topic.short_description && (
                              <p className='text-sm text-muted-foreground line-clamp-3'>
                                {topic.short_description}
                              </p>
                            )}
                            <div className='flex flex-col gap-2'>
                              <Button
                                variant='outline'
                                size='sm'
                                onClick={() =>
                                  window.open(
                                    `https://github.com/topics/${topic.name}`,
                                    '_blank'
                                  )
                                }
                              >
                                Explore Topic
                              </Button>
                              <Button
                                size='sm'
                                onClick={() =>
                                  addToRanking('topic', topic.name)
                                }
                                disabled={
                                  addingToRanking[`topic-${topic.name}`] ||
                                  addedToRanking[`topic-${topic.name}`]
                                }
                              >
                                {addingToRanking[`topic-${topic.name}`] ? (
                                  'Adding...'
                                ) : addedToRanking[`topic-${topic.name}`] ? (
                                  <>
                                    <Check className='h-3 w-3 mr-1' />
                                    Added
                                  </>
                                ) : (
                                  <>
                                    <Plus className='h-3 w-3 mr-1' />
                                    Add to Ranking
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}

        {/* Empty State */}
        {!searchLoading &&
          searchQuery &&
          searchUsers.length === 0 &&
          searchRepos.length === 0 &&
          searchTopics.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='text-center py-12 px-4'
            >
              <p className='text-lg text-muted-foreground'>
                No results found for "{searchQuery}"
              </p>
              <p className='text-sm text-muted-foreground mt-2'>
                Try different keywords or check the spelling
              </p>
            </motion.div>
          )}
      </motion.div>
    </div>
  );
}
