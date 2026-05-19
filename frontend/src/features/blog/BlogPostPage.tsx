'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';

export function BlogPostPage({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/blog/${slug}`)
      .then((r) => setPost(r.data.data))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-4">
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-64 w-full rounded-xl" />
      <Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /><Skeleton className="h-4 w-4/5" />
    </div>
  );

  if (!post) return (
    <div className="text-center py-24">
      <p className="text-xl font-bold mb-4">Post not found</p>
      <Button asChild><Link href="/blog">Back to Blog</Link></Button>
    </div>
  );

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/blog" className="hover:text-foreground">Blog</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground line-clamp-1">{post.title}</span>
      </nav>

      <h1 className="text-4xl font-bold mb-4 leading-tight">{post.title}</h1>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
        <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author?.firstName} {post.author?.lastName}</span>
        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(post.publishedAt)}</span>
      </div>

      {post.coverImage && (
        <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority sizes="100vw" />
        </div>
      )}

      <div className="prose prose-slate max-w-none">
        {post.content.split('\n').map((para, i) => para.trim() && <p key={i} className="mb-4 leading-relaxed text-muted-foreground">{para}</p>)}
      </div>

      <div className="mt-12 pt-6 border-t">
        <Button variant="outline" asChild><Link href="/blog">← Back to Blog</Link></Button>
      </div>
    </article>
  );
}
