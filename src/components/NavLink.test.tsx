import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NavLink } from '@/components/NavLink';

vi.mock('next/link', () => ({
  default: ({ href, className, children }: any) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn() }));

vi.mock('next/navigation', () => ({ usePathname }));

describe('NavLink', () => {
  it('renders a link with the correct href', () => {
    usePathname.mockReturnValue('/other');
    render(<NavLink href="/about">About</NavLink>);
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
  });

  it('applies activeClassName when pathname matches href', () => {
    usePathname.mockReturnValue('/about');
    render(<NavLink href="/about" activeClassName="active">About</NavLink>);
    expect(screen.getByRole('link', { name: /about/i })).toHaveClass('active');
  });

  it('does not apply activeClassName when pathname does not match', () => {
    usePathname.mockReturnValue('/home');
    render(<NavLink href="/about" activeClassName="active">About</NavLink>);
    expect(screen.getByRole('link', { name: /about/i })).not.toHaveClass('active');
  });

  it('combines className and activeClassName when active', () => {
    usePathname.mockReturnValue('/about');
    render(
      <NavLink href="/about" className="nav-item" activeClassName="nav-item--active">
        About
      </NavLink>
    );
    const link = screen.getByRole('link', { name: /about/i });
    expect(link).toHaveClass('nav-item');
    expect(link).toHaveClass('nav-item--active');
  });
});
