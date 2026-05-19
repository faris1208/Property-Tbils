import type { Metadata } from 'next';
import { AgentDashboard } from '@/features/dashboard/AgentDashboard';

export const metadata: Metadata = { title: 'Agent Dashboard' };

export default function AgentDashboardPage() {
  return <AgentDashboard />;
}
