'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ReactNode, useState, useEffect } from 'react';
import ChevronIcon from './ChevronIcon';

interface ValuesItem {
  value: string;
  title: string;
  children: ReactNode;
}

function ValuesAccordionItem({ value, title, children }: ValuesItem) {
  return (
    <Accordion.Item
      value={value}
      data-testid="accordion-item"
      className="border-t border-[var(--border-subtle)] first:border-t-0 pt-8 first:pt-0"
    >
      <Accordion.Header asChild>
        <h3 className="site-article-title">
          <Accordion.Trigger
            data-testid="accordion-trigger"
            className="flex items-center justify-between w-full text-left gap-4 group
              focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[3px] rounded-sm"
          >
            <span>{title}</span>
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

interface ValuesAccordionProps {
  items: Omit<ValuesItem, never>[];
}

const DESKTOP_MQ = '(min-width: 1024px)';

export default function ValuesAccordion({ items }: ValuesAccordionProps) {
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
      data-testid="values-accordion"
      className="flex flex-col gap-8"
    >
      {items.map((item) => (
        <ValuesAccordionItem key={item.value} {...item} />
      ))}
    </Accordion.Root>
  );
}
