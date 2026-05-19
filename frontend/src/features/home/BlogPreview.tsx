'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <AnimateIn className="flex items-center justify-between mb-10">
          <div>
            <p className="text-sm text-primary font-medium uppercase tracking-wide mb-1">Market insights</p>
            <h2 className="text-3xl font-bold">Latest from our Blog</h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/blog">View all <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </AnimateIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div key={post.id} variants={staggerItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <div className="relative aspect-video bg-slate-100">
                  {post.coverImage && (
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="33vw" />
                  )}
                </div>
                <CardContent className="p-5">
                  <p className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <Calendar className="w-3 h-3" /> {formatDate(post.publishedAt)}
                  </p>
                  <h3 className="font-semibold leading-snug mb-2 line-clamp-2">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                  )}
                  <Link href={`/blog/${post.slug}`} className="text-sm text-primary font-medium hover:underline">
                    Read more →
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
