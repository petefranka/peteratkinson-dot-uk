import Link from 'next/link';
import { ReactNode } from 'react';

interface TextLinkProps {
  href: string;
  children: ReactNode;
  /** Opens in a new tab with accessible labelling */
  external?: boolean;
}

function isExternalHref(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

export default function TextLink({ href, children, external }: TextLinkProps) {
  const openExternal = external ?? isExternalHref(href);

  if (openExternal) {
    return (
      <a
        href={href}
        className="site-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    );
  }

  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link href={href} className="site-link">
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className="site-link">
      {children}
    </a>
  );
}
