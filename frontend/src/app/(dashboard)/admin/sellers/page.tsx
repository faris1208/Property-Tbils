import type { Metadata } from 'next';
import { AdminSellers } from '@/features/admin/AdminSellers';

export const metadata: Metadata = { title: 'Admin — Sellers' };

export default function AdminSellersPage() {
  return <AdminSellers />;
}
