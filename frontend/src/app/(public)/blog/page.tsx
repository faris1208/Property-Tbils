import type { Metadata } from 'next';
import { BlogListing } from '@/features/blog/BlogListing';

export const metadata: Metadata = { title: 'Blog', description: 'Nigerian real estate market insights.' };

export default function BlogPage() {
  return <BlogListing />;
}
