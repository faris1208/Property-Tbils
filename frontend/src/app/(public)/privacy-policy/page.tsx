import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-slate">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: January 2025</p>
      <p>Property TBILS is committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights.</p>
      <h2>Data We Collect</h2>
      <ul>
        <li>Account information (name, email, phone)</li>
        <li>Property search and viewing history</li>
        <li>Inquiry and lead data</li>
        <li>Payment information (processed securely via Paystack)</li>
      </ul>
      <h2>How We Use Your Data</h2>
      <p>We use your data to provide and improve our services, connect you with agents, send transactional emails, and comply with legal obligations.</p>
      <h2>Contact</h2>
      <p>For privacy concerns, contact us at privacy@property.tbils.com</p>
    </div>
  );
}
