import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TextLink from '@/components/Home/TextLink';

vi.mock('next/link', () => ({
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('TextLink', () => {
  it('renders external anchor with target="_blank" for http URLs', () => {
    render(<TextLink href="http://example.com">Click me</TextLink>);
    const link = screen.getByRole('link', { name: /click me/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders external anchor with target="_blank" for https URLs', () => {
    render(<TextLink href="https://example.com">External</TextLink>);
    expect(screen.getByRole('link', { name: /external/i })).toHaveAttribute('target', '_blank');
  });

  it('includes a screen-reader-only "opens in new tab" label for external links', () => {
    render(<TextLink href="https://example.com">Link</TextLink>);
    expect(screen.getByText('(opens in new tab)')).toBeInTheDocument();
  });

  it('renders a Next.js Link for internal paths starting with /', () => {
    render(<TextLink href="/about">About</TextLink>);
    const link = screen.getByRole('link', { name: /about/i });
    expect(link).toHaveAttribute('href', '/about');
    expect(link).not.toHaveAttribute('target');
  });

  it('forces external rendering when external prop is true on an internal path', () => {
    render(<TextLink href="/local" external>Forced external</TextLink>);
    expect(screen.getByRole('link', { name: /forced external/i })).toHaveAttribute('target', '_blank');
  });

  it('renders a plain anchor for non-http, non-path hrefs (e.g. mailto)', () => {
    render(<TextLink href="mailto:test@test.com">Email</TextLink>);
    const link = screen.getByRole('link', { name: /email/i });
    expect(link).toHaveAttribute('href', 'mailto:test@test.com');
    expect(link).not.toHaveAttribute('target');
  });
});
