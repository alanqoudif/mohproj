import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';

export default async function OnboardingPage() {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="container max-w-2xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome to Nuqta Consultation</h1>
          <p className="text-muted-foreground">
            Let's get you set up with your profile
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>
          <p className="text-muted-foreground mb-4">
            Tell us a bit about yourself so we can personalize your experience.
          </p>
          {/* Onboarding form will be added here */}
        </div>
      </div>
    </div>
  );
}