import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Users, MessageSquare, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Expert Consultations at Your Fingertips
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Connect with verified professionals across various fields. Get the guidance you need, when you need it.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/consultants">
                  Find a Consultant <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/specialties">Browse Specialties</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card className="flex flex-col items-center space-y-4 p-6">
              <Users className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Expert Consultants</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Access a network of verified professionals across multiple specialties
              </p>
            </Card>
            <Card className="flex flex-col items-center space-y-4 p-6">
              <MessageSquare className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Secure Communication</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Choose between public and anonymous modes for your consultations
              </p>
            </Card>
            <Card className="flex flex-col items-center space-y-4 p-6">
              <Shield className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Privacy First</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Your data is protected with enterprise-grade security measures
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}