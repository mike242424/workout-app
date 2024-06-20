'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

const ExercisePage = ({
  params: { id, exerciseId, setId },
}: {
  params: { id: string; exerciseId: string; setId: string };
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['sets'],
    queryFn: getSets,
  });

  async function getSets() {
    const response = await axios.get(
      `http://localhost:3000/api/workouts/${id}/exercises/${exerciseId}/sets/${setId}`,
    );
    return response.data;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex justify-center items-center w-full mt-20">
      <Card className="flex flex-col items-center gap-4 w-6/12 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="font-bold text-3xl">{data?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Reps: {data?.reps}</p>
          <p>Weight: {data?.weight}</p>
        </CardContent>
        <CardFooter className="flex w-full justify-between gap-4">
          <Link
            href={`/workouts/${id}/exercises/${exerciseId}/sets/update/${setId}`}
          >
            <Button>Update Set</Button>
          </Link>
          {/* <DeleteSetButton id={id} /> */}
        </CardFooter>
      </Card>
    </main>
  );
};

export default ExercisePage;
