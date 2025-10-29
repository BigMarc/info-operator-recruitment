import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Growth Partner - Turn Creator Audiences Into Revenue',
  description: 'Become a Growth Partner and help creators launch info products. Comprehensive training, client matching, and ongoing support. Earn $5K-$20K+ per client.',
  keywords: 'growth partner, creator monetization, info products, course creation, community building, creator partnerships',
  authors: [{ name: 'Marc Schultheiss' }],
  openGraph: {
    title: 'Growth Partner - Turn Creator Audiences Into Revenue',
    description: 'Become a Growth Partner and help creators launch info products. Comprehensive training, client matching, and ongoing support.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
