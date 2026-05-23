import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CategoryTag } from '@/components/Blog';

describe('CategoryTag', () => {
  it('renders', () => {
    render(<CategoryTag category="Engineering" />);
    expect(screen.getByTestId('category-tag')).toBeInTheDocument();
  });

  it('renders the category label', () => {
    render(<CategoryTag category="Engineering" />);
    expect(screen.getByTestId('category-tag')).toHaveTextContent('Engineering');
  });

  it('has text-base class for accessibility', () => {
    render(<CategoryTag category="Design" />);
    expect(screen.getByTestId('category-tag')).toHaveClass('text-base');
  });

  it('has the blog-category-tag styling class', () => {
    render(<CategoryTag category="Design" />);
    expect(screen.getByTestId('category-tag')).toHaveClass('blog-category-tag');
  });

  it('renders as a span', () => {
    render(<CategoryTag category="Writing" />);
    expect(screen.getByTestId('category-tag').tagName).toBe('SPAN');
  });
});
