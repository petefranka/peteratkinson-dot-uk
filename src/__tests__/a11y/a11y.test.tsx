import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe } from 'jest-axe';

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) =>
      <div className={className} style={style}>{children}</div>,
    button: ({ children, className, style, onClick, 'aria-expanded': ariaExpanded, 'aria-controls': ariaControls, 'aria-label': ariaLabel }: any) =>
      <button className={className} style={style} onClick={onClick} aria-expanded={ariaExpanded} aria-controls={ariaControls} aria-label={ariaLabel}>{children}</button>,
    span: ({ children, className, 'aria-hidden': ariaHidden }: { children?: React.ReactNode; className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }) =>
      <span className={className} aria-hidden={ariaHidden}>{children}</span>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('@radix-ui/react-tooltip', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Root: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Trigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Content: ({ children }: { children: React.ReactNode }) => <div role="tooltip">{children}</div>,
  Arrow: () => null,
}));

import HeroHeading from '@/components/Home/HeroHeading';
import { CategoryTag, OutdatedTag, SimpleOutdatedTag } from '@/components/Blog';
import BionicReadingToggle from '@/components/Blog/BionicReadingToggle';
import AvailabilityBadge from '@/components/Home/AvailabilityBadge';
import ChevronIcon from '@/components/Home/ChevronIcon';
import HamburgerMenu from '@/components/Home/HamburgerMenu';
import PageNav from '@/components/Home/PageNav';
import ScrollIndicator from '@/components/Home/ScrollIndicator';
import { Section } from '@/components/Home/Section';
import SiteFooter from '@/components/Home/SiteFooter';
import SiteShell from '@/components/Home/SiteShell';
import TextLink from '@/components/Home/TextLink';
import ValuesAccordion from '@/components/Home/ValuesAccordion';
import WorkAccordion from '@/components/Home/WorkAccordion';
import BlogList from '@app/blog/BlogList';

const valuesItems = [
  { value: 'first', title: 'First Item', children: <p>First content</p> },
  { value: 'second', title: 'Second Item', children: <p>Second content</p> },
];

const workItems = [
  { value: 'job-one', title: 'Company A', date: "Jan '20 – Jan '21", children: <p>Work content</p> },
  { value: 'job-two', title: 'Company B', children: <p>More work content</p> },
];

const posts = [
  { slug: 'post-a', title: 'Alpha Post', date: '2024-01-01', excerpt: 'About alpha.', category: 'Engineering' },
  { slug: 'post-b', title: 'Beta Post', date: '2024-02-01', excerpt: 'About beta.', category: 'Design' },
];

describe('a11y', () => {
  it('AvailabilityBadge has no violations', async () => {
    const { container } = render(<AvailabilityBadge />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('CategoryTag has no violations', async () => {
    const { container } = render(<CategoryTag category="Engineering" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('ChevronIcon has no violations', async () => {
    const { container } = render(<ChevronIcon />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('HamburgerMenu has no violations', async () => {
    const { container } = render(<HamburgerMenu />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('HeroHeading has no violations', async () => {
    const { container } = render(<HeroHeading />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('OutdatedTag has no violations', async () => {
    const { container } = render(<OutdatedTag date="2024-01-01" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('PageNav has no violations', async () => {
    const { container } = render(<PageNav />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('ScrollIndicator has no violations', async () => {
    const { container } = render(<ScrollIndicator />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Section has no violations', async () => {
    const { container } = render(<Section title="About Me"><p>Content here.</p></Section>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('SimpleOutdatedTag has no violations', async () => {
    const { container } = render(<SimpleOutdatedTag date="2024-01-01" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('SiteFooter has no violations', async () => {
    const { container } = render(<SiteFooter />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('SiteShell has no violations', async () => {
    const { container } = render(<SiteShell><p>Page content.</p></SiteShell>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('TextLink (internal) has no violations', async () => {
    const { container } = render(<TextLink href="/about">About me</TextLink>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('BionicReadingToggle has no violations', async () => {
    const { container } = render(<BionicReadingToggle contentSelector=".blog-post__content" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('ValuesAccordion has no violations', async () => {
    const { container } = render(<ValuesAccordion items={valuesItems} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('WorkAccordion has no violations', async () => {
    const { container } = render(<WorkAccordion items={workItems} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('BlogList has no violations', async () => {
    const { container } = render(<BlogList posts={posts} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
