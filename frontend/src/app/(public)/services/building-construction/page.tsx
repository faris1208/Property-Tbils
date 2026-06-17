import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Building Construction Company in Lagos & Nigeria | TBIL Property',
  description: 'Trusted building construction company offering residential and commercial construction, renovations, project management, and design-build services across Nigeria.',
  keywords: 'Building Construction Nigeria, Construction Company Lagos, Residential Construction, Commercial Construction, Building Contractors',
};

const constructionServices = [
  {
    title: 'Residential Construction',
    desc: 'Our team works closely with clients to ensure every home reflects their vision, lifestyle, and investment goals.',
    items: ['Luxury homes', 'Duplexes', 'Terraced houses', 'Bungalows', 'Apartment buildings', 'Estates', 'Serviced residences'],
  },
  {
    title: 'Commercial Construction',
    desc: 'Our commercial projects are designed for functionality, efficiency, and long-term performance.',
    items: ['Office buildings', 'Shopping complexes', 'Retail developments', 'Hotels', 'Mixed-use properties', 'Warehouses', 'Industrial facilities'],
  },
  {
    title: 'Design and Build Services',
    desc: 'Our integrated design-build approach provides a single point of responsibility throughout the construction process.',
    items: ['Architectural design', 'Engineering design', 'Project planning', 'Construction execution', 'Quality control', 'Project supervision'],
  },
  {
    title: 'Renovation & Remodeling',
    desc: 'Our renovation solutions enhance property value and functionality for both residential and commercial spaces.',
    items: ['Interior renovations', 'Exterior upgrades', 'Structural improvements', 'Space optimization', 'Commercial remodeling', 'Residential renovations'],
  },
  {
    title: 'Project Management',
    desc: 'We ensure projects remain on schedule and within budget through rigorous management processes.',
    items: ['Budget planning', 'Construction scheduling', 'Contractor coordination', 'Quality assurance', 'Risk management', 'Site supervision'],
  },
  {
    title: 'Construction Consultancy',
    desc: 'Our construction experts provide professional guidance at every stage of development.',
    items: ['Feasibility studies', 'Cost estimation', 'Construction planning', 'Procurement strategies', 'Building compliance', 'Project execution'],
  },
];

const process = [
  { step: '01', title: 'Consultation & Planning', desc: 'We discuss project goals, requirements, timelines, and budget expectations.' },
  { step: '02', title: 'Design Development', desc: 'Architectural and engineering plans are prepared and refined.' },
  { step: '03', title: 'Cost Estimation', desc: 'Comprehensive project costing and budgeting are completed.' },
  { step: '04', title: 'Construction Execution', desc: 'Construction activities begin under strict quality and safety supervision.' },
  { step: '05', title: 'Project Monitoring', desc: 'Regular inspections and progress reporting ensure accountability.' },
  { step: '06', title: 'Completion & Handover', desc: 'The finished project is delivered according to agreed specifications.' },
];

const whyUs = [
  { title: 'Experienced Professionals', desc: 'Our team consists of qualified construction professionals, project managers, engineers, and industry specialists.' },
  { title: 'Quality Assurance', desc: 'Every project undergoes rigorous quality checks to ensure exceptional results.' },
  { title: 'Transparent Project Delivery', desc: 'We maintain clear communication throughout every phase of construction.' },
  { title: 'Timely Completion', desc: 'Our project management processes help minimize delays and improve efficiency.' },
  { title: 'Cost-Effective Solutions', desc: 'We focus on delivering value without compromising quality.' },
  { title: 'Regulatory Compliance', desc: 'We ensure projects comply with applicable building regulations and standards.' },
];

const industries = ['Residential Developers', 'Commercial Investors', 'Government Agencies', 'Corporate Organizations', 'Educational Institutions', 'Hospitality Businesses', 'Healthcare Facilities', 'Private Property Owners'];

export default function BuildingConstructionPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-950 text-white py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-400 uppercase mb-4 border border-blue-400/20 bg-blue-400/5 px-3 py-1 rounded-full">
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Building Construction Services in Nigeria
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Quality construction solutions for residential and commercial projects across Lagos, Abuja, Port Harcourt, and Ibadan.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-7 py-3 rounded-xl hover:bg-primary/90 transition-colors group"
          >
            Start Your Project <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">Building Your Vision with Excellence</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                Choosing the right construction partner can significantly impact project quality, timelines, costs, and long-term value. At TBIL Property, we combine technical expertise, project management excellence, and industry best practices to deliver successful construction projects from concept to completion.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {['Quality workmanship', 'Timely project delivery', 'Cost efficiency', 'Structural integrity', 'Regulatory compliance', 'Client satisfaction'].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-5">Industries We Serve</h3>
              <div className="space-y-2">
                {industries.map((i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-600 py-2 border-b border-slate-100 last:border-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {i}
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
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">Our Construction Services</h2>
          <p className="text-slate-500 text-sm text-center mb-12 max-w-xl mx-auto">
            From residential homes to large commercial developments, we deliver across every category.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {constructionServices.map(({ title, desc, items }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{desc}</p>
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

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">Our Construction Process</h2>
          <p className="text-slate-500 text-sm text-center mb-12">A clear, transparent process from first conversation to project handover.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map(({ step, title, desc }) => (
              <div key={step} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <span className="text-4xl font-black text-primary/20 block mb-3">{step}</span>
                <h3 className="font-bold text-slate-900 text-sm mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-3 text-center">Why Choose TBIL Property for Construction?</h2>
          <p className="text-slate-400 text-sm text-center mb-12">What sets our construction team apart.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map(({ title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-bold text-white text-sm mb-2">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Build with Confidence</h2>
          <p className="text-white/80 text-sm mb-8 leading-relaxed">
            Contact TBIL Property today to discuss your next construction project and discover how we can bring your vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors group"
          >
            Contact Us Today <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
