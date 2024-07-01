'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { setSchema } from '@/validation/setSchema';
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

interface UpdateSetFormProps {
  reps: number;
  weight: number;
  onSubmit: (data: z.infer<typeof setSchema>) => void;
}

const UpdateSetForm = ({ reps, weight, onSubmit }: UpdateSetFormProps) => {
  const form = useForm<z.infer<typeof setSchema>>({
    resolver: zodResolver(setSchema),
    defaultValues: { reps, weight },
  });

  useEffect(() => {
    form.reset({ reps, weight });
  }, [reps, weight, form]);

  return (
    <div className="flex items-center justify-center">
      <Form {...form}>
        <form
          className="flex flex-col w-6/12 gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="reps"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reps:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Reps"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            name="weight"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Weight"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button type="submit">Update Set</Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateSetForm;
