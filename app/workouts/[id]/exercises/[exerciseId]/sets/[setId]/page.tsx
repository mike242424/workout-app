'use client';

import Link from 'next/link';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import DeleteSetButton from '@/components/delete-set-button';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
      <Card className="flex flex-col items-center gap-4 w-10/12 md:w-8/12 lg:w-6/12 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="font-bold text-3xl">{data?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <span className="font-bold">Reps:</span> {data?.reps}
          </p>
          <p>
            <span className="font-bold">Weight:</span> {data?.weight}
          </p>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row w-full justify-between gap-4">
          <Link
            href={`/workouts/${id}/exercises/${exerciseId}/sets/update/${setId}`}
          >
            <Button>Update Set</Button>
          </Link>
          <DeleteSetButton id={id} exerciseId={exerciseId} setId={setId} />
        </CardFooter>
      </Card>
    </main>
  );
};

export default ExercisePage;
