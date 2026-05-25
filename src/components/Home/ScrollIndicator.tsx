'use client';

import { useState, useEffect } from 'react';

export default function ScrollIndicator() {
  // null = not yet mounted (SSR + first client render match — no inline style)
  const [hidden, setHidden] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setHidden(window.scrollY > 50);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <a
      href="#values"
      aria-label="Scroll to content"
      data-testid="scroll-indicator"
      className="absolute bottom-6 left-0 w-fit text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-all duration-300
        focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[3px] rounded-sm"
      style={hidden === null ? undefined : { opacity: hidden ? 0 : 1, pointerEvents: hidden ? 'none' : 'auto' }}
    >
      <div className="scroll-bounce">
        <svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  );
}
