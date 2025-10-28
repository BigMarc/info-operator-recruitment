import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Info Operator - Turn Creator Audiences Into Revenue',
  description: 'Partner with creators to launch info products. Handle backend, marketing & automation while creators provide reach. Split profits 20-50%. No upfront costs.',
  keywords: 'info operator, creator monetization, info products, course creation, community building, creator partnerships',
  authors: [{ name: 'Marc Schultheiss' }],
  openGraph: {
    title: 'Info Operator - Turn Creator Audiences Into Revenue',
    description: 'Partner with creators to launch info products. Handle backend, marketing & automation while creators provide reach. Split profits 20-50%.',
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
