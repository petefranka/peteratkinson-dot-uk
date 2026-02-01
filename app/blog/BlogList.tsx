'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog';
import CustomSelect from './CustomSelect';
import OutdatedTag from '@/components/Blog/OutdatedTag';
import './blog-list.css';

interface BlogListProps {
  posts: BlogPost[];
}

// Format date from YYYY-MM-DD to "Jan 15, 2025" format
function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
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

export default function BlogList({ posts }: BlogListProps) {
  // Extract all unique categories from posts
  const categories = useMemo(() => {
    const cats = posts
      .map(post => post.category)
      .filter((cat): cat is string => Boolean(cat));
    return ['All', ...Array.from(new Set(cats))];
  }, [posts]);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = posts.filter(post => post.category === selectedCategory);
    }
    
    // Sort by date
    const sorted = [...filtered].sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      
      if (sortOrder === 'newest') {
        // Newest first (default)
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
      } else {
        // Oldest first
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      }
    });
    
    return sorted;
  }, [posts, selectedCategory, sortOrder]);

  return (
    <div className="blog-list">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.6,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <header className="blog-list__header">
          <h1 className="blog-list__title">My thoughts and feelings</h1>
          <p className="blog-list__description">
            A collection of my thoughts on engineering, web development, building reliable systems, 
            and the lessons I've learned along the way. Here you'll find insights, tips, and reflections 
            from my journey as a developer.
          </p>
        </header>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="blog-list__controls"
      >
        <div className="blog-list__filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`blog-list__filter ${selectedCategory === category ? 'blog-list__filter--active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="blog-list__sort">
          <CustomSelect
            value={sortOrder}
            onChange={(value) => setSortOrder(value as 'newest' | 'oldest')}
            options={[
              { value: 'newest', label: 'Newest First' },
              { value: 'oldest', label: 'Oldest First' },
            ]}
          />
        </div>
      </motion.div>

      <div className="blog-list__grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => {
            const { isOutdated, daysOld } = getArticleAge(post.date);
            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <article className="blog-list__card">
                  <Link href={`/blog/${post.slug}`} className="blog-list__card-link">
                    <div className="blog-list__image-wrapper">
                      <img 
                        src={post.image || '/placeholder.svg'} 
                        alt={post.title}
                        className="blog-list__image"
                      />
                      {post.category && (
                        <span className="blog-list__category">{post.category}</span>
                      )}
                      {isOutdated && (
                        <OutdatedTag daysOld={daysOld} className="blog-list__outdated" />
                      )}
                    </div>
                    <div className="blog-list__card-content">
                      <h2 className="blog-list__card-title">{post.title}</h2>
                      {post.excerpt && (
                        <p className="blog-list__excerpt">{post.excerpt}</p>
                      )}
                    </div>
                    <div className="blog-list__read-more">
                      <span>Read article</span>
                      <span className="blog-list__arrow">→</span>
                    </div>
                  </Link>
                </article>
              </motion.div>
            );
          })
        ) : (
          <p className="blog-list__empty">No posts found in this category.</p>
        )}
      </div>
    </div>
  );
}
