# peteratkinson.co.uk

Personal portfolio and blog site for peteratkinson.co.uk

## Tech Stack

- **Next.js 16** with App Router
- **React 19** — server and client components
- **TypeScript**
- **Tailwind CSS** + global component classes in `src/index.css`
- **MDX** for blog posts (`content/blog/*.mdx`)
- **Framer Motion** for animations
- **Vitest** + Testing Library for tests
- **ESLint 9** flat config (`eslint.config.mjs`)

## Project Structure

```
app/                        # Next.js App Router
  blog/
    [slug]/
      page.tsx              # Individual blog post page
      blog-page.css         # Blog post prose styles
    BlogList.tsx            # Client component — category filter + post list
    page.tsx                # Blog index page
  feed.xml/route.ts         # RSS feed
  icon.svg                  # Favicon (auto-detected by Next.js)
  layout.tsx                # Root layout, fonts, global metadata
  sitemap.ts                # Dynamic sitemap
  robots.txt

src/
  components/
    Blog/
      CategoryTag.tsx       # Pill tag showing post category
      OutdatedTag.tsx       # Full-width age warning banner (> 90 days)
      SimpleOutdatedTag.tsx # Inline pill age warning with Tippy tooltip (> 90 days)
      index.ts              # Barrel export for all Blog components
    Home/
      HomePage.tsx          # Full homepage layout
      HeroHeading.tsx       # h1 hero heading ("Hey / I'm Pete…")
      HomeBlog.tsx          # Latest 3 posts, used on homepage
      Section.tsx           # Section, Article, Paragraph, Subheading, TextLink primitives
      SiteShell.tsx         # Page wrapper used by blog/sub pages (back link, footer)
      PageNav.tsx           # In-page anchor nav for homepage sections
      SiteFooter.tsx        # Footer
      PersonJsonLd.tsx      # JSON-LD structured data
  functions/
    date.ts                 # formatDate(), getAgeInMonths(), formatArticleAge()
    url.ts                  # isExternalHref()
    index.ts                # Barrel export
  lib/
    blog.ts                 # getAllPosts(), parseFrontmatter(), stripFrontmatter()
    site.ts                 # siteUrl, siteName, siteTitle, siteDescription, linkedInUrl, email
    slug.ts                 # slugifyTitle()
    utils.ts                # cn() — clsx + twMerge helper
  test/
    setup.ts                # @testing-library/jest-dom setup
  index.css                 # Global styles, CSS custom properties, component classes

  __tests__/                # All tests live here, mirroring src/ structure
    blog/
      BlogList.test.tsx
    components/
      Blog/                 # CategoryTag, OutdatedTag, SimpleOutdatedTag tests
        Home/               # HeroHeading, Section, TextLink tests
    functions/              # date, url tests
    lib/                    # blog, slug, utils tests

content/
  blog/                     # MDX blog posts
```

## Development

```sh
npm install
npm run dev       # http://localhost:3000
npm run build
npm run lint      # eslint app src
npm test          # vitest run (once)
npm run test:watch
```

## Testing

All tests live in `src/__tests__/`, mirroring the source structure. The vitest config picks up `src/__tests__/**/*.{test,spec}.{ts,tsx}`.

**Rules:**
- Every component must have a `data-testid` on its root element
- Tests use `getByTestId` as the primary selector for render assertions
- Role and text queries are used for behaviour/content assertions
- `next/link`, `next/navigation`, and `framer-motion` are mocked per test file
- `@tippyjs/react` is mocked in `SimpleOutdatedTag` tests
- Date-dependent tests use `vi.useFakeTimers()` + `vi.setSystemTime(new Date('YYYY-MM-DD'))` in `beforeEach`, restored in `afterEach` with `vi.useRealTimers()`
- `css: false` in vitest config silences CSS import errors
- `@app` alias resolves to `./app` (for importing from `app/` in tests)
- `@` alias resolves to `./src`

**Current data-testids:**
| Component | testid |
|---|---|
| `CategoryTag` | `category-tag` |
| `OutdatedTag` | `outdated-tag` |
| `SimpleOutdatedTag` | `simple-outdated-tag` |
| `HeroHeading` | `hero-heading` |
| `BionicReadingToggle` | `bionic-reading-toggle` |
| `CopyLink` | `copy-link` |
| `PostNav` | `post-nav` |
| `ReadingProgress` | `reading-progress` |

## Blog Posts

Add a new `.mdx` file to `content/blog/`. Frontmatter fields:

```yaml
---
title: "Post Title"
date: YYYY-MM-DD
excerpt: One-line summary shown on cards
category: Engineering   # optional — appears as a CategoryTag pill
image: /path/to/image   # optional
---
```

Posts are sorted newest-first by `date`. Do not use em dashes (`—`) in post copy — they read as AI-generated. Use a full stop or restructure the sentence instead.

**Outdated post logic:** Articles older than 90 days trigger an age warning.
- On the article page: `OutdatedTag` renders a full-width amber banner below the header
- On the homepage blog preview: `SimpleOutdatedTag` renders an inline amber pill with a Tippy tooltip
- Age is expressed as months (< 12) or years (≥ 12), singular/plural handled correctly
- Both components return `null` for posts ≤ 90 days old

## Design System

### Colour Tokens (`src/index.css` `:root`)

| Token | Value | Usage |
|---|---|---|
| `--bg-matte` | `#f3e6eb` | Page background |
| `--bg-matte-deep` | `#e9d5de` | Code blocks, inset surfaces |
| `--text-heading` | `#1f181b` | Headings |
| `--text-body` | `#3f3539` | Body copy |
| `--text-muted` | `#5c4f55` | Dates, secondary text |
| `--accent` | `#7a3349` | Links, buttons, tags, the site dot |
| `--accent-soft` | `#c9a0ad` | Hover borders, text selection bg |
| `--accent-hover` | `#5c2638` | Link hover state |
| `--border-subtle` | `#d4bcc4` | Dividers, tag borders |
| `--warning` | `#7d5a3c` | Outdated tag text |
| `--warning-bg` | `#f7ede2` | Outdated tag background |
| `--warning-border` | `#d4b99a` | Outdated tag border |

### Global Component Classes

All shared classes are defined in `src/index.css` under `@layer components`. Do not add one-off Tailwind classes for things these already handle.

| Class | Purpose |
|---|---|
| `.site-heading` | Serif, tight tracking, `--text-heading` — used on h1/h2 |
| `.site-body` | `1.0625rem`, `line-height: 1.75`, `--text-body` |
| `.site-muted` | `1rem`, `--text-muted` — dates, secondary labels |
| `.site-link` | Accent underline, hover/focus styles |
| `.site-dot` | The circular brand mark (28px, fixed on desktop, accent bg + white ring) |
| `.site-section-marker` | Small accent dot before section headings |
| `.site-divide` | Divider between sibling items (`--border-subtle`) |
| `.site-article` | Article spacing wrapper |
| `.site-article-title` | h3 article title — serif, 24px, `--text-heading` |
| `.blog-filter-btn` | Category filter pill buttons on the blog list |
| `.blog-category-tag` | Category tag pill — accent bg, light text |
| `.blog-outdated` | Full-width outdated banner — amber palette |
| `.blog-outdated-tag` | Inline outdated pill — amber palette |

### Typography

- **Sans**: DM Sans (`--font-sans`) — body, UI
- **Serif**: Fraunces (`--font-serif`) — headings (`site-heading`), article titles
- Base body size: `1.0625rem` (17px)
- All interactive text (tags, buttons, nav): minimum `text-base` (16px) — WCAG AA

### Layout

- Max content width: `max-w-5xl`
- Left margin on desktop: `lg:ml-32` (leaves room for the fixed site-dot)
- Horizontal padding: `px-8`
- Homepage sections use a two-column grid: `grid-cols-1 md:grid-cols-[minmax(15rem,18rem)_1fr]` — sticky heading left, content right
- Section headings are `lg:sticky` with configurable `top-*` (default `top-20`)

## Accessibility Requirements

- **Minimum font size**: `text-base` (16px) on all interactive elements — tags, buttons, nav links. `text-sm` (14px) is not acceptable for anything users interact with or read independently.
- **Focus styles**: All interactive elements must have a visible `:focus-visible` outline using `3px solid var(--accent)` with `outline-offset: 3px`. Already handled by `.site-link` and `.blog-filter-btn`.
- **Forced colours**: `@media (forced-colors: active)` overrides exist in `index.css` — do not break them.
- **Reduced motion**: `scroll-behavior: auto` is applied when `prefers-reduced-motion: reduce` is set. Framer Motion animations should respect this.
- **ARIA**: Sections use `aria-labelledby`. Filter button groups use `role="group"` with `aria-label`. Filter buttons use `aria-pressed`. Blog article lists use `aria-live="polite"`.
- **Screen reader text**: Use the `.sr-only` utility for visually hidden labels. `TextLink` adds an sr-only "(opens in new tab)" span for external links.

## Functions

Utility functions live in `src/functions/` and are barrel-exported from `src/functions/index.ts`.

| Function | Signature | Notes |
|---|---|---|
| `formatDate` | `(dateString, options?) => string` | Defaults to `{ month: 'short', day: 'numeric', year: 'numeric' }`. Returns empty string for empty input, original string for invalid dates. |
| `getAgeInMonths` | `(dateString) => number` | Months between date and now, calendar-boundary based |
| `formatArticleAge` | `(dateString) => string` | Returns `"6 months"` or `"2 years"` / `"1 year"` |
| `isExternalHref` | `(href) => boolean` | `true` for `http://` or `https://` URLs only |

## Component Barrel Exports

- Blog components: import from `@/components/Blog` (not individual files)
- Functions: import from `@/functions` (not individual files)

## CI/CD

GitHub Actions in `.github/workflows/`:
- `main.yml` — entry point, triggers on push/PR to `main`, orchestrates the three reusable workflows
- `build-and-test.yml` — `workflow_call` only; runs `npm ci`, `npm run lint`, `npm test`, `npm run build`
- `deploy-application-to-vercel.yml` — `workflow_call` only; production deploy
- `create-preview-in-vercel.yml` — `workflow_call` only; PR preview deploy

## Analytics

Both providers are wired up in `app/layout.tsx`:

| Provider | Package | Behaviour |
|---|---|---|
| **Vercel Analytics** | `@vercel/analytics/next` | Zero-config. `<VercelAnalytics />` is always rendered — Vercel activates it automatically in production. |
| **Vercel Speed Insights** | `@vercel/speed-insights/next` | Zero-config. `<SpeedInsights />` is always rendered — Vercel activates it automatically in production. |
| **Umami** | `next/script` | `<Script>` only renders when `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set. Set this in Vercel env vars for production and in `.env.local` for local testing. |

Do not add another analytics provider without removing one of the existing ones.

## Key Constants

All in `src/lib/site.ts`:
- `siteUrl` — from `NEXT_PUBLIC_SITE_URL` env var, falls back to `https://www.peteratkinson.co.uk`
- `linkedInUrl` — `https://www.linkedin.com/in/peteratkinson1`
- `email` — `peter@peteratkinson.co.uk`
