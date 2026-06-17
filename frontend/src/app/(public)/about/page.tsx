import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | TBIL Property Nigeria',
  description: "TBIL Property is Nigeria's leading property marketing and management company. Learn about our mission, values, and why thousands of property owners trust us.",
};

const reasons = [
  { title: 'Local Market Expertise', desc: 'We understand the real estate markets in Lagos, Abuja, Port Harcourt, and Ibadan.' },
  { title: 'Professional Management', desc: 'Our systems are designed to ensure transparency, accountability, and efficiency.' },
  { title: 'Higher Occupancy Rates', desc: 'Through strategic marketing and tenant management, we help reduce vacancies.' },
  { title: 'Property Value Preservation', desc: 'Regular inspections and maintenance oversight help protect your investment.' },
  { title: 'Transparent Reporting', desc: 'Property owners receive regular updates and performance reports.' },
  { title: 'Customer-Focused Approach', desc: 'We prioritize client satisfaction and long-term relationships.' },
];

const clientTypes = [
  'Property owners', 'Landlords', 'Real estate investors', 'Estate developers',
  'Corporate organizations', 'Diaspora property owners', 'Commercial property owners', 'Residential property owners',
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-950 text-white py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-400 uppercase mb-4 border border-blue-400/20 bg-blue-400/5 px-3 py-1 rounded-full">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            About TBIL Property
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Nigeria&apos;s leading property marketing and management company, helping property owners achieve higher returns on investment across Lagos, Abuja, Port Harcourt, and Ibadan.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-3 border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
                Our Story
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mt-3 mb-5">Who We Are</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                TBIL Property was established with a mission to simplify property ownership and maximize property value for clients across Nigeria.
              </p>
              <p className="text-slate-500 leading-relaxed mb-4">
                Managing real estate can be demanding — finding reliable tenants, collecting rent, maintaining facilities, handling legal compliance, marketing vacant units, and resolving tenant-related issues all require time and expertise.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Our team takes care of every aspect of property management so property owners can enjoy peace of mind while earning consistent returns from their investments.
              </p>
            </div>
            <div className="bg-slate-950 rounded-2xl p-8 text-white">
              <h3 className="text-lg font-bold mb-6">Why Choose TBIL Property?</h3>
              <div className="space-y-4">
                {reasons.map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Who We Work With</h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Whether you own a single apartment or a large property portfolio, we can help manage and market your assets effectively.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {clientTypes.map((type) => (
              <div key={type} className="bg-white border border-slate-100 rounded-xl p-4 text-sm font-medium text-slate-700 text-center shadow-sm capitalize">
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-slate-500 text-sm mb-3">With a growing presence across Nigeria</p>
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
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Partner With Us</h2>
          <p className="text-white/80 text-sm mb-8 leading-relaxed">
            Looking for reliable property marketing and management services in Nigeria? Let our experienced team help you market, manage, and maximize the value of your real estate investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold text-sm px-7 py-3 rounded-xl hover:bg-white/90 transition-colors group"
            >
              Contact Us <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-semibold text-sm px-7 py-3 rounded-xl hover:bg-white/20 transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
