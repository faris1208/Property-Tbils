import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/PageTransition';
import { NewsletterModal } from '@/components/layout/NewsletterModal';
// BiginNewsletterModal (posts to Zoho Bigin) is kept in the repo, unmounted,
// pending the correct Zoho form action URL.
// import { BiginNewsletterModal } from '@/components/layout/BiginNewsletterModal';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <NewsletterModal />
    </div>
  );
}
