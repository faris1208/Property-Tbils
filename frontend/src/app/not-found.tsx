import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-bold text-primary/20 mb-4">404</p>
      <h1 className="text-3xl font-bold mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Button asChild>
        <Link href="/"><Home className="w-4 h-4 mr-2" /> Back to Home</Link>
      </Button>
    </div>
  );
}
