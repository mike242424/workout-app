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
import { setSchema } from '@/validation/setSchema';

const AddSetForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const form = useForm({
    resolver: zodResolver(setSchema),
    defaultValues: { reps: '', weight: '' },
  });

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
          <Button type="submit">Add Set</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddSetForm;
