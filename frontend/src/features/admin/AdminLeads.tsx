'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { TableSkeleton } from './TableSkeleton';
import { api } from '@/lib/api';
import { Lead } from '@/types';
import { formatDate } from '@/lib/utils';

export function AdminLeads() {
  const [rows, setRows] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/leads')
      .then((r) => setRows(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Leads</h2>
        <p className="text-sm text-muted-foreground mt-0.5">All buyer inquiries and inspection requests across the platform.</p>
      </div>

      <div className="bg-white rounded-xl border overflow-x-auto">
        {loading ? <TableSkeleton cols={['Name', 'Email', 'Phone', 'Property', 'Agent', 'Type', 'Date']} /> : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>{['Name', 'Email', 'Phone', 'Property', 'Agent', 'Type', 'Date'].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-medium text-muted-foreground whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y">
              {rows.length === 0
                ? <tr><td colSpan={7} className="text-center py-16 text-muted-foreground">No leads yet.</td></tr>
                : rows.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium">{l.name}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{l.email}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{l.phone || '—'}</td>
                    <td className="px-5 py-3.5 text-muted-foreground max-w-[180px] truncate">{l.property?.title || '—'}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {l.property?.agent
                        ? `${l.property.agent.firstName ?? ''} ${l.property.agent.lastName ?? ''}`.trim() || '—'
                        : '—'}
                    </td>
                    <td className="px-5 py-3.5"><Badge variant="outline" className="capitalize text-xs">{l.type}</Badge></td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{formatDate(l.createdAt)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
