import z from 'zod';

export const workoutSchema = z.object({
  title: z
    .string()
    .min(1, 'Valid title required.')
    .max(15, 'Title must be between 1 and 15 characters long.'),
  location: z.string().min(1, 'Location must be a valid location.').optional(),
});
