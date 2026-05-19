import type { Metadata } from 'next';
import { AgentsListing } from '@/features/agents/AgentsListing';

export const metadata: Metadata = { title: 'Agents', description: 'Browse verified real estate agents.' };

export default function AgentsPage() {
  return <AgentsListing />;
}
