import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

import PostNav from '@/components/Blog/PostNav';

const prev = { slug: 'older-post', title: 'Older Post' };
const next = { slug: 'newer-post', title: 'Newer Post' };

describe('PostNav', () => {
  it('renders nothing when no prev or next', () => {
    const { container } = render(<PostNav />);
    expect(container.firstChild).toBeNull();
  });

  it('renders when prev is provided', () => {
    render(<PostNav prev={prev} />);
    expect(screen.getByTestId('post-nav')).toBeInTheDocument();
  });

  it('renders when next is provided', () => {
    render(<PostNav next={next} />);
    expect(screen.getByTestId('post-nav')).toBeInTheDocument();
  });

  it('renders prev link with correct href', () => {
    render(<PostNav prev={prev} />);
    expect(screen.getByRole('link', { name: /Older Post/ })).toHaveAttribute('href', '/blog/older-post');
  });

  it('renders next link with correct href', () => {
    render(<PostNav next={next} />);
    expect(screen.getByRole('link', { name: /Newer Post/ })).toHaveAttribute('href', '/blog/newer-post');
  });

  it('renders both prev and next', () => {
    render(<PostNav prev={prev} next={next} />);
    expect(screen.getByRole('link', { name: /Older Post/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Newer Post/ })).toBeInTheDocument();
  });

  it('has accessible nav label', () => {
    render(<PostNav prev={prev} />);
    expect(screen.getByRole('navigation', { name: 'More articles' })).toBeInTheDocument();
  });
});
