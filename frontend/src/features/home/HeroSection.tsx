'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from '@/components/search/SearchBar';
import { Badge } from '@/components/ui/badge';

const videos = [
  '/assets/Images/homepage/banner.mp4',
  '/assets/Images/homepage/banner2.mp4',
];

const stats = [
  { value: 10000, suffix: '+', label: 'Properties' },
  { value: 500, suffix: '+', label: 'Verified Agents' },
  { value: 20, suffix: '+', label: 'Cities' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <strong className="text-white">
      {count.toLocaleString()}{suffix}
    </strong>
  );
}

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onEnded = () => setCurrent((prev) => (prev + 1) % videos.length);
    video.addEventListener('ended', onEnded);

    if (video.src !== new URL(videos[current], window.location.href).href) {
      video.src = videos[current];
      video.load();
    }
    video.play().catch(() => {});

    return () => video.removeEventListener('ended', onEnded);
  }, [current]);

  return (
    <section className="relative text-white overflow-hidden" style={{ minHeight: '90vh' }}>
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === current ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 md:py-48 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/10 backdrop-blur-sm">
            🏠 Nigeria&apos;s Trusted Property Marketplace
          </Badge>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          Find Your Perfect{' '}
          <span className="text-blue-400">Property</span> in Nigeria
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl drop-shadow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        >
          Thousands of verified listings across Lagos, Abuja, Port Harcourt and beyond.
          Buy, rent or list your property with trusted agents.
        </motion.p>

        <motion.div
          className="w-full max-w-2xl text-slate-900"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
        >
          <SearchBar />
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-8 mt-10 text-sm text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {stats.map(({ value, suffix, label }) => (
            <span key={label}>
              <CountUp target={value} suffix={suffix} /> {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
