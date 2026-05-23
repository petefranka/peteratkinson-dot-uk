import { siteName, siteUrl } from '@/lib/site';

interface BlogPostJsonLdProps {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  category?: string;
  image?: string;
}

export default function BlogPostJsonLd({ slug, title, date, excerpt, category, image }: BlogPostJsonLdProps) {
  const url = `${siteUrl}/blog/${slug}`;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    url,
    ...(date ? { datePublished: date, dateModified: date } : {}),
    ...(excerpt ? { description: excerpt } : {}),
    ...(image ? { image: `${siteUrl}${image}` } : {}),
    ...(category ? { keywords: category } : {}),
    inLanguage: 'en-GB',
    author: {
      '@type': 'Person',
      name: siteName,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: siteName,
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
