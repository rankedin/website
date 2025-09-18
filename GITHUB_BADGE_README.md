# GitHub Ranking Badge Demo

This README demonstrates how to use the GitHub Ranking Badges API in your projects.

## Badge Styles

We offer multiple badge styles to match your README theme:

### Default Style (Modern Dark)

![Default Badge](http://localhost:3000/api/badges?username=muhammad-fiaz&style=default)

```markdown
![GitHub Rank](https://yourdomain.com/api/badges?username=yourusername&style=default)
```

### Flat Style

![Flat Badge](http://localhost:3000/api/badges?username=muhammad-fiaz&style=flat)

```markdown
![GitHub Rank](https://yourdomain.com/api/badges?username=yourusername&style=flat)
```

### Plastic Style

![Plastic Badge](http://localhost:3000/api/badges?username=muhammad-fiaz&style=plastic)

```markdown
![GitHub Rank](https://yourdomain.com/api/badges?username=yourusername&style=plastic)
```

## My GitHub Ranking

![My GitHub Ranking](http://localhost:3000/api/badges?username=muhammad-fiaz)

## How to Use

Replace `yourusername` with your actual GitHub username:

```markdown
![My GitHub Ranking](https://yourdomain.com/api/badges?username=yourusername)
```

## Features

- ✅ **Real-time Rankings** - Automatically updated based on total stars
- ✅ **Beautiful Design** - Modern gradient badge with clean typography
- ✅ **Multiple Styles** - Choose from default, flat, or plastic styles
- ✅ **Fast Loading** - Cached for optimal performance
- ✅ **Cross-platform** - Works on GitHub, GitLab, and other platforms

## API Options

### SVG Badge (Default)

```markdown
![GitHub Ranking](https://yourdomain.com/api/badges?username=yourusername)
```

### JSON API

```markdown
https://yourdomain.com/api/badges?username=yourusername&format=json
```

### Alternative Parameter

```markdown
![GitHub Ranking](https://yourdomain.com/api/badges?name=yourusername)
```

## Badge Information

The badge displays:

- **Rank**: Your current position (e.g., #1)
- **Username**: Your GitHub username
- **Stars**: Total stars across all repositories
- **Percentile**: What percentage of developers you're ranked above

## Example Badge Data

For user `muhammad-fiaz`:

- **Rank**: #1
- **Total Stars**: 451 ⭐
- **Percentile**: Top 100%
- **Followers**: 66
- **Public Repos**: 130

## Integration Examples

### In Markdown

```markdown
## My GitHub Stats

![GitHub Ranking](https://yourdomain.com/api/badges?username=yourusername)

### Current Ranking

- **Rank**: #1
- **Total Stars**: 451 ⭐
- **Percentile**: Top 100%
```

### In HTML

```html
<img
  src="https://yourdomain.com/api/badges?username=yourusername"
  alt="GitHub Ranking Badge"
  height="28"
/>
```

## Troubleshooting

### Badge Not Showing?

1. Make sure the username exists in our database
2. Check that the domain is accessible
3. Verify the URL format is correct

### User Not Found?

If you get a "User not found" error:

1. Visit our website
2. Search for your username
3. The user will be automatically added to rankings

## Support

For issues or questions about the badges API, please check our documentation or contact support.
