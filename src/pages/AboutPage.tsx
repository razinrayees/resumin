import React from 'react';
import { Heart, Code, Users, Target, Mail, Github, Twitter } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Resumin
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Making professional resume sharing simple, beautiful, and accessible for everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that everyone deserves a professional online presence. Traditional resumes are static, 
                hard to share, and often get lost in email attachments. Resumin changes that.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With Resumin, you get a beautiful, always-updated resume that lives at your own personal link. 
                Share it anywhere, anytime, and never worry about outdated PDFs again.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target size={16} className="text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Simple & Clean</h3>
                    <p className="text-gray-600 text-sm">No clutter, just your professional story told beautifully</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">For Everyone</h3>
                    <p className="text-gray-600 text-sm">Students, professionals, freelancers - everyone needs this</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">R</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Resumin</h3>
                      <p className="text-gray-600 text-sm">Professional Resume Builder</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">R</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Creator</h2>
              <h3 className="text-xl text-orange-600 font-semibold mb-4">Razin</h3>
            </div>
            
            <div className="prose prose-lg mx-auto text-center">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Hi! I'm Razin, a developer who believes in building tools that make people's lives easier. 
                I created Resumin because I was tired of sending outdated PDF resumes and wanted a better way 
                to share my professional story.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                What started as a personal project has grown into a platform that helps thousands of 
                professionals showcase their skills. I'm passionate about keeping Resumin accessible 
                to everyone with both free and affordable paid options.
              </p>
            </div>
            
            <div className="flex justify-center space-x-6">
              <a href="mailto:admin@resumin.link" className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors">
                <Mail size={20} />
                <span>Email</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors">
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors">
                <Twitter size={20} />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Free & Accessible</h3>
              <p className="text-gray-600">
                Our free version includes all essential features and will always be free. 
                Pro features are affordably priced to support development and hosting costs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Simple & Fast</h3>
              <p className="text-gray-600">
                We focus on what matters - helping you create and share your resume quickly 
                without unnecessary complexity or bloat.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">User-Focused</h3>
              <p className="text-gray-600">
                Every feature we build is designed with real user needs in mind. 
                Your feedback shapes the future of Resumin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Resumin by the Numbers</h2>
            <p className="text-xl text-orange-100">Growing every day, thanks to amazing users like you</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-orange-100">Resumes Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-orange-100">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">99%</div>
              <div className="text-orange-100">Uptime Target</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">0</div>
              <div className="text-orange-100">Ads or Tracking</div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Notice */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">Service Availability Notice</h3>
            <p className="text-yellow-800 text-sm leading-relaxed">
              While we strive to keep Resumin running smoothly and maintain high availability, 
              we cannot guarantee 24/7 operational status. The service may experience downtime 
              for maintenance, updates, or unforeseen issues. In the unlikely event that Resumin 
              needs to be discontinued, we will provide reasonable advance notice to allow users 
              to export their data. We recommend keeping backups of your important resume information.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-xl text-gray-600 mb-8">
            Have questions, suggestions, or just want to say hi? I'd love to hear from you!
          </p>
          <a
            href="mailto:admin@resumin.link"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <Mail size={20} className="mr-2" />
            Send me an email
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};