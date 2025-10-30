'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <Image
            src="/4RealKE.webp"
            alt="{4real.ke} Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <Button className="w-full">Send Reset Link</Button>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
