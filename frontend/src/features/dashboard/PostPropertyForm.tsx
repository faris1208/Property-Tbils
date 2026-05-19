'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { api } from '@/lib/api';

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
];

const TERMS_AND_CONDITIONS = `TERMS AND CONDITIONS (SELLER & BUYER)

These Terms and Conditions govern all property transactions facilitated by TBIL Property, a subsidiary of TBIL Group, and apply to all Sellers (Property Owners) and Buyers who engage TBIL Property for the sale or purchase of any property.

1. APPOINTMENT OF AGENT (SELLER)
The Property Owner hereby appoints TBIL Property as a non-exclusive real estate agent to market, advertise, promote, and introduce prospective buyers for the property. The Property Owner retains the right to appoint other agents or sell the property directly, subject to the commission provisions stated in Clause 4.

2. SCOPE OF SERVICES (TBIL PROPERTY)
TBIL Property shall:
A. Market and advertise the property through appropriate channels
B. Introduce prospective buyers to the Seller
C. Facilitate property inspections and negotiations where applicable
D. Assist with transaction documentation up to the completion of sale

TBIL Property does not guarantee the sale or purchase of any property.

3. OBLIGATIONS OF THE PROPERTY OWNER (SELLER)
The Seller agrees to:
A. Provide accurate, complete, and verifiable property documents and legal title
B. Ensure the property is free from undisclosed encumbrances, claims, or disputes
C. Grant access for inspections, photography, and marketing purposes
D. Pay the agreed commission upon successful completion of a sale to a buyer introduced by TBIL Property

4. COMMISSION
TBIL Property shall be entitled to a commission of 10% for virgin land and 5% for developed property, calculated on the final purchase price.
Commission is due immediately upon completion of sale and receipt of funds from the Buyer.
Commission is payable where the Buyer was introduced directly or indirectly by TBIL Property.
Failure to pay commission may result in legal recovery action.

5. BUYER'S OBLIGATIONS
The Buyer agrees to:
A. Provide accurate personal and financial information
B. Conduct proper due diligence on the property before making payment
C. Pay all agreed purchase prices, fees, and statutory charges promptly
D. Understand that TBIL Property acts strictly as an intermediary and does not own the property unless expressly stated

6. DISCLAIMER
TBIL Property:
A. Does not warrant the condition of the property beyond information supplied by the Seller
B. Is not responsible for hidden defects or misrepresentations by the Seller
C. Shall not be liable for losses arising from inaccurate or false documentation provided by the Seller

7. INDEMNITY
The Property Owner agrees to indemnify and hold TBIL Property harmless from any claims, losses, damages, or legal disputes arising from:
Defective or disputed title
Inaccurate documentation
Ownership disputes
False representations relating to the property

8. CONFIDENTIALITY
All parties agree to maintain strict confidentiality regarding negotiations, client details, pricing, and transaction information, except where disclosure is required by law.

9. TERMINATION
This Agreement may be terminated by either party with at least fourteen (14) days' written notice, provided no active transaction introduced by TBIL Property is ongoing. Termination shall not affect TBIL Property's right to commission for completed or ongoing transactions.

10. GOVERNING LAW & DISPUTE RESOLUTION
This Agreement shall be governed by the laws of the Federal Republic of Nigeria.
Any dispute arising shall be resolved through:
A. Negotiation
B. Arbitration in Lagos State, where negotiation fails

11. ENTIRE AGREEMENT
These Terms and Conditions constitute the entire agreement between the parties and supersede all prior oral or written agreements.

12. ACCEPTANCE
By engaging TBIL Property, the Seller and/or Buyer acknowledges that they have read, understood, and agreed to be bound by these Terms and Conditions.`;

const propertySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(['apartment', 'house', 'land', 'commercial', 'shortlet'] as const),
  status: z.enum(['rent', 'sale'] as const),
  price: z.number().min(1, 'Price must be greater than 0'),
  city: z.string().min(1, 'State is required'),
  address: z.string().min(1, 'Location is required'),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  termsAccepted: z.boolean().refine((v) => v === true, { message: 'You must accept the terms and conditions' }),
});
type PropertyForm = z.infer<typeof propertySchema>;

export function PostPropertyForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [otherImages, setOtherImages] = useState<File[]>([]);
  const mainImageRef = useRef<HTMLInputElement>(null);
  const otherImagesRef = useRef<HTMLInputElement>(null);

  const form = useForm<PropertyForm>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: '',
      description: '',
      address: '',
      city: '',
      termsAccepted: false,
    },
  });

  const isDirty = form.formState.isDirty || !!mainImage || otherImages.length > 0;

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const onSubmit = async (data: PropertyForm) => {
    setError('');
    try {
      const { termsAccepted: _, ...propertyData } = data;
      const res = await api.post('/properties', propertyData);
      const property = res.data.data;

      const allImages = [...(mainImage ? [mainImage] : []), ...otherImages];
      if (allImages.length > 0 && property?.id) {
        const formData = new FormData();
        allImages.forEach((f) => formData.append('files', f));
        await api.post(`/properties/${property.id}/images`, formData);
      }

      router.push('/agent');
    } catch (e: unknown) {
      const err = e as { response?: { data?: { error?: string } } };
      setError(err.response?.data?.error || 'Failed to create listing');
    }
  };

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

  const validateAndSetMainImage = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setError('Main image must be under 5 MB.');
      return;
    }
    setMainImage(file);
  };

  const handleOtherImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const oversized = files.filter((f) => f.size > MAX_FILE_SIZE);
    if (oversized.length > 0) {
      setError(`${oversized.length} image(s) exceed the 5 MB limit and were skipped.`);
    }
    setOtherImages((prev) => [...prev, ...files.filter((f) => f.size <= MAX_FILE_SIZE)]);
  };

  const removeOtherImage = (index: number) => {
    setOtherImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Post a Property</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Fill in the details below to submit your listing for review.</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-lg">{error}</div>
          )}

          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl><Input placeholder="e.g. 4-Bedroom Duplex in Lekki Phase 1" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea rows={5} placeholder="Describe the property in detail..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="price" render={({ field }) => (
            <FormItem>
              <FormLabel>Price (NGN)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="address" render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl><Input placeholder="Street address / area" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem>
                <FormLabel>Property Category</FormLabel>
                <Select onValueChange={(v) => field.onChange(v ?? '')} value={field.value ?? ''}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="type" render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select onValueChange={(v) => field.onChange(v ?? '')} value={field.value ?? ''}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {(['apartment', 'house', 'land', 'commercial', 'shortlet'] as const).map((t) => (
                      <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="city" render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <Select onValueChange={(v) => field.onChange(v ?? '')} value={field.value ?? ''}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger></FormControl>
                <SelectContent>
                  {NIGERIAN_STATES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          {/* Main Image */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none">Upload Property Image (Main)</label>
            <div
              className="flex items-center gap-3 border border-dashed rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => mainImageRef.current?.click()}
            >
              <Upload className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground truncate flex-1">
                {mainImage ? mainImage.name : 'No file chosen'}
              </span>
              {mainImage && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setMainImage(null); if (mainImageRef.current) mainImageRef.current.value = ''; }}
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                </button>
              )}
            </div>
            <input
              ref={mainImageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) validateAndSetMainImage(f); }}
            />
          </div>

          {/* Other Images */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none">Upload Other Property Images</label>
            <div
              className="flex items-center gap-3 border border-dashed rounded-lg px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => otherImagesRef.current?.click()}
            >
              <Upload className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground">
                {otherImages.length > 0 ? `${otherImages.length} file(s) selected — click to add more` : 'No file chosen'}
              </span>
            </div>
            <input
              ref={otherImagesRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleOtherImagesChange}
            />
            {otherImages.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {otherImages.map((f, i) => (
                  <div key={i} className="flex items-center gap-1 bg-muted rounded-md px-2 py-1 text-xs">
                    <span className="max-w-[140px] truncate">{f.name}</span>
                    <button type="button" onClick={() => removeOtherImage(i)}>
                      <X className="w-3 h-3 hover:text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-3">
            <label className="text-sm font-medium leading-none">Terms and Conditions (Seller &amp; Buyer)</label>
            <div className="rounded-lg border bg-muted/30 px-4 py-3 text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {TERMS_AND_CONDITIONS}
            </div>
            <FormField control={form.control} name="termsAccepted" render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    I agree to the Terms &amp; Conditions
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting || !form.watch('termsAccepted')}>
            {form.formState.isSubmitting ? 'Submitting...' : 'Submit for Review'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
