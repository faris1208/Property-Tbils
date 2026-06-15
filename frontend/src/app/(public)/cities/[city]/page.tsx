import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PropertiesListing } from '@/features/properties/PropertiesListing';
import { JsonLd } from '@/components/seo/JsonLd';

const cities: Record<string, { name: string; description: string }> = {
  lagos: {
    name: 'Lagos',
    description: 'Find verified houses, apartments, land, and commercial properties for sale and rent in Lagos — Lekki, Victoria Island, Ikeja, Surulere & beyond.',
  },
  abuja: {
    name: 'Abuja',
    description: 'Search verified properties in Abuja — Maitama, Garki, Wuse, Gwarinpa & more. Buy, rent, or shortlet homes and commercial spaces with trusted agents.',
  },
  'port-harcourt': {
    name: 'Port Harcourt',
    description: 'Browse houses, apartments, and land for sale and rent in Port Harcourt. Verified listings from trusted agents across GRA, Trans Amadi & beyond.',
  },
  ibadan: {
    name: 'Ibadan',
    description: 'Find affordable properties for sale and rent in Ibadan. Browse verified houses, apartments, and land across Bodija, Ring Road, and other areas.',
  },
  enugu: {
    name: 'Enugu',
    description: 'Explore verified properties for sale and rent in Enugu. Find houses, apartments, and land in GRA, Independence Layout, and other neighbourhoods.',
  },
};

interface Props { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return Object.keys(cities).map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const data = cities[city];
  if (!data) return {};
  return {
    title: `Property for Sale & Rent in ${data.name}`,
    description: data.description,
    openGraph: {
      title: `Houses & Apartments for Sale and Rent in ${data.name} | Property TBILS`,
      description: data.description,
      url: `https://property.tbils.com/cities/${city}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Property for Sale & Rent in ${data.name} | Property TBILS`,
      description: data.description,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const data = cities[city];
  if (!data) notFound();

  const citySchema = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: `Properties in ${data.name} | Property TBILS`,
    description: data.description,
    url: `https://property.tbils.com/cities/${city}`,
  };

  return (
    <>
      <JsonLd data={citySchema} />
      <Suspense>
        <PropertiesListing defaultCity={data.name} />
      </Suspense>
    </>
  );
}
