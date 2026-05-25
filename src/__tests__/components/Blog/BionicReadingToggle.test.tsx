import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('@radix-ui/react-tooltip', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => children,
  Root: ({ children }: { children: React.ReactNode }) => children,
  Trigger: ({ children }: { children: React.ReactNode }) => children,
  Portal: ({ children }: { children: React.ReactNode }) => children,
  Content: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Arrow: () => null,
}));

import BionicReadingToggle from '@/components/Blog/BionicReadingToggle';

const SELECTOR = '.blog-post__content';

function renderWithContent(html = '<p>Hello world</p>') {
  const content = document.createElement('div');
  content.className = 'blog-post__content';
  content.innerHTML = html;
  document.body.appendChild(content);
  render(<BionicReadingToggle contentSelector={SELECTOR} />);
  return content;
}

describe('BionicReadingToggle', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('renders', () => {
    renderWithContent();
    expect(screen.getByTestId('bionic-reading-toggle')).toBeInTheDocument();
  });

  it('renders as a button', () => {
    renderWithContent();
    expect(screen.getByTestId('bionic-reading-toggle').tagName).toBe('BUTTON');
  });

  it('shows "Turn on Bionic Reading" by default', () => {
    renderWithContent();
    expect(screen.getByTestId('bionic-reading-toggle')).toHaveTextContent('Turn on Bionic Reading');
  });

  it('has aria-pressed false by default', () => {
    renderWithContent();
    expect(screen.getByTestId('bionic-reading-toggle')).toHaveAttribute('aria-pressed', 'false');
  });

  it('has text-base class for accessibility', () => {
    renderWithContent();
    expect(screen.getByTestId('bionic-reading-toggle')).toHaveClass('text-base');
  });

  it('shows "Turn off Bionic Reading" after clicking', () => {
    renderWithContent();
    fireEvent.click(screen.getByTestId('bionic-reading-toggle'));
    expect(screen.getByTestId('bionic-reading-toggle')).toHaveTextContent('Turn off Bionic Reading');
  });

  it('sets aria-pressed true after clicking', () => {
    renderWithContent();
    fireEvent.click(screen.getByTestId('bionic-reading-toggle'));
    expect(screen.getByTestId('bionic-reading-toggle')).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows "Turn on Bionic Reading" after toggling off', () => {
    renderWithContent();
    const btn = screen.getByTestId('bionic-reading-toggle');
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(btn).toHaveTextContent('Turn on Bionic Reading');
  });

  it('sets aria-pressed false after toggling off', () => {
    renderWithContent();
    const btn = screen.getByTestId('bionic-reading-toggle');
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-pressed', 'false');
  });

  it('saves preference to localStorage when enabled', () => {
    renderWithContent();
    fireEvent.click(screen.getByTestId('bionic-reading-toggle'));
    expect(localStorage.getItem('bionic-reading')).toBe('1');
  });

  it('removes preference from localStorage when disabled', () => {
    renderWithContent();
    const btn = screen.getByTestId('bionic-reading-toggle');
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(localStorage.getItem('bionic-reading')).toBeNull();
  });

  it('applies bold tags to content words when enabled', () => {
    const content = renderWithContent('<p>Hello world</p>');
    fireEvent.click(screen.getByTestId('bionic-reading-toggle'));
    expect(content.querySelectorAll('strong').length).toBeGreaterThan(0);
  });

  it('restores original content when disabled', () => {
    const original = '<p>Hello world</p>';
    const content = renderWithContent(original);
    const btn = screen.getByTestId('bionic-reading-toggle');
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(content.innerHTML).toBe(original);
  });

  it('does not bold text inside code elements', () => {
    const content = renderWithContent('<pre><code>const x = 1;</code></pre>');
    fireEvent.click(screen.getByTestId('bionic-reading-toggle'));
    expect(content.querySelectorAll('strong').length).toBe(0);
  });

  it('restores from localStorage preference on mount', () => {
    localStorage.setItem('bionic-reading', '1');
    renderWithContent('<p>Hello world</p>');
    expect(screen.getByTestId('bionic-reading-toggle')).toHaveTextContent('Turn off Bionic Reading');
    expect(screen.getByTestId('bionic-reading-toggle')).toHaveAttribute('aria-pressed', 'true');
  });
});
