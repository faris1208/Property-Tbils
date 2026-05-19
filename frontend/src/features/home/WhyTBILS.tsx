'use client';

import { ShieldCheck, Users, HeadphonesIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimateIn, StaggerChildren, staggerItem } from '@/components/ui/AnimateIn';

const features = [
  { icon: ShieldCheck, title: 'Verified Listings', desc: 'Every property goes through our approval process before going live.' },
  { icon: Users, title: 'Trusted Agents', desc: 'Work with verified, professional agents across all major cities.' },
  { icon: ShieldCheck, title: 'Safe & Secure', desc: 'Your data and transactions are protected at every step.' },
  { icon: HeadphonesIcon, title: 'Fast Support', desc: 'Our team is available to help you find the right property.' },
];

export function WhyTBILS() {
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <AnimateIn className="text-center mb-12">
          <p className="text-sm text-blue-400 font-medium uppercase tracking-wide mb-1">Our promise</p>
          <h2 className="text-3xl font-bold">Why Choose Property TBILS</h2>
        </AnimateIn>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className="bg-slate-800 rounded-xl p-6 text-center hover:bg-slate-700 transition-colors cursor-default"
            >
              <div className="inline-flex p-3 rounded-full bg-blue-600/20 mb-4">
                <Icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
