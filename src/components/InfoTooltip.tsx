'use client';

import { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface InfoTooltipProps {
  content: string;
  label?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export default function InfoTooltip({ content, label = 'More information', side = 'top' }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <button
            aria-label={label}
            onClick={() => setOpen((v) => !v)}
            className="text-[var(--text-muted)] hover:text-[var(--text-body)] transition-colors focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[3px] rounded-full shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="6.5" r="0.75" fill="currentColor" />
            </svg>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="site-tooltip" sideOffset={6} side={side}>
            {content}
            <Tooltip.Arrow className="site-tooltip-arrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
