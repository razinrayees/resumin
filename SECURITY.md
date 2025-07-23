# Security Policy

## Supported Versions

We actively support the following versions of Resumin:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 🔒 Private Disclosure

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please send an email to: **security@example.com**

Include the following information:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes (if you have them)

### 📋 What to Expect

1. **Acknowledgment**: We'll acknowledge receipt within 24 hours
2. **Investigation**: We'll investigate and validate the issue within 72 hours
3. **Fix**: We'll work on a fix and keep you updated on progress
4. **Disclosure**: We'll coordinate public disclosure after the fix is deployed

### 🏆 Recognition

We believe in recognizing security researchers who help keep Resumin secure:

- Public acknowledgment (if desired)
- Hall of fame listing
- Swag for significant findings

## Security Best Practices

### For Users

- Use strong, unique passwords
- Enable two-factor authentication when available
- Keep your browser updated
- Be cautious with public WiFi when accessing your account
- Log out when using shared computers

### For Developers

- Keep dependencies updated
- Follow secure coding practices
- Use environment variables for sensitive data
- Implement proper input validation
- Use HTTPS in production
- Regular security audits

## Common Security Considerations

### Data Protection

- All data is encrypted in transit and at rest
- We use Firebase's security rules for data access control
- Personal information is only accessible to the account owner
- We don't store payment information (handled by Stripe)

### Authentication

- Secure password requirements
- OAuth integration with Google and GitHub
- Session management with automatic timeouts
- Protection against brute force attacks

### Infrastructure

- Regular security updates
- Monitoring and alerting
- Backup and disaster recovery
- Access controls and audit logs

## Vulnerability Categories

We're particularly interested in reports about:

- Authentication bypass
- Authorization flaws
- Data exposure
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- SQL injection
- Server-side request forgery (SSRF)
- Remote code execution

## Out of Scope

The following are generally out of scope:
- Social engineering attacks
- Physical attacks
- Denial of service attacks
- Issues in third-party services (report to them directly)
- Self-XSS that requires user interaction

## Legal

We will not pursue legal action against researchers who:
- Follow responsible disclosure practices
- Don't access or modify user data beyond what's necessary to demonstrate the vulnerability
- Don't perform attacks that could harm users or degrade service
- Don't violate any laws

Thank you for helping keep Resumin secure! 🔒