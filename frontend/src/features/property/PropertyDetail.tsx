'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Bed, Bath, Maximize2, Phone, Heart, Share2, ChevronRight, ChevronLeft, Mail, HeartOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { InquiryForm } from './InquiryForm';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Property } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';

export function PropertyDetail({ slug }: { slug: string }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    api.get(`/properties/${slug}`)
      .then((r) => { setProperty(r.data.data); })
      .catch(() => setProperty(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <Skeleton className="h-96 w-full rounded-xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-10 w-3/4" /><Skeleton className="h-6 w-1/2" /><Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </div>
  );

  const toggleSave = async () => {
    if (!user) { router.push('/login'); return; }
    if (!property) return;
    setSaving(true);
    try {
      if (saved) {
        await api.delete(`/saved/${property.id}`);
        setSaved(false);
      } else {
        await api.post(`/saved/${property.id}`);
        setSaved(true);
      }
    } catch { /* ignore */ } finally { setSaving(false); }
  };

  if (!property) return (
    <div className="text-center py-24">
      <p className="text-2xl font-bold mb-2">Property not found</p>
      <Button asChild><Link href="/properties">Browse properties</Link></Button>
    </div>
  );

  const images = property.images || [];
  const agent = property.agent;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/properties" className="hover:text-foreground">Properties</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground line-clamp-1">{property.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left — gallery + property info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 mb-2 group">
              {images[activeImg] ? (
                <Image src={images[activeImg].url} alt={property.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 66vw" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><Maximize2 className="w-12 h-12 text-slate-400" /></div>
              )}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImg((prev) => (prev + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {activeImg + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="relative flex items-center gap-2">
                <button
                  onClick={() => setActiveImg((prev) => (prev - 1 + images.length) % images.length)}
                  className="shrink-0 w-8 h-8 rounded-full bg-white border shadow flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                </button>
                <div className="flex gap-2 overflow-x-auto flex-1 scrollbar-hide">
                  {images.map((img, i) => (
                    <button key={img.id} onClick={() => setActiveImg(i)}
                      className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${i === activeImg ? 'border-primary' : 'border-transparent'}`}>
                      <Image src={img.url} alt="" fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setActiveImg((prev) => (prev + 1) % images.length)}
                  className="shrink-0 w-8 h-8 rounded-full bg-white border shadow flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            )}
          </div>

          {/* Title & price */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant={property.status === 'sale' ? 'default' : 'secondary'} className="capitalize">For {property.status}</Badge>
              {property.isFeatured && <Badge className="bg-amber-500">Featured</Badge>}
              <Badge variant="outline" className="capitalize">{property.type}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <p className="flex items-center gap-1 text-muted-foreground mb-3">
              <MapPin className="w-4 h-4" /> {property.address}, {property.city}
            </p>
            <p className="text-3xl font-bold text-primary">
              {formatPrice(property.price, property.currency)}
              {property.status === 'rent' && <span className="text-base font-normal text-muted-foreground">/year</span>}
            </p>
          </div>

          {/* Key stats */}
          {(property.bedrooms || property.bathrooms || property.sqft) && (
            <div className="flex gap-6 py-4 border-y">
              {property.bedrooms && <div className="flex items-center gap-2"><Bed className="w-5 h-5 text-primary" /><div><p className="text-lg font-bold">{property.bedrooms}</p><p className="text-xs text-muted-foreground">Bedrooms</p></div></div>}
              {property.bathrooms && <div className="flex items-center gap-2"><Bath className="w-5 h-5 text-primary" /><div><p className="text-lg font-bold">{property.bathrooms}</p><p className="text-xs text-muted-foreground">Bathrooms</p></div></div>}
              {property.sqft && <div className="flex items-center gap-2"><Maximize2 className="w-5 h-5 text-primary" /><div><p className="text-lg font-bold">{property.sqft}</p><p className="text-xs text-muted-foreground">Sqft</p></div></div>}
            </div>
          )}

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold mb-3">About this property</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{property.description}</p>
          </div>

          {/* Amenities */}
          {property.amenities?.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-3">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {property.amenities.map((a) => (
                  <div key={a.id} className="flex items-center gap-2 text-sm bg-slate-50 px-3 py-2 rounded-lg">
                    <span className="text-green-500">✓</span> {a.amenity}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — sticky contact sidebar */}
        <div className="space-y-4 lg:sticky lg:top-6">
          {/* Connect card */}
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="bg-primary px-5 py-4">
              <h3 className="text-white font-semibold text-base">Contact Property TBILS</h3>
              <p className="text-primary-foreground/70 text-xs mt-0.5">We'll connect you with the right person</p>
            </div>

            <CardContent className="p-5 space-y-4">
              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/2347036798216?text=Hi, I'm interested in this property: ${encodeURIComponent(property.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-3.5 px-4 rounded-xl transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message on WhatsApp
              </a>

              {/* Call & Email rows */}
              <div className="space-y-2">
                <a href="tel:+2347036798216" className="flex items-center gap-3 p-3 rounded-xl border hover:bg-slate-50 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Call us</p>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">+234 703 679 8216</p>
                  </div>
                </a>
                <a href="mailto:tbilproperty@gmail.com" className="flex items-center gap-3 p-3 rounded-xl border hover:bg-slate-50 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email us</p>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">tbilproperty@gmail.com</p>
                  </div>
                </a>
              </div>

              <Separator />

              <InquiryForm propertyId={property.id} propertyTitle={property.title} compact />
            </CardContent>
          </Card>

          {/* Save & Share */}
          <Card>
            <CardContent className="p-4 flex gap-3">
              <Button
                variant="outline"
                className={`flex-1 ${saved ? 'text-red-500 border-red-200' : ''}`}
                size="sm"
                onClick={toggleSave}
                disabled={saving}
              >
                {saved ? <HeartOff className="w-4 h-4 mr-2" /> : <Heart className="w-4 h-4 mr-2" />}
                {saved ? 'Unsave' : 'Save'}
              </Button>
              <Button variant="outline" className="flex-1" size="sm" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground text-center">Listed {formatDate(property.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
