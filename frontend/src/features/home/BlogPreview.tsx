'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimateIn, StaggerChildren, staggerItem } from '@/components/ui/AnimateIn';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    api.get('/blog?limit=3')
      .then((r) => setPosts(r.data.data || []))
      .catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <AnimateIn className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-3 border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
              Market insights
            </span>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">Latest from our Blog</h2>
            <p className="text-slate-500 mt-2 text-sm">Tips, guides and market updates for Nigerian real estate.</p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all group"
          >
            All articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimateIn>

        <StaggerChildren className={`grid gap-6 ${rest.length > 0 ? 'md:grid-cols-3' : 'max-w-2xl mx-auto'}`}>
          {/* Featured post */}
          <motion.div variants={staggerItem} className={rest.length > 0 ? 'md:col-span-2' : ''}>
            <Link
              href={`/blog/${featured.slug}`}
              className="group block overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow h-full"
            >
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                {featured.coverImage ? (
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
                  <Calendar className="w-3 h-3" />
                  {formatDate(featured.publishedAt)}
                </div>
                <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {featured.title}
                </h3>
                {featured.excerpt && (
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{featured.excerpt}</p>
                )}
                <div className="flex items-center gap-1.5 text-sm font-semibold text-primary mt-4 group-hover:gap-2.5 transition-all">
                  Read article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Secondary posts */}
          {rest.length > 0 && (
            <div className="flex flex-col gap-5">
              {rest.map((post) => (
                <motion.div key={post.id} variants={staggerItem} whileHover={{ x: 4, transition: { duration: 0.2 } }}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex gap-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                      {post.coverImage ? (
                        <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="80px" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 text-xs text-slate-400 mb-1.5">
                        <Clock className="w-3 h-3" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </StaggerChildren>

        <AnimateIn className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary border border-primary/30 px-5 py-2.5 rounded-full hover:bg-primary/5 transition-colors"
          >
            All articles <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
