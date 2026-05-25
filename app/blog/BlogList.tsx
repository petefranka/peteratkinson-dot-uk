'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryTag, SimpleOutdatedTag } from '@/components/Blog';
import { formatRelativeDate } from '@/functions';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  category?: string;
  readingTime?: string;
}


export default function BlogList({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean) as string[])).sort()];

  const visible = active === 'All' ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <div
        role="group"
        aria-label="Filter articles by category"
        className="flex flex-wrap gap-2"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className="blog-filter-btn"
            data-active={active === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      <section aria-labelledby="blog-list-heading" aria-live="polite" aria-atomic="false">
        <h2 id="blog-list-heading" className="sr-only">
          {active === 'All' ? 'All articles' : `Articles in ${active}`}
        </h2>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {visible.length > 0 ? (
              <ul className="flex flex-col gap-8 divide-y site-divide list-none">
                {visible.map((post) => (
                  <li key={post.slug} className="pt-8 first:pt-0">
                    <article className="site-article">
                      <h3 className="site-article-title">
                        <Link href={`/blog/${post.slug}`} className="site-link">
                          {post.title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        {post.date && (
                          <p className="site-muted">
                            <time dateTime={post.date}>{formatRelativeDate(post.date)}</time>
                          </p>
                        )}
                        {post.readingTime && <span className="site-muted">{post.readingTime}</span>}
                        <span className="inline-flex items-center gap-2">
                          {post.category && <CategoryTag category={post.category} />}
                          {post.date && <SimpleOutdatedTag date={post.date} />}
                        </span>
                      </div>
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
              <p className="site-body">No articles in this category yet.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}
