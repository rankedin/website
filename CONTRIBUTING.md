# Contributing to RankedIn

Thank you for your interest in contributing to RankedIn! We welcome contributions from developers of all skill levels. This guide will help you get started with contributing to our GitHub rankings platform.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)
- [Community](#community)

## Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm or yarn** - Package manager
- **Git** - Version control system
- **GitHub Account** - For contributing to the repository

### Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/website.git
   cd website
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```
5. **Start the development server**:
   ```bash
   npm run dev
   ```

## Development Setup

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="your-xata-database-url"

# GitHub API
GITHUB_TOKEN="your-github-personal-access-token"

# Site Configuration
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### Database Setup

1. **Push the database schema**:
   ```bash
   npx prisma db push
   ```

2. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   ├── hooks/            # Custom React hooks
│   └── store/            # State management
├── components/            # Shared components
│   ├── ui/               # Shadcn/UI components
│   └── ...               # Feature components
├── lib/                  # Shared utilities
├── hooks/                # Custom hooks
└── store/                # Zustand stores
```

### Key Directories

- **`/src/app`** - Next.js 15 App Router pages and API routes
- **`/src/components`** - Reusable React components
- **`/src/lib`** - Utility functions and configurations
- **`/src/hooks`** - Custom React hooks
- **`/src/store`** - Zustand state management

## Development Guidelines

### Code Style

We use ESLint and TypeScript for code quality. Follow these guidelines:

- **TypeScript**: Use strict type checking
- **ESLint**: Follow the configured rules
- **Prettier**: Code formatting is handled automatically
- **Imports**: Use absolute imports with `@/` prefix

### Component Guidelines

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow the component naming convention
- Use Shadcn/UI components when possible
- Implement proper error boundaries

### API Guidelines

- Use proper HTTP status codes
- Implement proper error handling
- Validate input data
- Document API endpoints
- Follow RESTful conventions

### Git Guidelines

- Write clear, descriptive commit messages
- Use conventional commit format
- Keep commits focused and atomic
- Squash related commits when appropriate

### Commit Convention

```
type(scope): description

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Code style changes
- refactor: Code refactoring
- test: Testing
- chore: Maintenance
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Testing Guidelines

- Write tests for new features
- Maintain test coverage above 80%
- Use descriptive test names
- Test both happy path and error scenarios
- Mock external API calls

### Test Structure

```
__tests__/
├── components/     # Component tests
├── pages/         # Page tests
├── api/           # API route tests
├── lib/           # Utility tests
└── hooks/         # Hook tests
```

## Submitting Changes

### Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request**:
   - Go to the original repository
   - Click "New Pull Request"
   - Select your feature branch
   - Fill out the PR template

### PR Guidelines

- Provide a clear description of changes
- Reference related issues
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation if needed

### PR Review Process

1. Automated checks (CI/CD)
2. Code review by maintainers
3. Testing and validation
4. Merge approval

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to reproduce**: Step-by-step instructions
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: Browser, OS, Node version
- **Screenshots**: If applicable

### Feature Requests

For feature requests, please include:

- **Description**: What feature you'd like to see
- **Use case**: Why this feature would be useful
- **Implementation ideas**: If you have any suggestions
- **Mockups**: If applicable

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `documentation` - Documentation improvements
- `help wanted` - Good for newcomers
- `good first issue` - Beginner-friendly issues

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General discussions and Q&A
- **Discord**: Real-time chat and community support

### Getting Help

- Check existing issues and documentation first
- Search GitHub Discussions for similar questions
- Join our Discord community for real-time help

### Recognition

Contributors are recognized through:

- GitHub contributor statistics
- Mention in release notes
- Special contributor badges
- Community shoutouts

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/UI Documentation](https://ui.shadcn.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [GitHub API Documentation](https://docs.github.com/en/rest)

## License

By contributing to RankedIn, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to RankedIn! Your efforts help make this platform better for the entire GitHub community. 🚀

For questions, reach out to us at [contact@muhammadfiaz.com](mailto:contact@muhammadfiaz.com)</content>
<parameter name="filePath">e:\Projects\rank\CONTRIBUTING.md