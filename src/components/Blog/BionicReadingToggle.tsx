'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import InfoTooltip from '../InfoTooltip';

const STORAGE_KEY = 'bionic-reading';

function applyBionic(content: Element) {
  const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (['CODE', 'PRE', 'SCRIPT', 'STYLE', 'STRONG', 'B'].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    textNodes.push(node as Text);
  }

  for (const textNode of textNodes) {
    const parent = textNode.parentNode;
    if (!parent) continue;

    const fragment = document.createDocumentFragment();
    const tokens = (textNode.textContent ?? '').split(/(\s+)/);

    for (const token of tokens) {
      if (!token) continue;
      if (/^\s+$/.test(token)) {
        fragment.appendChild(document.createTextNode(token));
      } else {
        const boldLen = Math.max(1, Math.ceil(token.length / 2));
        const strong = document.createElement('strong');
        strong.textContent = token.slice(0, boldLen);
        fragment.appendChild(strong);
        fragment.appendChild(document.createTextNode(token.slice(boldLen)));
      }
    }

    parent.replaceChild(fragment, textNode);
  }
}

export default function BionicReadingToggle({ contentSelector }: { contentSelector: string }) {
  const [enabled, setEnabled] = useState(false);
  const originalHtml = useRef<string | null>(null);

  const getContent = useCallback(
    () => document.querySelector(contentSelector),
    [contentSelector]
  );

  const enable = useCallback(() => {
    const content = getContent();
    if (!content) return;
    if (originalHtml.current === null) {
      originalHtml.current = content.innerHTML;
    }
    applyBionic(content);
    localStorage.setItem(STORAGE_KEY, '1');
  }, [getContent]);

  const disable = useCallback(() => {
    const content = getContent();
    if (!content || originalHtml.current === null) return;
    content.innerHTML = originalHtml.current;
    originalHtml.current = null;
    localStorage.removeItem(STORAGE_KEY);
  }, [getContent]);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      enable();
      setEnabled(true);
    }
  }, [enable]);

  const toggle = useCallback(() => {
    if (enabled) {
      disable();
    } else {
      enable();
    }
    setEnabled((prev) => !prev);
  }, [enabled, enable, disable]);

  return (
    <div className="flex items-center gap-1.5 w-full sm:w-auto">
      <button
        data-testid="bionic-reading-toggle"
        onClick={toggle}
        aria-pressed={enabled}
        className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-3 py-1 rounded-full text-base font-medium border transition-colors cursor-pointer
          border-[var(--border-subtle)] text-[var(--text-muted)] bg-transparent hover:bg-[var(--bg-matte-deep)] hover:border-[var(--text-muted)] hover:text-[var(--text-body)]
          aria-pressed:bg-[var(--bg-matte-deep)] aria-pressed:text-[var(--text-heading)] aria-pressed:border-[var(--text-muted)]
          focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[3px]"
      >
        <span aria-hidden="true" className="text-sm leading-none">B</span>
        {enabled ? 'Turn off Bionic Reading' : 'Turn on Bionic Reading'}
      </button>
      <InfoTooltip
        label="What is Bionic Reading?"
        content="Bolds the first half of each word to guide your eye. Designed to help people with ADHD and dyslexia improve focus and reading speed."
        side="bottom"
      />
    </div>
  );
}
