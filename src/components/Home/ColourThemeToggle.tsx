'use client';

import { useState, useEffect } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

const themes = [
  { id: 'default',       label: 'Default' },
  { id: 'night',         label: 'Night' },
  { id: 'protanopia',    label: 'Protanopia' },
  { id: 'deuteranopia',  label: 'Deuteranopia' },
  { id: 'tritanopia',    label: 'Tritanopia' },
  { id: 'monochrome',    label: 'Monochrome' },
  { id: 'high-contrast', label: 'High contrast' },
] as const;

type ThemeId = typeof themes[number]['id'];

const STORAGE_KEY = 'colour-theme';

export default function ColourThemeToggle() {
  const [active, setActive] = useState<ThemeId | null>(null);

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) ?? 'default') as ThemeId;
    setActive(saved);
    applyTheme(saved);
  }, []);

  function applyTheme(id: ThemeId) {
    if (id === 'default') {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = id;
    }
  }

  function select(id: ThemeId) {
    setActive(id);
    applyTheme(id);
    localStorage.setItem(STORAGE_KEY, id);
  }

  if (active === null) return null;

  return (
    <div className="flex flex-col gap-3" data-testid="colour-theme-toggle">
      <div className="flex items-center gap-2">
        <p className="site-muted">Choose a colour profile that works best for you.</p>
        <Tooltip.Provider delayDuration={0}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                aria-label="What are colour profiles?"
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
              <Tooltip.Content className="site-tooltip" sideOffset={6} side="top">
                Each profile adapts the site's colours for a different type of colour vision. Protanopia and deuteranopia affect red-green perception, tritanopia affects blue-yellow, and high contrast removes colour entirely for maximum legibility.
                <Tooltip.Arrow className="site-tooltip-arrow" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
      <div role="group" aria-label="Colour vision profile" className="flex flex-wrap gap-2">
        {themes.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => select(id)}
            aria-pressed={active === id}
            data-active={active === id}
            className="blog-filter-btn"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
