import type { Metadata } from 'next';
import { AdminPendingListings } from '@/features/admin/AdminPendingListings';

export const metadata: Metadata = { title: 'Admin — Pending Listings' };

export default function AdminPendingPage() {
  return <AdminPendingListings />;
}
