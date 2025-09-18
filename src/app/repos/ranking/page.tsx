'use client';

import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowUpDown,
  Eye,
  Filter,
  GitFork,
  Search,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import { RepoCardSkeleton } from '@/components/skeletons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppStore } from '@/store/app';

export default function ReposRankingPage() {
  const {
    repositories,
    repositoriesLoading,
    repositoriesSearch,
    repositoriesSort,
    repositoriesOrder,
    repositoriesPage,
    repositoriesTotalPages,
    setRepositories,
    setRepositoriesLoading,
    setRepositoriesSearch,
    setRepositoriesSort,
    setRepositoriesOrder,
    setRepositoriesPage,
    setRepositoriesTotalPages,
  } = useAppStore();

  const fetchRepositories = useCallback(async () => {
    setRepositoriesLoading(true);
    try {
      const params = new URLSearchParams({
        page: repositoriesPage.toString(),
        limit: '20',
        search: repositoriesSearch,
        sortBy: repositoriesSort,
        order: repositoriesOrder,
      });

      const response = await fetch(`/api/repositories?${params}`);
      const data = await response.json();

      if (response.ok) {
        setRepositories(data.repositories || []);
        setRepositoriesTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Failed to fetch repositories:', error);
    } finally {
      setRepositoriesLoading(false);
    }
  }, [
    repositoriesPage,
    repositoriesSearch,
    repositoriesSort,
    repositoriesOrder,
    setRepositories,
    setRepositoriesLoading,
    setRepositoriesTotalPages,
  ]);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  const handleSearch = () => {
    setRepositoriesPage(1);
    fetchRepositories();
  };

  const toggleOrder = () => {
    setRepositoriesOrder(repositoriesOrder === 'desc' ? 'asc' : 'desc');
    setRepositoriesPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
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
            Top GitHub Repositories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-xl text-muted-foreground max-w-2xl mx-auto px-4'
          >
            Explore the most starred and innovative projects on GitHub
          </motion.p>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex flex-col sm:flex-row gap-4 items-center justify-between px-4 sm:px-0'
        >
          <div className='flex flex-1 items-center space-x-4 w-full sm:w-auto'>
            <div className='relative flex-1 max-w-md'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
              <Input
                placeholder='Search repositories...'
                value={repositoriesSearch}
                onChange={e => setRepositoriesSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className='pl-10'
              />
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <Select
              value={repositoriesSort}
              onValueChange={setRepositoriesSort}
            >
              <SelectTrigger className='w-40'>
                <Filter className='h-4 w-4 mr-2' />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='stars'>Stars</SelectItem>
                <SelectItem value='forks'>Forks</SelectItem>
                <SelectItem value='watchers'>Watchers</SelectItem>
                <SelectItem value='updated'>Updated</SelectItem>
                <SelectItem value='created'>Created</SelectItem>
              </SelectContent>
            </Select>
            <Button variant='outline' onClick={toggleOrder} size='sm'>
              <ArrowUpDown className='h-4 w-4' />
            </Button>
          </div>
        </motion.div>

        {/* Repositories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='grid gap-6 px-4 sm:px-0'
        >
          {repositoriesLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <RepoCardSkeleton key={`repo-skeleton-${i}-${Date.now()}`} />
              ))
            : repositories.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className='hover:shadow-md transition-all duration-200 hover:scale-[1.01] group'>
                    <CardContent className='p-4'>
                      <div className='flex items-center space-x-4'>
                        {/* Ranking Number */}
                        <div className='flex-shrink-0'>
                          <div className='w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center'>
                            <span className='text-sm font-bold text-primary'>
                              #{(repositoriesPage - 1) * 20 + index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Repository Info */}
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-start justify-between'>
                            <div className='min-w-0 flex-1'>
                              <div className='flex items-center space-x-2'>
                                <h3 className='text-base font-semibold truncate group-hover:text-primary transition-colors'>
                                  <Link
                                    href={repo.htmlUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                  >
                                    {repo.name}
                                  </Link>
                                </h3>
                                {repo.language && (
                                  <Badge
                                    variant='secondary'
                                    className='text-xs px-2 py-0.5'
                                  >
                                    {repo.language}
                                  </Badge>
                                )}
                              </div>
                              <p className='text-sm text-muted-foreground'>
                                by{' '}
                                <Link
                                  href={`https://github.com/${repo.owner}`}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  className='hover:text-primary transition-colors'
                                >
                                  {repo.owner}
                                </Link>
                              </p>
                              {repo.description && (
                                <p className='text-xs text-muted-foreground mt-1 line-clamp-1'>
                                  {repo.description}
                                </p>
                              )}
                            </div>

                            {/* Compact Stats */}
                            <div className='flex items-center space-x-4 text-sm'>
                              <div className='flex items-center space-x-1 text-muted-foreground'>
                                <Star className='h-3 w-3' />
                                <span className='font-medium'>
                                  {formatNumber(repo.stars)}
                                </span>
                              </div>
                              <div className='flex items-center space-x-1 text-muted-foreground'>
                                <GitFork className='h-3 w-3' />
                                <span className='font-medium'>
                                  {formatNumber(repo.forks)}
                                </span>
                              </div>
                              <div className='flex items-center space-x-1 text-muted-foreground'>
                                <Eye className='h-3 w-3' />
                                <span className='font-medium'>
                                  {formatNumber(repo.watchers)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Meta Info and Actions */}
                          <div className='mt-2 flex items-center justify-between'>
                            <div className='flex items-center space-x-3 text-xs text-muted-foreground'>
                              <span>Updated {formatDate(repo.updatedAt)}</span>
                              {repo.openIssues > 0 && (
                                <div className='flex items-center space-x-1'>
                                  <AlertCircle className='h-3 w-3' />
                                  <span>{repo.openIssues} issues</span>
                                </div>
                              )}
                            </div>

                            <Button
                              variant='outline'
                              size='sm'
                              className='h-7 px-3 opacity-0 group-hover:opacity-100 transition-opacity'
                              asChild
                            >
                              <Link
                                href={repo.htmlUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                View
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
        </motion.div>

        {/* Pagination */}
        {repositoriesTotalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 px-4 sm:px-0'
          >
            <Button
              onClick={() =>
                setRepositoriesPage(Math.max(repositoriesPage - 1, 1))
              }
              disabled={repositoriesPage === 1 || repositoriesLoading}
              variant='outline'
            >
              Previous
            </Button>
            <span className='text-sm text-muted-foreground'>
              Page {repositoriesPage} of {repositoriesTotalPages}
            </span>
            <Button
              onClick={() =>
                setRepositoriesPage(
                  Math.min(repositoriesPage + 1, repositoriesTotalPages)
                )
              }
              disabled={
                repositoriesPage === repositoriesTotalPages ||
                repositoriesLoading
              }
              variant='outline'
            >
              Next
            </Button>
          </motion.div>
        )}

        {/* Empty State */}
        {!repositoriesLoading && repositories.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-center py-12 px-4'
          >
            <p className='text-lg text-muted-foreground'>
              No repositories found
            </p>
            <p className='text-sm text-muted-foreground mt-2'>
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
