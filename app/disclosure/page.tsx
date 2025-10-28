import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DisclosurePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-black text-black mb-8">Disclosure</h1>
            
            <div className="bg-accent/10 rounded-lg p-6 mb-8 border border-accent/20">
              <p className="text-gray-700 font-semibold">
                <strong>Last Updated:</strong> December 2024<br/>
                <strong>Company:</strong> TGN Media LLC<br/>
                <strong>Address:</strong> 1309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801, United States<br/>
                <strong>Email:</strong> info@tgn-media.com
              </p>
            </div>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Earnings Disclaimer</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-gray-700 font-semibold">
                <strong>Important:</strong> Results are not typical. Individual results will vary based on effort, 
                dedication, market conditions, and other factors beyond our control.
              </p>
            </div>
            <p className="text-gray-700 mb-6">
              The success stories and earnings examples shown on this website are real results from our Info Operator 
              partnership program. However, these results are not typical and should not be interpreted as guarantees 
              of your future earnings.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Partnership Disclosure</h2>
            <p className="text-gray-700 mb-4">Our Info Operator partnership model:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>We partner with content creators to launch info products</li>
              <li>Creators provide audience reach and content expertise</li>
              <li>We handle backend operations, marketing, and automation</li>
              <li>Profits are shared between 20-50% based on partnership terms</li>
              <li>No upfront costs for creators - we only succeed when you succeed</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Risk Factors</h2>
            <p className="text-gray-700 mb-4">Potential risks include:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Market competition and changing trends</li>
              <li>Audience engagement and conversion rates</li>
              <li>Economic conditions affecting purchasing decisions</li>
              <li>Platform algorithm changes affecting reach</li>
              <li>Regulatory changes in digital marketing</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Guarantee Details</h2>
            <div className="bg-accent/10 rounded-lg p-6 mb-6 border border-accent/20">
              <p className="text-gray-700 font-semibold">
                <strong>Money-Back Guarantee:</strong> If you don't generate at least $10,000 from your first 
                info product launch, we'll wire you $5,000 straight to your bank account.
              </p>
            </div>
            <p className="text-gray-700 mb-4">Guarantee requirements:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Complete full partnership program as designed</li>
              <li>Follow provided marketing strategies and timelines</li>
              <li>Launch within 90 days of partnership start date</li>
              <li>Maintain professional communication throughout process</li>
              <li>Guarantee applies to first launch only</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Testimonial Disclosure</h2>
            <p className="text-gray-700 mb-6">
              All testimonials and case studies on this website are from real Info Operator partners. 
              Results shown are actual earnings from their first launches. However, individual results 
              will vary based on multiple factors including audience size, engagement, market conditions, 
              and execution of strategies.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Investment Required</h2>
            <p className="text-gray-700 mb-6">
              <strong>No upfront investment required.</strong> Our Info Operator partnership model is designed 
              to eliminate financial barriers for creators. We handle all backend costs and only receive 
              payment when you generate revenue.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Time Commitment</h2>
            <p className="text-gray-700 mb-6">
              Partnership requires active participation from creators including content creation, 
              audience engagement, and marketing collaboration. Estimated time commitment: 10-15 hours 
              per week during launch phases.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Regulatory Compliance</h2>
            <p className="text-gray-700 mb-6">
              TGN Media LLC operates in compliance with all applicable laws and regulations. 
              Our Info Operator program follows FTC guidelines for affiliate marketing and 
              partnership disclosures.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Contact for Questions</h2>
            <p className="text-gray-700 mb-6">
              If you have questions about this disclosure or our Info Operator partnership program, 
              please contact us at{' '}
              <a href="mailto:info@tgn-media.com" className="text-accent hover:text-accent-dark">
                info@tgn-media.com
              </a>.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-bold text-black mb-2">Ready to Get Started?</h3>
              <p className="text-gray-700">
                Despite the risks and challenges, our Info Operator partnership program has helped 150+ creators 
                generate over $2.5M in revenue. Book your free strategy call to learn more about how we can 
                help you launch your first successful info product.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
