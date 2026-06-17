import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Property Management Services in Lagos & Nigeria | TBIL Property',
  description: 'Professional property management services for landlords and investors. We handle tenant sourcing, rent collection, maintenance, and inspections across Nigeria.',
  keywords: 'Property Management Lagos, Property Managers Nigeria, Rental Property Management, Estate Management Services, Tenant Management',
};

const managementServices = [
  {
    title: 'Tenant Acquisition & Screening',
    desc: 'We carefully screen prospective tenants through background checks, employment verification, income assessment, reference verification, and rental history evaluation.',
    items: ['Background checks', 'Employment verification', 'Income assessment', 'Reference verification', 'Rental history evaluation'],
  },
  {
    title: 'Rent Collection & Financial Administration',
    desc: 'Consistent rental income is critical to property performance. We handle all financial administration so you never have to chase payments.',
    items: ['Rent collection', 'Payment tracking', 'Rental reporting', 'Service charge administration', 'Financial record management'],
  },
  {
    title: 'Property Inspection Services',
    desc: 'Regular inspections help identify issues before they become expensive problems.',
    items: ['Routine property inspections', 'Move-in inspections', 'Move-out inspections', 'Maintenance assessments', 'Compliance checks'],
  },
  {
    title: 'Property Maintenance Coordination',
    desc: 'Our network of trusted contractors ensures timely and cost-effective maintenance solutions.',
    items: ['Plumbing repairs', 'Electrical maintenance', 'Painting works', 'Cleaning services', 'General facility repairs'],
  },
  {
    title: 'Lease Management',
    desc: 'Managing lease agreements requires legal and administrative expertise. We handle every aspect.',
    items: ['Lease preparation', 'Lease renewals', 'Tenant communication', 'Lease compliance monitoring', 'Documentation management'],
  },
];

const benefits = [
  { title: 'Increased Occupancy Rates', desc: 'Our strategic marketing and tenant acquisition process helps reduce vacancies and increase occupancy.' },
  { title: 'Better Tenant Retention', desc: 'We prioritize tenant satisfaction through responsive management and maintenance support.' },
  { title: 'Reduced Stress for Property Owners', desc: 'We handle daily operational responsibilities, allowing owners to focus on other priorities.' },
  { title: 'Improved Property Value', desc: 'Regular inspections and maintenance help preserve and enhance property value over time.' },
  { title: 'Transparent Reporting', desc: 'Clients receive regular reports on rental income, occupancy, maintenance, and property performance.' },
  { title: 'Local Market Expertise', desc: 'Our deep understanding of the Nigerian real estate market enables us to deliver effective solutions.' },
];

const propertyTypes = ['Residential Properties', 'Commercial Properties', 'Mixed-Use Developments', 'Short-Let Apartments', 'Luxury Homes', 'Estate Developments', 'Corporate Housing', 'Investment Properties'];

export default function PropertyManagementPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-950 text-white py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-400 uppercase mb-4 border border-blue-400/20 bg-blue-400/5 px-3 py-1 rounded-full">
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Property Management Services in Nigeria
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Professional property management solutions for property owners and investors. We handle everything so you enjoy consistent income and peace of mind.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-7 py-3 rounded-xl hover:bg-primary/90 transition-colors group"
          >
            Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">Why Professional Property Management Matters</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                Owning a property can be highly rewarding, but without proper management, landlords often face serious challenges.
              </p>
              <ul className="space-y-2 mb-6">
                {['Difficulty finding reliable tenants', 'Late rent payments', 'Property maintenance issues', 'High vacancy rates', 'Tenant disputes', 'Lack of accountability', 'Reduced property value'].map((c) => (
                  <li key={c} className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="text-slate-500 leading-relaxed text-sm">
                Our professional property management services are designed to solve these challenges while protecting and enhancing the value of your investment.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Properties We Manage</h3>
              <div className="grid grid-cols-2 gap-3">
                {propertyTypes.map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">Our Property Management Services</h2>
          <p className="text-slate-500 text-sm text-center mb-12 max-w-xl mx-auto">
            A comprehensive suite of services designed to cover every aspect of property management.
          </p>
          <div className="space-y-6">
            {managementServices.map(({ title, desc, items }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm mb-5 leading-relaxed">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="bg-primary/5 border border-primary/15 text-primary text-xs font-medium px-3 py-1 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">Benefits of Choosing TBIL Property</h2>
          <p className="text-slate-500 text-sm text-center mb-12">Everything you gain when you partner with us.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ title, desc }) => (
              <div key={title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-slate-500 text-sm mb-3">Serving property owners across Nigeria</p>
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
          <h2 className="text-3xl font-bold mb-4">Let Us Manage Your Property</h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Whether you own a single rental property or a large real estate portfolio, our team has the expertise to help you maximize your investment.
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
