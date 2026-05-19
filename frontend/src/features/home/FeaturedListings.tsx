'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/property/PropertyCard';
import { AnimateIn, StaggerChildren, staggerItem } from '@/components/ui/AnimateIn';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Property } from '@/types';

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
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <AnimateIn className="flex items-center justify-between mb-10">
          <div>
            <p className="text-sm text-primary font-medium uppercase tracking-wide mb-1">Hand-picked</p>
            <h2 className="text-3xl font-bold">Featured Properties</h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/properties">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </AnimateIn>

        {error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-3">Could not load featured properties.</p>
            <Button variant="outline" size="sm" onClick={load}>Retry</Button>
          </div>
        ) : properties.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No featured properties available yet.</p>
        ) : (
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
              <motion.div key={p.id} variants={staggerItem}>
                <PropertyCard property={p} />
              </motion.div>
            ))}
          </StaggerChildren>
        )}
      </div>
    </section>
  );
}
