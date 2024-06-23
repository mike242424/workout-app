import z from 'zod';

export const registerUserSchema = z.object({
  username: z.string().min(1, 'Must be a valid username'),
  email: z.string().email({
    message: 'Must be a valid email',
  }),
  password: z.string().min(1, 'Must be a valid password'),
});
