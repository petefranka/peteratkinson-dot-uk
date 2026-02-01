import { getAllPosts } from '@/lib/blog';
import BlogClient from './BlogClient';

const Blog = async () => {
  // Fetch all posts
  let allPosts: Array<{ slug: string; title: string; date: string; excerpt?: string; category?: string; image?: string }> = [];
  try {
    allPosts = await getAllPosts();
    console.log('Fetched posts:', allPosts.length);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Continue with empty array if there's an error
  }

  return <BlogClient posts={allPosts} />;
};

export default Blog;
