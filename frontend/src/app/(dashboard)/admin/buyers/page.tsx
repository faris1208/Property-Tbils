import type { Metadata } from 'next';
import { AdminBuyers } from '@/features/admin/AdminBuyers';

export const metadata: Metadata = { title: 'Admin — Buyers' };

export default function AdminBuyersPage() {
  return <AdminBuyers />;
}
