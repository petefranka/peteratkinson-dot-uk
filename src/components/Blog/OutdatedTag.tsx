'use client';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface OutdatedTagProps {
  daysOld: number;
  className?: string;
}

export default function OutdatedTag({ daysOld, className = 'blog__outdated' }: OutdatedTagProps) {
  return (
    <Tippy
      content={`This article is ${daysOld} days old. Content may be outdated.`}
      placement="top"
      theme="dark"
    >
      <span className={className}>
        Outdated
      </span>
    </Tippy>
  );
}
