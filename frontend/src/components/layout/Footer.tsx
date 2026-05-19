import Link from 'next/link';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Buy / Rent' },
  { href: '/properties?type=shortlet', label: 'Shortlets' },
  { href: '/contact', label: 'Digital Marketing' },
];

const services = [
  { href: '/contact', label: 'Real Estate Consultation', external: false },
  { href: '/contact', label: 'Property Management', external: false },
  { href: 'https://tbils.com', label: 'Book Flight Tickets', external: true },
  { href: '/contact', label: 'Marketing & Branding', external: false },
];

export function Footer() {
  return (
    <footer className="bg-black text-slate-300 mt-auto">
      <div className="border-b border-white/10 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Post a Property</h2>
        <p className="text-slate-400 mb-8">List your property for sale, rent, or shortlet — reach thousands of buyers instantly.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/register" className="px-6 py-2.5 rounded-lg border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-colors">Sign Up</Link>
          <Link href="/login" className="px-6 py-2.5 rounded-lg border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-colors">Sign In</Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">Tbil Properties</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Your trusted partner for luxury real estate, rentals, shortlets, and premium lifestyle services across the world.</p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={label}><Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-5">Our Services</h3>
            <ul className="space-y-3">
              {services.map(({ href, label, external }) => (
                <li key={label}>
                  {external
                    ? <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">{label}</a>
                    : <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">{label}</Link>}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-5">Contact Us</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="mailto:tbilproperty@gmail.com" className="hover:text-white transition-colors">Email: tbilproperty@gmail.com</a></li>
              <li>Phone: <a href="tel:+2347036798216" className="hover:text-white transition-colors">+2347036798216</a>, <a href="tel:+2349047693094" className="hover:text-white transition-colors">+2349047693094</a>, <a href="tel:+2347062321532" className="hover:text-white transition-colors">+2347062321532</a></li>
              <li>Plot 1-3, Shasha Road, Akowonjo Roundabout,<br />Beside De-Santos Hotel, Akowonjo,<br />Lagos, Nigeria, 100231</li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-xs text-slate-500">
          © 2025 Tbil Properties. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
