import type { Metadata } from 'next';
import { PostPropertyForm } from '@/features/dashboard/PostPropertyForm';

export const metadata: Metadata = { title: 'Post a Property' };

export default function PostPropertyPage() {
  return <PostPropertyForm />;
}
