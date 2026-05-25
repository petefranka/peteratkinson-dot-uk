import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeroHeading from '@/components/Home/HeroHeading';

describe('HeroHeading', () => {
  it('renders', () => {
    render(<HeroHeading />);
    expect(screen.getByTestId('hero-heading')).toBeInTheDocument();
  });

  it('renders as an h1', () => {
    render(<HeroHeading />);
    expect(screen.getByTestId('hero-heading').tagName).toBe('H1');
  });

  it('has the correct id for aria-labelledby', () => {
    render(<HeroHeading />);
    expect(screen.getByTestId('hero-heading')).toHaveAttribute('id', 'hero-heading');
  });

  it('renders the headline text', () => {
    render(<HeroHeading />);
    expect(screen.getByText(/Engineer and writer/)).toBeInTheDocument();
  });
});
