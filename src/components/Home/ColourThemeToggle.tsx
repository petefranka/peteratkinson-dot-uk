'use client';

import { useState, useEffect } from 'react';
import { themes, ThemeId, themeColors } from './colourThemes';
import MobileColourThemeToggle from './MobileColourThemeToggle';
import InfoTooltip from '../InfoTooltip';

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
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = themeColors[id] ?? themeColors.default;
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
        <InfoTooltip
          label="What are colour profiles?"
          content="Each profile adapts the site's colours for a different type of colour vision. Protanopia and deuteranopia affect red-green perception, tritanopia affects blue-yellow, and high contrast removes colour entirely for maximum legibility."
        />
      </div>
      <MobileColourThemeToggle value={active} onChange={select} />

      {/* Desktop: pill buttons */}
      <div role="group" aria-label="Colour vision profile" className="hidden sm:flex flex-wrap gap-2">
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
