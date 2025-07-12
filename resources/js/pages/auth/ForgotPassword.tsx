import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post(route('password.email'));
  }

  return (
    <>
      <Head title="Forgot Password" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your email address and we will send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status && (
              <Alert className="mb-4">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{status}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={submit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    autoFocus
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={processing}>
                  {processing ? 'Sending...' : 'Send Password Reset Link'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
