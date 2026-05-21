"use client";

import { Quote } from 'lucide-react';
import { motion } from "framer-motion";
import { AnimateIn, StaggerChildren, staggerItem } from "@/components/ui/AnimateIn";

const testimonials = [
  {
    name: "Faris Olabode",
    role: "Home Buyer",
    location: "Lagos",
    text: "Found my dream 3-bedroom apartment in Lekki within 2 weeks. The verification process gave me so much confidence — I knew every listing was genuine.",
    initials: "FO",
    color: "bg-blue-600",
  },
  {
    name: "Ola Yusuf",
    role: "Property Investor",
    location: "Abuja",
    text: "As an investor I need reliable listings. TBILS has never let me down — every agent I've worked with has been professional and responsive.",
    initials: "OY",
    color: "bg-violet-600",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Tenant",
    location: "Port Harcourt",
    text: "Renting through TBILS was seamless. The inspection scheduling feature saved me so much time and the support team was incredibly helpful.",
    initials: "FA",
    color: "bg-emerald-600",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <AnimateIn className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-400 uppercase mb-3 border border-blue-400/20 bg-blue-400/5 px-3 py-1 rounded-full">
            Customer stories
          </span>
          <h2 className="text-4xl font-bold text-white leading-tight">Trusted by Thousands</h2>
          <p className="text-slate-400 mt-3 text-sm max-w-md mx-auto">Real people. Real homes. Real experiences.</p>
        </AnimateIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, location, text, initials, color }) => (
            <motion.div
              key={name}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.08] rounded-2xl p-7 transition-all duration-300 flex flex-col"
            >
              <Quote className="w-8 h-8 text-blue-400/40 mb-5 shrink-0" />
              <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-7 italic">
                &ldquo;{text}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{name}</p>
                  <p className="text-slate-500 text-xs">{role} · {location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
