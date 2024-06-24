'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import z from 'zod';
import { setSchema } from '@/validation/setSchema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UpdateSetForm from '@/components/update-set-form';
import Spinner from '@/components/loading';

const UpdateSetPage = ({
  params: { id, exerciseId, setId },
}: {
  params: { id: string; exerciseId: string; setId: string };
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['set', id],
    queryFn: getSet,
  });

  async function getSet() {
    const response = await axios.get(
      `/api/workouts/${id}/exercises/${exerciseId}/sets/${setId}`,
    );
    return response.data;
  }

  const mutation = useMutation({
    mutationFn: updateExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      router.push(`/workouts/${id}/exercises/${exerciseId}`);
    },
  });

  async function updateExercise(data: z.infer<typeof setSchema>) {
    const response = await axios.put(
      `/api/workouts/${id}/exercises/${exerciseId}/sets/${setId}`,
      data,
    );
    return response.data;
  }

  async function handleFormSubmit(data: z.infer<typeof setSchema>) {
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
            Update Set
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateSetForm
            reps={data?.reps}
            weight={data?.weight}
            onSubmit={handleFormSubmit}
          />
        </CardContent>
      </Card>
    </main>
  );
};

export default UpdateSetPage;
