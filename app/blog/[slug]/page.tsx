import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { getAllPosts } from '@/lib/blog';

async function getPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog');
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  return fileContents;
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

  // Remove frontmatter from content
  const contentWithoutFrontmatter = post.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  
  // Evaluate MDX
  const { default: MDXContent } = await evaluate(contentWithoutFrontmatter, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return (
    <div className="page">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <article className="prose prose-invert max-w-none">
          <MDXContent />
        </article>
      </main>
      <Footer />
    </div>
  );
}
