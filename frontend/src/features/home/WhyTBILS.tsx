'use client';

import Link from 'next/link';
import { ShieldCheck, Users, HeadphonesIcon, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimateIn, StaggerChildren, staggerItem } from '@/components/ui/AnimateIn';

const stats = [
  { value: '10,000+', label: 'Properties Listed' },
  { value: '500+',    label: 'Verified Agents' },
  { value: '20+',     label: 'Cities Covered' },
  { value: '98%',     label: 'Client Satisfaction' },
];

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified Listings',
    desc: 'Every property is reviewed and approved by our team before going live. No scams, no surprises.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: Users,
    title: 'Trusted Agents',
    desc: 'Work with vetted, professional agents across all major Nigerian cities and beyond.',
    color: 'text-violet-600 bg-violet-50',
  },
  {
    icon: TrendingUp,
    title: 'Best Value',
    desc: 'Transparent pricing with no hidden fees. Compare properties and make smarter decisions.',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated Support',
    desc: 'Our team is always available to guide you through every step of the property journey.',
    color: 'text-amber-600 bg-amber-50',
  },
];

export function WhyTBILS() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Stats bar */}
        <AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-100 rounded-2xl overflow-hidden mb-20 shadow-sm">
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-white px-6 py-8 text-center">
                <p className="text-3xl font-bold text-slate-900 mb-1">{value}</p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <AnimateIn>
            <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-3 border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
              Our promise
            </span>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
              Why Choose <br className="hidden md:block" />Property TBILS
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm">
              We built Nigeria&apos;s most trusted property platform so you can buy, rent, or sell with complete confidence.
            </p>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors group"
            >
              Start Searching
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </AnimateIn>

          {/* Right: feature cards */}
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <div className={`inline-flex w-10 h-10 items-center justify-center rounded-xl ${color} mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1.5 text-sm">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
