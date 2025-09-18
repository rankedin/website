'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle,
  Clock,
  Code2,
  Copy,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  Globe,
  Hash,
  Key,
  Play,
  Search,
  Shield,
  Sparkles,
  Star,
  Terminal,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function ApiEndpointsPage() {
  const [testUrl, setTestUrl] = useState(
    'https://rankedin.dev/api/users?limit=5'
  );
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const testEndpoint = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      const response = await fetch(testUrl);
      const data = await response.json();
      setTestResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setTestResult(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const endpoints = [
    {
      id: 'users-api',
      title: 'Users API',
      description:
        'Get ranked GitHub users with detailed profiles and statistics',
      method: 'GET',
      url: 'https://rankedin.dev/api/users',
      icon: Users,
      color: 'blue',
      example: 'https://rankedin.dev/api/users?limit=10&page=1',
      features: [
        'Pagination support',
        'Rich user profiles',
        'Follower statistics',
        'Activity metrics',
      ],
    },
    {
      id: 'repos-api',
      title: 'Repositories API',
      description: 'Access ranked GitHub repositories with language filtering',
      method: 'GET',
      url: 'https://rankedin.dev/api/repositories',
      icon: GitBranch,
      color: 'green',
      example:
        'https://rankedin.dev/api/repositories?language=javascript&limit=20',
      features: [
        'Language filtering',
        'Star counts',
        'Fork statistics',
        'Topic information',
      ],
    },
    {
      id: 'topics-api',
      title: 'Topics API',
      description: 'Explore trending GitHub topics and technologies',
      method: 'GET',
      url: 'https://rankedin.dev/api/topics',
      icon: Hash,
      color: 'purple',
      example: 'https://rankedin.dev/api/topics?featured=true&limit=15',
      features: [
        'Featured topics',
        'Repository counts',
        'Trend analysis',
        'Category filtering',
      ],
    },
    {
      id: 'search-api',
      title: 'Search API',
      description: 'Search across all rankings with powerful filters',
      method: 'GET',
      url: 'https://rankedin.dev/api/search',
      icon: Search,
      color: 'indigo',
      example: 'https://rankedin.dev/api/search?q=react&type=repository',
      features: [
        'Multi-type search',
        'Advanced filters',
        'Fuzzy matching',
        'Relevance scoring',
      ],
    },
    {
      id: 'contribute-api',
      title: 'Contribute API',
      description: 'Submit new items to rankings programmatically',
      method: 'POST',
      url: 'https://rankedin.dev/api/contribute',
      icon: Star,
      color: 'yellow',
      example: 'POST with JSON payload for submission',
      features: [
        'Real-time ranking',
        'Validation system',
        'Duplicate detection',
        'Instant feedback',
      ],
    },
    {
      id: 'stats-api',
      title: 'Statistics API',
      description: 'Get platform-wide statistics and analytics',
      method: 'GET',
      url: 'https://rankedin.dev/api/stats',
      icon: BarChart3,
      color: 'orange',
      example: 'https://rankedin.dev/api/stats?timeframe=7d',
      features: [
        'Growth metrics',
        'Activity trends',
        'Top contributors',
        'Usage analytics',
      ],
    },
  ];

  const useCases = [
    {
      title: 'Developer Portfolio',
      description:
        'Show your GitHub ranking and statistics on your personal website',
      icon: Users,
      color: 'blue',
      code: `// Get user ranking
fetch('https://rankedin.dev/api/users?username=yourusername')
  .then(res => res.json())
  .then(data => {
    document.getElementById('rank').textContent = data.rank;
    document.getElementById('score').textContent = data.score;
  });`,
    },
    {
      title: 'Project Discovery',
      description:
        'Build a curated list of trending repositories for your blog or app',
      icon: GitBranch,
      color: 'green',
      code: `// Get trending JavaScript repos
fetch('https://rankedin.dev/api/repositories?language=javascript&limit=10')
  .then(res => res.json())
  .then(data => {
    const trendingRepos = data.repositories;
    // Display repos in your app
  });`,
    },
    {
      title: 'Tech Analytics',
      description:
        'Track technology trends and create reports for your organization',
      icon: BarChart3,
      color: 'orange',
      code: `// Get trending topics
fetch('https://rankedin.dev/api/topics?featured=true')
  .then(res => res.json())
  .then(data => {
    const trends = data.topics.map(t => ({
      name: t.name,
      growth: t.repositories
    }));
  });`,
    },
    {
      title: 'Community Platform',
      description: 'Integrate rankings into your developer community or forum',
      icon: Star,
      color: 'yellow',
      code: `// Search for relevant content
fetch('https://rankedin.dev/api/search?q=machine-learning&type=all')
  .then(res => res.json())
  .then(data => {
    // Display search results
    displayResults(data.results);
  });`,
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted/20'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-12'
        >
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mb-6'>
            <Globe className='h-8 w-8 text-primary' />
          </div>
          <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4'>
            API Endpoints
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Powerful APIs to integrate RankedIn data into your applications.
            Build amazing experiences with our ranking data.
          </p>
        </motion.div>

        {/* Quick Test */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='mb-12'
        >
          <Card className='bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2 text-green-900 dark:text-green-100'>
                <Play className='h-5 w-5' />
                <span>Live API Tester</span>
              </CardTitle>
              <CardDescription className='text-green-700 dark:text-green-300'>
                Test our API endpoints directly from this page
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex gap-2'>
                <Input
                  value={testUrl}
                  onChange={e => setTestUrl(e.target.value)}
                  placeholder='Enter API endpoint URL'
                  className='flex-1'
                />
                <Button onClick={testEndpoint} disabled={isLoading}>
                  {isLoading ? 'Testing...' : 'Test API'}
                </Button>
              </div>

              {testResult && (
                <div className='relative'>
                  <pre className='bg-muted p-4 rounded-lg overflow-x-auto text-sm max-h-64'>
                    <code>{testResult}</code>
                  </pre>
                  <Button
                    size='sm'
                    variant='ghost'
                    className='absolute right-2 top-2'
                    onClick={() => copyToClipboard(testResult, 'test-result')}
                  >
                    {copiedCode === 'test-result' ? (
                      <CheckCircle className='h-4 w-4 text-green-500' />
                    ) : (
                      <Copy className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Available Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='mb-16'
        >
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold mb-4'>Available Endpoints</h2>
            <p className='text-muted-foreground'>
              Choose from our comprehensive set of API endpoints to build your
              applications
            </p>
          </div>

          <div className='grid lg:grid-cols-2 gap-6'>
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className='h-full hover:shadow-lg transition-all duration-300'>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-3'>
                        <div
                          className={`p-3 rounded-lg bg-${endpoint.color}-100 dark:bg-${endpoint.color}-900/30`}
                        >
                          <endpoint.icon
                            className={`h-6 w-6 text-${endpoint.color}-600 dark:text-${endpoint.color}-400`}
                          />
                        </div>
                        <div>
                          <CardTitle>{endpoint.title}</CardTitle>
                          <div className='flex items-center space-x-2 mt-1'>
                            <Badge
                              variant={
                                endpoint.method === 'GET'
                                  ? 'secondary'
                                  : 'default'
                              }
                            >
                              {endpoint.method}
                            </Badge>
                            <Badge variant='outline' className='text-xs'>
                              JSON
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className='mt-3'>
                      {endpoint.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    {/* URL */}
                    <div>
                      <p className='text-sm font-medium mb-2'>Endpoint URL</p>
                      <div className='relative'>
                        <code className='block bg-muted p-3 rounded-lg text-sm break-all'>
                          {endpoint.url}
                        </code>
                        <Button
                          size='sm'
                          variant='ghost'
                          className='absolute right-2 top-2 h-6 w-6 p-0'
                          onClick={() =>
                            copyToClipboard(endpoint.url, endpoint.id)
                          }
                        >
                          {copiedCode === endpoint.id ? (
                            <CheckCircle className='h-3 w-3 text-green-500' />
                          ) : (
                            <Copy className='h-3 w-3' />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Example */}
                    <div>
                      <p className='text-sm font-medium mb-2'>
                        Example Request
                      </p>
                      <code className='block bg-muted p-3 rounded-lg text-sm break-all text-muted-foreground'>
                        {endpoint.example}
                      </code>
                    </div>

                    {/* Features */}
                    <div>
                      <p className='text-sm font-medium mb-2'>Features</p>
                      <div className='flex flex-wrap gap-1'>
                        {endpoint.features.map(feature => (
                          <Badge
                            key={feature}
                            variant='outline'
                            className='text-xs'
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className='flex gap-2 pt-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        className='flex-1'
                        onClick={() => setTestUrl(endpoint.example)}
                      >
                        <Play className='h-3 w-3 mr-1' />
                        Try It
                      </Button>
                      <Button size='sm' variant='outline' asChild>
                        <Link href='/api-docs'>
                          <BookOpen className='h-3 w-3 mr-1' />
                          Docs
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='mb-16'
        >
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold mb-4'>Popular Use Cases</h2>
            <p className='text-muted-foreground'>
              See how developers are using our API in real-world applications
            </p>
          </div>

          <div className='grid lg:grid-cols-2 gap-8'>
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className='flex items-center space-x-3'>
                      <div
                        className={`p-2 rounded-lg bg-${useCase.color}-100 dark:bg-${useCase.color}-900/30`}
                      >
                        <useCase.icon
                          className={`h-5 w-5 text-${useCase.color}-600 dark:text-${useCase.color}-400`}
                        />
                      </div>
                      <div>
                        <CardTitle className='text-lg'>
                          {useCase.title}
                        </CardTitle>
                        <CardDescription>{useCase.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='relative'>
                      <pre className='bg-muted p-4 rounded-lg overflow-x-auto text-sm'>
                        <code>{useCase.code}</code>
                      </pre>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='absolute right-2 top-2'
                        onClick={() =>
                          copyToClipboard(useCase.code, `use-case-${index}`)
                        }
                      >
                        {copiedCode === `use-case-${index}` ? (
                          <CheckCircle className='h-4 w-4 text-green-500' />
                        ) : (
                          <Copy className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integration Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='mb-16'
        >
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <Code2 className='h-5 w-5' />
                <span>Quick Integration Guide</span>
              </CardTitle>
              <CardDescription>
                Get started with the RankedIn API in just a few steps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid md:grid-cols-3 gap-6'>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold'>
                      1
                    </div>
                    <h3 className='font-semibold'>Choose Endpoint</h3>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    Select the API endpoint that matches your needs from our
                    comprehensive list above.
                  </p>
                </div>

                <div className='space-y-3'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold'>
                      2
                    </div>
                    <h3 className='font-semibold'>Make Request</h3>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    Send HTTP requests to our API endpoints. No authentication
                    required for read operations.
                  </p>
                </div>

                <div className='space-y-3'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold'>
                      3
                    </div>
                    <h3 className='font-semibold'>Use Data</h3>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    Process the JSON response and integrate the ranking data
                    into your application.
                  </p>
                </div>
              </div>

              <Separator className='my-6' />

              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <h4 className='font-semibold mb-3 flex items-center space-x-2'>
                    <Zap className='h-4 w-4' />
                    <span>Benefits</span>
                  </h4>
                  <ul className='space-y-2 text-sm'>
                    <li className='flex items-center space-x-2'>
                      <CheckCircle className='h-3 w-3 text-green-500' />
                      <span>No API key required</span>
                    </li>
                    <li className='flex items-center space-x-2'>
                      <CheckCircle className='h-3 w-3 text-green-500' />
                      <span>Real-time data updates</span>
                    </li>
                    <li className='flex items-center space-x-2'>
                      <CheckCircle className='h-3 w-3 text-green-500' />
                      <span>Comprehensive documentation</span>
                    </li>
                    <li className='flex items-center space-x-2'>
                      <CheckCircle className='h-3 w-3 text-green-500' />
                      <span>High availability (99.9% uptime)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className='font-semibold mb-3 flex items-center space-x-2'>
                    <Shield className='h-4 w-4' />
                    <span>Limits & Guidelines</span>
                  </h4>
                  <ul className='space-y-2 text-sm'>
                    <li className='flex items-center space-x-2'>
                      <Clock className='h-3 w-3 text-blue-500' />
                      <span>1000 requests/hour per IP</span>
                    </li>
                    <li className='flex items-center space-x-2'>
                      <Database className='h-3 w-3 text-purple-500' />
                      <span>JSON response format</span>
                    </li>
                    <li className='flex items-center space-x-2'>
                      <Globe className='h-3 w-3 text-green-500' />
                      <span>CORS enabled</span>
                    </li>
                    <li className='flex items-center space-x-2'>
                      <Key className='h-3 w-3 text-orange-500' />
                      <span>Rate limit headers included</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Developer Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className='mb-16'
        >
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold mb-4'>Developer Resources</h2>
            <p className='text-muted-foreground'>
              Everything you need to build amazing applications with our API
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6'>
            <Card className='text-center'>
              <CardContent className='p-6'>
                <BookOpen className='h-12 w-12 mx-auto mb-4 text-primary' />
                <h3 className='font-semibold mb-2'>API Documentation</h3>
                <p className='text-sm text-muted-foreground mb-4'>
                  Comprehensive documentation with examples and best practices
                </p>
                <Button variant='outline' size='sm' asChild>
                  <Link href='/api-docs'>
                    View Docs
                    <ArrowRight className='h-3 w-3 ml-1' />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className='text-center'>
              <CardContent className='p-6'>
                <Terminal className='h-12 w-12 mx-auto mb-4 text-primary' />
                <h3 className='font-semibold mb-2'>Code Examples</h3>
                <p className='text-sm text-muted-foreground mb-4'>
                  Ready-to-use code snippets in multiple programming languages
                </p>
                <Button variant='outline' size='sm' asChild>
                  <a
                    href='https://github.com/rankedin/examples'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    View Examples
                    <ExternalLink className='h-3 w-3 ml-1' />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className='text-center'>
              <CardContent className='p-6'>
                <Sparkles className='h-12 w-12 mx-auto mb-4 text-primary' />
                <h3 className='font-semibold mb-2'>Community</h3>
                <p className='text-sm text-muted-foreground mb-4'>
                  Join our developer community for support and discussions
                </p>
                <Button variant='outline' size='sm' asChild>
                  <a
                    href='https://github.com/rankedin/discussions'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Join Community
                    <ExternalLink className='h-3 w-3 ml-1' />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className='bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20'>
            <CardContent className='p-8 text-center'>
              <h2 className='text-2xl font-bold mb-4'>Ready to Build?</h2>
              <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
                Start integrating RankedIn data into your applications today.
                Build powerful experiences with our comprehensive API.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Button size='lg' asChild>
                  <Link href='/api-docs'>
                    Get Started
                    <ArrowRight className='h-4 w-4 ml-2' />
                  </Link>
                </Button>
                <Button variant='outline' size='lg' asChild>
                  <a
                    href='https://github.com/rankedin'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Download className='h-4 w-4 mr-2' />
                    Download SDK
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
