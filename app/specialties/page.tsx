import { getDb } from '@/lib/db';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default async function SpecialtiesPage() {
  const db = await getDb();
  const specialties = db.exec(`
    SELECT 
      id,
      name,
      description,
      (SELECT COUNT(*) FROM consultants WHERE specialty_id = specialties.id) as consultant_count
    FROM specialties
  `);

  // Transform the result into a more usable format
  const specialtiesList = specialties[0]?.values.map(([id, name, description, consultantCount]) => ({
    id,
    name,
    description,
    _count: {
      consultants: consultantCount
    }
  })) || [];

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">التخصصات الاستشارية</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {specialtiesList.map((specialty) => (
          <Link key={specialty.id} href={`/consultants?specialty=${specialty.id}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{specialty.name}</CardTitle>
                <CardDescription>
                  {specialty.description}
                  <div className="mt-2 text-sm text-muted-foreground">
                    {specialty._count.consultants} مستشار متاح
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}