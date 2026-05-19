'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown, LogOut, LayoutDashboard, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

type DropdownItem = { href: string; label: string; external?: boolean };
type DropdownSection = { heading?: string; items: DropdownItem[] };

const propertyMgmtSections: DropdownSection[] = [
  {
    items: [
      { href: '/contact', label: 'Property Management' },
      { href: '/contact', label: 'Building Construction' },
    ],
  },
];

const tbilSuitesSections: DropdownSection[] = [
  {
    heading: 'Digital Marketing Services',
    items: [
      { href: '/contact', label: 'Website Design' },
      { href: '/contact', label: 'PPC Services' },
      { href: '/contact', label: 'SEO Services' },
      { href: '/contact', label: 'SMM Services' },
    ],
  },
  {
    heading: 'Book a Flight Ticket',
    items: [
      { href: 'https://tbils.com', label: 'Local Flights', external: true },
      { href: 'https://tbils.com', label: 'International Flights', external: true },
      { href: 'https://travels.tbils.com', label: 'Visa Assistance', external: true },
      { href: 'https://study.tbils.com', label: 'Study Abroad', external: true },
    ],
  },
];

function Dropdown({ label, sections }: { label: string; sections: DropdownSection[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-60 bg-[#2d3748] rounded-xl shadow-2xl py-2 z-50">
          {sections.map((section, si) => (
            <div key={si}>
              {si > 0 && <div className="my-2 border-t border-white/10" />}
              {section.heading && (
                <p className="px-4 pt-2 pb-1 text-xs font-medium text-white/50 uppercase tracking-wide">
                  {section.heading}
                </p>
              )}
              {section.items.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-white/85 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-white/85 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, token, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    if (token) {
      try { await api.post('/auth/logout'); } catch {}
    }
    logout();
    router.push('/');
  };

  const dashboardHref = user?.role === 'admin' ? '/admin' : '/agent';

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/assets/Images/homepage/logo.png"
            alt="Property TBILS"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="/"
            className={cn('text-sm font-medium transition-colors', pathname === '/' ? 'text-white' : 'text-white/70 hover:text-white')}
          >
            Home
          </Link>
          <Link
            href="/properties?status=sale"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Buy
          </Link>
          <Link
            href="/properties?status=rent"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Rent
          </Link>
          <Dropdown label="Property Management" sections={propertyMgmtSections} />
          <Dropdown label="Tbil Suites" sections={tbilSuitesSections} />
        </nav>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                href={dashboardHref}
                className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-white border border-white/40 hover:border-white px-4 py-1.5 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold bg-white/15 hover:bg-white/25 text-white px-4 py-1.5 rounded-lg transition-colors whitespace-nowrap"
              >
                Sign Up / Post a Property
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 cursor-pointer"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-4 py-5 space-y-4">
          {[
            { href: '/', label: 'Home' },
            { href: '/properties?status=sale', label: 'Buy' },
            { href: '/properties?status=rent', label: 'Rent' },
            { href: '/properties', label: 'All Properties' },
            { href: '/agents', label: 'Find an Agent' },
            { href: '/blog', label: 'Blog' },
            { href: '/contact', label: 'Contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-white/80 hover:text-white transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {user ? (
              <>
                <Link href={dashboardHref} onClick={() => setMobileOpen(false)} className="text-sm text-white font-medium">Dashboard</Link>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-sm text-white/70 text-left cursor-pointer">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="text-sm text-white border border-white/30 px-4 py-2 rounded-lg text-center">Login</Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="text-sm text-white bg-white/15 px-4 py-2 rounded-lg text-center font-semibold">Sign Up / Post a Property</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
