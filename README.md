<div align="center">

# RankedIn
### GitHub Rankings Platform

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/rankedin/website)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/github/license/rankedin/website)](https://github.com/rankedin/website/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/rankedin/website/pulls)
[![GitHub stars](https://img.shields.io/github/stars/rankedin/website.svg)](https://github.com/rankedin/website/stargazers)
[![Netlify Status](https://api.netlify.com/api/v1/badges/45cfaa41-43e8-46ec-a36a-2e51994c2d08/deploy-status)](https://app.netlify.com/projects/rankedin/deploys)

</div>

A comprehensive full-stack SaaS website for discovering and ranking GitHub users, repositories, and topics. Built with modern web technologies and designed for optimal performance and user experience.

## 🚀 Features

### Core Functionality

- **GitHub Rankings**: Comprehensive ranking system for users, repositories, and topics
- **Search & Discovery**: Advanced search capabilities with real-time GitHub API integration
- **Contribution System**: Easy-to-use interface for adding GitHub entities to rankings
- **Responsive Design**: Fully responsive across all device sizes

### Technical Features

- **Dark/Light Theme**: System-aware theme toggle with persistent storage
- **Real-time Data**: Live GitHub API integration with caching
- **SEO Optimized**: Dynamic metadata, sitemap, and Open Graph support
- **Performance**: Skeleton loading states and optimized animations
- **Error Handling**: Comprehensive error boundaries and user feedback

## 🛠️ Technology Stack

### Frontend

- **Next.js 15.5.3** - App Router with TypeScript
- **Tailwind CSS v4** - Utility-first styling
- **Shadcn/UI** - Component library
- **Framer Motion** - Smooth animations
- **Zustand** - State management

### Backend

- **Prisma ORM** - Database modeling and queries
- **Xata** - PostgreSQL cloud database
- **GitHub Octokit** - GitHub API integration
- **Sonner** - Toast notifications

### Development

- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Turbopack** - Fast bundling

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   │   ├── search/         # GitHub search endpoint
│   │   ├── users/          # User management
│   │   ├── repositories/   # Repository management
│   │   └── topics/         # Topic management
│   ├── users/ranking/      # User rankings page
│   ├── repos/ranking/      # Repository rankings page
│   ├── topics/ranking/     # Topic rankings page
│   ├── search/             # Search results page
│   ├── contribute/         # Contribution page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── error.tsx           # Error boundary
│   ├── loading.tsx         # Loading page
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # SEO sitemap
│   └── robots.ts           # SEO robots.txt
├── components/
│   ├── ui/                 # Shadcn components
│   ├── hero-section.tsx    # Homepage hero
│   ├── navbar.tsx          # Navigation
│   ├── footer.tsx          # Footer
│   ├── theme-provider.tsx  # Theme context
│   ├── theme-toggle.tsx    # Theme switcher
│   └── skeletons.tsx       # Loading skeletons
├── lib/
│   ├── prisma.ts           # Database client
│   ├── github.ts           # GitHub API client
│   └── utils.ts            # Utilities
├── hooks/
│   └── use-mobile.ts       # Mobile detection
└── store/
    └── theme.ts            # Theme state
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- GitHub Personal Access Token
- Xata account and database

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd rank
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**
   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="your-xata-database-url"

   # GitHub API
   GITHUB_TOKEN="your-github-personal-access-token"

   # Site URL (for production)
   NEXT_PUBLIC_BASE_URL="https://your-domain.com"
   ```

4. **Database setup**

   ```bash
   npx prisma db push
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Database Schema

### User Model

- Basic profile information (username, name, bio, location, company)
- Ranking metrics (followers, following, public repos, total stars)
- GitHub metadata (ID, avatar URL, blog)

### Repository Model

- Repository details (name, description, language, topics)
- Ranking metrics (stars, forks, watchers, size)
- Owner information and GitHub metadata

### Topic Model

- Topic information (name, display name, description)
- Ranking metrics (score, repository count)
- GitHub metadata and timestamps

## 🎯 Key Pages

### Rankings

- **User Rankings** (`/users/ranking`) - Top GitHub users by followers and contributions
- **Repository Rankings** (`/repos/ranking`) - Most starred and trending repositories
- **Topic Rankings** (`/topics/ranking`) - Popular programming topics and technologies

### Discovery

- **Search** (`/search`) - Real-time GitHub search with add-to-ranking functionality
- **Contribute** (`/contribute`) - Bulk addition of GitHub entities via URLs or names

## 🎨 Design System

### Theme Support

- Light and dark themes with system preference detection
- Persistent theme selection using Zustand
- Smooth transitions between themes

### Components

- Consistent design language using Shadcn/UI
- Accessibility-first component design
- Responsive breakpoints for all screen sizes

### Animations

- Smooth page transitions with Framer Motion
- Skeleton loading states for better UX
- Micro-interactions for enhanced engagement

## 🔧 API Endpoints

### GitHub Integration

- `GET /api/search` - Search GitHub users, repositories, and topics
- `POST /api/users` - Add/update user in rankings
- `POST /api/repositories` - Add/update repository in rankings
- `POST /api/topics` - Add/update topic in rankings

### Data Management

- Automatic GitHub data fetching and synchronization
- Duplicate detection and data merging
- Error handling for API rate limits

## 🏆 GitHub Ranking Badges

Show off your GitHub ranking with beautiful, dynamic badges in your README files! Our badges API generates SVG badges that display your current ranking position, total stars, and percentile.

### Features

- **Real-time Rankings** - Automatically updated based on total stars
- **Multiple Styles** - Choose from default, flat, or plastic badge styles
- **Cross-platform** - Works on GitHub, GitLab, and other platforms
- **Fast Loading** - Cached for optimal performance
- **Customizable** - Different styles to match your README theme

### Quick Usage

```markdown
![GitHub Rank](https://yourdomain.com/api/badges?username=yourusername)
```

### Available Styles

- **Default** (Modern Dark): `?style=default`
- **Flat**: `?style=flat`
- **Plastic**: `?style=plastic`

### Badge Information

Each badge displays:

- **Rank**: Your current position (e.g., #42)
- **Username**: Your GitHub username
- **Stars**: Total stars across all repositories
- **Percentile**: Top X% ranking

### 📖 Detailed Documentation

For complete setup instructions, examples, and troubleshooting, check out our comprehensive [GitHub Badges Guide](GITHUB_BADGE_README.md).

## 📈 SEO Features

### Metadata

- Dynamic page titles and descriptions
- Open Graph tags for social sharing
- Twitter Card support

### Technical SEO

- Automatic sitemap generation
- Robots.txt configuration
- Structured data for search engines

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Manual Deployment

```bash
npm run build
npm start
```

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guide](CONTRIBUTING.md) for detailed information on:

- Development setup and guidelines
- Code style and standards
- Testing requirements
- Pull request process
- Issue reporting

### Quick Start

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Open a Pull Request

For questions, reach out to us at [contact@muhammadfiaz.com](mailto:contact@muhammadfiaz.com)

## 📝 License

This project is licensed under the Apache License 2.0 - check the [LICENSE file](LICENSE) for details.

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for comprehensive GitHub data
- [Shadcn/UI](https://ui.shadcn.com/) for beautiful React components
- [Xata](https://xata.io/) for serverless PostgreSQL database
- [Next.js](https://nextjs.org/) for the amazing React framework

## 📧 Support

For support, email [contact@muhammadfiaz.com](mailto:contact@muhammadfiaz.com) or open an issue on GitHub.

---

Built with ❤️ for the GitHub community
