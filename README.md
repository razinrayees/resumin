# Resumin - Professional Resume Builder

A modern, responsive resume builder that creates beautiful, shareable resume pages with personalized links.

![Resumin Screenshot](https://via.placeholder.com/800x400/f97316/ffffff?text=Resumin+Resume+Builder)

## ✨ Features

- **Personal Links**: Get a memorable link like `resumin.link/yourname`
- **Multiple Layouts**: Choose from 6 professional layout styles
- **Custom Themes**: 12 beautiful color themes to match your brand
- **Mobile Responsive**: Perfect display on all devices
- **Privacy Controls**: Public/private profiles with granular visibility settings
- **Analytics Dashboard**: Track profile views and visitor insights
- **QR Code Generation**: Share your resume instantly
- **Testimonials**: Collect and display recommendations
- **Real-time Updates**: Changes appear instantly on your public link

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Functions)
- **Deployment**: Vite build system
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**
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
   ```
   
   Fill in your Firebase configuration and other required variables.

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google providers
3. Create a Firestore database
4. Copy your Firebase config to `.env` file

### GitHub Integration (Optional)

For profile picture uploads, set up a GitHub repository:

1. Create a GitHub personal access token with `repo` scope
2. Add the token to your `.env` file as `VITE_GITHUB_TOKEN`
3. Update the repository details in `src/lib/github.ts`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, Theme)
├── hooks/              # Custom React hooks
├── lib/                # External service configurations
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── index.css          # Global styles
```

## 🎨 Customization

### Adding New Themes

1. Add your theme to the themes array in `src/components/ThemeSelector.tsx`
2. Define the gradient classes in `src/components/LivePreview.tsx`

### Creating New Layouts

1. Add layout configuration to `LAYOUT_PRESETS` in `src/types/user.ts`
2. Implement the layout logic in `src/components/CustomizableResumePreview.tsx`

### Custom Components

All components are modular and can be easily customized. Key components:

- `LivePreview.tsx` - Main resume display component
- `AnalyticsDashboard.tsx` - Analytics and insights
- `ProfilePictureUpload.tsx` - Image upload handling
- `QRCodeGenerator.tsx` - QR code generation

## 🔒 Privacy & Security

- User data is encrypted and stored securely in Firebase
- Privacy controls allow users to make profiles public or private
- No tracking or analytics on user data
- GDPR compliant data handling

## 📱 Responsive Design

Resumin is built mobile-first with responsive breakpoints:

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Netlify (Recommended)

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify

### Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize and deploy:
   ```bash
   firebase init hosting
   npm run build
   firebase deploy
   ```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Firebase](https://firebase.google.com/) - Backend services
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide](https://lucide.dev/) - Icons
- [Framer Motion](https://www.framer.com/motion/) - Animations

## 📞 Support

- 📧 Email: support@resumin.link
- 🐛 Issues: [GitHub Issues](https://github.com/razinrayees/resumin/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/razinrayees/resumin/discussions)

## 🗺️ Roadmap

- [ ] PDF Export functionality
- [ ] Custom domain support
- [ ] API for third-party integrations
- [ ] Advanced analytics
- [ ] Team collaboration features
- [ ] Resume templates marketplace

---

**Made with ❤️ by Razin Rayees**

⭐ Star this repository if you find it helpful!
