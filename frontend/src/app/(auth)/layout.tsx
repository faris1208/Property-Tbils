import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Branded left panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 flex-col items-center justify-center bg-[#0a0f1e] px-12 py-16 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-900/30 pointer-events-none" />

        <div className="relative z-10 text-center space-y-6 max-w-sm">
          <Link href="/">
            <Image
              src="/assets/Images/homepage/logo.png"
              alt="Property TBILS"
              width={160}
              height={54}
              className="h-14 w-auto object-contain mx-auto brightness-0 invert"
              priority
            />
          </Link>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white leading-snug">
              Find your perfect property in Nigeria
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Thousands of verified listings. Trusted agents. Simple process.
            </p>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            {['Verified property listings', 'Trusted local agents', 'Buy, sell, or rent with ease'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-left">
                <div className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-white/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Mobile logo bar */}
        <div className="lg:hidden flex items-center h-14 px-6 border-b">
          <Link href="/">
            <Image
              src="/assets/Images/homepage/logo.png"
              alt="Property TBILS"
              width={120}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        <main className="flex-1 flex items-center justify-center p-6 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
