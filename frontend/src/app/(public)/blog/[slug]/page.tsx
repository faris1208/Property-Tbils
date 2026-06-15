import type { Metadata } from 'next';
import { BlogPostPage } from '@/features/blog/BlogPostPage';
import { JsonLd } from '@/components/seo/JsonLd';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/blog/${slug}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return {};
    const json = await res.json();
    const post = json.data;
    return {
      title: post.title,
      description: post.excerpt || post.content?.slice(0, 155),
      openGraph: {
        title: `${post.title} | Property TBILS Blog`,
        description: post.excerpt || post.content?.slice(0, 155),
        url: `https://property.tbils.com/blog/${slug}`,
        type: 'article',
        publishedTime: post.publishedAt,
        images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || post.content?.slice(0, 155),
        images: post.coverImage ? [post.coverImage] : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  let articleSchema: Record<string, unknown> | null = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/blog/${slug}`,
      { next: { revalidate: 3600 } },
    );
    if (res.ok) {
      const json = await res.json();
      const post = json.data;
      articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt || post.content?.slice(0, 155),
        image: post.coverImage || '',
        datePublished: post.publishedAt,
        author: { '@type': 'Person', name: `${post.author?.firstName} ${post.author?.lastName}` },
        publisher: { '@type': 'Organization', name: 'Property TBILS', url: 'https://property.tbils.com' },
        url: `https://property.tbils.com/blog/${slug}`,
      };
    }
  } catch { /* no-op */ }

  return (
    <>
      {articleSchema && <JsonLd data={articleSchema} />}
      <BlogPostPage slug={slug} />
    </>
  );
}
