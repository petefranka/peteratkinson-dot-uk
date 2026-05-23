import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Section, Article, Paragraph, Subheading } from '@/components/Home/Section';

vi.mock('next/link', () => ({
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('Section', () => {
  it('renders the title', () => {
    render(<Section title="About Me"><p>content</p></Section>);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('generates section id from the slugified title', () => {
    render(<Section title="About Me"><p>content</p></Section>);
    expect(document.querySelector('section')).toHaveAttribute('id', 'about-me');
  });

  it('uses the explicit id prop when provided', () => {
    render(<Section title="About Me" id="custom-id"><p>content</p></Section>);
    expect(document.querySelector('section')).toHaveAttribute('id', 'custom-id');
  });

  it('wires aria-labelledby to the heading id', () => {
    render(<Section title="About Me"><p>content</p></Section>);
    const section = document.querySelector('section')!;
    const heading = screen.getByRole('heading', { name: 'About Me' });
    expect(section).toHaveAttribute('aria-labelledby', heading.id);
  });

  it('renders children', () => {
    render(<Section title="Test"><span data-testid="child">hello</span></Section>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});

describe('Article', () => {
  it('renders the title and children', () => {
    render(<Article title="My Article"><p>Body text</p></Article>);
    expect(screen.getByText('My Article')).toBeInTheDocument();
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });
});

describe('Paragraph', () => {
  it('renders children inside a <p> tag', () => {
    render(<Paragraph>Some text</Paragraph>);
    expect(screen.getByText('Some text').tagName).toBe('P');
  });
});

describe('Subheading', () => {
  it('renders children inside an <h3> tag', () => {
    render(<Subheading>Sub title</Subheading>);
    expect(screen.getByText('Sub title').tagName).toBe('H3');
  });
});
