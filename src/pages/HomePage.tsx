import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, Plus, Gift } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Enhanced Invite-Only Banner with EARLY100 */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Gift size={20} className="text-white" />
                </div>
                <div>
                  <span className="font-bold text-lg">🎉 Early Access Special!</span>
                  <p className="text-green-100 text-sm">Join our exclusive invite-only community</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="bg-white/20 rounded-lg px-4 py-2 border-2 border-white/30">
                  <p className="text-xs text-green-100 mb-1">Use Coupon Code</p>
                  <code className="text-xl font-bold text-white tracking-wider">EARLY100</code>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-green-100">Need an invite code?</p>
                <a 
                  href="mailto:contact@example.com" 
                  className="flex items-center space-x-2 text-white hover:text-green-100 font-medium transition-colors"
                >
                  <Mail size={16} />
                  <span>contact@example.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden text-center space-y-3">
            <div className="flex items-center justify-center space-x-3">
              <Gift size={20} className="text-white" />
              <span className="font-bold text-lg">🎉 Early Access Special!</span>
            </div>
            
            <div className="bg-white/20 rounded-lg px-4 py-3 border-2 border-white/30 inline-block">
              <p className="text-xs text-green-100 mb-1">Use Coupon Code</p>
              <code className="text-xl font-bold text-white tracking-wider">EARLY100</code>
            </div>
            
            <div>
              <p className="text-sm text-green-100 mb-1">Need an invite code?</p>
              <a 
                href="mailto:contact@example.com" 
                className="inline-flex items-center space-x-2 text-white hover:text-green-100 font-medium transition-colors"
              >
                <Mail size={16} />
                <span>contact@example.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Mobile Optimized */}
      <section className="min-h-[calc(100vh-8rem)] flex items-center bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 lg:mb-8 leading-tight">
                Your Resume.{' '}
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  One Link.
                </span>{' '}
                Always Updated.
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 lg:mb-10 leading-relaxed px-4 sm:px-0">
                Create a simple resume page at <span className="font-mono font-semibold text-orange-600 break-all">resumin.link/yourname</span>. 
                Share it anywhere — no PDFs, no attachments, just a clean public link.
              </p>

              {/* Enhanced Invite-Only Notice with EARLY100 */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 sm:p-6 mb-6 lg:mb-8 mx-4 sm:mx-0">
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-3">
                  <Gift size={20} className="text-green-600 flex-shrink-0" />
                  <h3 className="font-semibold text-green-900 text-sm sm:text-base">🎉 Early Access Special</h3>
                </div>
                <div className="text-center lg:text-left mb-4">
                  <div className="bg-white border-2 border-green-300 rounded-lg px-4 py-3 inline-block mb-3">
                    <p className="text-xs text-green-700 mb-1 font-medium">Use Coupon Code</p>
                    <code className="text-2xl font-bold text-green-800 tracking-wider">EARLY100</code>
                  </div>
                </div>
                <p className="text-green-800 text-sm sm:text-base mb-3">
                  Join our exclusive community of professionals with this special early access code.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
                  <span className="text-green-700">Need a different code?</span>
                  <a 
                    href="mailto:contact@example.com" 
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    <Mail size={16} />
                    <span>contact@example.com</span>
                  </a>
                </div>
              </div>

              {/* Mobile Login Button - Only show on mobile */}
              <div className="lg:hidden mb-6 mx-4 sm:mx-0">
                {currentUser ? (
                  <Link
                    to="/dashboard"
                    className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg text-base"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight size={20} className="ml-2" />
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg text-base"
                  >
                    <span>Get Started</span>
                    <ArrowRight size={20} className="ml-2" />
                  </Link>
                )}
              </div>

              {/* Desktop CTA Buttons */}
              <div className="hidden lg:flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                {currentUser ? (
                  <Link
                    to="/dashboard"
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight size={20} />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg flex items-center justify-center space-x-2"
                    >
                      <span>Get Started</span>
                      <ArrowRight size={20} />
                    </Link>
                    <Link
                      to="/pricing"
                      className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
                    >
                      <span>View Pricing</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Additional info - Mobile Optimized */}
              <div className="mt-8 lg:mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-gray-600 px-4 sm:px-0">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm sm:text-base">Early Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm sm:text-base">No Ads</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm sm:text-base">Mobile Friendly</span>
                </div>
              </div>
            </div>
            
            {/* Preview Card - Mobile Optimized */}
            <div className="relative order-1 lg:order-2 px-4 sm:px-0">
              <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300 max-w-sm mx-auto lg:max-w-none">
                <div className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg sm:text-xl">JD</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg sm:text-xl">John Doe</h3>
                      <p className="text-white/90 text-sm sm:text-lg">Software Engineer</p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 bg-white/20 text-white">
                          Available for Work
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="flex flex-wrap gap-2 mt-4 sm:mt-6">
                    <div className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">React</div>
                    <div className="px-3 sm:px-4 py-1 sm:py-2 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">Node.js</div>
                    <div className="px-3 sm:px-4 py-1 sm:py-2 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium">Python</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-6 bg-white rounded-lg shadow-lg p-3 sm:p-4 border max-w-[200px] sm:max-w-none">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-mono font-medium break-all">resumin.link/johndoe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};