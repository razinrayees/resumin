import React from 'react';
import { Shield, Eye, Lock, Database, Mail } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield size={32} className="text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: December 2024
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-3 flex items-center">
              <Eye size={20} className="mr-2" />
              The Simple Version
            </h2>
            <p className="text-blue-800 mb-0">
              We collect only what's necessary to provide Resumin's service. We don't sell your data, 
              show ads, or track you across the web. Your resume information is yours, and you control 
              who sees it.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Database size={24} className="mr-3 text-orange-600" />
              What Information We Collect
            </h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Information</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Email address (for account creation and communication)</li>
              <li>Name (as provided by you or your Google account)</li>
              <li>Profile picture (if using Google Sign-In)</li>
              <li>Payment information (for Pro subscriptions, processed securely through Stripe)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Resume Information</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Personal details (name, title, bio, contact information)</li>
              <li>Professional experience and education</li>
              <li>Skills, projects, and achievements</li>
              <li>Social media links and portfolio URLs</li>
              <li>Privacy settings and theme preferences</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Information</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>IP address and browser information (for security and analytics)</li>
              <li>Usage patterns (to improve our service)</li>
              <li>Error logs (to fix bugs and improve performance)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock size={24} className="mr-3 text-green-600" />
              How We Use Your Information
            </h2>
            
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>To provide the service:</strong> Creating and hosting your resume page</li>
              <li><strong>To process payments:</strong> Managing Pro subscriptions and billing</li>
              <li><strong>To communicate with you:</strong> Important updates, support responses</li>
              <li><strong>To improve Resumin:</strong> Understanding how features are used</li>
              <li><strong>To ensure security:</strong> Preventing abuse and protecting accounts</li>
            </ul>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800 mb-0">
                <strong>We will never:</strong> Sell your data, show you ads, or share your information 
                with third parties for marketing purposes.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Plans and Data</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Free Plan</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Free forever with all essential features</li>
              <li>Same privacy protections as Pro users</li>
              <li>Your data is never used to subsidize the free service</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Pro Plan</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Additional features like custom domains and PDF export</li>
              <li>Payment processing handled securely by Stripe</li>
              <li>We don't store your payment details on our servers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Controls</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Public vs Private Profiles</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>You control whether your resume is publicly accessible or private</li>
              <li>Private profiles are only visible to you when logged in</li>
              <li>You can toggle between public and private at any time</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Information Visibility</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Choose whether to display your email address publicly</li>
              <li>Control which sections appear on your resume</li>
              <li>Delete your account and all data at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>All data is encrypted in transit and at rest</li>
              <li>We use Firebase (Google Cloud) for secure data storage</li>
              <li>Payment processing secured by Stripe's industry-leading security</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and monitoring for our systems</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Google Services</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Google Sign-In for authentication (optional)</li>
              <li>Firebase for data storage and hosting</li>
              <li>Google's privacy policy applies to their services</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Processing</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Stripe handles all payment processing for Pro subscriptions</li>
              <li>We don't store your payment information</li>
              <li>Stripe's privacy policy applies to payment data</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Analytics</h3>
            <p className="text-gray-700 mb-4">
              We use minimal analytics to understand how Resumin is used and to improve the service. 
              This includes basic usage statistics but no personal identification.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 mb-0">
                <strong>Important:</strong> While we strive to keep Resumin running smoothly, we cannot 
                guarantee 24/7 availability. The service may be discontinued at any time, though we will 
                provide reasonable notice when possible. We recommend keeping backups of your resume data.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Access:</strong> View all data we have about you</li>
              <li><strong>Correction:</strong> Update or correct your information</li>
              <li><strong>Deletion:</strong> Delete your account and all associated data</li>
              <li><strong>Portability:</strong> Export your resume data</li>
              <li><strong>Objection:</strong> Opt out of any data processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Resumin is not intended for children under 13. We do not knowingly collect personal 
              information from children under 13. If you believe we have collected such information, 
              please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this privacy policy from time to time. We will notify you of any 
              significant changes by email or through the service. Your continued use of Resumin 
              after changes indicates your acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Mail size={24} className="mr-3 text-orange-600" />
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this privacy policy or how we handle your data, 
              please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> <a href="mailto:privacy@example.com" className="text-orange-600 hover:text-orange-800">privacy@example.com</a>
              </p>
              <p className="text-gray-700 mb-0">
                <strong>Response time:</strong> We typically respond within 24-48 hours
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};