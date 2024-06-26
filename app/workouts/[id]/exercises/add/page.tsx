'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Workout } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AddExerciseForm from './add-exercise-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Spinner from '@/components/loading';

const AddWorkoutExercisePage = ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: postWorkoutExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts', id] });
      router.push(`/workouts/${id}`);
    },
  });

  async function postWorkoutExercise(data: Workout) {
    const response = await axios.post(`/api/workouts/${id}/exercises`, data);
    return response.data;
  }

  const handleFormSubmit = (data: Workout) => {
    mutation.mutate(data);
  };

  return (
    <main className="flex items-center justify-center mt-20">
      <Card className="w-10/12 md:w-8/12 lg:w-6/12 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="font-bold text-3xl mt-4 text-center">
            Add Exercise
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mutation.isPending ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <AddExerciseForm onSubmit={handleFormSubmit} />
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default AddWorkoutExercisePage;
