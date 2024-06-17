'use client';

import DeleteWorkoutButton from '@/components/delete-workout-button';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { formatDate } from '@/lib/formatDate';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

const WorkoutPage = ({ params: { id } }: { params: { id: string } }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['workout', id],
    queryFn: getWorkout,
  });

  async function getWorkout() {
    const response = await axios.get(`/api/workouts/${id}`);
    return response.data;
  }

  return (
    <main className="flex justify-center items-center w-full mt-20">
      <Card className="flex flex-col items-center gap-4 w-6/12">
        <CardHeader>
          <CardTitle>{data?.title}</CardTitle>
          <CardDescription>Date: {formatDate(data?.createdAt)}</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-4">
          <Link href={`/workouts/update/${data?.id}`}>
            <Button>Update</Button>
          </Link>
          <DeleteWorkoutButton id={id} />
        </CardFooter>
      </Card>
    </main>
  );
};

export default WorkoutPage;
