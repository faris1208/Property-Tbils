'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
type ContactFormData = z.infer<typeof schema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<ContactFormData>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', phone: '', subject: '', message: '' } });

  const onSubmit = async (data: ContactFormData) => {
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError('Failed to send message. Please try again or email us directly.');
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <CheckCircle className="w-16 h-16 text-green-500" />
        <h2 className="text-2xl font-semibold">Message Sent!</h2>
        <p className="text-muted-foreground">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
        <Button variant="outline" onClick={() => { setSent(false); form.reset(); }}>Send Another</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div className="rounded-xl border p-5">
          <p className="font-medium mb-1">Email</p>
          <p className="text-muted-foreground">support@property.tbils.com</p>
        </div>
        <div className="rounded-xl border p-5">
          <p className="font-medium mb-1">Phone</p>
          <p className="text-muted-foreground">+234 800 000 0000</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">{error}</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem><FormLabel>Phone (optional)</FormLabel><FormControl><Input placeholder="+234..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="subject" render={({ field }) => (
              <FormItem><FormLabel>Subject</FormLabel><FormControl><Input placeholder="How can we help?" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <FormField control={form.control} name="message" render={({ field }) => (
            <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea rows={6} placeholder="Tell us more..." {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            <Send className="w-4 h-4 mr-2" />
            {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
