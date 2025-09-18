import { Clock, Database, FileText, Mail, Shield, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Shield className="w-4 h-4 mr-2" />
              Privacy & Data Protection
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Quick Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Quick Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                RankedIn respects your privacy and is committed to protecting
                your personal data. This privacy policy explains how we collect,
                use, and safeguard your information when you use our GitHub
                ranking platform.
              </p>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">GitHub Data</h4>
                  <p className="text-muted-foreground mb-2">
                    We collect publicly available GitHub data including:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>
                      User profiles, follower counts, and repository information
                    </li>
                    <li>Repository statistics (stars, forks, languages)</li>
                    <li>Topic trends and popularity metrics</li>
                    <li>Public contribution data and activity</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Usage Data</h4>
                  <p className="text-muted-foreground mb-2">
                    We automatically collect information about how you use our
                    service:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Pages visited and features used</li>
                    <li>Search queries and ranking interactions</li>
                    <li>Device information and browser type</li>
                    <li>IP address and general location</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide and maintain our ranking services</li>
                  <li>
                    Generate accurate GitHub user, repository, and topic
                    rankings
                  </li>
                  <li>Improve our platform and user experience</li>
                  <li>Analyze trends and usage patterns</li>
                  <li>Communicate updates and respond to inquiries</li>
                  <li>Ensure platform security and prevent abuse</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Data Protection & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Security Measures</h4>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Encrypted data transmission using HTTPS</li>
                    <li>Secure database storage with access controls</li>
                    <li>Regular security audits and updates</li>
                    <li>Limited access to personal data</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Data Retention</h4>
                  <p className="text-muted-foreground">
                    We retain your data only as long as necessary to provide our
                    services and comply with legal obligations. GitHub data is
                    updated regularly to ensure accuracy.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">GitHub API</h4>
                    <p className="text-muted-foreground">
                      We use GitHub's public API to collect repository and user
                      data. This data is publicly available and subject to
                      GitHub's terms of service.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Analytics</h4>
                    <p className="text-muted-foreground">
                      We may use analytics services to understand how our
                      platform is used. These services collect aggregated,
                      non-personally identifiable information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  You have the following rights regarding your personal data:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Right to access your personal data</li>
                  <li>Right to correct inaccurate data</li>
                  <li>Right to request data deletion</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We use cookies to enhance your browsing experience:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>
                    <strong>Essential Cookies:</strong> Required for basic site
                    functionality
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Help us understand site
                    usage
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> Remember your settings
                    and preferences
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  You can manage your cookie preferences through your browser
                  settings or our cookie consent banner.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have questions about this privacy policy or how we
                  handle your data, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong>Email:</strong> contact@muhammadfiaz.com
                  </p>
                  <p>
                    <strong>GitHub:</strong> https://github.com/rankedin
                  </p>
                  <p>
                    <strong>Response Time:</strong> We aim to respond within 48
                    hours
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Policy Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may update this privacy policy from time to time. Any
                  changes will be posted on this page with an updated "Last
                  updated" date. We encourage you to review this policy
                  periodically to stay informed about how we protect your
                  information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
