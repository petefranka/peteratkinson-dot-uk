import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import CopyLink from '@/components/Blog/CopyLink';

describe('CopyLink', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders', () => {
    render(<CopyLink />);
    expect(screen.getByTestId('copy-link')).toBeInTheDocument();
  });

  it('renders as a button', () => {
    render(<CopyLink />);
    expect(screen.getByTestId('copy-link').tagName).toBe('BUTTON');
  });

  it('shows "Copy link" by default', () => {
    render(<CopyLink />);
    expect(screen.getByTestId('copy-link')).toHaveTextContent('Copy link');
  });

  it('shows "Copied!" after clicking', async () => {
    render(<CopyLink />);
    await act(async () => {
      fireEvent.click(screen.getByTestId('copy-link'));
    });
    expect(screen.getByTestId('copy-link')).toHaveTextContent('Copied!');
  });

  it('reverts to "Copy link" after 2 seconds', async () => {
    render(<CopyLink />);
    await act(async () => {
      fireEvent.click(screen.getByTestId('copy-link'));
    });
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByTestId('copy-link')).toHaveTextContent('Copy link');
  });

  it('calls clipboard.writeText with current URL', async () => {
    render(<CopyLink />);
    await act(async () => {
      fireEvent.click(screen.getByTestId('copy-link'));
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(window.location.href);
  });

  it('has aria-live="polite"', () => {
    render(<CopyLink />);
    expect(screen.getByTestId('copy-link')).toHaveAttribute('aria-live', 'polite');
  });
});
