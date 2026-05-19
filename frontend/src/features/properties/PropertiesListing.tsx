'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyCard } from '@/components/property/PropertyCard';
import { PropertyCardSkeleton } from '@/components/property/PropertyCardSkeleton';
import { SearchBar } from '@/components/search/SearchBar';
import { FilterPanel } from './FilterPanel';
import { api } from '@/lib/api';
import { Property, PaginationMeta } from '@/types';
import { buildQueryString } from '@/lib/utils';

export function PropertiesListing() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const city = searchParams.get('city') || '';
  const type = searchParams.get('type') || '';
  const status = searchParams.get('status') || '';
  const sort = searchParams.get('sort') || 'newest';
  const page = Number(searchParams.get('page') || 1);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setFetchError(false);
    try {
      const params: Record<string, unknown> = { city, type, status, sort, page, limit: 12 };
      const qs = buildQueryString(params);
      const res = await api.get(`/properties?${qs}`);
      setProperties(res.data.data);
      setMeta(res.data.meta);
    } catch {
      setFetchError(true);
      setProperties([]);
    } finally { setLoading(false); }
  }, [city, type, status, sort, page]);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  const setSort = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', val); params.set('page', '1');
    router.push(`/properties?${params}`);
  };

  const setPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(p));
    router.push(`/properties?${params}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar defaultCity={city} defaultType={type} defaultStatus={status} compact />
      </div>

      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
          {meta && (
            <p className="text-sm text-muted-foreground">
              Showing {properties.length} of <strong>{meta.total}</strong> properties
            </p>
          )}
        </div>
        <Select value={sort} onValueChange={(v) => setSort(v ?? 'newest')}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-6">
        {showFilters && <FilterPanel />}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
            </div>
          ) : fetchError ? (
            <div className="text-center py-24">
              <p className="text-xl font-bold mb-2">Failed to load properties</p>
              <p className="text-muted-foreground mb-4">Check your connection and try again.</p>
              <Button variant="outline" onClick={fetchProperties}>Retry</Button>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-2xl font-bold mb-2">No properties found</p>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
              </div>
              {meta && meta.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  <Button variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</Button>
                  <span className="flex items-center px-4 text-sm text-muted-foreground">
                    Page {page} of {meta.totalPages}
                  </span>
                  <Button variant="outline" disabled={page >= meta.totalPages} onClick={() => setPage(page + 1)}>Next</Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
