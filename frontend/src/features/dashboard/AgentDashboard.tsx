'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Property, Lead } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';

const statusColors: Record<string, string> = {
  approved: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  rejected: 'bg-red-100 text-red-700',
};


function DeleteConfirmModal({ property, onConfirm, onClose, loading }: {
  property: Property;
  onConfirm: () => void;
  onClose: () => void;
  loading: boolean;
}) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Listing</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete <span className="font-semibold text-foreground">"{property.title}"</span>? This action cannot be undone.
        </p>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AgentDashboard() {
  const [listings, setListings] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<Property | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setFetchError('');
    try {
      const [lRes, ldRes] = await Promise.all([api.get('/properties/my'), api.get('/leads')]);
      setListings(Array.isArray(lRes.data) ? lRes.data : lRes.data?.data || []);
      setLeads(ldRes.data.data || []);
    } catch {
      setFetchError('Failed to load your data. Please try again.');
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/properties/${deleteTarget.id}`);
      setDeleteTarget(null);
      fetchData();
    } catch {
      setFetchError('Failed to delete the listing. Please try again.');
    } finally { setDeleting(false); }
  };

  return (
    <div className="p-6 space-y-6">
      {deleteTarget && (
        <DeleteConfirmModal
          property={deleteTarget}
          onConfirm={confirmDelete}
          onClose={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}

      {fetchError && (
        <div className="flex items-center justify-between rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {fetchError}
          <button onClick={fetchData} className="ml-4 underline underline-offset-2 hover:no-underline">Retry</button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">My Listings &amp; Leads</h2>
        <Button asChild>
          <Link href="/agent/post-property">
            <Plus className="w-4 h-4 mr-2" />Add Listing
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="listings">
        <TabsList className="mb-6">
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="leads">My Leads</TabsTrigger>
        </TabsList>

        <TabsContent value="listings">
          {loading ? <Skeleton className="h-48 w-full" /> : (
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b">
                  <tr>{['Title', 'Status', 'Price', 'Date', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-muted-foreground">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y">
                  {listings.length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-12 text-muted-foreground">No listings yet. Add your first property.</td></tr>
                  ) : listings.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium max-w-xs truncate">{p.title}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[p.approvalStatus]}`}>
                          {p.approvalStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">{formatPrice(p.price)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatDate(p.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-slate-100"
                            onClick={() => router.push(`/agent/listings/${p.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-red-50"
                            onClick={() => setDeleteTarget(p)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="leads">
          {loading ? <Skeleton className="h-48 w-full" /> : (
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b">
                  <tr>{['Name', 'Property', 'Type', 'Contact', 'Date'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-medium text-muted-foreground">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y">
                  {leads.length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-12 text-muted-foreground">No leads yet.</td></tr>
                  ) : leads.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium">{l.name}</td>
                      <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{l.property?.title || '—'}</td>
                      <td className="px-4 py-3"><Badge variant="outline" className="capitalize text-xs">{l.type}</Badge></td>
                      <td className="px-4 py-3 text-muted-foreground">{l.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatDate(l.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
