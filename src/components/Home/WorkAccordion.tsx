'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ReactNode, useState, useEffect } from 'react';
import ChevronIcon from './ChevronIcon';

interface WorkItem {
  value: string;
  title: string;
  date?: string;
  children: ReactNode;
}

function WorkAccordionItem({ value, title, date, children }: WorkItem) {
  return (
    <Accordion.Item
      value={value}
      data-testid="work-accordion-item"
      className="border-t border-[var(--border-subtle)] first:border-t-0 pt-8 first:pt-0"
    >
      <Accordion.Header asChild>
        <h3 className="site-article-title">
          <Accordion.Trigger
            data-testid="work-accordion-trigger"
            className="flex items-center justify-between w-full text-left gap-4 group
              focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[3px] rounded-sm"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0">
              <span>{title}</span>
              {date && (
                <span className="italic text-base font-sans font-normal text-[var(--text-muted)]">
                  {date}
                </span>
              )}
            </div>
            <ChevronIcon />
          </Accordion.Trigger>
        </h3>
      </Accordion.Header>
      <Accordion.Content className="accordion-content overflow-hidden">
        <div className="pt-4">{children}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

interface WorkAccordionProps {
  items: WorkItem[];
}

const DESKTOP_MQ = '(min-width: 1024px)';

export default function WorkAccordion({ items }: WorkAccordionProps) {
  // null = not yet hydrated (SSR + first client render)
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const allValues = items.map((i) => i.value);
  const firstValues = allValues.slice(0, 1);

  return (
    <Accordion.Root
      key={isDesktop === null ? 'ssr' : isDesktop ? 'desktop' : 'mobile'}
      type="multiple"
      defaultValue={isDesktop === true ? allValues : firstValues}
      data-testid="work-accordion"
      className="flex flex-col gap-8"
    >
      {items.map((item) => (
        <WorkAccordionItem key={item.value} {...item} />
      ))}
    </Accordion.Root>
  );
}
