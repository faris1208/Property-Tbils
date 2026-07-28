import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export interface PublicStats {
  totalProperties: number;
  totalCities: number;
  totalAgents: number;
}

let cached: PublicStats | null = null;
let inflight: Promise<PublicStats> | null = null;

function fetchPublicStats(): Promise<PublicStats> {
  if (cached) return Promise.resolve(cached);
  if (!inflight) {
    inflight = api.get('/properties/public-stats').then((r) => {
      cached = r.data.data;
      inflight = null;
      return cached!;
    }).catch((err) => {
      inflight = null;
      throw err;
    });
  }
  return inflight;
}

export function usePublicStats() {
  const [stats, setStats] = useState<PublicStats | null>(cached);

  useEffect(() => {
    if (cached) return;
    fetchPublicStats().then(setStats).catch(() => {});
  }, []);

  return stats;
}
