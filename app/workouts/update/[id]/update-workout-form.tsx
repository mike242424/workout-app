'use client';

import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { workoutSchema } from '@/validation/workoutSchema';
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

interface UpdateWorkoutFormProps {
  title: string;
  location: string;
  onSubmit: (data: z.infer<typeof workoutSchema>) => void;
}

const UpdateWorkoutForm = ({
  title,
  location,
  onSubmit,
}: UpdateWorkoutFormProps) => {
  const form = useForm<z.infer<typeof workoutSchema>>({
    resolver: zodResolver(workoutSchema),
    defaultValues: { title, location },
  });

  return (
    <div className="flex items-center justify-center">
      <Form {...form}>
        <form
          className="flex flex-col w-6/12 gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title:</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            name="location"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location:</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Location" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button type="submit">Update Workout</Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateWorkoutForm;
