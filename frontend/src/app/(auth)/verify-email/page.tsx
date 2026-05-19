import type { Metadata } from 'next';
import { Suspense } from 'react';
import { VerifyEmailForm } from '@/features/auth/VerifyEmailForm';

export const metadata: Metadata = { title: 'Verify Email' };

export default function VerifyEmailPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <Suspense>
        <VerifyEmailForm />
      </Suspense>
    </div>
  );
}
