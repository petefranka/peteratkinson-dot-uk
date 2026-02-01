# Next.js Migration Notes

## What's Been Done

1. **Package.json Updated**
   - Added Next.js 15.1.0
   - Added MDX support packages (@next/mdx, @mdx-js/loader, @mdx-js/react, next-mdx-remote)
   - Removed Vite and react-router-dom
   - Updated scripts for Next.js

2. **Next.js Configuration**
   - Created `next.config.js` with MDX support
   - Updated `tsconfig.json` for Next.js
   - Created `next-env.d.ts`

3. **App Directory Structure**
   - Created `app/layout.tsx` (root layout)
   - Created `app/page.tsx` (home page)
   - Created `app/blog/page.tsx` (blog listing)
   - Created `app/blog/[slug]/page.tsx` (individual blog posts)

4. **MDX Blog Setup**
   - Blog posts go in `content/blog/*.mdx`
   - Example post created at `content/blog/example-post.mdx`
   - Frontmatter support (title, date, excerpt)

5. **Components Updated**
   - Header: Updated to use Next.js Link
   - Blog: Updated to use Next.js Link
   - Both marked as 'use client' where needed

## Next Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Create Blog Posts**
   - Add `.mdx` files to `content/blog/`
   - Use frontmatter:
     ```mdx
     ---
     title: "Your Post Title"
     date: "2024-01-15"
     excerpt: "Brief description"
     ---
     
     Your content here...
     ```

4. **Update Blog Component**
   - The Blog component currently shows static posts
   - You may want to update it to fetch from the blog API route or use the same getAllPosts function

5. **Image Optimization**
   - Consider using Next.js Image component for better performance
   - Update image imports as needed

6. **Remove Old Files** (after testing)
   - `vite.config.ts`
   - `src/main.tsx`
   - `src/App.tsx`
   - `index.html` (if exists)

## Notes

- All components remain in `src/components/` for now
- CSS files remain with components
- Assets remain in `src/assets/`
- The blog uses dynamic routing with `[slug]`
- MDX posts support frontmatter and markdown
