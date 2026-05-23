import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { Article, Paragraph } from './Section';

function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  } catch {
    return dateString;
  }
}

export default async function HomeBlog() {
  let posts: Awaited<ReturnType<typeof getAllPosts>> = [];
  try {
    posts = await getAllPosts();
  } catch {
    posts = [];
  }

  const latestPosts = posts.slice(0, 3);

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 divide-y site-divide">
      {latestPosts.map((post) => (
        <Article key={post.slug} title={post.title}>
          {post.date && (
            <Paragraph>
              <time className="site-muted" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </Paragraph>
          )}
          {post.excerpt && <Paragraph>{post.excerpt}</Paragraph>}
          <Paragraph>
            <Link href={`/blog/${post.slug}`} className="site-link">
              Read article
            </Link>
          </Paragraph>
        </Article>
      ))}
      <article className="pt-10">
        <Paragraph>
          <Link href="/blog" className="site-link">
            View all articles
          </Link>
        </Paragraph>
      </article>
    </div>
  );
}
