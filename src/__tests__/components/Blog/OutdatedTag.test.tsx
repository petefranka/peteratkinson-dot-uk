import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { OutdatedTag } from '@/components/Blog';

describe('OutdatedTag', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-23'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns null for articles under 90 days old', () => {
    const { container } = render(<OutdatedTag date="2026-05-01" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a notice for articles over 90 days old', () => {
    render(<OutdatedTag date="2025-11-23" />);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('shows age in months for articles under a year old', () => {
    render(<OutdatedTag date="2025-11-23" />);
    expect(screen.getByText(/6 months old/)).toBeInTheDocument();
  });

  it('shows age in years for articles over a year old', () => {
    render(<OutdatedTag date="2024-05-23" />);
    expect(screen.getByText(/2 years old/)).toBeInTheDocument();
  });

  it('uses singular "year" when exactly 1 year old', () => {
    render(<OutdatedTag date="2025-05-23" />);
    expect(screen.getByText(/1 year old/)).toBeInTheDocument();
    expect(screen.queryByText(/1 years old/)).toBeNull();
  });

  it('has the Article age notice aria-label', () => {
    render(<OutdatedTag date="2024-05-23" />);
    expect(screen.getByRole('complementary')).toHaveAttribute('aria-label', 'Article age notice');
  });
});
