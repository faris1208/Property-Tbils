import { Suspense } from 'react';
import { ResetPasswordForm } from '@/features/auth/ResetPasswordForm';

export const metadata = { title: 'Reset Password' };

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
