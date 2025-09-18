'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle,
  ExternalLink,
  GitBranch,
  Github,
  Hash,
  Plus,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/store/app';

export default function ContributePage() {
  const {
    contributeInput,
    contributeProcessing,
    contributeResults,
    setContributeInput,
    setContributeProcessing,
    setContributeResults,
  } = useAppStore();

  const parseGitHubInput = (
    text: string
  ): Array<{ type: 'user' | 'repo' | 'topic'; identifier: string }> => {
    const entries: Array<{
      type: 'user' | 'repo' | 'topic';
      identifier: string;
    }> = [];
    const lines = text
      .trim()
      .split('\n')
      .filter(line => line.trim());

    for (const line of lines) {
      const trimmedLine = line.trim();

      // GitHub URL patterns
      const userUrlMatch = trimmedLine.match(
        /https?:\/\/github\.com\/([^/\s]+)\/?$/
      );
      const repoUrlMatch = trimmedLine.match(
        /https?:\/\/github\.com\/([^/\s]+\/[^/\s]+)/
      );
      const topicUrlMatch = trimmedLine.match(
        /https?:\/\/github\.com\/topics\/([^/\s]+)/
      );

      if (topicUrlMatch) {
        entries.push({ type: 'topic', identifier: topicUrlMatch[1] });
      } else if (repoUrlMatch) {
        entries.push({ type: 'repo', identifier: repoUrlMatch[1] });
      } else if (userUrlMatch) {
        entries.push({ type: 'user', identifier: userUrlMatch[1] });
      } else if (trimmedLine.includes('/')) {
        // Assume repo format (username/repo)
        entries.push({ type: 'repo', identifier: trimmedLine });
      } else if (trimmedLine.startsWith('#')) {
        // Topic format
        entries.push({ type: 'topic', identifier: trimmedLine.slice(1) });
      } else if (trimmedLine.match(/^[a-zA-Z0-9-_.]+$/)) {
        // Username format
        entries.push({ type: 'user', identifier: trimmedLine });
      }
    }

    return entries;
  };

  const handleSubmit = async () => {
    if (!contributeInput.trim()) {
      toast.error('Please enter some GitHub data to contribute');
      return;
    }

    setContributeProcessing(true);
    setContributeResults([]);

    try {
      const entries = parseGitHubInput(contributeInput);
      if (entries.length === 0) {
        toast.error('No valid GitHub entries found. Please check the format.');
        setContributeProcessing(false);
        return;
      }

      const newResults: Array<{
        type: 'user' | 'repo' | 'topic';
        identifier: string;
        status: 'success' | 'error';
        message: string;
        rank?: number;
        rankInfo?: {
          type: 'user' | 'repository' | 'topic';
          position: number;
          totalStars?: number;
          followers?: number;
          stars?: number;
          forks?: number;
          score?: number;
          repositories?: number;
        };
      }> = [];

      for (const entry of entries) {
        try {
          const response = await fetch('/api/contribute', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
          });

          const result = await response.json();

          if (response.ok) {
            newResults.push({
              ...entry,
              status: 'success',
              message: result.message || `${entry.type} added successfully`,
              rank: result.rank,
              rankInfo: result.rankInfo,
            });
          } else {
            newResults.push({
              ...entry,
              status: 'error',
              message: result.message || `Failed to add ${entry.type}`,
            });
          }
        } catch (_error) {
          newResults.push({
            ...entry,
            status: 'error',
            message: `Error processing ${entry.type}: ${entry.identifier}`,
          });
        }
      }

      setContributeResults(newResults);

      const successCount = newResults.filter(
        r => r.status === 'success'
      ).length;
      const errorCount = newResults.filter(r => r.status === 'error').length;

      if (successCount > 0) {
        toast.success(
          `Successfully added ${successCount} item${successCount > 1 ? 's' : ''} to ranking!`
        );
      }
      if (errorCount > 0) {
        toast.error(
          `Failed to add ${errorCount} item${errorCount > 1 ? 's' : ''}`
        );
      }
    } catch (error) {
      console.error('Contribution failed:', error);
      toast.error('Contribution failed. Please try again.');
    } finally {
      setContributeProcessing(false);
    }
  };

  const clearResults = () => {
    setContributeResults([]);
    setContributeInput('');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Users className='h-4 w-4' />;
      case 'repo':
        return <GitBranch className='h-4 w-4' />;
      case 'topic':
        return <Hash className='h-4 w-4' />;
      default:
        return <Github className='h-4 w-4' />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'user':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'repo':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'topic':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
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
            Contribute to Rankings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-xl text-muted-foreground max-w-2xl mx-auto px-4'
          >
            Help grow our rankings by contributing GitHub users, repositories,
            and topics
          </motion.p>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='px-4 sm:px-0'
        >
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <Github className='h-5 w-5' />
                <span>How to Contribute</span>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-muted-foreground'>
                Enter GitHub users, repositories, or topics in the text area
                below. You can use various formats:
              </p>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <Users className='h-4 w-4 text-blue-500' />
                    <span className='font-medium'>Users</span>
                  </div>
                  <div className='text-sm text-muted-foreground space-y-1'>
                    <div>• username</div>
                    <div>• https://github.com/username</div>
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <GitBranch className='h-4 w-4 text-green-500' />
                    <span className='font-medium'>Repositories</span>
                  </div>
                  <div className='text-sm text-muted-foreground space-y-1'>
                    <div>• username/repo</div>
                    <div>• https://github.com/username/repo</div>
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <Hash className='h-4 w-4 text-purple-500' />
                    <span className='font-medium'>Topics</span>
                  </div>
                  <div className='text-sm text-muted-foreground space-y-1'>
                    <div>• #topic-name</div>
                    <div>• https://github.com/topics/topic-name</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='px-4 sm:px-0'
        >
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <Plus className='h-5 w-5' />
                <span>Add to Rankings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <Textarea
                placeholder={`Enter GitHub data (one per line):\n\noctocat\nfacebook/react\n#javascript\nhttps://github.com/microsoft/vscode`}
                value={contributeInput}
                onChange={e => setContributeInput(e.target.value)}
                className='min-h-32 font-mono text-sm'
              />
              <div className='flex flex-col sm:flex-row gap-2'>
                <Button
                  onClick={handleSubmit}
                  disabled={contributeProcessing || !contributeInput.trim()}
                  className='flex items-center space-x-2'
                >
                  <Plus className='h-4 w-4' />
                  <span>
                    {contributeProcessing ? 'Processing...' : 'Contribute'}
                  </span>
                </Button>
                {contributeResults.length > 0 && (
                  <Button variant='outline' onClick={clearResults}>
                    Clear Results
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        {contributeResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='px-4 sm:px-0'
          >
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <CheckCircle className='h-5 w-5' />
                  <span>Contribution Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {contributeResults.map((result, index) => (
                    <motion.div
                      key={`${result.type}-${result.identifier}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`p-4 rounded-lg border ${
                        result.status === 'success'
                          ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                          : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                      }`}
                    >
                      <div className='flex items-start justify-between'>
                        <div className='flex items-center space-x-3'>
                          <div
                            className={`p-2 rounded-full ${getTypeColor(result.type)}`}
                          >
                            {getTypeIcon(result.type)}
                          </div>
                          <div>
                            <div className='flex items-center space-x-2'>
                              <span className='font-medium'>
                                {result.identifier}
                              </span>
                              <Badge variant='secondary' className='text-xs'>
                                {result.type}
                              </Badge>
                            </div>
                            <p
                              className={`text-sm mt-1 ${
                                result.status === 'success'
                                  ? 'text-green-700 dark:text-green-300'
                                  : 'text-red-700 dark:text-red-300'
                              }`}
                            >
                              {result.message}
                            </p>
                            {result.status === 'success' && result.rankInfo && (
                              <div className='mt-2 flex items-center space-x-4 text-xs text-muted-foreground'>
                                <Badge variant='outline' className='text-xs'>
                                  Rank #{result.rankInfo.position}
                                </Badge>
                                {result.rankInfo.totalStars !== undefined && (
                                  <span>
                                    ⭐{' '}
                                    {result.rankInfo.totalStars.toLocaleString()}{' '}
                                    stars
                                  </span>
                                )}
                                {result.rankInfo.followers !== undefined && (
                                  <span>
                                    👥{' '}
                                    {result.rankInfo.followers.toLocaleString()}{' '}
                                    followers
                                  </span>
                                )}
                                {result.rankInfo.stars !== undefined && (
                                  <span>
                                    ⭐ {result.rankInfo.stars.toLocaleString()}{' '}
                                    stars
                                  </span>
                                )}
                                {result.rankInfo.forks !== undefined && (
                                  <span>
                                    🍴 {result.rankInfo.forks.toLocaleString()}{' '}
                                    forks
                                  </span>
                                )}
                                {result.rankInfo.score !== undefined && (
                                  <span>
                                    📊 {result.rankInfo.score.toFixed(1)} score
                                  </span>
                                )}
                                {result.rankInfo.repositories !== undefined && (
                                  <span>
                                    📦{' '}
                                    {result.rankInfo.repositories.toLocaleString()}{' '}
                                    repos
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                          {result.status === 'success' ? (
                            <CheckCircle className='h-5 w-5 text-green-500' />
                          ) : (
                            <ExternalLink className='h-5 w-5 text-red-500' />
                          )}
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              const url =
                                result.type === 'topic'
                                  ? `https://github.com/topics/${result.identifier}`
                                  : `https://github.com/${result.identifier}`;
                              window.open(url, '_blank');
                            }}
                          >
                            <ExternalLink className='h-3 w-3 mr-1' />
                            View
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='px-4 sm:px-0'
        >
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <Card>
              <CardContent className='p-6 text-center'>
                <Users className='h-8 w-8 mx-auto mb-2 text-blue-500' />
                <h3 className='font-semibold'>Users</h3>
                <p className='text-muted-foreground text-sm'>
                  Help discover talented developers
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-6 text-center'>
                <GitBranch className='h-8 w-8 mx-auto mb-2 text-green-500' />
                <h3 className='font-semibold'>Repositories</h3>
                <p className='text-muted-foreground text-sm'>
                  Share amazing projects
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-6 text-center'>
                <Hash className='h-8 w-8 mx-auto mb-2 text-purple-500' />
                <h3 className='font-semibold'>Topics</h3>
                <p className='text-muted-foreground text-sm'>
                  Highlight trending technologies
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
