import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: { default: 'Property TBILS | Buy, Rent & Sell Property in Nigeria', template: '%s | Property TBILS' },
  description: 'Search thousands of verified properties for sale, rent, and shortlet across Lagos, Abuja, Port Harcourt & Ibadan. Trusted agents, transparent pricing. List your property free.',
  metadataBase: new URL('https://property.tbils.com'),
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    siteName: 'Property TBILS',
    type: 'website',
    url: 'https://property.tbils.com',
    title: 'Property TBILS | Buy, Rent & Sell Property in Nigeria',
    description: 'Search thousands of verified properties for sale, rent, and shortlet across Lagos, Abuja, Port Harcourt & Ibadan. Trusted agents, transparent pricing.',
    images: [{ url: '/assets/Images/og-image.png', width: 1200, height: 630, alt: 'Property TBILS — Nigerian Real Estate' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property TBILS | Buy, Rent & Sell Property in Nigeria',
    description: 'Search thousands of verified properties for sale, rent, and shortlet across Lagos, Abuja, Port Harcourt & Ibadan.',
    images: ['/assets/Images/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
