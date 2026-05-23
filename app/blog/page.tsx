import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/Home/SiteShell';
import { getAllPosts } from '@/lib/blog';
import { siteDescription, siteUrl } from '@/lib/site';
import BlogList from './BlogList';

export const metadata: Metadata = {
  title: 'My Thoughts',
  description: 'Notes on engineering, work and things I have picked up along the way.',
  openGraph: {
    title: 'My Thoughts | Peter Atkinson',
    description: siteDescription,
    url: `${siteUrl}/blog`,
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
