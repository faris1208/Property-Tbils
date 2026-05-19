'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimateIn, StaggerChildren, staggerItem } from '@/components/ui/AnimateIn';

const cities = [
  { name: 'Lagos', count: '3,200+', bg: 'from-blue-500 to-blue-700' },
  { name: 'Abuja', count: '1,800+', bg: 'from-violet-500 to-violet-700' },
  { name: 'Port Harcourt', count: '900+', bg: 'from-emerald-500 to-emerald-700' },
  { name: 'Ibadan', count: '600+', bg: 'from-amber-500 to-amber-700' },
  { name: 'Enugu', count: '400+', bg: 'from-rose-500 to-rose-700' },
  { name: 'International', count: '200+', bg: 'from-slate-500 to-slate-700' },
];

export function ExploreByCity() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <AnimateIn className="text-center mb-10">
          <p className="text-sm text-primary font-medium uppercase tracking-wide mb-1">Browse by location</p>
          <h2 className="text-3xl font-bold">Explore by City</h2>
        </AnimateIn>

        <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map(({ name, count, bg }) => (
            <motion.div key={name} variants={staggerItem} whileHover={{ scale: 1.07, transition: { duration: 0.2 } }}>
              <Link
                href={`/properties?city=${encodeURIComponent(name)}`}
                className={`bg-gradient-to-br ${bg} text-white rounded-xl p-5 text-center block transition-transform`}
              >
                <MapPin className="w-6 h-6 mx-auto mb-2 opacity-80" />
                <p className="font-semibold text-sm">{name}</p>
                <p className="text-xs opacity-75 mt-1">{count} listings</p>
              </Link>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
