import type { Metadata } from 'next';
import { AdminOverview } from '@/features/admin/AdminOverview';

export const metadata: Metadata = { title: 'Admin — Overview' };

export default function AdminPage() {
  return <AdminOverview />;
}
