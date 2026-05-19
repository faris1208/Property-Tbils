'use client';

import { useEffect, useState } from 'react';
import {
  Users, Building2, CheckCircle, Clock, XCircle,
  MessageSquare, ShoppingBag, Store,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';

interface Stats {
  totalUsers: number;
  totalBuyers: number;
  totalSellers: number;
  totalProperties: number;
  pendingProperties: number;
  approvedProperties: number;
  rejectedProperties: number;
  totalLeads: number;
}

const statCards = [
  { key: 'totalUsers',         label: 'Total Users',      icon: Users,         color: 'text-violet-600', bg: 'bg-violet-50' },
  { key: 'totalBuyers',        label: 'Buyers',           icon: ShoppingBag,   color: 'text-blue-600',   bg: 'bg-blue-50'   },
  { key: 'totalSellers',       label: 'Sellers / Agents', icon: Store,         color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { key: 'totalProperties',    label: 'Total Properties', icon: Building2,     color: 'text-teal-600',   bg: 'bg-teal-50'   },
  { key: 'approvedProperties', label: 'Approved',         icon: CheckCircle,   color: 'text-green-600',  bg: 'bg-green-50'  },
  { key: 'pendingProperties',  label: 'Pending Review',   icon: Clock,         color: 'text-amber-600',  bg: 'bg-amber-50'  },
  { key: 'rejectedProperties', label: 'Rejected',         icon: XCircle,       color: 'text-red-600',    bg: 'bg-red-50'    },
  { key: 'totalLeads',         label: 'Total Leads',      icon: MessageSquare, color: 'text-pink-600',   bg: 'bg-pink-50'   },
] as const;

export function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then((r) => setStats(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Overview</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Platform-wide summary at a glance.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map(({ key, label, icon: Icon, color, bg }) => (
          <div key={key} className="rounded-xl border bg-white p-5 flex items-center gap-4">
            <div className={`rounded-lg p-3 ${bg} shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-medium">{label}</p>
              {loading
                ? <Skeleton className="h-8 w-14 mt-1" />
                : <p className="text-2xl font-bold">{stats?.[key] ?? 0}</p>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
