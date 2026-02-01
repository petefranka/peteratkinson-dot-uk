import { readdir, readFile } from 'fs/promises';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  category?: string;
  image?: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Use process.cwd() for server-side, fallback for edge runtime
    const cwd = process.cwd();
    const postsDirectory = path.join(cwd, 'content', 'blog');
    
    let files: string[];
    try {
      files = await readdir(postsDirectory);
    } catch (error: any) {
      console.error('Blog directory error:', postsDirectory, error?.message || error);
      return [];
    }

    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));
    
    if (mdxFiles.length === 0) {
      console.log('No MDX files found in blog directory');
      return [];
    }

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        try {
          const slug = file.replace(/\.mdx$/, '');
          const filePath = path.join(postsDirectory, file);
          const fileContents = await readFile(filePath, 'utf8');
          
          // Extract frontmatter
          const frontmatterMatch = fileContents.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            const titleMatch = frontmatter.match(/title:\s*(.+)/);
            const dateMatch = frontmatter.match(/date:\s*(.+)/);
            const excerptMatch = frontmatter.match(/excerpt:\s*(.+)/);
            const categoryMatch = frontmatter.match(/category:\s*(.+)/);
            const imageMatch = frontmatter.match(/image:\s*(.+)/);
            
            return {
              slug,
              title: titleMatch ? titleMatch[1].trim().replace(/^["']|["']$/g, '') : slug,
              date: dateMatch ? dateMatch[1].trim().replace(/^["']|["']$/g, '') : '',
              excerpt: excerptMatch ? excerptMatch[1].trim().replace(/^["']|["']$/g, '') : undefined,
              category: categoryMatch ? categoryMatch[1].trim().replace(/^["']|["']$/g, '') : undefined,
              image: imageMatch ? imageMatch[1].trim().replace(/^["']|["']$/g, '') : undefined,
            };
          }
          
          return {
            slug,
            title: slug,
            date: '',
          };
        } catch (error) {
          console.error(`Error reading blog post ${file}:`, error);
          // Return a minimal post object so we don't break the entire list
          return {
            slug: file.replace(/\.mdx$/, ''),
            title: file.replace(/\.mdx$/, ''),
            date: '',
          };
        }
      })
    );
    
    const validPosts = posts.filter((post) => post !== null); // Filter out any null posts

    // Sort by date (newest first)
    const sortedPosts = validPosts.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      // Compare dates (ISO format: YYYY-MM-DD)
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });

    return sortedPosts;
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    return [];
  }
}
