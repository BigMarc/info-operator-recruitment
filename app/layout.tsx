import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Growth Partner Ausbildung — BuildForThem',
  description: 'Werde Growth Partner und verdiene 5.000–20.000 € pro Creator-Kunde. Komplette Ausbildung, Creator-Matching, 5K-Garantie in 90 Tagen.',
  keywords: 'growth partner, creator backend, info produkt, online business, revenue share, ortsunabhängig, ausbildung',
  authors: [{ name: 'Marc Schultheiss' }],
  openGraph: {
    title: 'Growth Partner Ausbildung — BuildForThem',
    description: 'Werde Growth Partner und verdiene 5.000–20.000 € pro Creator-Kunde. Komplette Ausbildung, Creator-Matching, 5K-Garantie in 90 Tagen.',
    type: 'website',
    locale: 'de_DE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
