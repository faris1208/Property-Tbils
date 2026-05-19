import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About Us' };

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">About Property TBILS</h1>
      <p className="text-muted-foreground text-lg leading-relaxed mb-6">
        Property TBILS is Nigeria&apos;s trusted real estate marketplace, connecting buyers, tenants, and investors
        with verified properties and professional agents across all major cities.
      </p>
      <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        To make property search in Nigeria transparent, safe and efficient — eliminating fraud,
        reducing information asymmetry, and giving everyone access to reliable listings.
      </p>
      <h2 className="text-2xl font-bold mb-4">Our Values</h2>
      <ul className="space-y-3 text-muted-foreground">
        <li className="flex gap-2">✅ <span><strong>Transparency</strong> — verified listings only, no hidden fees</span></li>
        <li className="flex gap-2">✅ <span><strong>Trust</strong> — all agents go through a verification process</span></li>
        <li className="flex gap-2">✅ <span><strong>Access</strong> — properties across every price range and city</span></li>
        <li className="flex gap-2">✅ <span><strong>Speed</strong> — find, enquire and inspect faster than ever</span></li>
      </ul>
    </div>
  );
}
