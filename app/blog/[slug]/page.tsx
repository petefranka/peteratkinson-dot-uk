import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import rehypeHighlight from 'rehype-highlight';
import { getAllPosts } from '@/lib/blog';
import OutdatedTag from '@/components/Blog/OutdatedTag';
import AnimatedSection from './AnimatedSection';
import './blog-page.css';

async function getPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog');
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  return fileContents;
}

function extractFrontmatter(content: string) {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const titleMatch = frontmatter.match(/title:\s*(.+)/);
    const dateMatch = frontmatter.match(/date:\s*(.+)/);
    const categoryMatch = frontmatter.match(/category:\s*(.+)/);
    const imageMatch = frontmatter.match(/image:\s*(.+)/);
    
    return {
      title: titleMatch ? titleMatch[1].trim().replace(/^["']|["']$/g, '') : '',
      date: dateMatch ? dateMatch[1].trim().replace(/^["']|["']$/g, '') : '',
      category: categoryMatch ? categoryMatch[1].trim().replace(/^["']|["']$/g, '') : undefined,
      image: imageMatch ? imageMatch[1].trim().replace(/^["']|["']$/g, '') : undefined,
    };
  }
  return { title: '', date: '', category: undefined, image: undefined };
}

function formatDate(dateString: string, buildTime?: Date): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    // Use build time if provided (for static generation), otherwise use current time
    // This ensures consistent rendering during static generation
    const referenceTime = buildTime || new Date();
    
    // Normalize both dates to midnight UTC to avoid timezone issues
    const dateNormalized = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const refNormalized = new Date(Date.UTC(referenceTime.getFullYear(), referenceTime.getMonth(), referenceTime.getDate()));
    const diffTime = refNormalized.getTime() - dateNormalized.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      // Future date, show the actual date
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } else if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return '1 day ago';
    } else {
      return `${diffDays} days ago`;
    }
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

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const frontmatter = extractFrontmatter(post);
  const { isOutdated, daysOld } = getArticleAge(frontmatter.date);
  
  // Remove frontmatter from content
  const contentWithoutFrontmatter = post.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  
  // Evaluate MDX with syntax highlighting
  const { default: MDXContent } = await evaluate(contentWithoutFrontmatter, {
    ...runtime,
    baseUrl: import.meta.url,
    rehypePlugins: [rehypeHighlight],
  });

  return (
    <div className="blog-post-page">
      <Header />
      <main className="blog-post-page__main">
        <Link href="/blog" className="blog-post-page__back">
          ← Back to Blog
        </Link>
        
        <article className="blog-post-page__article">
          <AnimatedSection animation="fadeInUp">
            <header className="blog-post-page__header">
              <h1 className="blog-post-page__title">{frontmatter.title}</h1>
              
              <div className="blog-post-page__meta">
                {frontmatter.date && (
                  <time className="blog-post-page__date" dateTime={frontmatter.date} suppressHydrationWarning>
                    {formatDate(frontmatter.date)}
                  </time>
                )}
                <div className="blog-post-page__category-wrapper">
                  {frontmatter.category && (
                    <span className="blog-post-page__category">{frontmatter.category}</span>
                  )}
                  {isOutdated && (
                    <OutdatedTag daysOld={daysOld} className="blog-post-page__outdated" />
                  )}
                </div>
              </div>
              
              {frontmatter.image && (
                <AnimatedSection animation="fadeIn" delay={0.2}>
                  <div className="blog-post-page__image-wrapper">
                    <img 
                      src={frontmatter.image || '/placeholder.svg'} 
                      alt={frontmatter.title}
                      className="blog-post-page__image"
                    />
                  </div>
                </AnimatedSection>
              )}
            </header>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeIn" delay={0.3}>
            <div className="blog-post-page__content">
              <MDXContent />
            </div>
          </AnimatedSection>
        </article>
      </main>
      <Footer />
    </div>
  );
}
