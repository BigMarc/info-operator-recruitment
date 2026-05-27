'use client';

import type { Locale } from '@/dictionaries/types';
import { localized } from '@/utils/route';

interface LegalPageProps {
  locale: Locale;
  title: string;
  bodyMarkdown: string;
  backLabel: string;
}

function renderMarkdown(md: string): React.ReactNode[] {
  return md.split('\n\n').map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith('## ')) {
      return <h2 key={i} className="text-2xl font-bold text-black mt-8 mb-4">{trimmed.slice(3)}</h2>;
    }
    if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
      return <p key={i} className="text-gray-500 italic mt-8 text-sm">{trimmed.slice(1, -1)}</p>;
    }
    return <p key={i} className="text-gray-700 leading-relaxed mb-4">{trimmed}</p>;
  });
}

export default function LegalPage({ locale, title, bodyMarkdown, backLabel }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href={localized('/', locale)} className="text-2xl font-black text-black">
            Build<span className="text-accent">ForThem</span>
          </a>
          <a href={localized('/', locale)} className="text-gray-700 hover:text-black font-semibold transition">
            {backLabel}
          </a>
        </div>
      </header>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-8">{title}</h1>
        <div className="prose prose-lg max-w-none">{renderMarkdown(bodyMarkdown)}</div>
      </article>
    </main>
  );
}
