'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

export function VerifyEmail() {
  const params = useSearchParams();
  const token = params.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) { setStatus('error'); setMessage('Invalid verification link.'); return; }
    api.get(`/auth/verify-email?token=${token}`)
      .then((res) => { setStatus('success'); setMessage(res.data.data?.message || 'Email verified!'); })
      .catch((e) => { setStatus('error'); setMessage(e.response?.data?.error || 'Verification failed.'); });
  }, [token]);

  return (
    <div className="text-center max-w-sm">
      {status === 'loading' && (
        <><Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Verifying your email...</p></>
      )}
      {status === 'success' && (
        <><CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Email Verified!</h2>
        <p className="text-muted-foreground mb-6">{message}</p>
        <Button asChild><Link href="/login">Sign In</Link></Button></>
      )}
      {status === 'error' && (
        <><XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Verification Failed</h2>
        <p className="text-muted-foreground mb-6">{message}</p>
        <Button variant="outline" asChild><Link href="/login">Back to Login</Link></Button></>
      )}
    </div>
  );
}
