import { getDb } from '@/lib/db';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { ConsultantFilter } from './consultant-filter';

interface ConsultantsPageProps {
  searchParams: { specialty?: string }
}

export default async function ConsultantsPage({ searchParams }: ConsultantsPageProps) {
  const { specialty } = searchParams;
  const db = await getDb();
  
  // Get consultants with their specialties
  const consultantsQuery = `
    SELECT 
      c.id,
      c.user_id,
      c.bio,
      c.experience,
      c.rating,
      s.id as specialty_id,
      s.name as specialty_name,
      s.description as specialty_description
    FROM consultants c
    JOIN specialties s ON c.specialty_id = s.id
    ${specialty ? 'WHERE c.specialty_id = ?' : ''}
  `;

  const consultantsResult = db.exec(consultantsQuery, specialty ? [specialty] : []);
  const consultants = consultantsResult[0]?.values.map(([id, userId, bio, experience, rating, specialtyId, specialtyName, specialtyDescription]) => ({
    id,
    userId,
    bio,
    experience,
    rating,
    specialty: {
      id: specialtyId,
      name: specialtyName,
      description: specialtyDescription
    }
  })) || [];

  // Get all specialties for the filter
  const specialtiesResult = db.exec('SELECT id, name FROM specialties');
  const specialties = specialtiesResult[0]?.values.map(([id, name]) => ({
    id,
    name
  })) || [];

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-1/4">
          <ConsultantFilter specialties={specialties} selectedSpecialty={specialty} />
        </div>
        <div className="md:w-3/4">
          <h1 className="text-4xl font-bold mb-6">المستشارون</h1>
          <div className="grid gap-6 md:grid-cols-2">
            {consultants.map((consultant) => (
              <Card key={consultant.id}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {consultant.specialty.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">د. {consultant.userId}</h3>
                    <p className="text-sm text-muted-foreground">
                      {consultant.specialty.name}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{consultant.bio}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span>{Number(consultant.rating).toFixed(1)}</span>
                    <span className="text-muted-foreground">
                      • {consultant.experience} سنوات خبرة
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/consultation/new?consultant=${consultant.id}`}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      بدء استشارة
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}