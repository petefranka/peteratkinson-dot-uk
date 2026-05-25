import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import ReadingProgress from '@/components/Blog/ReadingProgress';

describe('ReadingProgress', () => {
  beforeEach(() => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 2000 });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 500 });
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders', () => {
    render(<ReadingProgress />);
    expect(screen.getByTestId('reading-progress')).toBeInTheDocument();
  });

  it('has role="progressbar"', () => {
    render(<ReadingProgress />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('has aria-label', () => {
    render(<ReadingProgress />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Reading progress');
  });

  it('starts at 0% width', () => {
    render(<ReadingProgress />);
    expect(screen.getByTestId('reading-progress')).toHaveStyle({ width: '0%' });
  });

  it('updates width on scroll', () => {
    render(<ReadingProgress />);
    act(() => {
      Object.defineProperty(window, 'scrollY', { configurable: true, value: 750 });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(screen.getByTestId('reading-progress')).toHaveStyle({ width: '50%' });
  });

  it('has aria-valuenow reflecting progress', () => {
    render(<ReadingProgress />);
    act(() => {
      Object.defineProperty(window, 'scrollY', { configurable: true, value: 750 });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
  });
});
