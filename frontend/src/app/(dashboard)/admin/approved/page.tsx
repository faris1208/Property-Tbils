import type { Metadata } from 'next';
import { AdminApprovedListings } from '@/features/admin/AdminApprovedListings';

export const metadata: Metadata = { title: 'Admin — Approved Listings' };

export default function AdminApprovedPage() {
  return <AdminApprovedListings />;
}
