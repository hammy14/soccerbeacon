import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';

export const metadata: Metadata = {
  title: 'Pitch Passport - Global Football Coverage & Analysis',
  description: 'Your source for global football news, standings, analysis, and insights from Premier League, La Liga, Serie A, MLS, and Champions League.',
  keywords: ['football', 'soccer', 'Premier League', 'La Liga', 'Serie A', 'MLS', 'Champions League', 'standings', 'matches', 'news'],
  authors: [{ name: 'Pitch Passport' }],
  creator: 'Pitch Passport',
  publisher: 'Pitch Passport',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pitchpassport.com',
    siteName: 'Pitch Passport',
    title: 'Pitch Passport - Global Football Coverage & Analysis',
    description: 'Your source for global football news, standings, analysis, and insights from Premier League, La Liga, Serie A, MLS, and Champions League.',
    images: [
      {
        url: 'https://pitchpassport.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pitch Passport - Global Football Coverage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pitch Passport - Global Football Coverage & Analysis',
    description: 'Your source for global football news, standings, analysis, and insights from Premier League, La Liga, Serie A, MLS, and Champions League.',
    images: ['https://pitchpassport.com/og-image.jpg'],
    creator: '@pitchpassport',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://pitchpassport.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body className="bg-gray-50">
        <Analytics />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
