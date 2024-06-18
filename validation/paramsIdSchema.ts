import z from 'zod';

export const paramsIdSchema = z.object({
  id: z.string().nonempty({
    message: 'Must be a valid id.',
  }),
});
