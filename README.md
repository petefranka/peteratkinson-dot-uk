# peteratkinson.co.uk

Personal portfolio and blog site for [my website](https://www.peteratkinson.co.uk)

Built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **MDX** for blog content.

## Getting started

```sh
# Install dependencies
npm install

# Start the dev server
npm run dev
# → http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest test suite |
| `npm run test:watch` | Vitest in watch mode |

## Tech stack

- [Next.js 15](https://nextjs.org) — App Router
- [React 18](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com) — blog content
- [Framer Motion](https://www.framer.com/motion/) — animations
- [shadcn/ui](https://ui.shadcn.com) — component library
- [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com)

## Writing a blog post

Add a `.mdx` file to `content/blog/` with this frontmatter:

```yaml
---
title: "Your Post Title"
date: 2025-01-15
excerpt: A short description shown on listing cards.
category: Engineering   # optional
image: /images/post.jpg # optional
---

Your content here...
```

Posts are automatically sorted newest-first and appear on `/blog`. Articles older than 90 days are tagged as potentially outdated.

## RSS feed & sitemap

- RSS: `/feed.xml`
- Sitemap: `/sitemap.xml`

Both are generated dynamically from the blog post frontmatter.
