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
    title: "Lorem Ipsum Dolor Sit Amet",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Jan 2025",
    category: "Philosophy",
    image: "/placeholder.svg",
    link: "#"
  },
  {
    title: "Ut Enim Ad Minim Veniam",
    excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    date: "Dec 2024",
    category: "Design",
    image: "/placeholder.svg",
    link: "#"
  },
  {
    title: "Duis Aute Irure Dolor",
    excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "Nov 2024",
    category: "Reading",
    image: "/placeholder.svg",
    link: "#"
  },
  {
    title: "Excepteur Sint Occaecat",
    excerpt: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
        <div className="blog__layout">
          <div className="blog__sidebar">
              <h2 className="blog__title">
                My Thoughts
                <span className="blog__arrow">→</span>
              </h2>
            <p className="blog__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          
          <div className="blog__content">
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
                    <div className="blog__card-content">
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
        </div>
      </div>
    </section>
  );
};

export default Blog;
