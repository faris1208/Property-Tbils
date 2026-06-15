import type { Metadata } from 'next';
import { BlogListing } from '@/features/blog/BlogListing';

export const metadata: Metadata = {
  title: 'Nigerian Real Estate Blog & Market Insights',
  description: 'Expert tips, market trends, and guides for buying, renting, and selling property in Nigeria. Stay informed on Lagos, Abuja, Port Harcourt real estate.',
  openGraph: {
    title: 'Nigerian Real Estate Blog | Property TBILS',
    description: 'Expert tips, market trends, and guides for buying, renting, and selling property in Nigeria.',
    url: 'https://property.tbils.com/blog',
  },
};

export default function BlogPage() {
  return <BlogListing />;
}
