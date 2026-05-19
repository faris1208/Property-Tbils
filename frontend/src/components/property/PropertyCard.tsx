'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Maximize2, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Property } from '@/types';
import { formatPrice } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  onSave?: (id: string) => void;
}

export function PropertyCard({ property, onSave }: PropertyCardProps) {
  const primaryImage = property.images?.find((i) => i.isPrimary) || property.images?.[0];

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="rounded-xl"
    >
      <Link href={`/properties/${property.slug}`} className="block">
        <Card className="overflow-hidden group cursor-pointer border-transparent shadow-md">
          <div className="relative aspect-[16/10] bg-slate-100">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-200">
                <Maximize2 className="w-8 h-8 text-slate-400" />
              </div>
            )}
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant={property.status === 'sale' ? 'default' : 'secondary'} className="capitalize">
                For {property.status}
              </Badge>
              {property.isFeatured && (
                <Badge className="bg-amber-500 hover:bg-amber-600">Featured</Badge>
              )}
            </div>
            {onSave && (
              <button
                onClick={(e) => { e.preventDefault(); onSave(property.id); }}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4 text-slate-600" />
              </button>
            )}
          </div>

          <CardContent className="p-4">
            <p className="text-xl font-bold text-primary mb-1">
              {formatPrice(property.price, property.currency)}
              {property.status === 'rent' && <span className="text-sm font-normal text-muted-foreground">/yr</span>}
            </p>
            <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2">{property.title}</h3>
            <p className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
              <MapPin className="w-3 h-3 shrink-0" />
              {property.address}, {property.city}
            </p>

            {(property.bedrooms || property.bathrooms || property.sqft) && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground border-t pt-3 mb-3">
                {property.bedrooms && (
                  <span className="flex items-center gap-1">
                    <Bed className="w-3 h-3" /> {property.bedrooms} Bed
                  </span>
                )}
                {property.bathrooms && (
                  <span className="flex items-center gap-1">
                    <Bath className="w-3 h-3" /> {property.bathrooms} Bath
                  </span>
                )}
                {property.sqft && (
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" /> {property.sqft} sqft
                  </span>
                )}
              </div>
            )}

            <Button className="w-full" size="sm">View Property</Button>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
