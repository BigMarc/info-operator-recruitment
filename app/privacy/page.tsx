import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-black text-black mb-8">Privacy Policy</h1>
            
            <div className="bg-accent/10 rounded-lg p-6 mb-8 border border-accent/20">
              <p className="text-gray-700 font-semibold">
                <strong>Last Updated:</strong> December 2024<br/>
                <strong>Company:</strong> TGN Media LLC<br/>
                <strong>Address:</strong> 1309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801, United States<br/>
                <strong>Email:</strong> info@tgn-media.com
              </p>
            </div>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect information you provide directly to us, such as when you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Book a strategy call or consultation</li>
              <li>Subscribe to our newsletter or updates</li>
              <li>Contact us via email or contact forms</li>
              <li>Participate in our Info Operator partnership program</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Provide and improve our services</li>
              <li>Communicate with you about our partnership opportunities</li>
              <li>Send you relevant content and updates</li>
              <li>Process transactions and manage accounts</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy or as required by law.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Your Rights (GDPR/CCPA)</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your personal information</li>
              <li>Object to processing of your information</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-6">
              We use cookies and similar tracking technologies to enhance your experience on our website 
              and analyze usage patterns.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">7. Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us at <a href="mailto:info@tgn-media.com" className="text-accent hover:text-accent-dark">info@tgn-media.com</a>.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-bold text-black mb-2">Info Operator Partnership Program</h3>
              <p className="text-gray-700">
                This privacy policy applies to our Info Operator partnership program, where we help content creators 
                launch successful info products through our proven system.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
