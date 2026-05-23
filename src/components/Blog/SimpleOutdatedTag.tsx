'use client';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { formatArticleAge } from '@/functions';

export default function SimpleOutdatedTag({ date }: { date: string }) {
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 86_400_000);
  if (days <= 90) return null;

  const age = formatArticleAge(date);

  return (
    <Tippy content={`This one's ${age} old. Things may have moved on since.`} theme="site">
      <span
        className="inline-flex items-center px-3 py-1 rounded-full text-base font-medium border blog-outdated-tag cursor-pointer"
        aria-label={`This one's ${age} old. Things may have moved on since.`}
      >
        Outdated
      </span>
    </Tippy>
  );
}
