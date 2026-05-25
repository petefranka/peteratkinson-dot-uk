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
      <main id="main-content">
        <div className="container lg:ml-32 max-w-5xl flex flex-col gap-16 pt-28 lg:pt-40 px-8">
          <div className="site-dot" aria-hidden="true" />
          <Link href={backHref} className="site-link w-fit text-lg">
            {backLabel}
          </Link>
          {children}
        </div>
      </main>
      <div className="container lg:ml-32 max-w-5xl px-8 pb-16 lg:pb-24 mt-16">
        <SiteFooter />
      </div>
    </>
  );
}
