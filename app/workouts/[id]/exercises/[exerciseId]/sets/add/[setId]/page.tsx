'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Set } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddSetForm from '@/app/workouts/[id]/exercises/[exerciseId]/sets/add/[setId]/add-set-form';
import Spinner from '@/components/loading';

const AddWorkoutExercisePage = ({
  params: { id, exerciseId },
}: {
  params: { id: string; exerciseId: string };
}) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: postSet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises', id] });
      router.push(`/workouts/${id}/exercises/${exerciseId}`);
    },
  });

  async function postSet(data: Set) {
    const response = await axios.post(
      `/api/workouts/${id}/exercises/${exerciseId}/sets`,
      data,
    );
    return response.data;
  }

  const handleFormSubmit = (data: Set) => {
    mutation.mutate(data);
  };

  return (
    <main className="flex items-center justify-center mt-20">
      <Card className="w-10/12 md:w-8/12 lg:w-6/12 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="font-bold text-3xl mt-4 text-center">
            Add Set
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mutation.isPending ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <AddSetForm onSubmit={handleFormSubmit} />
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default AddWorkoutExercisePage;
