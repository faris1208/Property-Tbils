import type { Metadata } from 'next';
import { PropertyDetail } from '@/features/property/PropertyDetail';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/properties/${slug}`);
    const json = await res.json();
    const p = json.data;
    return { title: p?.title, description: p?.description?.slice(0, 160) };
  } catch {
    return { title: 'Property' };
  }
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  return <PropertyDetail slug={slug} />;
}
