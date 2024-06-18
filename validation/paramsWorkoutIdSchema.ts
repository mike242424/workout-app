import z from 'zod';

export const paramsWorkoutIdSchema = z.object({
  workoutId: z.string().nonempty({
    message: 'Must be a valid workout id.',
  }),
});
