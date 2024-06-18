'use client';

import DeleteWorkoutButton from '@/components/delete-workout-button';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { formatDate } from '@/lib/formatDate';
import { Exercise } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

const WorkoutPage = ({ params: { id } }: { params: { id: string } }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['workouts', id],
    queryFn: getWorkouts,
  });

  async function getWorkouts() {
    const response = await axios.get(`/api/workouts/${id}/exercises`);
    return response.data;
  }

  return (
    <main className="flex justify-center items-center w-full mt-20">
      <Card className="flex flex-col items-center gap-4 w-6/12">
        <CardHeader>
          <CardTitle className="font-bold text-3xl">{data?.title}</CardTitle>
          <CardDescription>Date: {formatDate(data?.createdAt)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mt-4">
            <p className="font-bold text-2xl"> My Exercises</p>
            <Link
              className="flex items-center justify-center bg-green-600 hover:bg-opacity-80 w-10 h-10 rounded-full font-bold"
              href={`/workouts/${data?.id}/exercises/add`}
            >
              +
            </Link>
          </div>

          {data?.exercises.length > 0 ? (
            data?.exercises.map((exercise: Exercise, i: number) => (
              <Link
                href={`/workouts/${id}/exercises/${exercise.id}`}
                className="text-xl"
                key={exercise.id}
              >
                <div className="hover:underline">
                  {i + 1}. {exercise.title}
                </div>
              </Link>
            ))
          ) : (
            <p className="mt-4">Add an exercise to this workout</p>
          )}
        </CardContent>
        <CardFooter className="flex w-full justify-between gap-4">
          <Link href={`/workouts/update/${data?.id}`}>
            <Button>Update Workout</Button>
          </Link>
          <DeleteWorkoutButton id={id} />
        </CardFooter>
      </Card>
    </main>
  );
};

export default WorkoutPage;
