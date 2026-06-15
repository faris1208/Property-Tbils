'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimateIn, StaggerChildren, staggerItem } from '@/components/ui/AnimateIn';

const cities = [
  { name: 'Lagos',         slug: 'lagos',          count: '3,200+', image: '/assets/Images/homepage/lagos.jpeg',        span: 'md:col-span-2 md:row-span-2' },
  { name: 'Abuja',         slug: 'abuja',          count: '1,800+', image: '/assets/Images/homepage/tb1.jpg',            span: '' },
  { name: 'Port Harcourt', slug: 'port-harcourt',  count: '900+',   image: '/assets/Images/homepage/Portharcourt.jpeg',  span: '' },
  { name: 'Ibadan',        slug: 'ibadan',         count: '600+',   image: '/assets/Images/homepage/ibadan.jpeg',         span: '' },
  { name: 'Enugu',         slug: 'enugu',          count: '400+',   image: '/assets/Images/homepage/tb2.jpg',             span: '' },
  { name: 'International', slug: null,             count: '200+',   image: '/assets/Images/homepage/tey17.jpeg',          span: '' },
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
          {cities.map(({ name, slug, count, image, span }) => (
            <motion.div
              key={name}
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={span}
            >
              <Link
                href={slug ? `/cities/${slug}` : `/properties?city=${encodeURIComponent(name)}`}
                className="relative flex flex-col justify-end h-full rounded-2xl overflow-hidden group block"
              >
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* dark gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all" />

                <div className="relative z-10 p-5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-white/70" />
                    <p className="text-white/70 text-xs font-medium">{count} listings</p>
                  </div>
                  <p className="text-white font-bold text-lg leading-tight drop-shadow">{name}</p>
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
