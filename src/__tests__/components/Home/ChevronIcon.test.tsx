import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ChevronIcon from '@/components/Home/ChevronIcon';

describe('ChevronIcon', () => {
  it('renders', () => {
    render(<ChevronIcon />);
    expect(screen.getByTestId('chevron-icon')).toBeInTheDocument();
  });

  it('renders as an svg', () => {
    render(<ChevronIcon />);
    expect(screen.getByTestId('chevron-icon').tagName).toBe('svg');
  });

  it('is hidden from assistive technology', () => {
    render(<ChevronIcon />);
    expect(screen.getByTestId('chevron-icon')).toHaveAttribute('aria-hidden', 'true');
  });
});
