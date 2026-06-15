import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HeroSection } from '@/features/home/HeroSection';
import { FeaturedListings } from '@/features/home/FeaturedListings';
import { ExploreByCity } from '@/features/home/ExploreByCity';
import { WhyTBILS } from '@/features/home/WhyTBILS';
import { Testimonials } from '@/features/home/Testimonials';
import { BlogPreview } from '@/features/home/BlogPreview';
import { JsonLd } from '@/components/seo/JsonLd';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Property TBILS',
  url: 'https://property.tbils.com',
  logo: 'https://property.tbils.com/favicon.png',
  description: 'Nigeria\'s trusted property marketplace for buying, renting, and selling verified real estate.',
  areaServed: { '@type': 'Country', name: 'Nigeria' },
  address: { '@type': 'PostalAddress', addressCountry: 'NG' },
  sameAs: ['https://tbils.com'],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Property TBILS',
  url: 'https://property.tbils.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://property.tbils.com/properties?keyword={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={websiteSchema} />
      <HeroSection />
      <FeaturedListings />
      <ExploreByCity />
      <WhyTBILS />

      {/* CTA Banner */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Ready to find your next property?
          </h2>
          <p className="text-white/75 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Join thousands of Nigerians who have found their perfect home through Property TBILS.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold text-sm px-7 py-3 rounded-xl hover:bg-white/90 transition-colors group"
            >
              Browse Listings
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/30 font-semibold text-sm px-7 py-3 rounded-xl hover:bg-white/20 transition-colors"
            >
              List your Property
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />
      <BlogPreview />
    </>
  );
}
