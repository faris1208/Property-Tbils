'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { TableSkeleton } from './TableSkeleton';
import { api } from '@/lib/api';
import { Property } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';

export function AdminApprovedListings() {
  const [rows, setRows] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/properties/approved')
      .then((r) => setRows(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Approved Listings</h2>
        <p className="text-sm text-muted-foreground mt-0.5">All live properties currently visible on the platform.</p>
      </div>

      <div className="bg-white rounded-xl border overflow-x-auto">
        {loading ? <TableSkeleton cols={['Title', 'Seller / Agent', 'Price', 'State', 'Type', 'Status', 'Date Approved']} /> : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>{['Title', 'Seller / Agent', 'Price', 'State', 'Type', 'Status', 'Date Approved'].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-medium text-muted-foreground whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y">
              {rows.length === 0
                ? <tr><td colSpan={7} className="text-center py-16 text-muted-foreground">No approved listings yet.</td></tr>
                : rows.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium max-w-[180px] truncate">{p.title}</td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium">{p.agent?.firstName} {p.agent?.lastName}</p>
                      <p className="text-xs text-muted-foreground">{p.agent?.email}</p>
                    </td>
                    <td className="px-5 py-3.5 font-medium whitespace-nowrap">{formatPrice(p.price)}</td>
                    <td className="px-5 py-3.5 text-muted-foreground capitalize">{p.city}</td>
                    <td className="px-5 py-3.5"><Badge variant="outline" className="capitalize text-xs">{p.type}</Badge></td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">Approved</span>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{formatDate(p.createdAt)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
