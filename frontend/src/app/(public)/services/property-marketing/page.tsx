import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Property Marketing Services in Lagos & Nigeria | TBIL Property',
  description: 'Promote your property faster with TBIL Property\'s expert property marketing services. Reach qualified buyers and tenants across Lagos, Abuja, Port Harcourt, and Ibadan.',
  keywords: 'Property Marketing Nigeria, Property Marketing Lagos, Real Estate Marketing Services, Property Advertising, Property Promotion',
};

const services = [
  'Property advertising and promotion',
  'Digital marketing campaigns',
  'Professional property photography',
  'Property listing management',
  'Social media marketing',
  'Buyer and tenant sourcing',
  'Property inspections',
  'Lead generation',
  'Market valuation support',
  'Property positioning strategy',
];

export default function PropertyMarketingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-950 text-white py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-400 uppercase mb-4 border border-blue-400/20 bg-blue-400/5 px-3 py-1 rounded-full">
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Property Marketing Services in Nigeria
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Finding the right buyer or tenant requires more than simply listing a property online.
            Our property marketing solutions are designed to attract qualified prospects quickly and efficiently.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-7 py-3 rounded-xl hover:bg-primary/90 transition-colors group"
          >
            Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">
                Reach the Right Audience, Faster
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                We leverage modern digital marketing channels and industry expertise to ensure your property reaches the right audience.
              </p>
              <p className="text-slate-500 leading-relaxed mb-4">
                With a growing presence in Lagos, Abuja, Port Harcourt, and Ibadan, we provide tailored marketing solutions designed to meet the unique needs of each property.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Whether you own residential apartments, commercial buildings, short-let properties, serviced apartments, or investment properties, our team provides the expertise and local market knowledge needed to attract quality buyers and tenants.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Our Property Marketing Services Include:</h3>
              <ul className="space-y-3">
                {services.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Who We Work With</h2>
          <p className="text-slate-500 mb-10 text-sm">We provide marketing services for property owners across all categories.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Property Owners', 'Landlords', 'Real Estate Investors', 'Estate Developers', 'Corporate Organizations', 'Diaspora Property Owners', 'Commercial Owners', 'Residential Owners'].map((type) => (
              <div key={type} className="bg-white border border-slate-100 rounded-xl p-4 text-sm font-medium text-slate-700 shadow-sm">
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-slate-500 text-sm mb-3">We operate across Nigeria&apos;s major cities</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'].map((city) => (
              <span key={city} className="bg-primary/5 border border-primary/20 text-primary text-sm font-semibold px-5 py-2 rounded-full">
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-950 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Market Your Property?</h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Contact TBIL Property today and let our team help you attract qualified buyers and tenants quickly.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-colors group"
          >
            Contact Us Today <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
