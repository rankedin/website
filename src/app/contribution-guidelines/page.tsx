'use client';

import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Code2,
  FileText,
  GitBranch,
  Github,
  GitPullRequest,
  Heart,
  Lightbulb,
  MessageSquare,
  Shield,
  Star,
  Target,
  Trophy,
  Users,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ContributionGuidelinesPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted/20'>
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-12'
        >
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mb-6'>
            <BookOpen className='h-8 w-8 text-primary' />
          </div>
          <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4'>
            Contribution Guidelines
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Help us build the ultimate ranking platform for developers. Your
            contributions make RankedIn better for everyone.
          </p>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='mb-12'
        >
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <Target className='h-5 w-5' />
                <span>Quick Navigation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <a
                  href='#getting-started'
                  className='text-sm text-primary hover:underline'
                >
                  Getting Started
                </a>
                <a
                  href='#submission-rules'
                  className='text-sm text-primary hover:underline'
                >
                  Submission Rules
                </a>
                <a
                  href='#quality-standards'
                  className='text-sm text-primary hover:underline'
                >
                  Quality Standards
                </a>
                <a
                  href='#community-guidelines'
                  className='text-sm text-primary hover:underline'
                >
                  Community Guidelines
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Getting Started */}
            <motion.div
              id='getting-started'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <GitBranch className='h-5 w-5 text-green-500' />
                    <span>Getting Started</span>
                  </CardTitle>
                  <CardDescription>
                    Everything you need to know to make your first contribution
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='space-y-4'>
                    <h3 className='font-semibold text-lg'>How to Contribute</h3>
                    <div className='grid gap-4'>
                      <div className='flex items-start space-x-3'>
                        <CheckCircle className='h-5 w-5 text-green-500 mt-0.5 flex-shrink-0' />
                        <div>
                          <p className='font-medium'>Submit Quality Items</p>
                          <p className='text-sm text-muted-foreground'>
                            Add GitHub users, repositories, or topics that
                            provide value to the developer community
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start space-x-3'>
                        <CheckCircle className='h-5 w-5 text-green-500 mt-0.5 flex-shrink-0' />
                        <div>
                          <p className='font-medium'>Follow Guidelines</p>
                          <p className='text-sm text-muted-foreground'>
                            Ensure your submissions meet our quality standards
                            and community guidelines
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start space-x-3'>
                        <CheckCircle className='h-5 w-5 text-green-500 mt-0.5 flex-shrink-0' />
                        <div>
                          <p className='font-medium'>Engage Respectfully</p>
                          <p className='text-sm text-muted-foreground'>
                            Maintain a positive and constructive environment for
                            all contributors
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className='space-y-4'>
                    <h3 className='font-semibold text-lg'>
                      Contribution Types
                    </h3>
                    <div className='grid gap-3'>
                      <Badge variant='outline' className='justify-start p-3'>
                        <Users className='h-4 w-4 mr-2' />
                        <span className='font-medium'>GitHub Users</span>
                        <span className='ml-auto text-xs text-muted-foreground'>
                          Influential developers
                        </span>
                      </Badge>
                      <Badge variant='outline' className='justify-start p-3'>
                        <Code2 className='h-4 w-4 mr-2' />
                        <span className='font-medium'>Repositories</span>
                        <span className='ml-auto text-xs text-muted-foreground'>
                          High-quality projects
                        </span>
                      </Badge>
                      <Badge variant='outline' className='justify-start p-3'>
                        <Star className='h-4 w-4 mr-2' />
                        <span className='font-medium'>Topics</span>
                        <span className='ml-auto text-xs text-muted-foreground'>
                          Trending technologies
                        </span>
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Submission Rules */}
            <motion.div
              id='submission-rules'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <Shield className='h-5 w-5 text-blue-500' />
                    <span>Submission Rules</span>
                  </CardTitle>
                  <CardDescription>
                    Essential requirements for all contributions
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <Alert>
                    <AlertTriangle className='h-4 w-4' />
                    <AlertDescription>
                      All submissions are reviewed before being added to
                      rankings. Please ensure they meet our quality standards.
                    </AlertDescription>
                  </Alert>

                  <div className='space-y-4'>
                    <h3 className='font-semibold text-lg text-green-600'>
                      ✅ Do
                    </h3>
                    <div className='space-y-3'>
                      <div className='flex items-start space-x-3'>
                        <CheckCircle className='h-4 w-4 text-green-500 mt-0.5 flex-shrink-0' />
                        <p className='text-sm'>
                          Submit active GitHub profiles with recent
                          contributions
                        </p>
                      </div>
                      <div className='flex items-start space-x-3'>
                        <CheckCircle className='h-4 w-4 text-green-500 mt-0.5 flex-shrink-0' />
                        <p className='text-sm'>
                          Add repositories with good documentation and active
                          maintenance
                        </p>
                      </div>
                      <div className='flex items-start space-x-3'>
                        <CheckCircle className='h-4 w-4 text-green-500 mt-0.5 flex-shrink-0' />
                        <p className='text-sm'>
                          Include proper descriptions and reasoning for your
                          submissions
                        </p>
                      </div>
                      <div className='flex items-start space-x-3'>
                        <CheckCircle className='h-4 w-4 text-green-500 mt-0.5 flex-shrink-0' />
                        <p className='text-sm'>
                          Verify that submissions are publicly accessible
                        </p>
                      </div>
                      <div className='flex items-start space-x-3'>
                        <CheckCircle className='h-4 w-4 text-green-500 mt-0.5 flex-shrink-0' />
                        <p className='text-sm'>
                          Choose relevant topics that represent current
                          technologies
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className='space-y-4'>
                    <h3 className='font-semibold text-lg text-red-600'>
                      ❌ Don't
                    </h3>
                    <div className='space-y-3'>
                      <div className='flex items-start space-x-3'>
                        <XCircle className='h-4 w-4 text-red-500 mt-0.5 flex-shrink-0' />
                        <p className='text-sm'>
                          Submit inactive or abandoned profiles/repositories
                        </p>
                      </div>
                      <div className='flex items-start space-x-3'>
                        <XCircle className='h-4 w-4 text-red-500 mt-0.5 flex-shrink-0' />
                        <p className='text-sm'>
                          Add low-quality or spammy content
                        </p>
                      </div>
                      <div className='flex items-start space-x-3'>
                        <XCircle className='h-4 w-4 text-red-500 mt-0.5 flex-shrink-0' />
                        <p className='text-sm'>
                          Submit duplicates or already ranked items
                        </p>
                      </div>
                      <div className='flex items-start space-x-3'>
                        <XCircle className='h-4 w-4 text-red-500 mt-0.5 flex-shrink-0' />
                        <p className='text-sm'>
                          Include personal information or private repositories
                        </p>
                      </div>
                      <div className='flex items-start space-x-3'>
                        <XCircle className='h-4 w-4 text-red-500 mt-0.5 flex-shrink-0' />
                        <p className='text-sm'>
                          Use offensive language or inappropriate content
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quality Standards */}
            <motion.div
              id='quality-standards'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <Trophy className='h-5 w-5 text-yellow-500' />
                    <span>Quality Standards</span>
                  </CardTitle>
                  <CardDescription>
                    Criteria we use to evaluate submissions
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='grid gap-6'>
                    <div className='space-y-3'>
                      <h3 className='font-semibold flex items-center space-x-2'>
                        <Users className='h-4 w-4' />
                        <span>GitHub Users</span>
                      </h3>
                      <ul className='space-y-2 text-sm text-muted-foreground pl-6'>
                        <li>
                          • Active contribution history (commits, PRs, issues)
                        </li>
                        <li>
                          • Quality repositories and meaningful contributions
                        </li>
                        <li>• Positive community engagement</li>
                        <li>• Professional profile with clear bio</li>
                        <li>• Regular activity within the last 6 months</li>
                      </ul>
                    </div>

                    <div className='space-y-3'>
                      <h3 className='font-semibold flex items-center space-x-2'>
                        <Code2 className='h-4 w-4' />
                        <span>Repositories</span>
                      </h3>
                      <ul className='space-y-2 text-sm text-muted-foreground pl-6'>
                        <li>• Well-documented with clear README</li>
                        <li>• Active maintenance and recent updates</li>
                        <li>• Proper license and contribution guidelines</li>
                        <li>• Good code quality and structure</li>
                        <li>• Meaningful project with practical value</li>
                      </ul>
                    </div>

                    <div className='space-y-3'>
                      <h3 className='font-semibold flex items-center space-x-2'>
                        <Star className='h-4 w-4' />
                        <span>Topics</span>
                      </h3>
                      <ul className='space-y-2 text-sm text-muted-foreground pl-6'>
                        <li>• Relevant to current technology trends</li>
                        <li>• Active community and repositories</li>
                        <li>• Clear and specific topic scope</li>
                        <li>• Educational or practical value</li>
                        <li>• Not overly broad or generic</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Community Guidelines */}
            <motion.div
              id='community-guidelines'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <Heart className='h-5 w-5 text-pink-500' />
                    <span>Community Guidelines</span>
                  </CardTitle>
                  <CardDescription>
                    Building a positive and inclusive community
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='space-y-4'>
                    <div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
                      <h3 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
                        Our Values
                      </h3>
                      <p className='text-sm text-blue-800 dark:text-blue-200'>
                        We believe in creating an inclusive environment where
                        developers of all backgrounds can contribute and grow
                        together.
                      </p>
                    </div>

                    <div className='grid gap-4'>
                      <div className='flex items-start space-x-3'>
                        <MessageSquare className='h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0' />
                        <div>
                          <p className='font-medium'>
                            Respectful Communication
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            Use constructive feedback and maintain professional
                            discourse
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start space-x-3'>
                        <Users className='h-5 w-5 text-green-500 mt-0.5 flex-shrink-0' />
                        <div>
                          <p className='font-medium'>Inclusive Environment</p>
                          <p className='text-sm text-muted-foreground'>
                            Welcome contributors from all backgrounds and
                            experience levels
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start space-x-3'>
                        <Lightbulb className='h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0' />
                        <div>
                          <p className='font-medium'>Constructive Feedback</p>
                          <p className='text-sm text-muted-foreground'>
                            Provide helpful suggestions and learn from others
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start space-x-3'>
                        <Shield className='h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0' />
                        <div>
                          <p className='font-medium'>Zero Tolerance</p>
                          <p className='text-sm text-muted-foreground'>
                            No harassment, discrimination, or inappropriate
                            behavior
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <Link href='/contribute'>
                    <Button className='w-full justify-start'>
                      <GitPullRequest className='h-4 w-4 mr-2' />
                      Start Contributing
                    </Button>
                  </Link>
                  <Button
                    variant='outline'
                    className='w-full justify-start'
                    asChild
                  >
                    <a
                      href='https://github.com/rankedin'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Github className='h-4 w-4 mr-2' />
                      View on GitHub
                    </a>
                  </Button>
                  <Button
                    variant='outline'
                    className='w-full justify-start'
                    asChild
                  >
                    <Link href='/api-docs'>
                      <FileText className='h-4 w-4 mr-2' />
                      API Documentation
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Community Stats</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-primary'>
                      1,000+
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      Active Contributors
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-secondary'>
                      50,000+
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      Quality Submissions
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-green-600'>
                      99.5%
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      Approval Rate
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recognition */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Recognition Program</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <Trophy className='h-5 w-5 text-yellow-500' />
                    <div>
                      <p className='font-medium text-sm'>
                        Top Contributor Badge
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        100+ quality submissions
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <Star className='h-5 w-5 text-blue-500' />
                    <div>
                      <p className='font-medium text-sm'>Quality Reviewer</p>
                      <p className='text-xs text-muted-foreground'>
                        High approval rate
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <Heart className='h-5 w-5 text-pink-500' />
                    <div>
                      <p className='font-medium text-sm'>Community Champion</p>
                      <p className='text-xs text-muted-foreground'>
                        Positive engagement
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Need Help */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <p className='text-sm text-muted-foreground'>
                    Have questions about contributing? We're here to help!
                  </p>
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-full'
                    asChild
                  >
                    <a href='mailto:contact@muhammadfiaz.com'>
                      Contact Support
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className='mt-16 text-center'
        >
          <Card className='bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20'>
            <CardContent className='p-8'>
              <h2 className='text-2xl font-bold mb-4'>Ready to Contribute?</h2>
              <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
                Join our community of developers and help build the ultimate
                ranking platform. Your contributions make a difference!
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Button size='lg' asChild>
                  <Link href='/contribute'>
                    Start Contributing Now
                    <ArrowRight className='h-4 w-4 ml-2' />
                  </Link>
                </Button>
                <Button variant='outline' size='lg' asChild>
                  <a
                    href='https://github.com/rankedin'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    View on GitHub
                    <Github className='h-4 w-4 ml-2' />
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
