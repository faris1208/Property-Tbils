'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { buildQueryString } from '@/lib/utils';

interface SearchBarProps {
  defaultCity?: string;
  defaultType?: string;
  defaultStatus?: string;
  compact?: boolean;
}

export function SearchBar({ defaultCity = '', defaultType = '', defaultStatus = '', compact = false }: SearchBarProps) {
  const router = useRouter();
  const [city, setCity] = useState(defaultCity);
  const [type, setType] = useState(defaultType);
  const [status, setStatus] = useState(defaultStatus);

  const handleSearch = () => {
    const qs = buildQueryString({ city, type, status });
    router.push(`/properties${qs ? `?${qs}` : ''}`);
  };

  if (compact) {
    return (
      <div className="flex gap-2">
        <Input
          placeholder="Search city or keyword..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch}>
          <Search className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-2 flex flex-col md:flex-row gap-2">
      <Input
        placeholder="City, neighbourhood or keyword..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="flex-1 border-0 shadow-none focus-visible:ring-0 text-sm"
      />
      <Select value={type} onValueChange={(v) => setType(v ?? '')}>
        <SelectTrigger className="md:w-40 border-0 shadow-none focus:ring-0">
          <SelectValue placeholder="Property type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apartment">Apartment</SelectItem>
          <SelectItem value="house">House</SelectItem>
          <SelectItem value="land">Land</SelectItem>
          <SelectItem value="commercial">Commercial</SelectItem>
          <SelectItem value="shortlet">Shortlet</SelectItem>
        </SelectContent>
      </Select>
      <Select value={status} onValueChange={(v) => setStatus(v ?? '')}>
        <SelectTrigger className="md:w-36 border-0 shadow-none focus:ring-0">
          <SelectValue placeholder="Buy or Rent" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sale">For Sale</SelectItem>
          <SelectItem value="rent">For Rent</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleSearch} className="md:w-auto w-full">
        <Search className="w-4 h-4 mr-2" /> Search
      </Button>
    </div>
  );
}
