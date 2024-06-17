'use client';

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
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'util';

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
          <Button>Update</Button>
          <Button>Delete</Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default WorkoutPage;
