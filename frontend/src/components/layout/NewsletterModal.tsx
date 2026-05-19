'use client';

import { useEffect, useState } from 'react';
import { BellRingIcon, CheckCircle2Icon, XIcon, LoaderCircleIcon } from 'lucide-react';
import { api, getApiError } from '@/lib/api';
import { Dialog, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'newsletter_last_shown';

function hasShownToday(): boolean {
  try {
    const last = localStorage.getItem(STORAGE_KEY);
    if (!last) return false;
    return new Date(last).toDateString() === new Date().toDateString();
  } catch {
    return false;
  }
}

function markShownToday() {
  try {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  } catch {
    // ignore
  }
}

export function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (hasShownToday()) return;
    const timer = setTimeout(() => {
      setOpen(true);
      markShownToday();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      await api.post('/subscribers', { email, phone: phone || undefined });
      setSubmitted(true);
    } catch (err: unknown) {
      setError(getApiError(err, 'Something went wrong. Please try again.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Popup
          className={cn(
            'fixed top-1/2 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 duration-150 outline-none',
            'sm:max-w-2xl',
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
            'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95'
          )}
        >
          <div className="flex flex-col sm:flex-row">
            {/* Left panel */}
            <div className="relative hidden sm:flex sm:w-5/12 flex-col justify-end overflow-hidden bg-slate-900 p-8">
              {/* Background gradient + pseudo cityscape */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950" />
              {/* Decorative grid lines */}
              <svg
                className="absolute inset-0 h-full w-full opacity-10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              {/* Glowing orbs */}
              <div className="absolute top-8 right-4 size-32 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="absolute bottom-12 left-2 size-24 rounded-full bg-violet-500/20 blur-2xl" />
              {/* Content */}
              <div className="relative z-10 space-y-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/20 backdrop-blur-sm ring-1 ring-blue-400/30">
                  <BellRingIcon className="size-5 text-blue-300" />
                </div>
                <p className="text-2xl font-bold leading-tight text-white">
                  Never miss your dream home
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  New listings hit fast. Be the first to know when a property matches what you&apos;re looking for.
                </p>
                <div className="flex flex-col gap-1.5 pt-2">
                  {['Verified listings', 'Instant alerts', 'No spam, ever'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2Icon className="size-3.5 shrink-0 text-blue-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
              {/* Close button */}
              <div className="flex items-start justify-between">
                <div className="flex sm:hidden size-9 items-center justify-center rounded-xl bg-blue-50">
                  <BellRingIcon className="size-4 text-blue-600" />
                </div>
                <div className="hidden sm:block" />
                <DialogPrimitive.Close
                  render={
                    <button className="flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700" />
                  }
                >
                  <XIcon className="size-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </div>

              {submitted ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 py-6 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-green-50">
                    <CheckCircle2Icon className="size-7 text-green-500" />
                  </div>
                  <p className="text-lg font-semibold text-slate-900">You&apos;re in!</p>
                  <p className="text-sm text-slate-500">
                    We&apos;ll notify you the moment a matching property goes live.
                  </p>
                  <Button className="mt-2 w-full" onClick={() => setOpen(false)}>
                    Got it
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-900">Stay Updated!</h2>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Want to get notified whenever a new property is posted?
                      Enter your details below.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-slate-600">
                        Email address <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="email"
                        placeholder="e.g. you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-11 rounded-xl border-slate-200 px-4 text-sm focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-slate-600">
                        Phone number <span className="text-slate-400">(optional)</span>
                      </label>
                      <Input
                        type="tel"
                        placeholder="e.g. +234 801 234 5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-11 rounded-xl border-slate-200 px-4 text-sm focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
                      />
                    </div>

                    {error && (
                      <p className="text-xs text-red-500">{error}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-11 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                    >
                      {loading ? (
                        <LoaderCircleIcon className="size-4 animate-spin" />
                      ) : (
                        'Notify Me'
                      )}
                    </Button>
                  </form>

                  <p className="text-center text-xs text-slate-400">
                    No spam. Unsubscribe at any time.{' '}
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="underline underline-offset-2 hover:text-slate-600 transition-colors"
                    >
                      Skip for now
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}
