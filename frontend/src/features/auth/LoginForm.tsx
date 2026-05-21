'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import { api, getApiError } from '@/lib/api';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user, token } = useAuthStore();
  const [showPw, setShowPw] = useState(false);
  const verified = searchParams.get('verified') === '1';
  const passwordReset = searchParams.get('reset') === '1';

  useEffect(() => {
    if (user && token) {
      router.replace(user.role === 'admin' ? '/admin' : user.role === 'agent' ? '/agent' : '/');
    }
  }, [user, token, router]);

  useEffect(() => {
    if (verified) toast.success('Email verified! You can now sign in.');
    if (passwordReset) toast.success('Password reset successfully. Sign in with your new password.');
  }, [verified, passwordReset]);

  const form = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post('/auth/login', data);
      const { accessToken, refreshToken, user } = res.data.data;
      login(user, accessToken, refreshToken);
      toast.success('Signed in successfully!');
      router.push(user.role === 'admin' ? '/admin' : user.role === 'agent' ? '/agent' : '/');
    } catch (err: unknown) {
      toast.error(getApiError(err, 'Login failed. Please try again.'));
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Sign in to your Property TBILS account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <fieldset disabled={form.formState.isSubmitting} className="space-y-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={showPw ? 'text' : 'password'} placeholder="••••••••" {...field} />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          </fieldset>
        </Form>
        <p className="text-center text-sm text-muted-foreground mt-4">
          <Link href="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
        </p>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary hover:underline font-medium">Register</Link>
        </p>
      </CardContent>
    </Card>
  );
}
