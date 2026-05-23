import { formatArticleAge } from '@/functions';

interface OutdatedTagProps {
  date: string;
}

export default function OutdatedTag({ date }: OutdatedTagProps) {
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 86_400_000);
  if (days <= 90) return null;

  const age = formatArticleAge(date);

  return (
    <aside className="blog-outdated" aria-label="Article age notice">
      <p>
        This one&apos;s {age} old. Things may have moved on since.
      </p>
    </aside>
  );
}
