'use client';

import { useState, useEffect } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      data-testid="reading-progress"
      className="fixed top-0 left-0 z-50 h-[5px] motion-reduce:transition-none transition-[width] duration-100"
      style={{ width: `${progress}%`, background: 'linear-gradient(to right, var(--accent-soft), var(--accent))' }}
    />
  );
}
