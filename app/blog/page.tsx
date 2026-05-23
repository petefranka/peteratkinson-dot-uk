import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/Home/SiteShell';
import { getAllPosts } from '@/lib/blog';
import { siteDescription, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'My Thoughts',
  description: 'Notes on engineering, work and things I have picked up along the way.',
  openGraph: {
    title: 'My Thoughts | Peter Atkinson',
    description: siteDescription,
    url: `${siteUrl}/blog`,
  },
};

function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

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

      <section aria-labelledby="blog-list-heading">
        <h2 id="blog-list-heading" className="sr-only">
          All articles
        </h2>
        {posts.length > 0 ? (
          <ul className="flex flex-col gap-8 divide-y site-divide list-none">
            {posts.map((post) => (
              <li key={post.slug} className="pt-8 first:pt-0">
                <article className="site-article">
                  <h3 className="site-article-title">
                    <Link href={`/blog/${post.slug}`} className="site-link">
                      {post.title}
                    </Link>
                  </h3>
                  {post.date && (
                    <p className="mb-6 site-muted">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </p>
                  )}
                  {post.excerpt && (
                    <p className="mb-6 last:mb-0 site-body">{post.excerpt}</p>
                  )}
                  <p className="mb-6 last:mb-0">
                    <Link href={`/blog/${post.slug}`} className="site-link">
                      Read article
                    </Link>
                  </p>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="site-body">No posts yet. Check back soon!</p>
        )}
      </section>
    </SiteShell>
  );
}
