'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Set } from '@prisma/client';
import DeleteExerciseButton from '@/components/delete-exercise-button';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
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

const ExercisePage = ({
  params: { id, exerciseId },
}: {
  params: { id: string; exerciseId: string };
}) => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ['exercises'],
    queryFn: getExercises,
  });

  async function getExercises() {
    const response = await axios.get(
      `http://localhost:3000/api/workouts/${id}/exercises/${exerciseId}`,
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
        <CardContent className="w-full">
          <div className="flex items-center justify-center  gap-4">
            <p className="font-bold text-2xl"> My Sets</p>
            <Link
              className="flex items-center justify-center bg-green-600 hover:bg-opacity-80 w-10 h-10 rounded-full font-bold"
              href={`/workouts/${id}/exercises/${exerciseId}/sets/add/${data?.id}`}
            >
              +
            </Link>
          </div>
          {data?.sets.length > 0 ? (
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Set No.</TableHead>
                  <TableHead>Reps</TableHead>
                  <TableHead>Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.sets.map((set: Set, i: number) => (
                  <TableRow
                    className="hover:cursor-pointer"
                    key={set.id}
                    onClick={() =>
                      router.push(
                        `/workouts/${id}/exercises/${exerciseId}/sets/${set.id}`,
                      )
                    }
                  >
                    <TableCell>{i + 1}.</TableCell>
                    <TableCell>{set.reps}</TableCell>
                    <TableCell>{set.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="mt-4 text-center">Add a set to this exercise</p>
          )}
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
