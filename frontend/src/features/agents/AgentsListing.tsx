'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { Agent } from '@/types';

export function AgentsListing() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/agents?limit=24')
      .then((r) => setAgents(r.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Our Agents</h1>
        <p className="text-muted-foreground">Browse verified real estate agents across Nigeria.</p>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
        </div>
      ) : agents.length === 0 ? (
        <div className="text-center py-24"><Users className="w-12 h-12 mx-auto text-muted-foreground mb-3" /><p>No agents found.</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl mx-auto mb-3">
                  {agent.user?.firstName?.[0]}{agent.user?.lastName?.[0]}
                </div>
                <p className="font-semibold">{agent.user?.firstName} {agent.user?.lastName}</p>
                {agent.agencyName && <p className="text-sm text-muted-foreground">{agent.agencyName}</p>}
                <div className="flex justify-center gap-2 mt-2 mb-4">
                  {agent.isVerified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
                  <Badge variant="outline" className="text-xs capitalize">{agent.tier}</Badge>
                </div>
                <Button asChild size="sm" className="w-full">
                  <Link href={`/agents/${agent.id}`}>View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
