import { AgentProfile } from '@/features/agents/AgentProfile';

interface Props { params: Promise<{ id: string }> }

export default async function AgentProfilePage({ params }: Props) {
  const { id } = await params;
  return <AgentProfile id={id} />;
}
