import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PropertiesListing } from '@/features/properties/PropertiesListing';

export const metadata: Metadata = {
  title: 'Properties for Sale & Rent in Nigeria',
  description: 'Browse thousands of houses, apartments, land, and commercial properties for sale and rent across Nigeria. Filter by city, price, and property type.',
  openGraph: {
    title: 'Properties for Sale & Rent in Nigeria | Property TBILS',
    description: 'Browse thousands of houses, apartments, land, and commercial properties for sale and rent across Nigeria.',
    url: 'https://property.tbils.com/properties',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Properties for Sale & Rent in Nigeria | Property TBILS',
    description: 'Browse thousands of houses, apartments, land, and commercial properties for sale and rent across Nigeria.',
  },
};

export default function PropertiesPage() {
  return (
    <Suspense>
      <PropertiesListing />
    </Suspense>
  );
}
