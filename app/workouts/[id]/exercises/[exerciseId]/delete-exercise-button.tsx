'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';

const DeleteExerciseButton = ({
  id,
  exerciseId,
}: {
  id: string;
  exerciseId: string;
}) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: deleteWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      router.push(`/workouts/${id}`);
    },
  });

  async function deleteWorkout() {
    const response = await axios.delete(
      `/api/workouts/${id}/exercises/${exerciseId}`,
    );
    return response.data;
  }

  function handleClick() {
    mutation.mutate();
  }
  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Deleting...' : 'Delete Exercise'}
    </Button>
  );
};

export default DeleteExerciseButton;
