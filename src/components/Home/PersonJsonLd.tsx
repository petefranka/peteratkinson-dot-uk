import { email, linkedInUrl, siteDescription, siteName, siteUrl } from '@/lib/site';

export default function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteName,
    url: siteUrl,
    email: `mailto:${email}`,
    jobTitle: 'Senior Engineer',
    description: siteDescription,
    sameAs: [linkedInUrl],
    homeLocation: {
      '@type': 'Place',
      name: 'Yorkshire, UK',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
