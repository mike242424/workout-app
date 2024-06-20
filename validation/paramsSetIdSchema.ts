import z from 'zod';

export const paramsSetIdSchema = z.object({
  setId: z.string().nonempty({
    message: 'Must be a valid set id.',
  }),
});
