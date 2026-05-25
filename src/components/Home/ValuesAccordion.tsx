'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ReactNode } from 'react';

interface ValuesItem {
  value: string;
  title: string;
  children: ReactNode;
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-data-[state=open]:rotate-180"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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

export default function ValuesAccordion({ items }: ValuesAccordionProps) {
  return (
    <Accordion.Root
      type="multiple"
      defaultValue={items.map((item) => item.value)}
      data-testid="values-accordion"
      className="flex flex-col gap-8"
    >
      {items.map((item) => (
        <ValuesAccordionItem key={item.value} {...item} />
      ))}
    </Accordion.Root>
  );
}
