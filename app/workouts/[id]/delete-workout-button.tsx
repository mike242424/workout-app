'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/loading';

const DeleteWorkoutButton = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: deleteWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      router.push('/workouts');
    },
  });

  async function deleteWorkout() {
    const response = await axios.delete(`/api/workouts/${id}`);
    return response.data;
  }

  function handleClick() {
    mutation.mutate();
  }

  return (
    <div>
      <Button
        variant="secondary"
        onClick={handleClick}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Deleting...' : 'Delete Workout'}
      </Button>
    </div>
  );
};

export default DeleteWorkoutButton;
