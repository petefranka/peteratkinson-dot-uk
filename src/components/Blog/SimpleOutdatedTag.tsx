'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { formatArticleAge } from '@/functions';

export default function SimpleOutdatedTag({ date }: { date: string }) {
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 86_400_000);
  if (days <= 90) return null;

  const age = formatArticleAge(date);
  const message = `This one's ${age} old. Things may have moved on since.`;

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span
            data-testid="simple-outdated-tag"
            aria-label={message}
            className="inline-flex items-center px-3 py-1 rounded-full text-base font-medium border blog-outdated-tag cursor-pointer"
          >
            Outdated
          </span>
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
