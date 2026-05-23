import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import SiteShell from '@/components/Home/SiteShell';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import rehypeHighlight from 'rehype-highlight';
import { getAllPosts, parseFrontmatter, stripFrontmatter } from '@/lib/blog';
import { siteName, siteUrl } from '@/lib/site';
import { CategoryTag, OutdatedTag } from '@/components/Blog';
import { formatDate } from '@/functions';
import './blog-page.css';

async function getPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog');
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, 'utf8');
}


export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Post not found' };
  }

  const frontmatter = parseFrontmatter(post);
  const title = frontmatter.title || slug;
  const description =
    frontmatter.excerpt ?? `Article by ${siteName} on engineering and software.`;
  const url = `${siteUrl}/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      publishedTime: frontmatter.date || undefined,
      authors: [siteName],
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const frontmatter = parseFrontmatter(post);
  const contentWithoutFrontmatter = stripFrontmatter(post);

  const { default: MDXContent } = await evaluate(contentWithoutFrontmatter, {
    ...runtime,
    baseUrl: import.meta.url,
    rehypePlugins: [rehypeHighlight],
  });

  return (
    <SiteShell backHref="/blog" backLabel="← All articles">
      <article className="blog-post">
        <header className="flex flex-col gap-4 mb-12">
          <h1 className="text-3xl sm:text-4xl site-heading leading-tight">
            {frontmatter.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            {frontmatter.date && (
              <time dateTime={frontmatter.date} className="site-muted">
                {formatDate(frontmatter.date, { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
            )}
            {frontmatter.category && <CategoryTag category={frontmatter.category} />}
          </div>
          {frontmatter.date && <OutdatedTag date={frontmatter.date} />}
        </header>

        <div className="blog-post__content prose prose-zinc max-w-none">
          <MDXContent />
        </div>
      </article>
    </SiteShell>
  );
}
