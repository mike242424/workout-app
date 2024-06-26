'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import z from 'zod';
import { setSchema } from '@/validation/setSchema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Spinner from '@/components/loading';
import UpdateSetForm from './update-set-form';

const UpdateSetPage = ({
  params: { id, exerciseId, setId },
}: {
  params: { id: string; exerciseId: string; setId: string };
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['set', id, exerciseId, setId],
    queryFn: getSet,
  });

  async function getSet() {
    const response = await axios.get(
      `/api/workouts/${id}/exercises/${exerciseId}/sets/${setId}`,
    );
    return response.data;
  }

  const mutation = useMutation({
    mutationFn: updateSet,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['exercises', id, exerciseId],
      });
      router.push(`/workouts/${id}/exercises/${exerciseId}`);
    },
  });

  async function updateSet(data: z.infer<typeof setSchema>) {
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
          {mutation.isPending ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <UpdateSetForm
              reps={data?.reps}
              weight={data?.weight}
              onSubmit={handleFormSubmit}
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default UpdateSetPage;
