'use client';

import { useState } from 'react';

export default function CopyLink() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silent fail
    }
  };

  return (
    <button
      data-testid="copy-link"
      onClick={handleCopy}
      aria-live="polite"
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-base font-medium border transition-colors cursor-pointer
        border-[var(--border-subtle)] text-[var(--text-muted)] bg-transparent hover:bg-[var(--bg-matte-deep)] hover:border-[var(--text-muted)] hover:text-[var(--text-body)]
        focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[3px]"
    >
      {copied ? 'Copied!' : 'Copy link'}
    </button>
  );
}
