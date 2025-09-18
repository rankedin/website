"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Braces,
  CheckCircle,
  Clock,
  Code2,
  Copy,
  ExternalLink,
  GitBranch,
  Globe,
  Hash,
  Key,
  Search,
  Settings,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ApiDocumentationPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const endpoints = [
    {
      id: "users",
      method: "GET",
      path: "/api/users",
      title: "Get Users Ranking",
      description: "Retrieve paginated list of ranked GitHub users",
      icon: Users,
      color: "blue",
    },
    {
      id: "repos",
      method: "GET",
      path: "/api/repositories",
      title: "Get Repositories Ranking",
      description: "Retrieve paginated list of ranked GitHub repositories",
      icon: GitBranch,
      color: "green",
    },
    {
      id: "topics",
      method: "GET",
      path: "/api/topics",
      title: "Get Topics Ranking",
      description: "Retrieve paginated list of ranked GitHub topics",
      icon: Hash,
      color: "purple",
    },
    {
      id: "contribute",
      method: "POST",
      path: "/api/contribute",
      title: "Add to Ranking",
      description: "Submit new users, repositories, or topics to rankings",
      icon: Star,
      color: "yellow",
    },
    {
      id: "search",
      method: "GET",
      path: "/api/search",
      title: "Search Rankings",
      description: "Search across all rankings with filters",
      icon: Search,
      color: "indigo",
    },
    {
      id: "stats",
      method: "GET",
      path: "/api/stats",
      title: "Get Statistics",
      description: "Retrieve platform statistics and metrics",
      icon: BarChart3,
      color: "orange",
    },
  ]

  const codeExamples = {
    javascript: {
      users: `// Get top 50 users
const response = await fetch('${process.env.NEXT_PUBLIC_SITE_URL || "https://rankedin.netlify.app"}/api/users?limit=50&page=1');
const data = await response.json();

console.log(data.users); // Array of user objects
console.log(data.pagination); // Pagination info`,
      repos: `// Get repositories with filters
const response = await fetch('${process.env.NEXT_PUBLIC_SITE_URL || "https://rankedin.netlify.app"}/api/repositories?language=javascript&limit=20');
const data = await response.json();

data.repositories.forEach(repo => {
  console.log(\`\${repo.name}: \${repo.stars} stars\`);
});`,
      topics: `// Get trending topics
const response = await fetch('${process.env.NEXT_PUBLIC_SITE_URL || "https://rankedin.netlify.app"}/api/topics?featured=true');
const data = await response.json();

console.log(data.topics);`,
      contribute: `// Add a repository to ranking
const response = await fetch('${process.env.NEXT_PUBLIC_SITE_URL || "https://rankedin.netlify.app"}/api/contribute', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: 'repository',
    url: 'https://github.com/facebook/react',
    reason: 'Popular React library'
  })
});

const result = await response.json();
console.log(\`Added at rank #\${result.rank}\`);`,
    },
    python: {
      users: `import requests

# Get top 50 users
response = requests.get('${process.env.NEXT_PUBLIC_SITE_URL || "https://rankedin.netlify.app"}/api/users?limit=50&page=1')
data = response.json()

print(f"Total users: {data['pagination']['total']}")
for user in data['users']:
    print(f"{user['username']}: {user['followers']} followers")`,
      repos: `import requests

# Get repositories with filters
response = requests.get('${process.env.NEXT_PUBLIC_SITE_URL || "https://rankedin.netlify.app"}/api/repositories?language=python&limit=20')
data = response.json()

for repo in data['repositories']:
    print(f"{repo['name']}: {repo['stars']} stars")`,
      topics: `import requests

# Get trending topics
response = requests.get('${process.env.NEXT_PUBLIC_SITE_URL || "https://rankedin.netlify.app"}/api/topics?featured=true')
data = response.json()

for topic in data['topics']:
    print(f"#{topic['name']}: {topic['repositories']} repositories")`,
      contribute: `import requests

# Add a user to ranking
payload = {
    'type': 'user',
    'url': 'https://github.com/torvalds',
    'reason': 'Creator of Linux and Git'
}

response = requests.post('${process.env.NEXT_PUBLIC_SITE_URL || "https://rankedin.netlify.app"}/api/contribute', json=payload)
result = response.json()

print(f"Added at rank #{result['rank']}")`,
    },
    curl: {
      users: `# Get top 50 users
curl -X GET "${process.env.NEXT_PUBLIC_SITE_URL || "https://rankedin.netlify.app"}/api/users?limit=50&page=1" \\
     -H "Accept: application/json"`,
      repos: `# Get repositories with filters
curl -X GET "${process.env.NEXT_PUBLIC_SITE_URL || "https://rankedin.netlify.app"}/api/repositories?language=javascript&limit=20" \\
     -H "Accept: application/json"`,
      topics: `# Get trending topics
curl -X GET "${process.env.NEXT_PUBLIC_SITE_URL || "https://rankedin.netlify.app"}/api/topics?featured=true" \\
     -H "Accept: application/json"`,
      contribute: `# Add a topic to ranking
curl -X POST "${process.env.NEXT_PUBLIC_SITE_URL || "https://rankedin.netlify.app"}/api/contribute" \\
     -H "Content-Type: application/json" \\
     -d '{
       "type": "topic",
       "url": "https://github.com/topics/artificial-intelligence",
       "reason": "Growing AI community"
     }'`,
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mb-6">
            <Code2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4">
            API Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Integrate RankedIn data into your applications with our powerful
            REST API. Get access to rankings, statistics, and real-time data.
          </p>
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-900 dark:text-blue-100">
                <Zap className="h-5 w-5" />
                <span>Quick Start</span>
              </CardTitle>
              <CardDescription className="text-blue-700 dark:text-blue-300">
                Get started with the RankedIn API in minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Base URL
                  </h3>
                  <div className="relative">
                    <code className="block bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 p-3 rounded-lg text-sm">
                      {process.env.NEXT_PUBLIC_SITE_URL ||
                        "https://rankedin.netlify.app"}
                      /api
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-2 top-2 h-6 w-6 p-0"
                      onClick={() =>
                        copyToClipboard(
                          `${process.env.NEXT_PUBLIC_SITE_URL || "https://rankedin.netlify.app"}/api`,
                          "base-url",
                        )
                      }
                    >
                      {copiedCode === "base-url" ? (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Authentication
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                  >
                    <Globe className="h-3 w-3 mr-1" />
                    No API key required
                  </Badge>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    All endpoints are publicly accessible
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Endpoints</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {endpoints.map((endpoint) => (
                    <a
                      key={endpoint.id}
                      href={`#${endpoint.id}`}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
                    >
                      <Badge
                        variant={
                          endpoint.method === "GET" ? "secondary" : "default"
                        }
                        className="text-xs w-12 justify-center"
                      >
                        {endpoint.method}
                      </Badge>
                      <span className="truncate">{endpoint.title}</span>
                    </a>
                  ))}
                  <Separator className="my-4" />
                  <a
                    href="#rate-limits"
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
                  >
                    <Clock className="h-4 w-4" />
                    <span>Rate Limits</span>
                  </a>
                  <a
                    href="#errors"
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Error Codes</span>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Endpoints */}
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.id}
                id={endpoint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg bg-${endpoint.color}-100 dark:bg-${endpoint.color}-900/30`}
                        >
                          <endpoint.icon
                            className={`h-5 w-5 text-${endpoint.color}-600 dark:text-${endpoint.color}-400`}
                          />
                        </div>
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{endpoint.title}</span>
                            <Badge
                              variant={
                                endpoint.method === "GET"
                                  ? "secondary"
                                  : "default"
                              }
                            >
                              {endpoint.method}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            {endpoint.description}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Badge variant="outline" className="font-mono">
                          {endpoint.method}
                        </Badge>
                        <code className="bg-muted px-2 py-1 rounded text-sm">
                          {endpoint.path}
                        </code>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="javascript" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="python">Python</TabsTrigger>
                        <TabsTrigger value="curl">cURL</TabsTrigger>
                      </TabsList>

                      {Object.entries(codeExamples).map(([lang, examples]) => (
                        <TabsContent key={lang} value={lang} className="mt-4">
                          {examples[endpoint.id as keyof typeof examples] && (
                            <div className="relative">
                              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                                <code>
                                  {
                                    examples[
                                      endpoint.id as keyof typeof examples
                                    ]
                                  }
                                </code>
                              </pre>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="absolute right-2 top-2"
                                onClick={() =>
                                  copyToClipboard(
                                    examples[
                                      endpoint.id as keyof typeof examples
                                    ] || "",
                                    `${endpoint.id}-${lang}`,
                                  )
                                }
                              >
                                {copiedCode === `${endpoint.id}-${lang}` ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          )}
                        </TabsContent>
                      ))}
                    </Tabs>

                    {/* Response Example */}
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3 flex items-center space-x-2">
                        <Braces className="h-4 w-4" />
                        <span>Response Example</span>
                      </h4>
                      <div className="bg-muted p-4 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
                          <code>
                            {endpoint.id === "users" &&
                              `{
  "users": [
    {
      "id": "1",
      "username": "torvalds",
      "name": "Linus Torvalds",
      "bio": "Creator of Linux",
      "followers": 150000,
      "following": 0,
      "public_repos": 6,
      "location": "Portland, OR",
      "blog": "https://torvalds-family.blogspot.com/",
      "score": 99.8,
      "rank": 1
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50000,
    "totalPages": 2500
  }
}`}
                            {endpoint.id === "repos" &&
                              `{
  "repositories": [
    {
      "id": "1",
      "name": "react",
      "full_name": "facebook/react",
      "description": "A declarative...",
      "stars": 220000,
      "forks": 45000,
      "language": "JavaScript",
      "topics": ["ui", "react", "frontend"],
      "score": 98.5,
      "rank": 1
    }
  ],
  "pagination": { ... }
}`}
                            {endpoint.id === "topics" &&
                              `{
  "topics": [
    {
      "id": "1",
      "name": "javascript",
      "displayName": "JavaScript",
      "description": "Programming language",
      "featured": true,
      "repositories": 2500000,
      "score": 95.2,
      "rank": 1
    }
  ],
  "pagination": { ... }
}`}
                            {endpoint.id === "contribute" &&
                              `{
  "success": true,
  "message": "Successfully added to ranking",
  "data": {
    "type": "repository",
    "name": "facebook/react",
    "rank": 1,
    "score": 98.5
  }
}`}
                          </code>
                        </pre>
                      </div>
                    </div>

                    {/* Parameters */}
                    {(endpoint.id === "users" ||
                      endpoint.id === "repos" ||
                      endpoint.id === "topics") && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3 flex items-center space-x-2">
                          <Settings className="h-4 w-4" />
                          <span>Query Parameters</span>
                        </h4>
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="font-medium">Parameter</div>
                            <div className="font-medium">Type</div>
                            <div className="font-medium">Description</div>
                          </div>
                          <Separator />
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <code>page</code>
                            <span className="text-muted-foreground">
                              integer
                            </span>
                            <span>Page number (default: 1)</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <code>limit</code>
                            <span className="text-muted-foreground">
                              integer
                            </span>
                            <span>Items per page (max: 100)</span>
                          </div>
                          {endpoint.id === "repos" && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <code>language</code>
                              <span className="text-muted-foreground">
                                string
                              </span>
                              <span>Filter by programming language</span>
                            </div>
                          )}
                          {endpoint.id === "topics" && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <code>featured</code>
                              <span className="text-muted-foreground">
                                boolean
                              </span>
                              <span>Show only featured topics</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Rate Limits */}
            <motion.div
              id="rate-limits"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Rate Limits</span>
                  </CardTitle>
                  <CardDescription>
                    API usage limits and best practices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Current Limits</h4>
                        <ul className="space-y-2 text-sm">
                          <li>
                            • <strong>1000 requests/hour</strong> per IP address
                          </li>
                          <li>
                            • <strong>100 requests/minute</strong> per IP
                            address
                          </li>
                          <li>
                            • <strong>No authentication required</strong> for
                            read operations
                          </li>
                          <li>
                            • <strong>Rate limiting headers</strong> included in
                            responses
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Best Practices</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Cache responses when possible</li>
                          <li>• Use pagination for large datasets</li>
                          <li>• Implement exponential backoff</li>
                          <li>• Monitor rate limit headers</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Alert className="mt-6">
                    <Key className="h-4 w-4" />
                    <AlertDescription>
                      Need higher rate limits? Contact us at{" "}
                      <strong>contact@muhammadfiaz.com</strong> for enterprise
                      access.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </motion.div>

            {/* Error Codes */}
            <motion.div
              id="errors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Error Codes</span>
                  </CardTitle>
                  <CardDescription>
                    Common error responses and solutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-center space-x-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <Badge variant="destructive">400</Badge>
                        <div>
                          <p className="font-medium">Bad Request</p>
                          <p className="text-sm text-muted-foreground">
                            Invalid parameters or malformed request
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <Badge
                          variant="outline"
                          className="bg-yellow-100 text-yellow-800"
                        >
                          429
                        </Badge>
                        <div>
                          <p className="font-medium">Too Many Requests</p>
                          <p className="text-sm text-muted-foreground">
                            Rate limit exceeded, please wait
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <Badge variant="destructive">500</Badge>
                        <div>
                          <p className="font-medium">Internal Server Error</p>
                          <p className="text-sm text-muted-foreground">
                            Something went wrong on our end
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="mt-16"
            >
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Have questions about the API? Check out our examples, join
                    our community, or contact our support team.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                      <Link href="/api-examples">
                        View Examples
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a
                        href="https://github.com/rankedin"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
