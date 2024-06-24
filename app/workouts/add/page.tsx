'use client';

import AddWorkoutForm from '@/app/workouts/add/add-workout-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Workout } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddWorkoutPage = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: postWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      router.push('/workouts');
    },
  });

  async function postWorkout(data: Workout) {
    const response = await axios.post('/api/workouts', data);
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
            Add Workout
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AddWorkoutForm onSubmit={handleFormSubmit} />
        </CardContent>
      </Card>
    </main>
  );
};

export default AddWorkoutPage;
