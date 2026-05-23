import TextLink from './TextLink';
import { email, linkedInUrl } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="flex flex-col gap-6 pt-16 border-t border-[var(--border-subtle)] text-left">
      <p className="text-2xl sm:text-3xl site-heading leading-snug">
        Made with love in Yorkshire.
      </p>
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-8 site-body text-lg">
        <TextLink href={`mailto:${email}`}>{email}</TextLink>
        <TextLink href={linkedInUrl} external>
          LinkedIn
        </TextLink>
      </div>
      <p className="site-muted">
        © {new Date().getFullYear()} Peter Atkinson. Built with accessibility in
        mind —{' '}
        <TextLink href={`mailto:${email}?subject=Accessibility%20feedback`}>
          report an issue
        </TextLink>
        .
      </p>
    </footer>
  );
}
