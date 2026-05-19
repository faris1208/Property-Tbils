'use client';

import { useEffect, useState } from 'react';
import {
  CheckCircle, XCircle, Ban, Users, Home, BarChart3,
  MessageSquare, ShoppingBag, Store, Building2, Clock, AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { api } from '@/lib/api';
import { Property, Lead, User } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';

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

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    approved: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    rejected: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${map[status] ?? 'bg-muted text-muted-foreground'}`}>
      {status}
    </span>
  );
}

function UserStatusBadge({ isBanned, isVerified }: { isBanned: boolean; isVerified: boolean }) {
  if (isBanned) return <span className="text-xs px-2 py-1 rounded-full font-medium bg-red-100 text-red-700">Banned</span>;
  if (isVerified) return <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">Verified</span>;
  return <span className="text-xs px-2 py-1 rounded-full font-medium bg-amber-100 text-amber-700">Unverified</span>;
}

export function AdminDashboard() {
  const [pending, setPending] = useState<Property[]>([]);
  const [approved, setApproved] = useState<Property[]>([]);
  const [rejected, setRejected] = useState<Property[]>([]);
  const [buyers, setBuyers] = useState<User[]>([]);
  const [sellers, setSellers] = useState<User[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const [approveTarget, setApproveTarget] = useState<Property | null>(null);
  const [rejectTarget, setRejectTarget] = useState<Property | null>(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pendingRes, approvedRes, rejectedRes, buyersRes, sellersRes, leadsRes, statsRes] = await Promise.all([
        api.get('/admin/properties/pending'),
        api.get('/admin/properties/approved'),
        api.get('/admin/properties/rejected'),
        api.get('/admin/users/buyers'),
        api.get('/admin/users/sellers'),
        api.get('/admin/leads'),
        api.get('/admin/stats'),
      ]);
      setPending(pendingRes.data.data || []);
      setApproved(approvedRes.data.data || []);
      setRejected(rejectedRes.data.data || []);
      setBuyers(buyersRes.data.data || []);
      setSellers(sellersRes.data.data || []);
      setLeads(leadsRes.data.data || []);
      setStats(statsRes.data.data || null);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleApprove = async () => {
    if (!approveTarget) return;
    setSubmitting(true);
    try {
      await api.patch(`/admin/properties/${approveTarget.id}/approve`);
      setApproveTarget(null);
      fetchData();
    } finally { setSubmitting(false); }
  };

  const handleReject = async () => {
    if (!rejectTarget) return;
    const reason = selectedReason === 'Other' ? customReason : selectedReason;
    setSubmitting(true);
    try {
      await api.patch(`/admin/properties/${rejectTarget.id}/reject`, { reason });
      setRejectTarget(null);
      setSelectedReason('');
      setCustomReason('');
      fetchData();
    } finally { setSubmitting(false); }
  };

  const closeReject = () => { setRejectTarget(null); setSelectedReason(''); setCustomReason(''); };

  const toggleBan = async (id: string) => {
    await api.patch(`/admin/users/${id}/ban`);
    fetchData();
  };

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers, icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Buyers', value: stats?.totalBuyers, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Sellers / Agents', value: stats?.totalSellers, icon: Store, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Properties', value: stats?.totalProperties, icon: Building2, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Approved', value: stats?.approvedProperties, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Review', value: stats?.pendingProperties, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Rejected', value: stats?.rejectedProperties, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Total Leads', value: stats?.totalLeads, icon: MessageSquare, color: 'text-pink-600', bg: 'bg-pink-50' },
  ];

  const tabBadge = (count: number) => count > 0 ? (
    <span className="ml-1.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full px-1.5 py-0.5 min-w-[20px] inline-flex items-center justify-center">
      {count}
    </span>
  ) : null;

  return (
    <div className="p-6 space-y-6">

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-xl border bg-white p-4 flex flex-col gap-2">
            <div className={`rounded-lg p-2 w-fit ${bg}`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            {loading
              ? <Skeleton className="h-6 w-10" />
              : <p className="text-2xl font-bold">{value ?? 0}</p>
            }
            <p className="text-xs text-muted-foreground font-medium leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border">
        <Tabs defaultValue="pending">
          <div className="px-6 pt-5 border-b overflow-x-auto">
            <TabsList className="mb-0">
              <TabsTrigger value="pending">
                Pending {tabBadge(stats?.pendingProperties ?? 0)}
              </TabsTrigger>
              <TabsTrigger value="approved">Approved Listings</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="buyers">Buyers</TabsTrigger>
              <TabsTrigger value="sellers">Sellers</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
            </TabsList>
          </div>

          {/* Pending */}
          <TabsContent value="pending" className="p-0">
            <PropertyTable
              rows={pending}
              loading={loading}
              showActions
              onApprove={setApproveTarget}
              onReject={setRejectTarget}
            />
          </TabsContent>

          {/* Approved */}
          <TabsContent value="approved" className="p-0">
            <PropertyTable rows={approved} loading={loading} />
          </TabsContent>

          {/* Rejected */}
          <TabsContent value="rejected" className="p-0">
            <PropertyTable rows={rejected} loading={loading} showReason />
          </TabsContent>

          {/* Buyers */}
          <TabsContent value="buyers" className="p-0">
            <UserTable rows={buyers} loading={loading} onToggleBan={toggleBan} />
          </TabsContent>

          {/* Sellers */}
          <TabsContent value="sellers" className="p-0">
            <UserTable rows={sellers} loading={loading} onToggleBan={toggleBan} showRole />
          </TabsContent>

          {/* Leads */}
          <TabsContent value="leads" className="p-0">
            {loading ? <div className="p-6"><Skeleton className="h-48 w-full" /></div> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b">
                    <tr>{['Name', 'Email', 'Phone', 'Property', 'Type', 'Date'].map((h) => (
                      <th key={h} className="text-left px-5 py-3 font-medium text-muted-foreground">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y">
                    {leads.length === 0
                      ? <tr><td colSpan={6} className="text-center py-16 text-muted-foreground">No leads yet.</td></tr>
                      : leads.map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-3.5 font-medium">{l.name}</td>
                          <td className="px-5 py-3.5 text-muted-foreground">{l.email}</td>
                          <td className="px-5 py-3.5 text-muted-foreground">{l.phone || '—'}</td>
                          <td className="px-5 py-3.5 text-muted-foreground max-w-[180px] truncate">{l.property?.title || '—'}</td>
                          <td className="px-5 py-3.5">
                            <Badge variant="outline" className="capitalize text-xs">{l.type}</Badge>
                          </td>
                          <td className="px-5 py-3.5 text-muted-foreground">{formatDate(l.createdAt)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        </Tabs>
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
      <Dialog open={!!rejectTarget} onOpenChange={(o) => { if (!o) closeReject(); }}>
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
                <button
                  key={reason}
                  type="button"
                  onClick={() => { setSelectedReason(reason); setCustomReason(''); }}
                  className={`w-full text-left text-sm px-4 py-2.5 rounded-lg border transition-colors ${
                    selectedReason === reason
                      ? 'border-red-400 bg-red-50 text-red-800 font-medium'
                      : 'border-border hover:bg-muted cursor-pointer'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>
            {selectedReason === 'Other' && (
              <textarea
                className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                rows={3}
                placeholder="Describe the reason..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeReject} disabled={submitting}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={submitting || !selectedReason || (selectedReason === 'Other' && !customReason.trim())}
            >
              {submitting ? 'Rejecting...' : 'Reject Listing'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ── Sub-components ── */

function PropertyTable({
  rows, loading, showActions, showReason, onApprove, onReject,
}: {
  rows: Property[];
  loading: boolean;
  showActions?: boolean;
  showReason?: boolean;
  onApprove?: (p: Property) => void;
  onReject?: (p: Property) => void;
}) {
  const cols = ['Title', 'Seller / Agent', 'Price', 'State', 'Type', 'Status', 'Date',
    ...(showReason ? ['Rejection Reason'] : []),
    ...(showActions ? ['Actions'] : []),
  ];

  if (loading) return <div className="p-6"><Skeleton className="h-48 w-full" /></div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b">
          <tr>{cols.map((h) => (
            <th key={h} className="text-left px-5 py-3 font-medium text-muted-foreground whitespace-nowrap">{h}</th>
          ))}</tr>
        </thead>
        <tbody className="divide-y">
          {rows.length === 0
            ? <tr><td colSpan={cols.length} className="text-center py-16 text-muted-foreground">No listings found.</td></tr>
            : rows.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3.5 font-medium max-w-[180px] truncate">{p.title}</td>
                <td className="px-5 py-3.5">
                  <div>
                    <p className="font-medium">{p.agent?.firstName} {p.agent?.lastName}</p>
                    <p className="text-xs text-muted-foreground">{p.agent?.email}</p>
                  </div>
                </td>
                <td className="px-5 py-3.5 font-medium whitespace-nowrap">{formatPrice(p.price)}</td>
                <td className="px-5 py-3.5 text-muted-foreground capitalize">{p.city}</td>
                <td className="px-5 py-3.5">
                  <Badge variant="outline" className="capitalize text-xs">{p.type}</Badge>
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={p.approvalStatus} />
                </td>
                <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{formatDate(p.createdAt)}</td>
                {showReason && (
                  <td className="px-5 py-3.5 text-muted-foreground max-w-[200px]">
                    <span className="text-xs">{p.rejectionReason || '—'}</span>
                  </td>
                )}
                {showActions && (
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => onApprove?.(p)}>
                        <CheckCircle className="w-3.5 h-3.5 mr-1" />Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => onReject?.(p)}>
                        <XCircle className="w-3.5 h-3.5 mr-1" />Reject
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

function UserTable({
  rows, loading, onToggleBan, showRole,
}: {
  rows: User[];
  loading: boolean;
  onToggleBan: (id: string) => void;
  showRole?: boolean;
}) {
  const cols = ['Name', 'Email', 'Phone', ...(showRole ? ['Role'] : []), 'Status', 'Verified', 'Joined', 'Actions'];

  if (loading) return <div className="p-6"><Skeleton className="h-48 w-full" /></div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b">
          <tr>{cols.map((h) => (
            <th key={h} className="text-left px-5 py-3 font-medium text-muted-foreground">{h}</th>
          ))}</tr>
        </thead>
        <tbody className="divide-y">
          {rows.length === 0
            ? <tr><td colSpan={cols.length} className="text-center py-16 text-muted-foreground">No users found.</td></tr>
            : rows.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3.5 font-medium">{u.firstName} {u.lastName}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{u.email}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{u.phone || '—'}</td>
                {showRole && (
                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className="capitalize text-xs">{u.role}</Badge>
                  </td>
                )}
                <td className="px-5 py-3.5">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${u.isBanned ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {u.isBanned ? 'Banned' : 'Active'}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${u.isVerified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {u.isVerified ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{formatDate(u.createdAt)}</td>
                <td className="px-5 py-3.5">
                  <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => onToggleBan(u.id)}>
                    <Ban className="w-3.5 h-3.5 mr-1" />{u.isBanned ? 'Unban' : 'Ban'}
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
