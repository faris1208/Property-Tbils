import type { Metadata } from 'next';
import { FaqSection } from '@/features/account/FaqSection';

export const metadata: Metadata = { title: 'FAQ' };

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
      <p className="text-muted-foreground mb-10">Everything you need to know about Property TBILS.</p>
      <FaqSection />
    </div>
  );
}
