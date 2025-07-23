import React from 'react';
import { Sparkles, Zap, Crown, Star } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PricingSection } from '../components/ui/pricing-section';

const pricingTiers = [
  {
    name: "Free",
    price: {
      monthly: 0,
      yearly: 0,
    },
    description: "Perfect for getting started with your professional resume",
    icon: (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/30 to-gray-500/30 blur-2xl rounded-full" />
        <Star className="w-7 h-7 relative z-10 text-gray-500 dark:text-gray-400" />
      </div>
    ),
    features: [
      {
        name: "Personal Resume Link",
        description: "Get your own resumin.link/yourname URL",
        included: true,
      },
      {
        name: "Basic Analytics",
        description: "Track profile views and visitor insights",
        included: true,
      },
      {
        name: "Mobile Responsive",
        description: "Perfect display on all devices",
        included: true,
      },
      {
        name: "Custom Themes",
        description: "Choose from 12 beautiful color themes",
        included: true,
      },
      {
        name: "Multiple Layouts",
        description: "6 professional layout options",
        included: true,
      },
      {
        name: "QR Code Generation",
        description: "Share your resume with QR codes",
        included: true,
      },
      {
        name: "Testimonials",
        description: "Collect and display recommendations",
        included: true,
      },
      {
        name: "Priority Support",
        description: "24/7 email support with priority handling",
        included: false,
      },
      {
        name: "Custom Domain",
        description: "Use your own domain (yourname.com)",
        included: false,
      },
      {
        name: "PDF Export",
        description: "Download your resume as a PDF",
        included: false,
      },
    ],
  },
  {
    name: "Pro",
    price: {
      monthly: 19,
      yearly: 199,
    },
    description: "Advanced features for professionals and job seekers",
    highlight: true,
    badge: "Most Popular",
    icon: (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-pink-500/30 blur-2xl rounded-full" />
        <Crown className="w-7 h-7 relative z-10 text-orange-500" />
      </div>
    ),
    features: [
      {
        name: "Everything in Free",
        description: "All free features included",
        included: true,
      },
      {
        name: "Priority Support",
        description: "24/7 email support with priority handling",
        included: true,
      },
      {
        name: "Custom Domain",
        description: "Use your own domain (yourname.com)",
        included: true,
      },
      {
        name: "PDF Export",
        description: "Download your resume as a PDF",
        included: true,
      },
      {
        name: "Advanced Analytics",
        description: "Detailed visitor insights and engagement metrics",
        included: true,
      },
      {
        name: "Custom Branding",
        description: "Remove Resumin branding from your profile",
        included: true,
      },
      {
        name: "Portfolio Integration",
        description: "Showcase your work with integrated portfolio",
        included: true,
      },
      {
        name: "API Access",
        description: "Integrate with other platforms and services",
        included: true,
      },
      {
        name: "Unlimited Testimonials",
        description: "No limits on testimonials and recommendations",
        included: true,
      },
      {
        name: "Early Access",
        description: "Get new features before everyone else",
        included: true,
      },
    ],
  },
];

export const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Choose Your Perfect{' '}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Plan
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Start free and upgrade when you need more features. No hidden fees, cancel anytime.
          </p>
          <div className="flex items-center justify-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Free Forever Plan</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">No Setup Fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection tiers={pricingTiers} className="bg-gray-50" />

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about Resumin pricing</p>
          </div>
          
          <div className="grid gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Is the free plan really free forever?</h3>
              <p className="text-gray-600">
                Yes! Our free plan includes all the essential features you need to create a professional resume. 
                You can use it forever without any time limits or hidden fees.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I upgrade or downgrade anytime?</h3>
              <p className="text-gray-600">
                Absolutely! You can upgrade to Pro anytime to unlock advanced features, or downgrade back to 
                the free plan. Your data and resume will always be preserved.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and various local payment methods depending on your region. 
                All payments are processed securely through Stripe.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you offer refunds?</h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee for all Pro subscriptions. If you're not satisfied, 
                contact us within 30 days for a full refund.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I use my own domain?</h3>
              <p className="text-gray-600">
                With the Pro plan, you can connect your own custom domain (like yourname.com) to your resume. 
                We'll provide step-by-step instructions to set it up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of professionals who use Resumin to showcase their skills
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg"
            >
              Start Free Today
            </a>
            <a
              href="/features"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-orange-600 transition-all"
            >
              View All Features
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};