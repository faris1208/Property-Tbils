'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home, LayoutDashboard, Building2, Plus, LogOut, ChevronRight,
  Clock, CheckCircle, XCircle, ShoppingBag, Store, MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';

const adminNav = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/admin/pending', label: 'Pending Listings', icon: Clock, exact: false },
  { href: '/admin/approved', label: 'Approved Listings', icon: CheckCircle, exact: false },
  { href: '/admin/rejected', label: 'Rejected Listings', icon: XCircle, exact: false },
  { href: '/admin/buyers', label: 'Buyers', icon: ShoppingBag, exact: false },
  { href: '/admin/sellers', label: 'Sellers', icon: Store, exact: false },
  { href: '/admin/leads', label: 'Leads', icon: MessageSquare, exact: false },
];

const agentNav = [
  { href: '/agent', label: 'My Listings', icon: Building2, exact: true },
  { href: '/agent/post-property', label: 'Post Property', icon: Plus, exact: false },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, token, logout } = useAuthStore();

  const isAdmin = user?.role === 'admin';
  const navItems = isAdmin ? adminNav : agentNav;

  const handleLogout = async () => {
    if (token) {
      try { await api.post('/auth/logout'); } catch {}
    }
    logout();
    router.push('/');
  };

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 flex flex-col bg-white border-r min-h-screen">
        <div className="h-16 flex items-center gap-2 px-5 border-b">
          <Link href="/" className="flex items-center gap-2 font-bold text-base text-primary">
            <Home className="w-4 h-4 shrink-0" />
            Property<span className="text-accent">TBILS</span>
          </Link>
        </div>

        <div className="px-5 py-3 border-b">
          <span className={cn(
            'text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full',
            isAdmin ? 'bg-violet-100 text-violet-700' : 'bg-blue-100 text-blue-700',
          )}>
            {isAdmin ? 'Admin Panel' : 'Agent Panel'}
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive(href, exact)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {isActive(href, exact) && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
            </Link>
          ))}
        </nav>

        <div className="border-t px-3 py-4 space-y-1">
          <div className="px-3 py-2">
            <p className="text-sm font-medium truncate">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b flex items-center px-6 shrink-0">
          <div>
            <p className="text-sm font-semibold">
              {isAdmin ? 'Admin Dashboard' : 'Agent Dashboard'}
            </p>
            <p className="text-xs text-muted-foreground">Welcome back, {user?.firstName}</p>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
