import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { Article, Paragraph } from './Section';
import { CategoryTag, SimpleOutdatedTag } from '@/components/Blog';
import { formatDate } from '@/functions';

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
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.date && (
              <time className="site-muted" dateTime={post.date}>
                {formatDate(post.date, { month: 'short', year: 'numeric' })}
              </time>
            )}
            <span className="inline-flex items-center gap-2">
              {post.category && <CategoryTag category={post.category} />}
              {post.date && <SimpleOutdatedTag date={post.date} />}
            </span>
          </div>
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
