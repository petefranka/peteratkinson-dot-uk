import Link from 'next/link';
import SiteShell from '@/components/Home/SiteShell';
import { getAllPosts } from '@/lib/blog';

export default async function NotFound() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <SiteShell>
      <section className="flex flex-col gap-6" aria-labelledby="not-found-heading">
        <h1 id="not-found-heading" className="text-3xl sm:text-4xl site-heading">
          Page not found.
        </h1>
        <p className="site-body">
          That page does not exist or may have moved.{' '}
          <Link href="/" className="site-link">
            Back to home
          </Link>
          .
        </p>
      </section>

      {latestPosts.length > 0 && (
        <section aria-labelledby="recent-posts-heading">
          <h2
            id="recent-posts-heading"
            className="text-xl site-heading font-sans font-semibold mb-4"
          >
            Recent articles
          </h2>
          <ul className="flex flex-col gap-4 list-none">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="site-link">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </SiteShell>
  );
}
