'use client';

import axios from 'axios';
import z from 'zod';
import { workoutSchema } from '@/validation/workoutSchema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UpdateWorkoutForm from './update-workout-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/loading';

const UpdateWorkoutPage = ({ params: { id } }: { params: { id: string } }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['workout', id],
    queryFn: getWorkout,
  });

  async function getWorkout() {
    const response = await axios.get(`/api/workouts/${id}`);
    return response.data;
  }

  const mutation = useMutation({
    mutationFn: updateWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      router.push('/workouts');
    },
  });

  async function updateWorkout(data: z.infer<typeof workoutSchema>) {
    const response = await axios.put(`/api/workouts/${id}`, data);
    return response.data;
  }

  async function handleFormSubmit(data: z.infer<typeof workoutSchema>) {
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
            Update Workout
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateWorkoutForm
            title={data?.title}
            location={data?.location}
            onSubmit={handleFormSubmit}
          />
        </CardContent>
      </Card>
    </main>
  );
};

export default UpdateWorkoutPage;
