import { readdir, readFile } from 'fs/promises';
import path from 'path';
import { getReadingTime } from '@/functions';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  category?: string;
  image?: string;
  readingTime: string;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
  category?: string;
  image?: string;
}

export function parseFrontmatter(content: string): PostFrontmatter {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!frontmatterMatch) {
    return { title: '', date: '' };
  }

  const frontmatter = frontmatterMatch[1];
  const clean = (value: string) => value.trim().replace(/^["']|["']$/g, '');

  const titleMatch = frontmatter.match(/title:\s*(.+)/);
  const dateMatch = frontmatter.match(/date:\s*(.+)/);
  const excerptMatch = frontmatter.match(/excerpt:\s*(.+)/);
  const categoryMatch = frontmatter.match(/category:\s*(.+)/);
  const imageMatch = frontmatter.match(/image:\s*(.+)/);

  return {
    title: titleMatch ? clean(titleMatch[1]) : '',
    date: dateMatch ? clean(dateMatch[1]) : '',
    excerpt: excerptMatch ? clean(excerptMatch[1]) : undefined,
    category: categoryMatch ? clean(categoryMatch[1]) : undefined,
    image: imageMatch ? clean(imageMatch[1]) : undefined,
  };
}

export function stripFrontmatter(content: string): string {
  return content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Use process.cwd() for server-side, fallback for edge runtime
    const cwd = process.cwd();
    const postsDirectory = path.join(cwd, 'content', 'blog');
    
    let files: string[];
    try {
      files = await readdir(postsDirectory);
    } catch {
      return [];
    }

    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

    if (mdxFiles.length === 0) {
      return [];
    }

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        try {
          const slug = file.replace(/\.mdx$/, '');
          const filePath = path.join(postsDirectory, file);
          const fileContents = await readFile(filePath, 'utf8');
          const frontmatter = parseFrontmatter(fileContents);

          return {
            slug,
            title: frontmatter.title || slug,
            date: frontmatter.date,
            excerpt: frontmatter.excerpt,
            category: frontmatter.category,
            image: frontmatter.image,
            readingTime: getReadingTime(stripFrontmatter(fileContents)),
          };
        } catch {
          return {
            slug: file.replace(/\.mdx$/, ''),
            title: file.replace(/\.mdx$/, ''),
            date: '',
            readingTime: '1 min read',
          };
        }
      })
    );

    const validPosts = posts.filter((post) => post !== null);

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
  } catch {
    return [];
  }
}
