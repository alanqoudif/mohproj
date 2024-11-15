import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthErrorPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold">Authentication Error</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            There was an error during authentication. This could be due to:
          </p>
          <ul className="list-disc pl-4 text-muted-foreground">
            <li>Invalid credentials</li>
            <li>Session expired</li>
            <li>Server configuration issues</li>
          </ul>
          <div className="flex justify-center pt-4">
            <Button asChild>
              <Link href="/sign-in">Try Again</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}