'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import z from 'zod';
import { workoutSchema } from '@/validation/workoutSchema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UpdateExerciseForm from '@/components/update-exercise-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UpdateExercisePage = ({
  params: { id, exerciseId },
}: {
  params: { id: string; exerciseId: string };
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ['exercise', id],
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

  async function updateExercise(data: z.infer<typeof workoutSchema>) {
    const response = await axios.put(
      `/api/workouts/${id}/exercises/${exerciseId}`,
      data,
    );
    return response.data;
  }

  async function handleFormSubmit(data: z.infer<typeof workoutSchema>) {
    mutation.mutate(data);
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
          <UpdateExerciseForm title={data?.title} onSubmit={handleFormSubmit} />
        </CardContent>
      </Card>
    </main>
  );
};

export default UpdateExercisePage;
