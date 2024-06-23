'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { loginUserSchema } from '@/validation/loginUserSchema';

const LoginUserForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginUserSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleFormSubmit = async (values: z.infer<typeof loginUserSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error === 'CredentialsSignin') {
      form.setError('email', {
        type: 'manual',
        message: 'Invalid email or password',
      });
      form.setError('password', {
        type: 'manual',
        message: 'Invalid email or password',
      });
    } else {
      router.refresh();
      router.push('/workouts');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Form {...form}>
        <form
          className="flex flex-col w-6/12 gap-4"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginUserForm;
