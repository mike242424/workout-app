'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import z from 'zod';
import { exerciseSchema } from '@/validation/exerciseSchema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UpdateExerciseForm from '@/app/workouts/[id]/exercises/update/[exerciseId]/update-exercise-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Spinner from '@/components/loading';

const UpdateExercisePage = ({
  params: { id, exerciseId },
}: {
  params: { id: string; exerciseId: string };
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['exercise', id, exerciseId],
    queryFn: getExercise,
  });

  async function getExercise() {
    const response = await axios.get(
      `/api/workouts/${id}/exercises/${exerciseId}`,
    );
    return response.data;
  }

  const mutation = useMutation({
    mutationFn: updateExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      router.push(`/workouts/${id}`);
    },
  });

  async function updateExercise(data: z.infer<typeof exerciseSchema>) {
    const response = await axios.put(
      `/api/workouts/${id}/exercises/${exerciseId}`,
      data,
    );
    return response.data;
  }

  async function handleFormSubmit(data: z.infer<typeof exerciseSchema>) {
    mutation.mutate(data);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="flex items-center justify-center mt-20">
      <Card className="w-10/12 md:w-8/12 lg:w-6/12 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="font-bold text-3xl mt-4 text-center">
            Update Exercise
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mutation.isPending ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <UpdateExerciseForm
              title={data?.title}
              onSubmit={handleFormSubmit}
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default UpdateExercisePage;
