import z from 'zod';

export const setSchema = z.object({
  reps: z.number().min(1, 'Valid number required for reps.'),
  weight: z.number().min(0, 'Valid number required for weight.'),
});
