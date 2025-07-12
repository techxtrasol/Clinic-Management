import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, useForm } from '@inertiajs/react';
import { CheckCircle, Mail } from 'lucide-react';

interface VerificationNoticeProps {
  status?: string;
}

export default function VerificationNotice({ status }: VerificationNoticeProps) {
  const { post, processing } = useForm({});

  const resendVerification = () => {
    post(route('verification.send'));
  };

  return (
    <>
      <Head title="Email Verification Required" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>Verify Your Email Address</CardTitle>
            <CardDescription>
              Before proceeding, please check your email for a verification link.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {status && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{status}</AlertDescription>
              </Alert>
            )}

            <div className="text-center text-sm text-gray-600">
              <p className="mb-4">
                We've sent a verification link to your email address.
                Please click the link to verify your account and continue.
              </p>
              <p>
                If you don't see the email, check your spam folder.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                className="w-full"
              >
                I've verified my email
              </Button>

              <Button
                variant="outline"
                onClick={resendVerification}
                disabled={processing}
                className="w-full"
              >
                {processing ? 'Sending...' : 'Resend verification email'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
