'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-black text-accent mb-4">404</h1>
          <h2 className="text-4xl font-black text-black mb-6">Page Not Found</h2>
          <p className="text-xl text-gray-700 mb-8">
            Oops! The page you're looking for doesn't exist. 
            You'll be redirected to our homepage in a few seconds.
          </p>
        </div>

        <div className="bg-accent/10 rounded-2xl p-8 border-2 border-accent/20 mb-8">
          <h3 className="text-2xl font-bold text-black mb-4">Looking for Growth Partner Training?</h3>
          <p className="text-gray-700 mb-6">
            Our Growth Partner training program helps you build a successful practice helping content creators launch info products 
            with comprehensive training and client matching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="bg-accent text-black px-8 py-4 rounded-full font-bold hover:bg-accent-dark transition shadow-lg hover:shadow-xl"
            >
              Go to Homepage →
            </a>
            <a
              href="/#book-call"
              className="border-2 border-accent text-accent px-8 py-4 rounded-full font-bold hover:bg-accent hover:text-black transition"
            >
              Book Strategy Call
            </a>
          </div>
        </div>

        <div className="text-gray-500">
          <p>Redirecting automatically in 3 seconds...</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-accent h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border-2 border-accent/10 shadow-lg">
            <div className="text-3xl font-black text-accent mb-2">150+</div>
            <div className="text-black font-semibold">Creator Partnerships</div>
            <div className="text-gray-600 text-sm">Successful launches</div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-accent/10 shadow-lg">
            <div className="text-3xl font-black text-black mb-2">$2.5M+</div>
            <div className="text-black font-semibold">Revenue Generated</div>
            <div className="text-gray-600 text-sm">For our partners</div>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-accent/10 shadow-lg">
            <div className="text-3xl font-black text-accent mb-2">4.9/5</div>
            <div className="text-black font-semibold">Partner Rating</div>
            <div className="text-gray-600 text-sm">Top rated service</div>
          </div>
        </div>
      </div>
    </div>
  );
}
