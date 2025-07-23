import React from 'react';
import { FileText, AlertTriangle, Shield, Mail } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText size={32} className="text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">
            Last updated: December 2024
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-orange-900 mb-3 flex items-center">
              <Shield size={20} className="mr-2" />
              The Simple Version
            </h2>
            <p className="text-orange-800 mb-0">
              Use Resumin responsibly, don't abuse the service, and respect others. We provide the 
              platform with both free and paid options, but we can't guarantee it will work perfectly all the time. 
              Be nice, and we'll do our best to keep Resumin running smoothly.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using Resumin, you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to abide by the above, please 
              do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              Resumin is an online resume builder that allows users to create professional 
              resume pages accessible via personalized links (e.g., resumin.link/yourname). 
              The service includes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Resume creation and editing tools</li>
              <li>Public and private profile options</li>
              <li>Custom themes and styling</li>
              <li>Social media integration</li>
              <li>Mobile-responsive design</li>
              <li>Free plan with essential features (lifetime free)</li>
              <li>Pro plan with advanced features (paid subscription)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Service Plans</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Free Plan</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Includes all essential resume building features</li>
              <li>Free forever - no time limits or hidden fees</li>
              <li>Subject to fair use policies</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Pro Plan</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Advanced features like custom domains and PDF export</li>
              <li>Paid subscription with monthly or yearly billing</li>
              <li>30-day money-back guarantee</li>
              <li>Can be cancelled at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Accounts</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Creation</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>One account per person</li>
              <li>You must be at least 13 years old to use Resumin</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Username Policy</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Usernames must be unique and appropriate</li>
              <li>No impersonation of others</li>
              <li>No offensive, misleading, or trademark-infringing names</li>
              <li>We reserve the right to reclaim inactive usernames</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-green-900 mb-2">✅ Allowed Uses</h3>
              <ul className="list-disc pl-6 text-green-800">
                <li>Creating professional resumes and portfolios</li>
                <li>Sharing your resume link for job applications</li>
                <li>Showcasing your skills and experience</li>
                <li>Using the service for personal or commercial purposes</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-red-900 mb-2 flex items-center">
                <AlertTriangle size={20} className="mr-2" />
                ❌ Prohibited Uses
              </h3>
              <ul className="list-disc pl-6 text-red-800">
                <li>Posting false, misleading, or fraudulent information</li>
                <li>Uploading malicious content or spam</li>
                <li>Violating intellectual property rights</li>
                <li>Harassing or impersonating others</li>
                <li>Attempting to hack or disrupt the service</li>
                <li>Using the service for illegal activities</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Content and Intellectual Property</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Content</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>You retain ownership of all content you upload</li>
              <li>You grant us permission to display and store your content</li>
              <li>You are responsible for ensuring you have rights to all content</li>
              <li>You can delete your content at any time</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Content</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Resumin's design, code, and features are our intellectual property</li>
              <li>You may not copy, modify, or redistribute our platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy and Data</h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Please review our Privacy Policy to understand 
              how we collect, use, and protect your information. By using Resumin, you agree to 
              our data practices as described in the Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Service Availability</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Service Availability Notice</h3>
              <p className="text-yellow-800 mb-0">
                While we strive to keep Resumin running smoothly and maintain high availability, 
                we cannot guarantee 24/7 operational status. The service may experience downtime 
                for maintenance, updates, or unforeseen technical issues. In the unlikely event 
                that Resumin needs to be discontinued, we will provide reasonable advance notice 
                to allow users to export their data.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Changes</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>We may modify, suspend, or discontinue features</li>
              <li>We'll provide reasonable notice for significant changes</li>
              <li>We may set usage limits to ensure fair access</li>
              <li>The service may be discontinued at any time with reasonable notice</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Payment Terms (Pro Plan)</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Billing</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Pro subscriptions are billed monthly or yearly in advance</li>
              <li>All payments are processed securely through Stripe</li>
              <li>Prices are subject to change with 30 days notice</li>
              <li>No refunds for partial months, but you can cancel anytime</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Cancellation</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>You can cancel your Pro subscription at any time</li>
              <li>Access to Pro features continues until the end of your billing period</li>
              <li>Your account will automatically downgrade to the free plan</li>
              <li>30-day money-back guarantee for new subscriptions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Disclaimers and Limitations</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-800 mb-0">
                <strong>Important:</strong> Resumin is provided "as is" without warranties. We do our 
                best to keep the service running smoothly, but we cannot guarantee it will always 
                work perfectly or meet all your needs. We recommend keeping backups of important information.
              </p>
            </div>

            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>We are not liable for any damages from using or inability to use Resumin</li>
              <li>You use the service at your own risk</li>
              <li>We recommend keeping backups of important information</li>
              <li>We are not responsible for third-party links or content</li>
              <li>Service may be discontinued at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Account Termination</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">By You</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>You can delete your account at any time</li>
              <li>All your data will be permanently removed</li>
              <li>Your username may become available for others to use</li>
              <li>Pro subscriptions will be cancelled automatically</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">By Us</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>We may suspend accounts that violate these terms</li>
              <li>We'll provide notice when possible</li>
              <li>Serious violations may result in immediate termination</li>
              <li>Refunds for Pro subscriptions will be considered case by case</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We may update these terms from time to time. We'll notify users of significant 
              changes via email or through the service. Continued use of Resumin after changes 
              indicates acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These terms are governed by the laws of India. Any disputes will be resolved 
              through good faith discussion or, if necessary, through appropriate legal channels.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Mail size={24} className="mr-3 text-orange-600" />
              Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              If you have questions about these terms or need to report a violation, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> <a href="mailto:admin@resumin.link" className="text-orange-600 hover:text-orange-800">admin@resumin.link</a>
              </p>
              <p className="text-gray-700 mb-0">
                <strong>Response time:</strong> We typically respond within 24-48 hours
              </p>
            </div>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Thank You!</h3>
            <p className="text-blue-800 mb-0">
              Thanks for taking the time to read our terms. We're committed to providing a 
              great service while being transparent about how it works. If you have any 
              questions, don't hesitate to reach out!
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};