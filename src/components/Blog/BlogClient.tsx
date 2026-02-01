'use client';

import './Blog.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import OutdatedTag from './OutdatedTag';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  category?: string;
  image?: string;
}

// Format date from YYYY-MM-DD to "Jan 2025" format
function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  } catch {
    return dateString;
  }
}

// Check if article is more than 3 months old and get days old
function getArticleAge(dateString: string): { isOutdated: boolean; daysOld: number } {
  if (!dateString) return { isOutdated: false, daysOld: 0 };
  
  try {
    const articleDate = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - articleDate.getTime();
    const daysOld = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const threeMonthsInDays = 90; // Approximately 3 months
    
    return {
      isOutdated: daysOld > threeMonthsInDays,
      daysOld: daysOld
    };
  } catch {
    return { isOutdated: false, daysOld: 0 };
  }
}

interface BlogClientProps {
  posts: BlogPost[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  const latestPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="blog">
      <div className="blog__container">
        <div className="blog__layout">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="blog__sidebar">
              <h2 className="blog__title">
                My Thoughts
                <span className="blog__arrow">→</span>
              </h2>
              <p className="blog__description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </motion.div>
          
          <div className="blog__content">
            <div className="blog__grid">
              {latestPosts.length > 0 ? (
                latestPosts.map((post, index) => {
                  const { isOutdated, daysOld } = getArticleAge(post.date);
                  return (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <article className="blog__card">
                        <Link href={`/blog/${post.slug}`} className="blog__card-link">
                          <div className="blog__image-wrapper">
                            <img 
                              src={post.image || '/placeholder.svg'} 
                              alt={post.title}
                              className="blog__image"
                            />
                            {post.category && (
                              <span className="blog__category">{post.category}</span>
                            )}
                            {isOutdated && (
                              <OutdatedTag daysOld={daysOld} />
                            )}
                          </div>
                          <div className="blog__card-content">
                            <h3 className="blog__card-title">{post.title}</h3>
                            {post.excerpt && (
                              <p className="blog__excerpt">{post.excerpt}</p>
                            )}
                          </div>
                          <div className="blog__read-more">
                            <span>Read full Article</span>
                            <span className="blog__arrow">→</span>
                          </div>
                        </Link>
                      </article>
                    </motion.div>
                  );
                })
              ) : (
                <p className="blog__empty">No blog posts yet. Check back soon!</p>
              )}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="blog__button-wrapper">
                <Link href="/blog" className="blog__button">View all Articles</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
