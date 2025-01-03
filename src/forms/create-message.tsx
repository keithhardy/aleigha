'use client';

import { createMessageAction } from '@/actions/message';
import { useToast } from '@/hooks/use-toast';
import { CreateMessageSchema } from '@/zod/message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

export default function CreateMessageForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CreateMessageSchema>>({
    resolver: zodResolver(CreateMessageSchema),
    defaultValues: {
      content: '',
      sender: {
        connect: { id: 'cm5hc9x4g0000uqv0ecsv3lq2' }
      },
      group: {
        connect: { id: 'cm5hd0ydj00005b0wtn1zkcqu' }
      },
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateMessageSchema>) => {
    const response = await createMessageAction(data);

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === 'success' ? 'default' : 'destructive',
    });

    if (response.status === 'success') {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-lg p-4 space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message content</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Send
        </Button>
      </form>
    </Form>
  );
}
