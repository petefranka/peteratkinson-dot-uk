import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/Home/SiteShell';
import { getAllPosts } from '@/lib/blog';
import { siteName, siteTitle, siteUrl } from '@/lib/site';
import BlogList from './BlogList';

const blogDescription = 'Notes on engineering, work and things I have picked up along the way.';

export const metadata: Metadata = {
  title: 'My Thoughts',
  description: blogDescription,
  authors: [{ name: siteName, url: siteUrl }],
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    type: 'website',
    title: 'My Thoughts | Peter Atkinson',
    description: blogDescription,
    url: `${siteUrl}/blog`,
    siteName: siteTitle,
  },
  twitter: {
    card: 'summary',
    title: 'My Thoughts | Peter Atkinson',
    description: blogDescription,
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <SiteShell>
      <section className="flex flex-col gap-8" aria-labelledby="blog-heading">
        <h1
          id="blog-heading"
          className="text-3xl sm:text-4xl site-heading flex items-start gap-3"
        >
          <span className="site-section-marker" aria-hidden="true" />
          <span>My Thoughts.</span>
        </h1>
        <p className="mb-6 site-body">
          Notes on engineering, work and things I&apos;ve picked up along the way.{' '}
          <Link href="/feed.xml" className="site-link">
            RSS feed
          </Link>
          .
        </p>
      </section>

      <BlogList posts={posts} />
    </SiteShell>
  );
}
