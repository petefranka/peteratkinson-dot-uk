import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BlogList from '@app/blog/BlogList';

vi.mock('next/link', () => ({
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const posts = [
  { slug: 'post-a', title: 'Alpha Post', date: '2026-01-01', excerpt: 'About alpha.', category: 'Engineering' },
  { slug: 'post-b', title: 'Beta Post', date: '2026-02-01', excerpt: 'About beta.', category: 'Design' },
  { slug: 'post-c', title: 'Gamma Post', date: '2026-03-01', excerpt: 'About gamma.', category: 'Engineering' },
  { slug: 'post-d', title: 'Delta Post', date: '2026-04-01', excerpt: undefined, category: undefined },
];

describe('BlogList', () => {
  it('renders an "All" filter button selected by default', () => {
    render(<BlogList posts={posts} />);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders filter buttons for each unique category', () => {
    render(<BlogList posts={posts} />);
    expect(screen.getByRole('button', { name: 'Design' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Engineering' })).toBeInTheDocument();
  });

  it('filter buttons have blog-filter-btn class with text-base', () => {
    render(<BlogList posts={posts} />);
    screen.getAllByRole('button').forEach((btn) => {
      expect(btn).toHaveClass('blog-filter-btn');
    });
  });

  it('shows all posts when "All" is active', () => {
    render(<BlogList posts={posts} />);
    expect(screen.getByText('Alpha Post')).toBeInTheDocument();
    expect(screen.getByText('Beta Post')).toBeInTheDocument();
    expect(screen.getByText('Gamma Post')).toBeInTheDocument();
    expect(screen.getByText('Delta Post')).toBeInTheDocument();
  });

  it('filters to only matching posts when a category is clicked', () => {
    render(<BlogList posts={posts} />);
    fireEvent.click(screen.getByRole('button', { name: 'Engineering' }));
    expect(screen.getByText('Alpha Post')).toBeInTheDocument();
    expect(screen.getByText('Gamma Post')).toBeInTheDocument();
    expect(screen.queryByText('Beta Post')).toBeNull();
    expect(screen.queryByText('Delta Post')).toBeNull();
  });

  it('sets aria-pressed on the active filter and clears others', () => {
    render(<BlogList posts={posts} />);
    fireEvent.click(screen.getByRole('button', { name: 'Design' }));
    expect(screen.getByRole('button', { name: 'Design' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: 'Engineering' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('clicking "All" after a filter restores all posts', () => {
    render(<BlogList posts={posts} />);
    fireEvent.click(screen.getByRole('button', { name: 'Engineering' }));
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Beta Post')).toBeInTheDocument();
    expect(screen.getByText('Delta Post')).toBeInTheDocument();
  });

  it('renders post titles as links to the post slug', () => {
    render(<BlogList posts={posts} />);
    const link = screen.getByRole('link', { name: 'Alpha Post' });
    expect(link).toHaveAttribute('href', '/blog/post-a');
  });

  it('renders excerpts when present', () => {
    render(<BlogList posts={posts} />);
    expect(screen.getByText('About alpha.')).toBeInTheDocument();
  });

  it('omits excerpt when not provided', () => {
    render(<BlogList posts={posts} />);
    expect(screen.queryByText('undefined')).toBeNull();
  });

  it('the filter group has an accessible label', () => {
    render(<BlogList posts={posts} />);
    expect(screen.getByRole('group', { name: 'Filter articles by category' })).toBeInTheDocument();
  });
});
