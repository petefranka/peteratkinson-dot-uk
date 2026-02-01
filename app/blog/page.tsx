import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="page">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-800 pb-8">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold mb-2 hover:underline">
                  {post.title}
                </h2>
              </Link>
              {post.date && (
                <time className="text-gray-400 text-sm">{post.date}</time>
              )}
              {post.excerpt && (
                <p className="mt-4 text-gray-300">{post.excerpt}</p>
              )}
            </article>
          ))}
          {posts.length === 0 && (
            <p className="text-gray-400">No blog posts yet.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
