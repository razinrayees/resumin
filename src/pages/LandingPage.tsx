import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Link as LinkIcon, 
  Smartphone, 
  Shield, 
  Edit3, 
  Eye, 
  Users,
  GraduationCap,
  Code,
  PenTool,
  BookOpen,
  Briefcase,
  Heart,
  Mail,
  Twitter,
  Github,
  Chrome,
  Monitor,
  Zap,
  Globe,
  Lock
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, loginWithGoogle } = useAuth();

  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Resumin</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Resume.{' '}
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  One Link.
                </span>{' '}
                Always Updated.
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Create a simple resume page at <span className="font-mono font-semibold text-orange-600">resumin.link/yourname</span>. 
                Share it anywhere — no PDFs, no attachments, just a clean public link.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleGetStarted}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Create Your Resume Link</span>
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={handleGoogleSignIn}
                  className="px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
                >
                  <Chrome size={20} />
                  <span>Sign in with Google</span>
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">JD</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">John Doe</h3>
                      <p className="text-white/90">Software Engineer</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="flex space-x-2 mt-4">
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">React</div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Node.js</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 border">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Globe size={16} />
                  <span className="font-mono">resumin.link/johndoe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get your professional resume online in minutes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Edit3 size={32} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fill Your Resume Info</h3>
              <p className="text-gray-600">Add your experience, skills, education, and projects with our simple form</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <LinkIcon size={32} className="text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Your Link</h3>
              <p className="text-gray-600">Choose your username and get a clean link like <span className="font-mono text-orange-600">resumin.link/yourname</span></p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Share It Anywhere</h3>
              <p className="text-gray-600">Share your link on social media, email signatures, or business cards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Use Resumin?</h2>
            <p className="text-xl text-gray-600">Everything you need for a professional online presence</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <LinkIcon size={24} className="text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Link</h3>
              <p className="text-gray-600">Get a memorable link like resumin.link/yourname that's easy to share</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Monitor size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clean, Modern Design</h3>
              <p className="text-gray-600">Beautiful, professional layouts that look perfect on mobile & desktop</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy Controls</h3>
              <p className="text-gray-600">Choose what to show or hide, make your profile public or private</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Edit3 size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy to Edit</h3>
              <p className="text-gray-600">Update your resume anytime - changes appear instantly on your link</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone size={24} className="text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Optimized</h3>
              <p className="text-gray-600">Looks perfect on all devices - phones, tablets, and desktops</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Eye size={24} className="text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Login Required</h3>
              <p className="text-gray-600">Anyone can view your resume link without creating an account</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for Everyone</h2>
            <p className="text-xl text-gray-600 mb-8">If you need a simple, shareable online identity — this is for you.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={32} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🎓 Students</h3>
              <p className="text-gray-600 text-sm">Showcase your projects and internships</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🧑‍💻 Developers</h3>
              <p className="text-gray-600 text-sm">Display your coding skills and portfolio</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PenTool size={32} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">✍️ Freelancers</h3>
              <p className="text-gray-600 text-sm">Share your services and client work</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={32} className="text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🧑‍🏫 Teachers</h3>
              <p className="text-gray-600 text-sm">Highlight your education and experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase size={32} className="text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🧳 Job Seekers</h3>
              <p className="text-gray-600 text-sm">Stand out with a professional link</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Love it? Help keep it alive.</h2>
            <p className="text-lg text-gray-600 mb-6">
              This tool is completely free and ad-free. If you find it helpful, consider donating to support hosting and domain costs.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <p className="text-gray-700 mb-4">
                <strong>Contact for donations:</strong>
              </p>
              <div className="flex items-center justify-center space-x-2 text-orange-600">
                <Mail size={20} />
                <span className="font-semibold">admin@resumin.link</span>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "Even ₹10 helps. No pressure, but your support helps keep this tool fast and accessible to all."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Start Creating Your Resume Now</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of professionals who trust Resumin for their online presence</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Create My Resume</span>
              <ArrowRight size={20} />
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center space-x-2"
            >
              <Chrome size={20} />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-white">R</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Resumin</span>
              </div>
              <p className="text-gray-600 mb-4">
                Create beautiful, professional resume pages and share them with a simple link. 
                Build your professional presence with Resumin.
              </p>
              <p className="text-gray-500 text-sm">
                Made with 💙 by Razin Rayees
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/login" className="hover:text-orange-600 transition-colors">Sign In</Link></li>
                <li><Link to="/login" className="hover:text-orange-600 transition-colors">Create Account</Link></li>
                <li><a href="#features" className="hover:text-orange-600 transition-colors">Features</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="mailto:admin@resumin.link" className="hover:text-orange-600 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 Resumin. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};