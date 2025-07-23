import React from 'react';
import { 
  Link as LinkIcon, 
  Monitor, 
  Shield, 
  Edit3, 
  Smartphone, 
  Eye, 
  Palette, 
  Download, 
  Share2, 
  Zap,
  Globe,
  Lock,
  Users,
  BarChart3,
  MessageCircle,
  Star,
  QrCode,
  Layers,
  Wifi,
  Layout,
  Grid,
  Columns,
  Sidebar,
  Crown,
  CreditCard,
  Gift
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: LinkIcon,
      title: "Personal Link",
      description: "Get a memorable link like resumin.link/yourname that's easy to share and remember",
      color: "orange"
    },
    {
      icon: Monitor,
      title: "Clean, Modern Design",
      description: "Beautiful, professional layouts that look perfect on mobile & desktop",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Privacy Controls",
      description: "Choose what to show or hide, make your profile public or private",
      color: "green"
    },
    {
      icon: Edit3,
      title: "Easy to Edit",
      description: "Update your resume anytime - changes appear instantly on your link",
      color: "purple"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Looks perfect on all devices - phones, tablets, and desktops",
      color: "pink"
    },
    {
      icon: Eye,
      title: "No Login Required",
      description: "Anyone can view your resume link without creating an account",
      color: "indigo"
    },
    {
      icon: Layout,
      title: "Multiple Layouts",
      description: "Choose from 6 different layout styles to match your profession and style",
      color: "teal"
    },
    {
      icon: Palette,
      title: "Custom Themes",
      description: "Choose from beautiful color themes to match your personal brand",
      color: "teal"
    },
    {
      icon: Zap,
      title: "Instant Updates",
      description: "Changes to your resume appear immediately on your public link",
      color: "yellow"
    },
    {
      icon: MessageCircle,
      title: "Testimonials",
      description: "Collect and display testimonials from colleagues and clients",
      color: "emerald"
    },
    {
      icon: QrCode,
      title: "QR Code Sharing",
      description: "Generate QR codes to share your resume instantly at networking events",
      color: "violet"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track views, visitor locations, device types, and engagement metrics",
      color: "blue"
    },
    {
      icon: Globe,
      title: "SEO Friendly",
      description: "Your resume is optimized for search engines and social sharing",
      color: "cyan"
    }
  ];

  const layoutFeatures = [
    {
      icon: Layout,
      name: "Professional",
      description: "Clean two-column layout perfect for corporate roles",
      structure: "Two Column",
      color: "blue"
    },
    {
      icon: Grid,
      name: "Creative",
      description: "Modern single-column layout for designers and creatives",
      structure: "Single Column",
      color: "purple"
    },
    {
      icon: Columns,
      name: "Developer",
      description: "Tech-focused layout highlighting projects and skills",
      structure: "Sidebar Left",
      color: "green"
    },
    {
      icon: Sidebar,
      name: "Minimal",
      description: "Clean and simple layout with all essential information",
      structure: "Single Column",
      color: "orange"
    },
    {
      icon: Monitor,
      name: "Executive",
      description: "Sophisticated layout for senior professionals",
      structure: "Sidebar Right",
      color: "indigo"
    },
    {
      icon: Grid,
      name: "Modern",
      description: "Contemporary three-column layout with balanced sections",
      structure: "Three Column",
      color: "pink"
    }
  ];

  const pricingFeatures = [
    {
      icon: Star,
      title: "Free Forever",
      description: "All essential features included in our free plan - lifetime free",
      plan: "Free",
      color: "green"
    },
    {
      icon: Crown,
      title: "Pro Features",
      description: "Advanced analytics, custom domain, PDF export, and priority support",
      plan: "Pro - ₹199/year",
      color: "orange"
    },
    {
      icon: CreditCard,
      title: "Simple Pricing",
      description: "No hidden fees, cancel anytime, 30-day money-back guarantee",
      plan: "Transparent",
      color: "blue"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      orange: "bg-orange-100 text-orange-600",
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      pink: "bg-pink-100 text-pink-600",
      indigo: "bg-indigo-100 text-indigo-600",
      teal: "bg-teal-100 text-teal-600",
      yellow: "bg-yellow-100 text-yellow-600",
      emerald: "bg-emerald-100 text-emerald-600",
      violet: "bg-violet-100 text-violet-600",
      cyan: "bg-cyan-100 text-cyan-600"
    };
    return colors[color as keyof typeof colors] || colors.orange;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Everything You Need for a{' '}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Professional Resume
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Resumin provides all the tools you need to create, customize, and share your professional resume online.
          </p>
        </div>
      </section>

      {/* Early Access Coupon Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 lg:p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift size={32} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🎉 Early Access Special</h2>
            <p className="text-lg text-gray-600 mb-6">
              Join our exclusive community of early users and get started with Resumin today!
            </p>
            <div className="bg-white rounded-2xl p-6 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Use Coupon Code</h3>
              <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 mb-4">
                <code className="text-2xl font-bold text-green-800">EARLY100</code>
              </div>
              <p className="text-sm text-gray-600">
                Use this code during signup to join our invite-only platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Affordable Pricing</h2>
            <p className="text-xl text-gray-600">Start free and upgrade when you need more features</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {pricingFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow text-center">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto ${getColorClasses(feature.color)}`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 mb-2 font-medium">{feature.plan}</p>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <a
              href="/pricing"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <CreditCard size={20} className="mr-2" />
              View Detailed Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Layout Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Multiple Layout Options</h2>
            <p className="text-xl text-gray-600">Choose from 6 different layout styles to match your profession and personal brand</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {layoutFeatures.map((layout, index) => {
              const IconComponent = layout.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(layout.color)}`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{layout.name}</h3>
                  <p className="text-sm text-gray-500 mb-2 font-medium">{layout.structure}</p>
                  <p className="text-gray-600">{layout.description}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Layout size={32} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fully Customizable</h3>
              <p className="text-lg text-gray-600 mb-6">
                Each layout is fully customizable. Change section order, visibility, spacing, and display styles to create your perfect resume.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Section Control</h4>
                  <p className="text-sm text-gray-600">Show/hide sections and reorder them to highlight what matters most</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Display Styles</h4>
                  <p className="text-sm text-gray-600">Choose how skills, projects, and experience are displayed</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Spacing Options</h4>
                  <p className="text-sm text-gray-600">Adjust spacing between sections for compact or spacious layouts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to create and share your professional resume</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(feature.color)}`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get your professional resume online in just 3 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fill Your Resume Info</h3>
              <p className="text-gray-600">Add your experience, skills, education, and projects using our intuitive form builder</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-pink-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Layout & Theme</h3>
              <p className="text-gray-600">Select from 6 layout styles and 12 color themes to match your personal brand</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Share Your Link</h3>
              <p className="text-gray-600">Get your personalized link and share it anywhere - social media, email, business cards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Feature Highlight */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <BarChart3 size={32} className="text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Track Your Impact</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Get detailed insights into who's viewing your resume and how they're engaging with your content. 
                  Make data-driven decisions to optimize your professional presence.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Real-time view tracking and visitor analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Geographic insights and device breakdown</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Click-through tracking for contact methods</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Weekly trends and engagement patterns</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Total Views</h4>
                      <p className="text-2xl font-bold text-blue-600">1,247</p>
                    </div>
                    <div className="text-green-600 text-sm font-medium">+12%</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">This Week</h4>
                      <p className="text-2xl font-bold text-green-600">89</p>
                    </div>
                    <div className="text-green-600 text-sm font-medium">+24%</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Top Countries</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>United States</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>India</span>
                        <span className="font-medium">23%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Canada</span>
                        <span className="font-medium">12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Feature Highlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <MessageCircle size={32} className="text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Collect Testimonials</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Build credibility with testimonials from colleagues, clients, and managers. 
                  Visitors can submit testimonials directly on your profile, and you control what gets published.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700">Easy submission form for visitors</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700">Approval system - you control what's published</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700">Star ratings and detailed feedback</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700">Integrated directly into your resume</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="space-y-4">
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Sarah Johnson</h4>
                        <p className="text-xs text-gray-600">Senior Manager at TechCorp</p>
                        <div className="flex items-center mt-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} size={12} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs leading-relaxed">
                      "Exceptional developer with strong problem-solving skills. Delivered projects on time and exceeded expectations."
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Mike Chen</h4>
                        <p className="text-xs text-gray-600">Lead Designer</p>
                        <div className="flex items-center mt-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} size={12} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs leading-relaxed">
                      "Great collaboration skills and attention to detail. A pleasure to work with on complex projects."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-xl text-gray-600">Exciting features we're working on</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF Export</h3>
              <p className="text-gray-600">Download your resume as a beautiful PDF for job applications</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Layers size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Domains</h3>
              <p className="text-gray-600">Use your own domain name for your resume (yourname.com)</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Wifi size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">API Integration</h3>
              <p className="text-gray-600">Connect your resume with other platforms and services</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Your Resume?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of professionals who use Resumin to showcase their skills
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/login"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg"
            >
              Get Started for Free
              <LinkIcon size={20} className="ml-2" />
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-orange-600 transition-all"
            >
              View Pricing
              <CreditCard size={20} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};