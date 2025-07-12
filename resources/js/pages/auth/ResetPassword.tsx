import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';

interface ResetPasswordProps {
  email: string;
  token: string;
  isAdminCreated?: boolean;
}

export default function ResetPassword({ email, token, isAdminCreated = false }: ResetPasswordProps) {
  const { data, setData, post, processing, errors } = useForm({
    email: email,
    password: '',
    password_confirmation: '',
    token: token,
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const routeName = isAdminCreated ? 'password.update.admin' : 'password.store';
    const url = isAdminCreated ? route(routeName, token) : route(routeName);
    post(url);
  }

  return (
    <>
      <Head title="Reset Password" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              {isAdminCreated
                ? 'Set your password for your new account.'
                : 'Enter your new password to reset your account.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    required
                    autoFocus
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password_confirmation">Confirm Password</Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    required
                  />
                  {errors.password_confirmation && (
                    <p className="text-sm text-red-600 mt-1">{errors.password_confirmation}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={processing}>
                  {processing ? 'Resetting...' : 'Reset Password'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
