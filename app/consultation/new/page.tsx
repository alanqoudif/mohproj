import { prisma } from '@/lib/db';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface NewConsultationPageProps {
  searchParams: { consultant?: string }
}

export default async function NewConsultationPage({ searchParams }: NewConsultationPageProps) {
  const consultant = searchParams.consultant ? await prisma.consultant.findUnique({
    where: { id: searchParams.consultant },
    include: { specialty: true }
  }) : null;

  if (!consultant) {
    return (
      <div className="container py-10">
        <h1 className="text-4xl font-bold mb-8">Consultant Not Found</h1>
        <p>Please select a consultant to start a consultation.</p>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-4xl font-bold mb-8">Start Consultation</h1>
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Consultation with {consultant.specialty.name} Expert</h2>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Describe what you'd like to discuss..."
                className="min-h-[150px]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="anonymous" />
              <Label htmlFor="anonymous">Anonymous Mode</Label>
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}