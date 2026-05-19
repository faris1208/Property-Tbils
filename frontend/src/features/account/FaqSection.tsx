'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  category: string;
  items: FaqItem[];
}

const faqs: FaqCategory[] = [
  {
    category: 'General',
    items: [
      { q: 'What is Property TBILS?', a: 'Property TBILS is Nigeria\'s premier real estate marketplace connecting buyers, renters, and sellers with verified agents and properties across major cities.' },
      { q: 'Is Property TBILS free to use?', a: 'Browsing and inquiring about properties is completely free. Agents pay a subscription fee to list properties on the platform.' },
      { q: 'How do I contact an agent?', a: 'You can contact an agent directly through any property listing using the inquiry form or by clicking the WhatsApp/call buttons on the agent\'s profile.' },
    ],
  },
  {
    category: 'For Buyers & Renters',
    items: [
      { q: 'How do I search for properties?', a: 'Use the search bar on the homepage or the properties page. You can filter by city, type, price range, bedrooms, and more.' },
      { q: 'Are the listings verified?', a: 'All listings are reviewed by our admin team before going live. We also verify agents before they can post listings.' },
      { q: 'Can I save properties I\'m interested in?', a: 'Yes! Create a free account and use the save button on any property to add it to your saved list for easy access later.' },
      { q: 'What is the inspection booking feature?', a: 'You can request a physical inspection of a property directly through the listing. An agent will confirm a date and time with you.' },
    ],
  },
  {
    category: 'For Agents',
    items: [
      { q: 'How do I list a property?', a: 'Create an account and select "Agent" as your role. After your profile is set up, go to your dashboard and click "Add Listing" to submit a property for review.' },
      { q: 'How long does property approval take?', a: 'Our team reviews listings within 24-48 hours. You\'ll receive an email notification once your listing is approved or if changes are required.' },
      { q: 'Can I upload multiple images?', a: 'Yes. After creating a listing, you can upload up to 20 high-resolution images. The first image marked as primary will be the listing thumbnail.' },
    ],
  },
  {
    category: 'Payments & Safety',
    items: [
      { q: 'Does Property TBILS handle payments?', a: 'We do not process property payments. We connect you with agents, and all financial transactions happen directly between parties. Always verify before paying.' },
      { q: 'How do I report a fraudulent listing?', a: 'Click the "Report" option on any listing or contact us at support@property.tbils.com with details of the suspected fraud.' },
    ],
  },
];

function FaqItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-primary transition-colors cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-sm">{item.q}</span>
        <ChevronDown className={cn('w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform duration-200', open && 'rotate-180')} />
      </button>
      <div className={cn('overflow-hidden transition-all duration-200', open ? 'max-h-96 pb-4' : 'max-h-0')}>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <div className="space-y-10">
      {faqs.map(({ category, items }) => (
        <div key={category}>
          <h2 className="text-lg font-semibold mb-4 text-primary">{category}</h2>
          <div className="rounded-xl border px-5 divide-y">
            {items.map((item) => (
              <FaqItem key={item.q} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
