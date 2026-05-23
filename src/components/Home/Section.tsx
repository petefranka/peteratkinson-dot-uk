import { ReactNode } from 'react';
import { slugifyTitle } from '@/lib/slug';
import TextLink from './TextLink';

interface SectionProps {
  title: string;
  id?: string;
  stickyTop?: string;
  children: ReactNode;
}

export function Section({ title, id, stickyTop = 'top-20', children }: SectionProps) {
  const sectionId = id ?? slugifyTitle(title);
  const headingId = `${sectionId}-heading`;

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="grid grid-cols-1 md:grid-cols-[minmax(15rem,18rem)_1fr] gap-10 lg:gap-20"
    >
      <div className="flex flex-col gap-2">
        <h2
          id={headingId}
          className={`text-3xl sm:text-4xl lg:sticky ${stickyTop} site-heading flex items-start gap-3`}
        >
          <span className="site-section-marker" aria-hidden="true" />
          <span className="md:whitespace-nowrap">{title}</span>
        </h2>
      </div>
      <div>{children}</div>
    </section>
  );
}

interface ArticleProps {
  title: string;
  children: ReactNode;
}

export function Article({ title, children }: ArticleProps) {
  return (
    <article className="site-article">
      <h3 className="site-article-title">{title}</h3>
      {children}
    </article>
  );
}

export function Paragraph({ children }: { children: ReactNode }) {
  return <p className="mb-6 last:mb-0 site-body">{children}</p>;
}

export function Subheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-xl mt-8 mb-4 site-heading font-sans font-semibold">
      {children}
    </h3>
  );
}

export { TextLink };
