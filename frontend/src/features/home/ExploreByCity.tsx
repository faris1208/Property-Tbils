'use client';

import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimateIn, StaggerChildren, staggerItem } from '@/components/ui/AnimateIn';

const cities = [
  { name: 'Lagos',         count: '3,200+', gradient: 'from-blue-600   to-blue-900',    span: 'md:col-span-2 md:row-span-2' },
  { name: 'Abuja',         count: '1,800+', gradient: 'from-violet-600 to-violet-900',  span: '' },
  { name: 'Port Harcourt', count: '900+',   gradient: 'from-emerald-600 to-emerald-900',span: '' },
  { name: 'Ibadan',        count: '600+',   gradient: 'from-amber-600  to-amber-900',   span: '' },
  { name: 'Enugu',         count: '400+',   gradient: 'from-rose-600   to-rose-900',    span: '' },
  { name: 'International', count: '200+',   gradient: 'from-slate-600  to-slate-900',   span: '' },
];

export function ExploreByCity() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <AnimateIn className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-3 border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
              Browse by location
            </span>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">Explore by City</h2>
            <p className="text-slate-500 mt-2 text-sm">
              Find properties in Nigeria&apos;s most sought-after locations.
            </p>
          </div>
          <Link
            href="/properties"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all group"
          >
            All locations
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimateIn>

        <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]">
          {cities.map(({ name, count, gradient, span }) => (
            <motion.div
              key={name}
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={span}
            >
              <Link
                href={`/properties?city=${encodeURIComponent(name)}`}
                className={`relative flex flex-col justify-end h-full rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} group block`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />
                <div className="relative z-10 p-5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-white/70" />
                    <p className="text-white/70 text-xs font-medium">{count} listings</p>
                  </div>
                  <p className="text-white font-bold text-lg leading-tight">{name}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
