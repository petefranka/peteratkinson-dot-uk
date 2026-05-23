import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import BlogClient from '@/components/Blog/BlogClient';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, whileInView, viewport, transition, animate, exit, ...props }: any) => (
      <div {...props}>{children}</div>
    ),
  },
}));

vi.mock('next/link', () => ({
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

vi.mock('@/components/Blog/OutdatedTag', () => ({
  default: ({ daysOld }: { daysOld: number }) => (
    <span data-testid="outdated-tag">{daysOld} days old</span>
  ),
}));

const FIXED_NOW = new Date('2025-06-01T00:00:00.000Z');

const mockPosts = [
  {
    slug: 'recent-post',
    title: 'Recent Post',
    date: '2025-05-20',
    excerpt: 'A recent article',
    category: 'Engineering',
    image: '/images/post1.jpg',
  },
  {
    slug: 'old-post',
    title: 'Old Post',
    date: '2020-01-01',
    excerpt: 'An old article',
  },
  {
    slug: 'third-post',
    title: 'Third Post',
    date: '2024-01-01',
  },
];

describe('BlogClient', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders post titles', () => {
    render(<BlogClient posts={mockPosts} />);
    expect(screen.getByText('Recent Post')).toBeInTheDocument();
    expect(screen.getByText('Old Post')).toBeInTheDocument();
    expect(screen.getByText('Third Post')).toBeInTheDocument();
  });

  it('limits to the first 3 posts when more are provided', () => {
    const fourPosts = [
      ...mockPosts,
      { slug: 'fourth', title: 'Fourth Post', date: '2025-01-01' },
    ];
    render(<BlogClient posts={fourPosts} />);
    expect(screen.queryByText('Fourth Post')).not.toBeInTheDocument();
  });

  it('shows empty message when posts array is empty', () => {
    render(<BlogClient posts={[]} />);
    expect(screen.getByText(/no blog posts yet/i)).toBeInTheDocument();
  });

  it('renders the post excerpt when present', () => {
    render(<BlogClient posts={[mockPosts[0]]} />);
    expect(screen.getByText('A recent article')).toBeInTheDocument();
  });

  it('renders the category badge when present', () => {
    render(<BlogClient posts={[mockPosts[0]]} />);
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });

  it('shows OutdatedTag for articles older than 90 days', () => {
    render(<BlogClient posts={[mockPosts[1]]} />);
    expect(screen.getByTestId('outdated-tag')).toBeInTheDocument();
  });

  it('does not show OutdatedTag for articles within 90 days', () => {
    render(<BlogClient posts={[mockPosts[0]]} />);
    expect(screen.queryByTestId('outdated-tag')).not.toBeInTheDocument();
  });

  it('links each post card to its slug', () => {
    render(<BlogClient posts={[mockPosts[0]]} />);
    const cardLinks = screen.getAllByRole('link').filter((l) =>
      l.getAttribute('href')?.startsWith('/blog/')
    );
    expect(cardLinks[0]).toHaveAttribute('href', '/blog/recent-post');
  });

  it('renders a "View all Articles" link to /blog', () => {
    render(<BlogClient posts={mockPosts} />);
    const viewAll = screen.getByRole('link', { name: /view all articles/i });
    expect(viewAll).toHaveAttribute('href', '/blog');
  });

  it('uses the placeholder image when no image is provided', () => {
    render(<BlogClient posts={[mockPosts[1]]} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/placeholder.svg');
  });
});
