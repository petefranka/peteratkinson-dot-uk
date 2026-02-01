import './Blog.css';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import OutdatedTag from './OutdatedTag';

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

const Blog = async () => {
  // Fetch all posts and get the top 3 by date
  let allPosts: Array<{ slug: string; title: string; date: string; excerpt?: string; category?: string; image?: string }> = [];
  try {
    allPosts = await getAllPosts();
    console.log('Fetched posts:', allPosts.length);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Continue with empty array if there's an error
  }
  const latestPosts = allPosts.slice(0, 3);

  return (
    <section id="blog" className="blog">
      <div className="blog__container">
        <div className="blog__layout">
          <div className="blog__sidebar">
              <h2 className="blog__title">
                My Thoughts
                <span className="blog__arrow">→</span>
              </h2>
            <p className="blog__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          
          <div className="blog__content">
            <div className="blog__grid">
              {latestPosts.length > 0 ? (
                latestPosts.map((post) => {
                  const { isOutdated, daysOld } = getArticleAge(post.date);
                  return (
                    <article key={post.slug} className="blog__card">
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
                  );
                })
              ) : (
                <p className="blog__empty">No blog posts yet. Check back soon!</p>
              )}
            </div>
            <div className="blog__button-wrapper">
              <Link href="/blog" className="blog__button">View all Articles</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
