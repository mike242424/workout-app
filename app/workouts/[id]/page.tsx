'use client';

import DeleteWorkoutButton from '@/components/delete-workout-button';
import Spinner from '@/components/loading';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { formatDate } from '@/lib/formatDate';
import { Exercise } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const WorkoutPage = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ['workouts', id],
    queryFn: getWorkouts,
  });

  async function getWorkouts() {
    const response = await axios.get(`/api/workouts/${id}/exercises`);
    return response.data;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="flex justify-center items-center w-full mt-20">
      <Card className="flex flex-col items-center gap-4 w-10/12 md:w-8/12 lg:w-6/12 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="font-bold text-3xl">{data?.title}</CardTitle>
          <CardDescription>Date: {formatDate(data?.createdAt)}</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex items-center justify-center gap-4">
            <p className="font-bold text-2xl"> My Exercises</p>
            <Link
              className="flex items-center justify-center bg-green-600 hover:bg-opacity-80 w-10 h-10 rounded-full font-bold"
              href={`/workouts/${data?.id}/exercises/add`}
            >
              +
            </Link>
          </div>
          {data?.exercises.length > 0 ? (
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Exercise No.</TableHead>
                  <TableHead>Exercise</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.exercises.map((exercise: Exercise, i: number) => (
                  <TableRow
                    className="hover:cursor-pointer"
                    key={exercise.id}
                    onClick={() =>
                      router.push(`/workouts/${id}/exercises/${exercise.id}`)
                    }
                  >
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{exercise.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="mt-4 text-center">Add an exercise to this workout</p>
          )}
        </CardContent>
        <CardFooter className="flex-col sm:flex-row w-full justify-between gap-4">
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
