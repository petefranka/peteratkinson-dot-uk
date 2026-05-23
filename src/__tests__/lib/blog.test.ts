import { describe, it, expect } from 'vitest';
import { parseFrontmatter, stripFrontmatter } from '@/lib/blog';

describe('parseFrontmatter', () => {
  it('parses required fields', () => {
    const content = `---
title: Hello World
date: 2025-01-15
---
Content here`;

    const result = parseFrontmatter(content);
    expect(result.title).toBe('Hello World');
    expect(result.date).toBe('2025-01-15');
  });

  it('parses all optional fields', () => {
    const content = `---
title: My Post
date: 2025-03-20
excerpt: A short summary
category: Engineering
image: /images/post.jpg
---
Body`;

    const result = parseFrontmatter(content);
    expect(result.excerpt).toBe('A short summary');
    expect(result.category).toBe('Engineering');
    expect(result.image).toBe('/images/post.jpg');
  });

  it('strips surrounding double-quotes from values', () => {
    const content = `---
title: "Quoted Title"
date: 2025-01-01
---
`;
    expect(parseFrontmatter(content).title).toBe('Quoted Title');
  });

  it('strips surrounding single-quotes from values', () => {
    const content = `---
title: My Post
date: '2025-01-01'
---
`;
    expect(parseFrontmatter(content).date).toBe('2025-01-01');
  });

  it('returns empty strings when no frontmatter block exists', () => {
    const result = parseFrontmatter('No frontmatter here');
    expect(result.title).toBe('');
    expect(result.date).toBe('');
  });

  it('returns undefined for missing optional fields', () => {
    const content = `---
title: Minimal
date: 2025-01-01
---
`;
    const result = parseFrontmatter(content);
    expect(result.excerpt).toBeUndefined();
    expect(result.category).toBeUndefined();
    expect(result.image).toBeUndefined();
  });
});

describe('stripFrontmatter', () => {
  it('removes frontmatter block', () => {
    const content = `---
title: Test
date: 2025-01-01
---
This is the body.`;

    expect(stripFrontmatter(content)).toBe('This is the body.');
  });

  it('returns content unchanged when no frontmatter', () => {
    expect(stripFrontmatter('Just some text.')).toBe('Just some text.');
  });

  it('preserves multi-line content after the frontmatter block', () => {
    const content = `---
title: Post
date: 2025-01-01
---
# Heading

Paragraph text.`;

    const stripped = stripFrontmatter(content);
    expect(stripped).toContain('# Heading');
    expect(stripped).toContain('Paragraph text.');
    expect(stripped).not.toContain('title:');
  });
});
