import type { Metadata } from 'next';
import { AdminLeads } from '@/features/admin/AdminLeads';

export const metadata: Metadata = { title: 'Admin — Leads' };

export default function AdminLeadsPage() {
  return <AdminLeads />;
}
