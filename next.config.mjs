import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [],
    unoptimized: true, // Disable image optimization to avoid sharp dependency issues
  },
};

const withMDX = createMDX({
  // Options are configured in mdx-components.tsx or via remark/rehype plugins in individual MDX files
});

export default withMDX(nextConfig);
