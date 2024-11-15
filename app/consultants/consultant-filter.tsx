'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter, usePathname } from 'next/navigation';

interface ConsultantFilterProps {
  specialties: {
    id: string;
    name: string;
  }[];
  selectedSpecialty?: string;
}

export function ConsultantFilter({ specialties, selectedSpecialty }: ConsultantFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSpecialtyChange = (value: string) => {
    const params = new URLSearchParams();
    if (value !== 'all') {
      params.set('specialty', value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Filter Consultants</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Specialty</Label>
            <RadioGroup
              defaultValue={selectedSpecialty || 'all'}
              onValueChange={handleSpecialtyChange}
              className="mt-2 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All Specialties</Label>
              </div>
              {specialties.map((specialty) => (
                <div key={specialty.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={specialty.id} id={specialty.id} />
                  <Label htmlFor={specialty.id}>{specialty.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}