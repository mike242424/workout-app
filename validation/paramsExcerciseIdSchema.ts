import z from 'zod';

export const paramsExcerciseIdSchema = z.object({
  excerciseId: z.string().nonempty({
    message: 'Must be a valid excercise id.',
  }),
});
