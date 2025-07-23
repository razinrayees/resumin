import React from 'react';
import { Heart, Mail, Coffee, Star, Users, Server } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const DonatePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart size={40} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Love it? Help keep it alive.</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Resumin is completely free and ad-free. If you find it helpful, consider donating to support hosting and domain costs.
          </p>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Your Support Matters</h2>
            <p className="text-lg text-gray-600">Every donation helps keep Resumin free and accessible for everyone</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Server size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Server Costs</h3>
              <p className="text-gray-600">Hosting and database costs to keep your resumes online 24/7</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">New Features</h3>
              <p className="text-gray-600">Development time for new templates, themes, and improvements</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free for All</h3>
              <p className="text-gray-600">Keeping Resumin completely free without ads or premium tiers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Support Resumin</h2>
              <p className="text-lg text-gray-600">Choose any amount that feels right for you</p>
            </div>

            {/* Suggested Amounts */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="border-2 border-gray-200 rounded-xl p-4 text-center hover:border-orange-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-center mb-2">
                  <Coffee size={20} className="text-orange-600 mr-2" />
                  <span className="text-lg font-semibold">₹10</span>
                </div>
                <p className="text-sm text-gray-600">Buy me a tea</p>
              </div>

              <div className="border-2 border-gray-200 rounded-xl p-4 text-center hover:border-orange-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-center mb-2">
                  <Coffee size={20} className="text-orange-600 mr-2" />
                  <span className="text-lg font-semibold">₹50</span>
                </div>
                <p className="text-sm text-gray-600">Buy me a coffee</p>
              </div>

              <div className="border-2 border-orange-500 bg-orange-50 rounded-xl p-4 text-center cursor-pointer">
                <div className="flex items-center justify-center mb-2">
                  <Heart size={20} className="text-orange-600 mr-2" />
                  <span className="text-lg font-semibold">₹100</span>
                </div>
                <p className="text-sm text-orange-600 font-medium">Most popular</p>
              </div>

              <div className="border-2 border-gray-200 rounded-xl p-4 text-center hover:border-orange-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-center mb-2">
                  <Star size={20} className="text-orange-600 mr-2" />
                  <span className="text-lg font-semibold">₹500</span>
                </div>
                <p className="text-sm text-gray-600">Super supporter</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact for Donations</h3>
              <div className="flex items-center justify-center space-x-2 text-orange-600 mb-4">
                <Mail size={20} />
                <span className="font-semibold text-lg">admin@resumin.link</span>
              </div>
              <p className="text-gray-600 mb-4">
                Send me an email with your preferred donation method (UPI, PayPal, etc.) and I'll provide the details.
              </p>
              <p className="text-sm text-gray-500 italic">
                "Even ₹10 helps. No pressure, but your support helps keep this tool fast and accessible to all."
              </p>
            </div>

            {/* Alternative Support */}
            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Ways to Support</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Share with Friends</h4>
                  <p className="text-blue-700 text-sm">Tell others about Resumin and help grow our community</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Provide Feedback</h4>
                  <p className="text-green-700 text-sm">Send suggestions and bug reports to help improve Resumin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You! 🙏</h2>
          <p className="text-lg text-gray-600 mb-8">
            Your support means the world to me and helps keep Resumin free for everyone. 
            Every contribution, no matter the size, makes a real difference.
          </p>
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-6 text-white">
            <p className="text-lg font-medium">
              "Building tools that help people showcase their potential is my passion. 
              Your support allows me to keep doing what I love while keeping Resumin accessible to all."
            </p>
            <p className="mt-4 text-orange-100">— Razin Rayees</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};