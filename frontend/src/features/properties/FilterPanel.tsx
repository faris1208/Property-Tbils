'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const amenities = ['Parking', 'Pool', 'Security', 'Furnished', 'Generator', 'BQ'];

export function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    params.set('page', '1');
    router.push(`/properties?${params}`);
  };

  const reset = () => router.push('/properties');

  return (
    <aside className="w-64 shrink-0 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <button onClick={reset} className="text-xs text-primary hover:underline cursor-pointer">Clear all</button>
      </div>

      <div>
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2 block">Property Type</Label>
        <Select value={searchParams.get('type') || ''} onValueChange={(v) => update('type', v ?? '')}>
          <SelectTrigger><SelectValue placeholder="Any type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any type</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="land">Land</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="shortlet">Shortlet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2 block">Listing Type</Label>
        <Select value={searchParams.get('status') || ''} onValueChange={(v) => update('status', v ?? '')}>
          <SelectTrigger><SelectValue placeholder="Buy or Rent" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any</SelectItem>
            <SelectItem value="sale">For Sale</SelectItem>
            <SelectItem value="rent">For Rent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2 block">Bedrooms</Label>
        <Select value={searchParams.get('bedrooms') || ''} onValueChange={(v) => update('bedrooms', v ?? '')}>
          <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any</SelectItem>
            {[1,2,3,4,5].map(n => <SelectItem key={n} value={String(n)}>{n}+</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2 block">Price Range (NGN)</Label>
        <div className="flex gap-2">
          <Input placeholder="Min" type="number" defaultValue={searchParams.get('minPrice') || ''}
            onBlur={(e) => update('minPrice', e.target.value)} className="text-xs" />
          <Input placeholder="Max" type="number" defaultValue={searchParams.get('maxPrice') || ''}
            onBlur={(e) => update('maxPrice', e.target.value)} className="text-xs" />
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3 block">Amenities</Label>
        <div className="space-y-2">
          {amenities.map((a) => (
            <div key={a} className="flex items-center gap-2">
              <Checkbox id={a} />
              <Label htmlFor={a} className="text-sm font-normal cursor-pointer">{a}</Label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full" size="sm" onClick={() => router.refresh()}>Apply Filters</Button>
    </aside>
  );
}
