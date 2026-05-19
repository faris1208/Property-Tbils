import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PropertiesListing } from '@/features/properties/PropertiesListing';

export const metadata: Metadata = {
  title: 'Properties',
  description: 'Browse thousands of verified properties for sale and rent across Nigeria.',
};

export default function PropertiesPage() {
  return (
    <Suspense>
      <PropertiesListing />
    </Suspense>
  );
}
