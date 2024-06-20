import z from 'zod';

export const setSchema = z.object({
  title: z
    .string()
    .min(1, 'Valid title required.')
    .max(15, 'Title must be between 1 and 15 characters long.'),
  reps: z.number().min(1, 'Valid number required for reps.'),
  weight: z.number().min(0, 'Valid number required for weight.'),
});
