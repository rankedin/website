import {
  AlertTriangle,
  Code,
  ExternalLink,
  FileText,
  Mail,
  Scale,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-muted/30 to-background'>
      <div className='container mx-auto px-4 py-20'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-12'>
            <Badge variant='outline' className='mb-4'>
              <Scale className='w-4 h-4 mr-2' />
              Legal Terms
            </Badge>
            <h1 className='text-4xl font-bold mb-4'>Terms of Service</h1>
            <p className='text-lg text-muted-foreground'>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Agreement Notice */}
          <Card className='mb-8 border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50'>
            <CardHeader>
              <CardTitle className='flex items-center text-blue-700 dark:text-blue-300'>
                <FileText className='w-5 h-5 mr-2' />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-blue-700 dark:text-blue-300'>
                By accessing and using RankedIn, you agree to be bound by these
                Terms of Service and our Privacy Policy. If you do not agree to
                these terms, please do not use our service.
              </p>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className='space-y-8'>
            <Card>
              <CardHeader>
                <CardTitle>1. Service Description</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p className='text-muted-foreground'>
                  RankedIn is a platform that provides rankings and analytics
                  for GitHub users, repositories, and topics based on publicly
                  available data.
                </p>

                <div>
                  <h4 className='font-semibold mb-2'>Our Services Include:</h4>
                  <ul className='list-disc pl-6 text-muted-foreground space-y-1'>
                    <li>
                      GitHub user rankings based on followers, contributions,
                      and activity
                    </li>
                    <li>
                      Repository rankings based on stars, forks, and trends
                    </li>
                    <li>Topic and technology trend analysis</li>
                    <li>Search and discovery tools for developers</li>
                    <li>API access for developers to integrate rankings</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Acceptable Use</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <h4 className='font-semibold mb-2'>You May:</h4>
                  <ul className='list-disc pl-6 text-muted-foreground space-y-1'>
                    <li>
                      Use our platform for legitimate research and discovery
                    </li>
                    <li>Share rankings and data with proper attribution</li>
                    <li>Integrate our API into your applications</li>
                    <li>Contribute feedback and suggestions</li>
                  </ul>
                </div>

                <div>
                  <h4 className='font-semibold mb-2'>You May Not:</h4>
                  <ul className='list-disc pl-6 text-muted-foreground space-y-1'>
                    <li>Abuse our API with excessive requests or scraping</li>
                    <li>Attempt to manipulate rankings or game the system</li>
                    <li>Use our service for illegal or harmful activities</li>
                    <li>Reverse engineer or copy our algorithms</li>
                    <li>
                      Violate GitHub's terms of service through our platform
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Code className='w-5 h-5 mr-2' />
                  3. API Usage Terms
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <h4 className='font-semibold mb-2'>Rate Limits</h4>
                  <ul className='list-disc pl-6 text-muted-foreground space-y-1'>
                    <li>Free tier: 1,000 requests per hour</li>
                    <li>Authenticated users: 5,000 requests per hour</li>
                    <li>Commercial use may require special licensing</li>
                  </ul>
                </div>

                <div>
                  <h4 className='font-semibold mb-2'>
                    Attribution Requirements
                  </h4>
                  <p className='text-muted-foreground'>
                    When using our data or API, please include attribution to
                    RankedIn with a link to our platform.
                  </p>
                </div>

                <div>
                  <h4 className='font-semibold mb-2'>Commercial Use</h4>
                  <p className='text-muted-foreground'>
                    Commercial applications require prior approval. Contact us
                    for enterprise licensing options.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Data and Content</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <h4 className='font-semibold mb-2'>GitHub Data</h4>
                  <p className='text-muted-foreground'>
                    All GitHub data displayed on our platform is publicly
                    available and sourced through GitHub's official API. We do
                    not claim ownership of this data.
                  </p>
                </div>

                <div>
                  <h4 className='font-semibold mb-2'>Rankings and Analytics</h4>
                  <p className='text-muted-foreground'>
                    Our rankings, scores, and analytics are proprietary
                    calculations based on public data. These rankings are for
                    informational purposes and should not be considered
                    definitive measures of quality or value.
                  </p>
                </div>

                <div>
                  <h4 className='font-semibold mb-2'>Data Accuracy</h4>
                  <p className='text-muted-foreground'>
                    While we strive for accuracy, we cannot guarantee that all
                    data is current or error-free. Data is updated regularly but
                    may not reflect real-time changes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <h4 className='font-semibold mb-2'>Our Property</h4>
                  <ul className='list-disc pl-6 text-muted-foreground space-y-1'>
                    <li>RankedIn platform design and functionality</li>
                    <li>Ranking algorithms and methodologies</li>
                    <li>Original content and documentation</li>
                    <li>Trademarks and brand assets</li>
                  </ul>
                </div>

                <div>
                  <h4 className='font-semibold mb-2'>Third-Party Content</h4>
                  <p className='text-muted-foreground'>
                    GitHub data and user-generated content remain the property
                    of their respective owners. We respect all intellectual
                    property rights.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <AlertTriangle className='w-5 h-5 mr-2' />
                  6. Disclaimers and Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <h4 className='font-semibold mb-2'>Service Availability</h4>
                  <p className='text-muted-foreground'>
                    We provide our service "as is" without warranties. We do not
                    guarantee continuous availability and may experience
                    downtime for maintenance or technical issues.
                  </p>
                </div>

                <div>
                  <h4 className='font-semibold mb-2'>
                    Limitation of Liability
                  </h4>
                  <p className='text-muted-foreground'>
                    RankedIn shall not be liable for any indirect, incidental,
                    special, or consequential damages arising from your use of
                    our service.
                  </p>
                </div>

                <div>
                  <h4 className='font-semibold mb-2'>
                    Third-Party Dependencies
                  </h4>
                  <p className='text-muted-foreground'>
                    Our service depends on GitHub's API and other third-party
                    services. We are not responsible for their availability or
                    changes to their terms of service.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Privacy and Data Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground mb-4'>
                  Your privacy is important to us. Our data collection and usage
                  practices are detailed in our Privacy Policy.
                </p>
                <Link href='/privacy'>
                  <Button variant='outline' className='group'>
                    Read Privacy Policy
                    <ExternalLink className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Termination</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  We reserve the right to terminate or suspend access to our
                  service at any time for violations of these terms or for any
                  other reason. You may also discontinue using our service at
                  any time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  We may update these terms from time to time. Changes will be
                  posted on this page with an updated date. Continued use of our
                  service after changes constitutes acceptance of the new terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Mail className='w-5 h-5 mr-2' />
                  10. Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground mb-4'>
                  If you have questions about these terms or need to report
                  violations:
                </p>
                <div className='space-y-2 text-muted-foreground'>
                  <p>
                    <strong>Email:</strong> contact@muhammadfiaz.com
                  </p>
                  <p>
                    <strong>GitHub:</strong> https://github.com/rankedin
                  </p>
                  <p>
                    <strong>Business Address:</strong> To be provided upon
                    request
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className='flex flex-col sm:flex-row gap-4 pt-8'>
              <Link href='/privacy' className='flex-1'>
                <Button variant='outline' className='w-full'>
                  Privacy Policy
                </Button>
              </Link>
              <Link href='/contribution-guidelines' className='flex-1'>
                <Button variant='outline' className='w-full'>
                  Contribution Guidelines
                </Button>
              </Link>
              <Link href='/api-docs' className='flex-1'>
                <Button variant='outline' className='w-full'>
                  API Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
