'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api, getApiError } from '@/lib/api';

const schema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  preferredDate: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function InquiryForm({ propertyId, propertyTitle, compact }: { propertyId: string; propertyTitle: string; compact?: boolean }) {
  const [type, setType] = useState<'inquiry' | 'inspection'>('inquiry');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const form = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', phone: '', message: '', preferredDate: '' } });

  const onSubmit = async (data: FormData) => {
    setError(''); setSuccess('');
    try {
      const endpoint = type === 'inspection' ? '/leads/inspection' : '/leads';
      await api.post(endpoint, { ...data, propertyId });
      setSuccess(type === 'inspection' ? "Inspection scheduled! We'll be in touch." : 'Message sent! The agent will contact you shortly.');
      form.reset();
    } catch (err: unknown) {
      setError(getApiError(err, 'Failed to send. Please try again.'));
    }
  };

  return (
    <div>
      {!compact && <h2 className="text-xl font-bold mb-4">Contact Agent</h2>}
      <p className="text-sm font-medium text-foreground mb-3">Send a Message</p>
      <Tabs value={type} onValueChange={(v) => setType(v as 'inquiry' | 'inspection')}>
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="inquiry" className="flex-1 text-xs">Inquiry</TabsTrigger>
          <TabsTrigger value="inspection" className="flex-1 text-xs">Schedule Inspection</TabsTrigger>
        </TabsList>
        <TabsContent value={type}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {success && <div className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">{success}</div>}
              {error && <div className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">{error}</div>}
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormControl><Input placeholder="Your name" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormControl><Input type="email" placeholder="Email address" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormControl><Input placeholder="Phone number (optional)" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              {type === 'inspection' && (
                <FormField control={form.control} name="preferredDate" render={({ field }) => (
                  <FormItem><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              )}
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormControl><Textarea placeholder={`I'm interested in ${propertyTitle}...`} rows={3} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Sending...' : type === 'inspection' ? 'Request Inspection' : 'Send Message'}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
