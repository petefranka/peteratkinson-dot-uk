# peteratkinson.co.uk

Personal portfolio and blog site for Peter Atkinson, Senior Engineer.

## Tech Stack

- **Next.js 15** with App Router (migrated from Vite)
- **React 18** — server and client components
- **TypeScript**
- **Tailwind CSS** + custom CSS per-component
- **MDX** for blog posts (`content/blog/*.mdx`)
- **Framer Motion** for animations
- **Vitest** + Testing Library for tests

## Project Structure

```
app/                  # Next.js App Router (pages, layouts, route handlers)
  blog/[slug]/        # Dynamic blog post pages
  feed.xml/route.ts   # RSS feed generation
  sitemap.ts          # Dynamic sitemap
src/
  components/         # React components
    Home/             # Homepage sections (Section, TextLink, PageNav, etc.)
  lib/
    blog.ts           # MDX file parsing and getAllPosts()
    slug.ts           # slugifyTitle() utility
    utils.ts          # cn() Tailwind class merge helper
    site.ts           # Shared site constants (URL, name, etc.)
  test/
    setup.ts          # @testing-library/jest-dom setup
content/
  blog/               # MDX blog posts (frontmatter: title, date, excerpt, category, image)
```

## Development

```sh
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm test         # run vitest once
npm run test:watch
```

## Testing

Tests live next to their source files as `*.test.ts(x)`. The test suite covers:

- `src/lib/` — pure utility functions (`slug`, `utils`, `blog` frontmatter parsing)
- `src/components/Home/` — `TextLink`, `Section`, `Article`, `Paragraph`, `Subheading`
- `src/components/NavLink.tsx` — active-state logic
- `src/components/Blog/BlogClient.tsx` — rendering, date formatting, outdated tagging
- `src/hooks/use-mobile.tsx` — media query hook

Next.js modules (`next/link`, `next/navigation`) and `framer-motion` are mocked in tests. `css: false` in `vitest.config.ts` silences CSS import errors.

## Blog Posts

Add a new `.mdx` file to `content/blog/`. Frontmatter fields:

```yaml
---
title: "Post Title"
date: YYYY-MM-DD
excerpt: One-line summary shown on cards
category: Engineering   # optional
image: /path/to/image   # optional
---
```

Posts are sorted newest-first by `date`. Articles older than 90 days get an `OutdatedTag`.

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/site.ts` | Site URL, name, description constants |
| `src/lib/blog.ts` | `getAllPosts()` — reads and parses all MDX files |
| `app/feed.xml/route.ts` | RSS feed route handler |
| `app/sitemap.ts` | Dynamic sitemap entries |
| `src/components/Blog/BlogClient.tsx` | `formatDate()`, `getArticleAge()`, card rendering |
