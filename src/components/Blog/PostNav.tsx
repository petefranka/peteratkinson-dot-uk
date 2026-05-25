import Link from 'next/link';

interface PostNavItem {
  slug: string;
  title: string;
}

interface PostNavProps {
  prev?: PostNavItem;
  next?: PostNavItem;
}

export default function PostNav({ prev, next }: PostNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="More articles"
      data-testid="post-nav"
      className="mt-8 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <div>
        {prev && (
          <Link href={`/blog/${prev.slug}`} className="group flex flex-col gap-2 py-2 pr-4">
            <span className="site-muted text-base">← Previous</span>
            <span className="site-link text-lg group-hover:text-[var(--accent-hover)]">{prev.title}</span>
          </Link>
        )}
      </div>
      <div className="sm:text-right">
        {next && (
          <Link href={`/blog/${next.slug}`} className="group flex flex-col gap-2 py-2 sm:pl-4">
            <span className="site-muted text-base">Next →</span>
            <span className="site-link text-lg group-hover:text-[var(--accent-hover)]">{next.title}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
