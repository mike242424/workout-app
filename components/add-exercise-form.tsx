'use client';

import { useForm } from 'react-hook-form';
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
import { exerciseSchema } from '@/validation/exerciseSchema';

const AddExerciseForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const form = useForm({
    resolver: zodResolver(exerciseSchema),
    defaultValues: { title: '' },
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
          <Button type="submit">Add Exercise</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddExerciseForm;
