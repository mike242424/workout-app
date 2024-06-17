import z from 'zod';

export const paramsIdSchema = z.object({
  id: z.string().min(1, 'Must be a valid id.'),
});
