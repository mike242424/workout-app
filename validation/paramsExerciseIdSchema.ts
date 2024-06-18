import z from 'zod';

export const paramsExerciseIdSchema = z.object({
  exerciseId: z.string().nonempty({
    message: 'Must be a valid exercise id.',
  }),
});
