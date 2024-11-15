'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      if (!response.ok) {
        throw new Error('حدث خطأ في التسجيل');
      }

      toast({
        title: 'تم إنشاء الحساب بنجاح',
        description: 'يمكنك الآن تسجيل الدخول',
      });

      router.push('/sign-in');
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في التسجيل. الرجاء المحاولة مرة أخرى',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">إنشاء حساب جديد</h1>
          <p className="text-sm text-muted-foreground">
            أدخل بياناتك لإنشاء حساب جديد
          </p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="mb-1" htmlFor="name">
                  الاسم
                </Label>
                <Input
                  id="name"
                  placeholder="الاسم الكامل"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  name="name"
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label className="mb-1" htmlFor="email">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  name="email"
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label className="mb-1" htmlFor="password">
                  كلمة المرور
                </Label>
                <Input
                  id="password"
                  placeholder="كلمة المرور"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  autoCorrect="off"
                  disabled={isLoading}
                  name="password"
                  required
                />
              </div>
              <Button className="mt-4" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                إنشاء حساب
              </Button>
            </div>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            لديك حساب بالفعل؟{' '}
            <Link
              href="/sign-in"
              className="text-primary underline-offset-4 hover:underline"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}