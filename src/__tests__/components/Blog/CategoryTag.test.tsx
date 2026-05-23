import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CategoryTag } from '@/components/Blog';

describe('CategoryTag', () => {
  it('renders the category label', () => {
    render(<CategoryTag category="Engineering" />);
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });

  it('has text-base class for accessibility', () => {
    render(<CategoryTag category="Design" />);
    expect(screen.getByText('Design')).toHaveClass('text-base');
  });

  it('has the blog-category-tag styling class', () => {
    render(<CategoryTag category="Design" />);
    expect(screen.getByText('Design')).toHaveClass('blog-category-tag');
  });

  it('renders as an inline element', () => {
    render(<CategoryTag category="Writing" />);
    expect(screen.getByText('Writing').tagName).toBe('SPAN');
  });
});
