'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';

export function BlogListing() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blog?limit=20')
      .then((r) => setPosts(r.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Blog & Market Insights</h1>
        <p className="text-muted-foreground">Nigerian real estate news, tips and analysis.</p>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}</div>
      ) : posts.length === 0 ? (
        <p className="text-center text-muted-foreground py-24">No posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-video bg-slate-100">
                {post.coverImage && <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="33vw" />}
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.publishedAt)}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author?.firstName}</span>
                </div>
                <h3 className="font-semibold leading-snug mb-2 line-clamp-2">{post.title}</h3>
                {post.excerpt && <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>}
                <Link href={`/blog/${post.slug}`} className="text-sm text-primary font-medium hover:underline">Read more →</Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
