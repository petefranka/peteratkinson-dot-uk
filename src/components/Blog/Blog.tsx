import './Blog.css';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "On the Art of Slowing Down",
    excerpt: "In a world obsessed with productivity, I've been experimenting with intentional slowness.",
    date: "Jan 2025",
    category: "Philosophy",
    image: "/placeholder.svg",
    link: "#"
  },
  {
    title: "Building Design Systems That Scale",
    excerpt: "Lessons from creating and maintaining design systems at growing companies.",
    date: "Dec 2024",
    category: "Design",
    image: "/placeholder.svg",
    link: "#"
  },
  {
    title: "A Year of Reading",
    excerpt: "Reflections on the books that shaped my thinking this year.",
    date: "Nov 2024",
    category: "Reading",
    image: "/placeholder.svg",
    link: "#"
  },
  {
    title: "Why I Still Use a Paper Notebook",
    excerpt: "In an age of digital tools, there's something irreplaceable about putting pen to paper.",
    date: "Oct 2024",
    category: "Tools",
    image: "/placeholder.svg",
    link: "#"
  }
];

const Blog = () => {
  // Show only the 3 latest blog posts
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="blog">
      <div className="blog__container">
        <h2 className="blog__title">Writing</h2>
        <div className="blog__grid">
          {latestPosts.map((post, index) => (
            <article key={index} className="blog__card">
              <a href={post.link} className="blog__card-link">
                <div className="blog__image-wrapper">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="blog__image"
                  />
                  <span className="blog__category">{post.category}</span>
                </div>
                <div className="blog__content">
                  <h3 className="blog__card-title">{post.title}</h3>
                  <p className="blog__excerpt">{post.excerpt}</p>
                </div>
                <div className="blog__read-more">
                  <span>Read full Article</span>
                  <span className="blog__arrow">→</span>
                </div>
              </a>
            </article>
          ))}
        </div>
        <div className="blog__button-wrapper">
          <a href="#" className="blog__button">View all Articles</a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
