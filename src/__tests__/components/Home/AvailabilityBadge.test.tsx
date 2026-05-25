import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AvailabilityBadge from '@/components/Home/AvailabilityBadge';

describe('AvailabilityBadge', () => {
  it('renders', () => {
    render(<AvailabilityBadge />);
    expect(screen.getByTestId('availability-badge')).toBeInTheDocument();
  });

  it('displays "Available for work" text', () => {
    render(<AvailabilityBadge />);
    expect(screen.getByTestId('availability-badge')).toHaveTextContent('Available for work');
  });

  it('applies the availability-badge class', () => {
    render(<AvailabilityBadge />);
    expect(screen.getByTestId('availability-badge')).toHaveClass('availability-badge');
  });

  it('renders the pulsing dot indicator', () => {
    render(<AvailabilityBadge />);
    const badge = screen.getByTestId('availability-badge');
    const pingSpan = badge.querySelector('.availability-ping');
    expect(pingSpan).toBeInTheDocument();
  });

  it('renders the solid dot indicator', () => {
    render(<AvailabilityBadge />);
    const badge = screen.getByTestId('availability-badge');
    const dot = badge.querySelector('.availability-dot');
    expect(dot).toBeInTheDocument();
  });

  it('hides the dot indicator from assistive technology', () => {
    render(<AvailabilityBadge />);
    const badge = screen.getByTestId('availability-badge');
    const dotWrapper = badge.querySelector('[aria-hidden="true"]');
    expect(dotWrapper).toBeInTheDocument();
  });

  it('renders as a div element', () => {
    render(<AvailabilityBadge />);
    expect(screen.getByTestId('availability-badge').tagName).toBe('DIV');
  });
});
