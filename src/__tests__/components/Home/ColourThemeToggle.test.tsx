import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('@radix-ui/react-tooltip', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Root: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Trigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Content: ({ children }: { children: React.ReactNode }) => <div role="tooltip">{children}</div>,
  Arrow: () => null,
}));

import ColourThemeToggle from '@/components/Home/ColourThemeToggle';

describe('ColourThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  afterEach(() => {
    delete document.documentElement.dataset.theme;
    vi.restoreAllMocks();
  });

  it('renders', () => {
    render(<ColourThemeToggle />);
    expect(screen.getByTestId('colour-theme-toggle')).toBeInTheDocument();
  });

  it('renders all theme buttons', () => {
    render(<ColourThemeToggle />);
    ['Default', 'Night', 'Protanopia', 'Deuteranopia', 'Tritanopia', 'Monochrome', 'High contrast'].forEach((label) => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    });
  });

  it('has Default active by default', () => {
    render(<ColourThemeToggle />);
    expect(screen.getByRole('button', { name: 'Default' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('does not set data-theme attribute by default', () => {
    render(<ColourThemeToggle />);
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });

  it('sets data-theme on the html element when a theme is selected', () => {
    render(<ColourThemeToggle />);
    fireEvent.click(screen.getByRole('button', { name: 'Night' }));
    expect(document.documentElement.dataset.theme).toBe('night');
  });

  it('saves selected theme to localStorage', () => {
    render(<ColourThemeToggle />);
    fireEvent.click(screen.getByRole('button', { name: 'Protanopia' }));
    expect(localStorage.getItem('colour-theme')).toBe('protanopia');
  });

  it('removes data-theme when Default is re-selected', () => {
    render(<ColourThemeToggle />);
    fireEvent.click(screen.getByRole('button', { name: 'Night' }));
    fireEvent.click(screen.getByRole('button', { name: 'Default' }));
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });

  it('marks the selected theme as active with aria-pressed', () => {
    render(<ColourThemeToggle />);
    fireEvent.click(screen.getByRole('button', { name: 'Night' }));
    expect(screen.getByRole('button', { name: 'Night' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Default' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('restores saved theme from localStorage on mount', () => {
    localStorage.setItem('colour-theme', 'protanopia');
    render(<ColourThemeToggle />);
    expect(screen.getByRole('button', { name: 'Protanopia' })).toHaveAttribute('aria-pressed', 'true');
    expect(document.documentElement.dataset.theme).toBe('protanopia');
  });

  it('has an accessible group label', () => {
    render(<ColourThemeToggle />);
    expect(screen.getByRole('group', { name: 'Colour vision profile' })).toBeInTheDocument();
  });

  it('has an info button with an accessible label', () => {
    render(<ColourThemeToggle />);
    expect(screen.getByRole('button', { name: 'What are colour profiles?' })).toBeInTheDocument();
  });

  it('each theme sets the correct data-theme value', () => {
    const themeCases: [string, string][] = [
      ['Night', 'night'],
      ['Protanopia', 'protanopia'],
      ['Deuteranopia', 'deuteranopia'],
      ['Tritanopia', 'tritanopia'],
      ['Monochrome', 'monochrome'],
      ['High contrast', 'high-contrast'],
    ];
    render(<ColourThemeToggle />);
    themeCases.forEach(([label, value]) => {
      fireEvent.click(screen.getByRole('button', { name: label }));
      expect(document.documentElement.dataset.theme).toBe(value);
    });
  });
});
