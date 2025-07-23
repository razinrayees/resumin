# Contributing to Resumin

Thank you for your interest in contributing to Resumin! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A Firebase project (for testing)
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/razinrayees/resumin.git
   cd resumin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Fill in your Firebase configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📋 How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/razinrayees/resumin/issues)
2. If not, create a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and device information

### Suggesting Features

1. Check [existing feature requests](https://github.com/razinrayees/resumin/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
2. Create a new issue with:
   - Clear description of the feature
   - Use case and benefits
   - Possible implementation approach
   - Mockups or examples if helpful

### Code Contributions

1. **Find an issue to work on**
   - Look for issues labeled `good first issue` for beginners
   - Comment on the issue to let others know you're working on it

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation if needed

4. **Test your changes**
   ```bash
   npm run lint
   npm run test
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

6. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible
- Use meaningful variable and function names

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Handle loading and error states

### Styling

- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use semantic HTML elements

### File Organization

- Keep files under 300 lines
- Use clear, descriptive file names
- Group related functionality
- Follow the existing folder structure

## 🧪 Testing

- Write tests for new features
- Ensure existing tests pass
- Test on multiple browsers and devices
- Test both mobile and desktop views

## 📚 Documentation

- Update README.md for new features
- Add JSDoc comments for complex functions
- Update type definitions
- Include examples in documentation

## 🔍 Code Review Process

1. All contributions require code review
2. Maintainers will review PRs within 48 hours
3. Address feedback promptly
4. Ensure CI checks pass
5. Squash commits before merging

## 🏷️ Commit Message Format

Use conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(auth): add Google OAuth integration
fix(dashboard): resolve profile loading issue
docs(readme): update installation instructions
```

## 🚫 What Not to Contribute

- Breaking changes without discussion
- Features that significantly increase bundle size
- Code that doesn't follow our style guidelines
- Contributions without proper testing
- Plagiarized or copyrighted content

## 📞 Getting Help

- 💬 [GitHub Discussions](https://github.com/razinrayees/resumin/discussions)
- 📧 Email: admin@resumin.link
- 🐛 [Issues](https://github.com/razinrayees/resumin/issues)

## 🎉 Recognition

Contributors will be:
- Listed in our README
- Mentioned in release notes
- Invited to our contributors Discord
- Eligible for contributor swag

## 📄 License

By contributing to Resumin, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Resumin!** 🙏

*Made with ❤️ by Razin Rayees*