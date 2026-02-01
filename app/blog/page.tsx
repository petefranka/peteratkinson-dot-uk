import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { getAllPosts } from '@/lib/blog';
import BlogList from './BlogList';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="blog-page">
      <Header />
      <main className="blog-page__main">
        <BlogList posts={posts} />
      </main>
      <Footer />
    </div>
  );
}
