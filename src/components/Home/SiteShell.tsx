import Link from 'next/link';
import { ReactNode } from 'react';
import SiteFooter from './SiteFooter';

interface SiteShellProps {
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
}

export default function SiteShell({
  children,
  backHref = '/',
  backLabel = '← Home',
}: SiteShellProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content">
        <div className="container lg:ml-32 max-w-5xl flex flex-col gap-16 pt-28 pb-16 lg:pt-40 px-8">
          <div className="site-dot" aria-hidden="true" />
          <Link href={backHref} className="site-link w-fit text-lg">
            {backLabel}
          </Link>
          {children}
          <SiteFooter />
        </div>
      </main>
    </>
  );
}
