import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('@tippyjs/react', () => ({
  default: ({ children }: { children: React.ReactElement }) => children,
}));

import { SimpleOutdatedTag } from '@/components/Blog';

describe('SimpleOutdatedTag', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-23'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns null for articles under 90 days old', () => {
    const { container } = render(<SimpleOutdatedTag date="2026-05-01" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders "Outdated" for articles over 90 days old', () => {
    render(<SimpleOutdatedTag date="2025-11-23" />);
    expect(screen.getByText('Outdated')).toBeInTheDocument();
  });

  it('has text-base class for accessibility', () => {
    render(<SimpleOutdatedTag date="2025-11-23" />);
    expect(screen.getByText('Outdated')).toHaveClass('text-base');
  });

  it('has the blog-outdated-tag styling class', () => {
    render(<SimpleOutdatedTag date="2025-11-23" />);
    expect(screen.getByText('Outdated')).toHaveClass('blog-outdated-tag');
  });

  it('has an aria-label describing the age in months', () => {
    render(<SimpleOutdatedTag date="2025-11-23" />);
    expect(screen.getByText('Outdated')).toHaveAttribute(
      'aria-label',
      "This one's 6 months old. Things may have moved on since."
    );
  });

  it('has an aria-label describing the age in years', () => {
    render(<SimpleOutdatedTag date="2024-05-23" />);
    expect(screen.getByText('Outdated')).toHaveAttribute(
      'aria-label',
      "This one's 2 years old. Things may have moved on since."
    );
  });
});
