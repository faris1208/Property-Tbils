import Link from 'next/link';
import { Home } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <header className="h-14 flex items-center px-6 border-b bg-white">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
          <Home className="w-4 h-4" />
          Property<span className="text-accent">TBILS</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
}
