'use client';

import { useEffect, useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { PropertyCard } from '@/components/property/PropertyCard';
import { api } from '@/lib/api';
import { Agent, Property } from '@/types';

export function AgentProfile({ id }: { id: string }) {
  const [data, setData] = useState<{ agent: Agent; listings: Property[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/agents/${id}`)
      .then((r) => setData(r.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="container mx-auto px-4 py-12 space-y-6">
      <Skeleton className="h-32 w-full rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}</div>
    </div>
  );

  if (!data) return <div className="text-center py-24"><p>Agent not found.</p></div>;

  const { agent, listings } = data;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-slate-50 rounded-2xl p-8 mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-4xl shrink-0">
            {agent.user?.firstName?.[0]}{agent.user?.lastName?.[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-2xl font-bold">{agent.user?.firstName} {agent.user?.lastName}</h1>
              {agent.isVerified && <Badge variant="secondary">Verified</Badge>}
              <Badge variant="outline" className="capitalize">{agent.tier}</Badge>
            </div>
            {agent.agencyName && <p className="text-muted-foreground mb-3">{agent.agencyName}</p>}
            {agent.bio && <p className="text-sm leading-relaxed max-w-2xl">{agent.bio}</p>}
            <div className="flex gap-3 mt-4">
              {agent.phone && <Button variant="outline" asChild><a href={`tel:${agent.phone}`}><Phone className="w-4 h-4 mr-2" />Call</a></Button>}
              {(agent.whatsapp || agent.phone) && (
                <Button className="bg-green-600 hover:bg-green-700" asChild>
                  <a href={`https://wa.me/${agent.whatsapp || agent.phone}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />WhatsApp
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Listings by {agent.user?.firstName}</h2>
      {listings.length === 0 ? (
        <p className="text-muted-foreground">No approved listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      )}
    </div>
  );
}
