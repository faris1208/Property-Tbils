"use client";

import { Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  AnimateIn,
  StaggerChildren,
  staggerItem,
} from "@/components/ui/AnimateIn";

const testimonials = [
  {
    name: "Faris Olabode",
    role: "Home Buyer, Lagos",
    text: "Found my dream 3-bedroom apartment in Lekki within 2 weeks. The verification process gave me so much confidence.",
  },
  {
    name: "ola Yusuf",
    role: "Property Investor, Abuja",
    text: "As an investor, I need reliable listings. TBILS has never let me down — every agent I've worked with has been professional.",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Tenant, Port Harcourt",
    text: "Renting through TBILS was seamless. The inspection scheduling feature saved me so much time.",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <AnimateIn className="text-center mb-10">
          <p className="text-sm text-primary font-medium uppercase tracking-wide mb-1">
            What our users say
          </p>
          <h2 className="text-3xl font-bold">Trusted by Thousands</h2>
        </AnimateIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, text }) => (
            <motion.div
              key={name}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Card className="border-0 shadow-md h-full">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    &ldquo;{text}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-sm">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
