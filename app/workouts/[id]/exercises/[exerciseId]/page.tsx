'use client';

import DeleteExerciseButton from '@/components/delete-exercise-button';
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
  params: { id, exerciseId },
}: {
  params: { id: string; exerciseId: string };
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['exercises'],
    queryFn: getExercises,
  });

  async function getExercises() {
    const response = await axios.get(
      `http://localhost:3000/api/workouts/${id}/exercises/${exerciseId}`,
    );
    return response.data;
  }

  return (
    <main className="flex justify-center items-center w-full mt-20">
      <Card className="flex flex-col items-center gap-4 w-10/12 md:w-8/12 lg:w-6/12 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="font-bold tet-3xl">{data?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mt-4">
            <p className="font-bold text-2xl"> My Sets</p>
            <Link
              className="flex items-center justify-center bg-green-600 hover:bg-opacity-80 w-10 h-10 rounded-full font-bold"
              href={`/workouts/${id}/exercises/${exerciseId}/set/add`}
            >
              +
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex w-full justify-between gap-4">
          <Link href={`/workouts/${id}/exercises/update/${exerciseId}`}>
            <Button>Update Exercise</Button>
          </Link>
          <DeleteExerciseButton id={id} exerciseId={exerciseId} />
        </CardFooter>
      </Card>
    </main>
  );
};

export default ExercisePage;
