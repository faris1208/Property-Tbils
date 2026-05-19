'use client';

import { useEffect, useState } from 'react';
import { Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TableSkeleton } from './TableSkeleton';
import { api } from '@/lib/api';
import { User } from '@/types';
import { formatDate } from '@/lib/utils';

export function AdminSellers() {
  const [rows, setRows] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      const r = await api.get('/admin/users/sellers');
      setRows(r.data.data || []);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const toggleBan = async (id: string) => {
    await api.patch(`/admin/users/${id}/ban`);
    fetch();
  };

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Sellers &amp; Agents</h2>
        <p className="text-sm text-muted-foreground mt-0.5">All registered agents and developers on the platform.</p>
      </div>

      <div className="bg-white rounded-xl border overflow-x-auto">
        {loading ? <TableSkeleton cols={['Name', 'Email', 'Phone', 'Role', 'Verified', 'Status', 'Joined', 'Actions']} /> : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>{['Name', 'Email', 'Phone', 'Role', 'Verified', 'Status', 'Joined', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-medium text-muted-foreground whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y">
              {rows.length === 0
                ? <tr><td colSpan={8} className="text-center py-16 text-muted-foreground">No sellers or agents found.</td></tr>
                : rows.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium">{u.firstName} {u.lastName}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{u.email}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{u.phone || '—'}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className="capitalize text-xs">{u.role}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${u.isVerified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {u.isVerified ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${u.isBanned ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {u.isBanned ? 'Banned' : 'Active'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{formatDate(u.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => toggleBan(u.id)}>
                        <Ban className="w-3.5 h-3.5 mr-1" />{u.isBanned ? 'Unban' : 'Ban'}
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
