'use client';

import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function DeleteUserForm({ user }: { user: User }) {
  const form = useForm<User>({
    defaultValues: {
      name: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        <div className='space-y-4 pb-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-muted-foreground'>
                  Enter <span className='text-foreground'>{user.name}</span> and press delete to remove.
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-end'>
          <Button type='submit' disabled={form.watch('name') !== user.name || form.formState.isSubmitting} variant='destructive' size='sm'>
            {form.formState.isSubmitting ? 'Deleting' : 'Delete'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
