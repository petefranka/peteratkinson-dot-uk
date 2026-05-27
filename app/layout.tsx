import type { Metadata, Viewport } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import Script from 'next/script';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SpeedInsights as VercelSpeedInsights } from '@vercel/speed-insights/next';
import { siteDescription, siteName, siteTitle, siteUrl } from '@/lib/site';
import HamburgerMenu from '@/components/Home/HamburgerMenu';
import ThemeSync from '@/components/ThemeSync';
import '../src/index.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const viewport: Viewport = {
  themeColor: '#f3e6eb',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Peter Atkinson',
  },
  description: siteDescription,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
      <body className="font-sans text-base antialiased">
        <ThemeSync />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <HamburgerMenu />
        {children}
        <VercelAnalytics />
        <VercelSpeedInsights />
           {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
      )}
      </body>
   
    </html>
  );
}
