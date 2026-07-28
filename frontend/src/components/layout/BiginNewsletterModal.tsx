'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { BellRingIcon, CheckCircle2Icon, LoaderCircleIcon, XIcon } from 'lucide-react';
import { Dialog, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { cn } from '@/lib/utils';

const FORM_ID = 'BiginWebToRecordForm7509873000000636003';
const FRAME_NAME = 'hidden7509873000000636003Frame';

declare global {
  interface Window {
    checkMandatory7509873000000636003?: () => boolean;
    __biginSetFieldError?: (fieldName: string, message: string) => void;
    __biginClearFieldError?: (fieldName: string) => void;
    removeError?: (fieldObj: HTMLInputElement) => void;
  }
}

export function BiginNewsletterModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitTimedOut, setSubmitTimedOut] = useState(false);
  const [scriptsReady, setScriptsReady] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const frameLoadCount = useRef(0);
  const submitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) clearTimeout(submitTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.__biginSetFieldError = (fieldName, message) => {
      setErrors((prev) => ({ ...prev, [fieldName]: message }));
    };
    window.__biginClearFieldError = (fieldName) => {
      setErrors((prev) => {
        if (!(fieldName in prev)) return prev;
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    };
    return () => {
      delete window.__biginSetFieldError;
      delete window.__biginClearFieldError;
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    const ok = window.checkMandatory7509873000000636003?.();
    if (!ok) {
      e.preventDefault();
      return;
    }
    setSubmitTimedOut(false);
    setSubmitting(true);
    submitTimeoutRef.current = setTimeout(() => {
      setSubmitting(false);
      setSubmitTimedOut(true);
    }, 12000);
  }

  function handleFrameLoad() {
    // The iframe's first load is the empty placeholder on mount; only
    // treat subsequent loads (after an actual submission) as success.
    frameLoadCount.current += 1;
    if (frameLoadCount.current > 1) {
      if (submitTimeoutRef.current) clearTimeout(submitTimeoutRef.current);
      setSubmitting(false);
      setSubmitted(true);
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950" />
              <svg className="absolute inset-0 h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="bigin-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#bigin-grid)" />
              </svg>
              <div className="absolute top-8 right-4 size-32 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="absolute bottom-12 left-2 size-24 rounded-full bg-violet-500/20 blur-2xl" />
              <div className="relative z-10 space-y-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/20 backdrop-blur-sm ring-1 ring-blue-400/30">
                  <BellRingIcon className="size-5 text-blue-300" />
                </div>
                <p className="text-2xl font-bold leading-tight text-white">
                  Great property deals, weekly
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Get the best property deals delivered straight to your inbox every week.
                </p>
                <div className="flex flex-col gap-1.5 pt-2">
                  {['Verified listings', 'Weekly digest', 'No spam, ever'].map((item) => (
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
                    Keep an eye on your inbox for great property deals every week.
                  </p>
                  <button
                    className="mt-2 w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                    onClick={() => setOpen(false)}
                  >
                    Got it
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-900">Stay Updated!</h2>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Get great property deals in your email weekly.
                    </p>
                  </div>

                  <form
                    id={FORM_ID}
                    name={FORM_ID}
                    method="POST"
                    encType="multipart/form-data"
                    target={FRAME_NAME}
                    acceptCharset="UTF-8"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <input type="hidden" name="xnQsjsdp" value="51841d6586d23ccbe9667bae498ea03ce2041e5f3b62e2f7dd6eaebb3830661e" />
                    <input type="hidden" name="zc_gad" id="zc_gad" value="" />
                    <input type="hidden" name="xmIwtLD" value="884d79b2f5360449c8745e76a35d3970246c808afb3f93ec559854abf87af79deb693ad752ea3472dfa9e71520337d8c" />
                    <input type="hidden" name="actionType" value="Q29udGFjdHM=" />
                    <input type="hidden" name="rmsg" id="rmsg" value="true" />
                    <input type="hidden" name="returnURL" value="null" />

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-slate-600">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="Last Name"
                        maxLength={80}
                        type="text"
                        defaultValue=""
                        onInput={(e) => window.removeError?.(e.currentTarget)}
                        aria-invalid={Boolean(errors['Last Name'])}
                        className={cn(
                          'h-11 rounded-xl border px-4 text-sm outline-none focus:ring-2',
                          errors['Last Name']
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
                        )}
                      />
                      {errors['Last Name'] && (
                        <p className="text-xs text-red-500">{errors['Last Name']}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-slate-600">
                        Email <span className="text-slate-400">(optional)</span>
                      </label>
                      <input
                        data-fvalidate="true"
                        data-ftype="email"
                        name="Email"
                        maxLength={100}
                        type="text"
                        defaultValue=""
                        onInput={(e) => window.removeError?.(e.currentTarget)}
                        aria-invalid={Boolean(errors.Email)}
                        className={cn(
                          'h-11 rounded-xl border px-4 text-sm outline-none focus:ring-2',
                          errors.Email
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
                        )}
                      />
                      {errors.Email && <p className="text-xs text-red-500">{errors.Email}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-slate-600">
                        Phone <span className="text-slate-400">(optional)</span>
                      </label>
                      <input
                        data-fvalidate="true"
                        data-ftype="mobile"
                        name="Phone"
                        maxLength={50}
                        type="text"
                        defaultValue=""
                        onInput={(e) => window.removeError?.(e.currentTarget)}
                        aria-invalid={Boolean(errors.Phone)}
                        className={cn(
                          'h-11 rounded-xl border px-4 text-sm outline-none focus:ring-2',
                          errors.Phone
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
                        )}
                      />
                      {errors.Phone && <p className="text-xs text-red-500">{errors.Phone}</p>}
                    </div>

                    <button
                      id="formsubmit"
                      type="submit"
                      disabled={!scriptsReady || submitting}
                      className="flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? (
                        <LoaderCircleIcon className="size-4 animate-spin" />
                      ) : (
                        'Notify Me'
                      )}
                    </button>
                    {submitTimedOut && (
                      <p className="text-xs text-red-500">
                        This is taking longer than expected. Please try again in a moment.
                      </p>
                    )}
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

          <iframe
            name={FRAME_NAME}
            title="Bigin form submission"
            style={{ display: 'none' }}
            onLoad={handleFrameLoad}
          />
        </DialogPrimitive.Popup>
      </DialogPortal>

      {/* Zoho Bigin's own field-validation script, loaded verbatim so its
          global functions (checkMandatory7509873000000636003, etc.) match
          what the hidden fields/form above expect. */}
      <Script id="bigin-form-validation" strategy="afterInteractive" onReady={() => setScriptsReady(true)}>
        {`
          var mndFields7509873000000636003 = new Array('Last Name');
          var fldLangVal7509873000000636003 = new Array('Name');
          function removeError(fieldObj) {
            if (window.__biginClearFieldError) { window.__biginClearFieldError(fieldObj.name); }
          }
          function setError(fieldObj, label) {
            if (window.__biginSetFieldError) { window.__biginSetFieldError(fieldObj.name, label); }
            fieldObj.focus();
          }
          window.removeError = removeError;
          function validateFields7509873000000636003() {
            var isReturn = true;
            var form = document.forms['${FORM_ID}'];
            if (!form) return true;
            var validateFld = form.querySelectorAll('[data-fvalidate=true]');
            for (var i = 0; i < validateFld.length; i++) {
              var validateFldVal = validateFld[i].value;
              var fType = validateFld[i].getAttribute('data-ftype');
              if (validateFldVal === '') continue;
              if (fType === 'email' && validateFldVal.match(/^([A-Za-z0-9-._%'+/]+@[A-Za-z0-9.-]+.[a-zA-Z]{2,22})$/) === null) {
                setError(validateFld[i], 'Enter a valid email address');
                isReturn = false;
              } else if (fType === 'mobile' && validateFldVal.match(/^[0-9a-zA-Z+.()\\-;\\s]+$/) === null) {
                setError(validateFld[i], 'Enter a valid phone number');
                isReturn = false;
              }
            }
            return isReturn;
          }
          function checkMandatory7509873000000636003() {
            var isReturn = true;
            for (var i = 0; i < mndFields7509873000000636003.length; i++) {
              var fieldObj = document.forms['${FORM_ID}'][mndFields7509873000000636003[i]];
              if (fieldObj && fieldObj.value.replace(/^\\s+|\\s+$/g, '').length === 0) {
                setError(fieldObj, fldLangVal7509873000000636003[i] + ' cannot be empty');
                isReturn = false;
              }
            }
            if (!validateFields7509873000000636003()) { isReturn = false; }
            return isReturn;
          }
          window.checkMandatory7509873000000636003 = checkMandatory7509873000000636003;
        `}
      </Script>
      <Script
        id="bigin-form-servlet"
        src="https://bigin.zoho.com/crm/WebformScriptServlet?rid=884d79b2f5360449c8745e76a35d3970246c808afb3f93ec559854abf87af79deb693ad752ea3472dfa9e71520337d8cgid51841d6586d23ccbe9667bae498ea03ce2041e5f3b62e2f7dd6eaebb3830661e"
        strategy="afterInteractive"
      />
    </Dialog>
  );
}
