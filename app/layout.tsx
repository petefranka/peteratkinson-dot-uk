import type { Metadata } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import { siteDescription, siteTitle, siteUrl } from '@/lib/site';
import '../src/index.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Peter Atkinson',
  },
  description: siteDescription,
  alternates: {
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteUrl,
    siteName: 'Peter Atkinson',
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="font-sans bg-matte text-ink-body text-base antialiased">
        {children}
      </body>
    </html>
  );
}
