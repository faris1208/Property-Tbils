'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { AnimateIn, StaggerChildren, staggerItem } from '@/components/ui/AnimateIn';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Property } from '@/types';
import { Button } from '@/components/ui/button';

export function FeaturedListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState(false);

  const load = () => {
    setError(false);
    api.get('/properties/featured')
      .then((r) => setProperties(r.data.data || []))
      .catch(() => setError(true));
  };

  useEffect(() => { load(); }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimateIn className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-3 border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
              Hand-picked
            </span>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">Featured Properties</h2>
            <p className="text-slate-500 mt-2 text-sm max-w-md">
              Curated listings verified by our team — quality homes across Nigeria&apos;s top cities.
            </p>
          </div>
          <Link
            href="/properties"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all group"
          >
            View all listings
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimateIn>

        {error ? (
          <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl">
            <p className="text-slate-400 mb-3">Could not load featured properties.</p>
            <Button variant="outline" size="sm" onClick={load}>Try again</Button>
          </div>
        ) : properties.length === 0 ? (
          <p className="text-center text-slate-400 py-16">No featured properties available yet.</p>
        ) : (
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {properties.map((p) => (
              <motion.div key={p.id} variants={staggerItem}>
                <PropertyCard property={p} />
              </motion.div>
            ))}
          </StaggerChildren>
        )}

        <AnimateIn className="mt-10 text-center md:hidden">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary border border-primary/30 px-5 py-2.5 rounded-full hover:bg-primary/5 transition-colors"
          >
            View all listings <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
