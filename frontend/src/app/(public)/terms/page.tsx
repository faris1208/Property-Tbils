import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms & Conditions' };

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-slate">
      <h1>Terms & Conditions</h1>
      <p className="text-muted-foreground">Last updated: January 2025</p>
      <p>By using Property TBILS, you agree to these terms. Please read them carefully.</p>
      <h2>Use of Service</h2>
      <p>Property TBILS provides a platform for listing and discovering real estate properties in Nigeria. We do not act as agents or parties to any transaction.</p>
      <h2>Listings</h2>
      <p>All listings must be accurate and lawful. Fraudulent or misleading listings will be removed and the account banned.</p>
      <h2>Limitation of Liability</h2>
      <p>Property TBILS is not liable for disputes between buyers, tenants and agents. Always conduct due diligence before any property transaction.</p>
      <h2>Contact</h2>
      <p>For questions, contact legal@property.tbils.com</p>
    </div>
  );
}
