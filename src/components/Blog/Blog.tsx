import './Blog.css';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "On the Art of Slowing Down",
    excerpt: "In a world obsessed with productivity, I've been experimenting with intentional slowness.",
    date: "Jan 2025"
  },
  {
    title: "Building Design Systems That Scale",
    excerpt: "Lessons from creating and maintaining design systems at growing companies.",
    date: "Dec 2024"
  },
  {
    title: "A Year of Reading",
    excerpt: "Reflections on the books that shaped my thinking this year.",
    date: "Nov 2024"
  },
  {
    title: "Why I Still Use a Paper Notebook",
    excerpt: "In an age of digital tools, there's something irreplaceable about putting pen to paper.",
    date: "Oct 2024"
  }
];

const Blog = () => {
  return (
    <section id="blog" className="blog">
      <div className="blog__container">
        <h2 className="blog__title">Blog</h2>
        <ul className="blog__list">
          {blogPosts.map((post, index) => (
            <li key={index} className="blog__item">
              <a href="#" className="blog__link">
                <span className="blog__date">{post.date}</span>
                <h3 className="blog__post-title">{post.title}</h3>
                <p className="blog__excerpt">{post.excerpt}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Blog;
