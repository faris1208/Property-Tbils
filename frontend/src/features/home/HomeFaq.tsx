'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimateIn, StaggerChildren, staggerItem } from '@/components/ui/AnimateIn';
import { motion } from 'framer-motion';

const faqs = [
  { q: 'What does a property management company do?', a: 'A property management company oversees the daily operations of a property, including tenant management, rent collection, maintenance coordination, inspections, and lease administration.' },
  { q: 'Do you manage properties outside Lagos?', a: 'Yes. We provide property marketing and management services in Lagos, Abuja, Port Harcourt, and Ibadan.' },
  { q: 'How do you market properties?', a: 'We use digital marketing, online property listings, social media promotion, professional photography, and targeted advertising to attract qualified buyers and tenants.' },
  { q: 'Can you manage properties for owners living abroad?', a: 'Yes. We work with diaspora property owners and provide regular reports and updates to ensure complete transparency.' },
  { q: 'What types of properties do you manage?', a: 'We manage residential, commercial, mixed-use, short-let, serviced apartment, and investment properties.' },
];

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-6 group"
      >
        <span className="font-medium text-slate-800 text-sm group-hover:text-primary transition-colors">{q}</span>
        <ChevronDown className={cn('w-4 h-4 shrink-0 text-slate-400 transition-transform duration-300', open && 'rotate-180')} />
      </button>
      <div className={cn('overflow-hidden transition-all duration-300', open ? 'max-h-64 pb-5' : 'max-h-0')}>
        <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export function HomeFaq() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <AnimateIn className="md:sticky md:top-24">
            <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-3 border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
              FAQ
            </span>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm">
              Everything you need to know about buying, renting, or listing a property on Property TBILS.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors group"
            >
              View all FAQs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </AnimateIn>

          {/* Right — accordion */}
          <StaggerChildren className="bg-slate-50 rounded-2xl px-6 divide-y divide-slate-100">
            {faqs.map(({ q, a }) => (
              <motion.div key={q} variants={staggerItem}>
                <FaqRow q={q} a={a} />
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
