import type { Metadata } from 'next';
import { ContactForm } from '@/features/account/ContactForm';

export const metadata: Metadata = { title: 'Contact Us' };

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
      <p className="text-muted-foreground mb-10">Have a question? We&apos;d love to hear from you.</p>
      <ContactForm />
    </div>
  );
}
