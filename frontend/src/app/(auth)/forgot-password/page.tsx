import { ForgotPasswordForm } from '@/features/auth/ForgotPasswordForm';

export const metadata = { title: 'Forgot Password' };

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ForgotPasswordForm />
    </div>
  );
}
