import type { Metadata } from 'next';
import { AdminRejectedListings } from '@/features/admin/AdminRejectedListings';

export const metadata: Metadata = { title: 'Admin — Rejected Listings' };

export default function AdminRejectedPage() {
  return <AdminRejectedListings />;
}
