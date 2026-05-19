'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, BedDouble, Bath, Maximize2, MapPin, Tag,
  CalendarDays, CheckCircle2, AlertCircle, Clock, ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { Property } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';

const statusConfig: Record<string, { label: string; classes: string; icon: React.ReactNode }> = {
  approved: {
    label: 'Approved',
    classes: 'bg-green-100 text-green-700',
    icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
  },
  pending: {
    label: 'Pending Review',
    classes: 'bg-amber-100 text-amber-700',
    icon: <Clock className="w-4 h-4 text-amber-500" />,
  },
  rejected: {
    label: 'Rejected',
    classes: 'bg-red-100 text-red-700',
    icon: <AlertCircle className="w-4 h-4 text-red-500" />,
  },
};

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    api.get('/properties/my')
      .then((r) => {
        const list: Property[] = Array.isArray(r.data) ? r.data : r.data?.data || [];
        const found = list.find((p) => p.id === id);
        if (found) setProperty(found);
        else router.replace('/agent');
      })
      .catch(() => router.replace('/agent'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 space-y-4 max-w-4xl">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-72 w-full rounded-xl" />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-6" />)}
        </div>
      </div>
    );
  }

  if (!property) return null;

  const images = property.images ?? [];
  const status = statusConfig[property.approvalStatus] ?? statusConfig.pending;

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold leading-tight">{property.title}</h1>
          <p className="text-sm text-muted-foreground">{property.address}, {property.city}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${status.classes}`}>
            {status.icon}{status.label}
          </span>
          {property.approvalStatus === 'approved' && (
            <Button size="sm" asChild>
              <a href={`/properties/${property.slug}`} target="_blank" rel="noreferrer">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />View Live
              </a>
            </Button>
          )}
        </div>
      </div>

      {images.length > 0 && (
        <div className="space-y-2">
          <div className="relative w-full h-80 rounded-xl overflow-hidden bg-slate-100">
            <img
              src={images[activeImage]?.url}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 h-16 w-24 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${i === activeImage ? 'border-primary' : 'border-transparent'}`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 p-5 bg-slate-50 rounded-xl text-sm">
        <Detail icon={<Tag className="w-4 h-4" />} label="Type" value={`${property.type} · For ${property.status}`} capitalize />
        <Detail icon={null} label="Price" value={formatPrice(property.price)} bold />
        {property.bedrooms != null && (
          <Detail icon={<BedDouble className="w-4 h-4" />} label="Bedrooms" value={`${property.bedrooms}`} />
        )}
        {property.bathrooms != null && (
          <Detail icon={<Bath className="w-4 h-4" />} label="Bathrooms" value={`${property.bathrooms}`} />
        )}
        {property.sqft != null && (
          <Detail icon={<Maximize2 className="w-4 h-4" />} label="Size" value={`${property.sqft.toLocaleString()} sqft`} />
        )}
        <Detail icon={<MapPin className="w-4 h-4" />} label="Location" value={`${property.address}, ${property.city}`} />
        <Detail icon={<CalendarDays className="w-4 h-4" />} label="Listed" value={formatDate(property.createdAt)} />
      </div>

      {property.description && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Description</h2>
          <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">{property.description}</p>
        </div>
      )}

      {property.amenities?.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((a) => (
              <span key={a.id} className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full">
                {a.amenity}
              </span>
            ))}
          </div>
        </div>
      )}

      {property.approvalStatus === 'rejected' && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700">
          <p className="font-semibold mb-1">This listing was rejected.</p>
          <p className="text-red-600">Please review the feedback from admin and resubmit or contact support.</p>
        </div>
      )}
    </div>
  );
}

function Detail({
  icon, label, value, capitalize, bold,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  capitalize?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5">
      {icon && <span className="text-muted-foreground mt-0.5">{icon}</span>}
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`mt-0.5 ${bold ? 'font-semibold text-foreground' : 'text-foreground'} ${capitalize ? 'capitalize' : ''}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
