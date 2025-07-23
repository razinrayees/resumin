# Deployment Guide

This guide covers different deployment options for Resumin.

## 🚀 Quick Deploy Options

### Netlify (Recommended)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/razinrayees/resumin)

1. Click the deploy button above
2. Connect your GitHub account
3. Configure environment variables
4. Deploy!

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/razinrayees/resumin)

1. Click the deploy button above
2. Import your repository
3. Add environment variables
4. Deploy!

## 🔧 Manual Deployment

### Prerequisites

- Node.js 18+
- Firebase project
- Environment variables configured

### Build Process

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Fill in your configuration
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Test the build locally**
   ```bash
   npm run preview
   ```

### Deployment Platforms

#### Netlify

1. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment variables**
   Add all variables from `.env.example`

3. **Deploy**
   ```bash
   # Using Netlify CLI
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

#### Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

#### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

3. **Deploy**
   ```bash
   firebase deploy
   ```

#### GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

## 🔐 Environment Variables

Required environment variables for deployment:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Optional: GitHub Integration
VITE_GITHUB_TOKEN=your-github-token
```

## 🔍 Post-Deployment Checklist

- [ ] All environment variables are set
- [ ] Firebase authentication is working
- [ ] Database connections are successful
- [ ] All routes are accessible
- [ ] Mobile responsiveness is working
- [ ] Performance is optimized
- [ ] SEO meta tags are correct
- [ ] Analytics are tracking (if enabled)

## 🐛 Troubleshooting

### Common Issues

1. **Build fails**
   - Check Node.js version (18+ required)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Firebase connection issues**
   - Verify environment variables
   - Check Firebase project settings
   - Ensure authentication is enabled

3. **Routing issues**
   - Configure redirects for SPA
   - Check build output directory

### Platform-Specific Solutions

#### Netlify
- Add `_redirects` file for SPA routing:
  ```
  /*    /index.html   200
  ```

#### Vercel
- Add `vercel.json` configuration:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```

## 📊 Performance Optimization

1. **Bundle Analysis**
   ```bash
   npm run build -- --analyze
   ```

2. **Optimize Images**
   - Use WebP format when possible
   - Implement lazy loading
   - Compress images

3. **Code Splitting**
   - Already implemented with React.lazy()
   - Consider further splitting large components

4. **Caching**
   - Configure proper cache headers
   - Use CDN for static assets

## 🔒 Security Considerations

- Never commit `.env` files
- Use environment variables for all secrets
- Enable HTTPS in production
- Configure proper CORS settings
- Implement rate limiting if needed

## 📈 Monitoring

Consider adding:
- Error tracking (Sentry)
- Performance monitoring
- User analytics
- Uptime monitoring

---

For more help, check our [Contributing Guide](CONTRIBUTING.md) or open an issue.