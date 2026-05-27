'use client';

import { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { formatArticleAge } from '@/functions';

export default function SimpleOutdatedTag({ date }: { date: string }) {
  const [open, setOpen] = useState(false);

  const days = Math.floor((Date.now() - new Date(date).getTime()) / 86_400_000);
  if (days <= 90) return null;

  const age = formatArticleAge(date);
  const message = `This one's ${age} old. Things may have moved on since.`;

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <button
            data-testid="simple-outdated-tag"
            aria-label={message}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-base font-medium border blog-outdated-tag cursor-pointer"
          >
            Outdated
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="6.5" r="0.75" fill="currentColor" />
            </svg>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="site-tooltip" sideOffset={6}>
            {message}
            <Tooltip.Arrow className="site-tooltip-arrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
