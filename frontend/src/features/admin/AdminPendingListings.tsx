'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TableSkeleton } from './TableSkeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { api } from '@/lib/api';
import { Property } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';

const REJECTION_REASONS = [
  'Incomplete or inaccurate property information',
  'Poor quality or missing images',
  'Price is unrealistic or unverifiable',
  'Duplicate listing already exists',
  'Property documents not verifiable',
  'Listing violates TBIL Property guidelines',
  'Suspected fraudulent listing',
  'Other',
];

export function AdminPendingListings() {
  const [rows, setRows] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [approveTarget, setApproveTarget] = useState<Property | null>(null);
  const [rejectTarget, setRejectTarget] = useState<Property | null>(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const r = await api.get('/admin/properties/pending');
      setRows(r.data.data || []);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleApprove = async () => {
    if (!approveTarget) return;
    setSubmitting(true);
    try {
      await api.patch(`/admin/properties/${approveTarget.id}/approve`);
      setApproveTarget(null);
      fetch();
    } finally { setSubmitting(false); }
  };

  const handleReject = async () => {
    if (!rejectTarget) return;
    const reason = selectedReason === 'Other' ? customReason : selectedReason;
    setSubmitting(true);
    try {
      await api.patch(`/admin/properties/${rejectTarget.id}/reject`, { reason });
      setRejectTarget(null); setSelectedReason(''); setCustomReason('');
      fetch();
    } finally { setSubmitting(false); }
  };

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Pending Listings</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Review and approve or reject submitted properties.</p>
      </div>

      <div className="bg-white rounded-xl border overflow-x-auto">
        {loading ? <TableSkeleton cols={['Title', 'Seller / Agent', 'Price', 'State', 'Type', 'Submitted', 'Actions']} /> : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>{['Title', 'Seller / Agent', 'Price', 'State', 'Type', 'Submitted', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-medium text-muted-foreground whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y">
              {rows.length === 0
                ? <tr><td colSpan={7} className="text-center py-16 text-muted-foreground">No pending listings.</td></tr>
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
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{formatDate(p.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => setApproveTarget(p)}>
                          <CheckCircle className="w-3.5 h-3.5 mr-1" />Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => setRejectTarget(p)}>
                          <XCircle className="w-3.5 h-3.5 mr-1" />Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Approve modal */}
      <Dialog open={!!approveTarget} onOpenChange={(o) => { if (!o) setApproveTarget(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />Approve Listing
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-3">
            <p className="text-sm text-muted-foreground">You are about to approve:</p>
            <div className="rounded-lg border p-4 space-y-1">
              <p className="font-semibold">{approveTarget?.title}</p>
              <p className="text-sm text-muted-foreground">by {approveTarget?.agent?.firstName} {approveTarget?.agent?.lastName}</p>
              <p className="text-sm font-medium">{approveTarget ? formatPrice(approveTarget.price) : ''}</p>
            </div>
            <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
              Once approved, this listing will be visible to all users on the platform.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveTarget(null)} disabled={submitting}>Cancel</Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleApprove} disabled={submitting}>
              {submitting ? 'Approving...' : 'Yes, Approve'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject modal */}
      <Dialog open={!!rejectTarget} onOpenChange={(o) => { if (!o) { setRejectTarget(null); setSelectedReason(''); setCustomReason(''); } }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-700">
              <XCircle className="w-5 h-5" />Reject Listing
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Select a reason for rejecting:</p>
              <p className="font-semibold mt-1">{rejectTarget?.title}</p>
            </div>
            <div className="space-y-2">
              {REJECTION_REASONS.map((reason) => (
                <button key={reason} type="button"
                  onClick={() => { setSelectedReason(reason); setCustomReason(''); }}
                  className={`w-full text-left text-sm px-4 py-2.5 rounded-lg border transition-colors cursor-pointer ${selectedReason === reason ? 'border-red-400 bg-red-50 text-red-800 font-medium' : 'border-border hover:bg-muted'}`}>
                  {reason}
                </button>
              ))}
            </div>
            {selectedReason === 'Other' && (
              <textarea className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                rows={3} placeholder="Describe the reason..." value={customReason} onChange={(e) => setCustomReason(e.target.value)} />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setRejectTarget(null); setSelectedReason(''); setCustomReason(''); }} disabled={submitting}>Cancel</Button>
            <Button variant="destructive" onClick={handleReject}
              disabled={submitting || !selectedReason || (selectedReason === 'Other' && !customReason.trim())}>
              {submitting ? 'Rejecting...' : 'Reject Listing'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
