import type { MetadataRoute } from 'next';

const BASE = 'https://property.tbils.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/properties`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${BASE}/cities/lagos`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/cities/abuja`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/cities/port-harcourt`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/cities/ibadan`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE}/cities/enugu`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE}/agents`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

    const [propertiesRes, blogRes] = await Promise.all([
      fetch(`${apiUrl}/properties?limit=100&sort=newest`, { next: { revalidate: 3600 } }),
      fetch(`${apiUrl}/blog?limit=100`, { next: { revalidate: 3600 } }),
    ]);

    const propertiesData = propertiesRes.ok ? await propertiesRes.json() : null;
    const blogData = blogRes.ok ? await blogRes.json() : null;

    const propertyRoutes: MetadataRoute.Sitemap = (propertiesData?.data ?? []).map((p: { slug: string; updatedAt: string }) => ({
      url: `${BASE}/properties/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    const blogRoutes: MetadataRoute.Sitemap = (blogData?.data ?? []).map((post: { slug: string; publishedAt: string }) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...propertyRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}
