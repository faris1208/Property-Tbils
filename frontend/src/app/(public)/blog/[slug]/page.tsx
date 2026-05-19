import { BlogPostPage } from '@/features/blog/BlogPostPage';

interface Props { params: Promise<{ slug: string }> }

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} />;
}
