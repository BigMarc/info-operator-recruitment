import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-black text-black mb-8">Terms of Service</h1>
            
            <div className="bg-accent/10 rounded-lg p-6 mb-8 border border-accent/20">
              <p className="text-gray-700 font-semibold">
                <strong>Last Updated:</strong> December 2024<br/>
                <strong>Company:</strong> TGN Media LLC<br/>
                <strong>Address:</strong> 1309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801, United States<br/>
                <strong>Email:</strong> info@tgn-media.com
              </p>
            </div>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using our Info Operator services, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. Info Operator Partnership Program</h2>
            <p className="text-gray-700 mb-4">Our Info Operator partnership program includes:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Strategic consultation and audience analysis</li>
              <li>Info product creation and development</li>
              <li>Marketing funnel setup and automation</li>
              <li>Sales page creation and optimization</li>
              <li>Email marketing sequences</li>
              <li>Payment processing and delivery systems</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. Partnership Terms</h2>
            <p className="text-gray-700 mb-4">Partnership arrangements include:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Profit sharing between 20-50% based on audience size and engagement</li>
              <li>No upfront costs for creators</li>
              <li>Shared responsibility for content creation and marketing</li>
              <li>Mutual agreement on product positioning and pricing</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Guarantee Terms</h2>
            <div className="bg-accent/10 rounded-lg p-6 mb-6 border border-accent/20">
              <p className="text-gray-700 font-semibold">
                <strong>Money-Back Guarantee:</strong> If you don't generate at least $10,000 from your first 
                info product launch, we'll wire you $5,000 straight to your bank account. No questions asked.
              </p>
            </div>
            <p className="text-gray-700 mb-4">Guarantee conditions:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Must complete full partnership program</li>
              <li>Must follow provided marketing strategies</li>
              <li>Must launch within 90 days of partnership start</li>
              <li>Guarantee applies to first launch only</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Creator Responsibilities</h2>
            <p className="text-gray-700 mb-4">As a creator partner, you agree to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Provide accurate audience demographics and engagement data</li>
              <li>Participate in content creation and marketing activities</li>
              <li>Maintain professional communication throughout partnership</li>
              <li>Follow agreed-upon marketing strategies and timelines</li>
              <li>Protect confidential information shared during partnership</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Payment Terms</h2>
            <p className="text-gray-700 mb-4">Payment arrangements:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Payments processed monthly for ongoing partnerships</li>
              <li>Profit splits calculated after all expenses</li>
              <li>Payment methods: Bank transfer, PayPal, or agreed-upon method</li>
              <li>30-day payment terms for all transactions</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700 mb-6">
              Both parties retain rights to their respective intellectual property. Jointly created content 
              will be owned according to partnership agreement terms.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">8. Termination</h2>
            <p className="text-gray-700 mb-6">
              Either party may terminate this agreement with 30 days written notice. 
              Termination does not affect obligations incurred prior to termination date.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              TGN Media LLC's liability is limited to the amount paid for services. 
              We are not liable for indirect, incidental, or consequential damages.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">10. Contact Information</h2>
            <p className="text-gray-700 mb-6">
              For questions about these terms, contact us at{' '}
              <a href="mailto:info@tgn-media.com" className="text-accent hover:text-accent-dark">
                info@tgn-media.com
              </a>.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-bold text-black mb-2">Info Operator Success</h3>
              <p className="text-gray-700">
                Our Info Operator partnership program has helped 150+ creators generate over $2.5M in revenue 
                through successful info product launches. Join our proven system today.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
