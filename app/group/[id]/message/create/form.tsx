'use client';

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
import { useToast } from '@/hooks/use-toast';

import { CreateMessageSchema } from './schema';
import { createMessageAction } from './action';

export default function CreateMessageForm({
  groupId
}: {
  groupId: string
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CreateMessageSchema>>({
    resolver: zodResolver(CreateMessageSchema),
    defaultValues: {
      content: '',
      sender: {
        connect: { id: 'cm5heg65w0000uqpkaqo0uv5m' }
      },
      group: {
        connect: { id: groupId }
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
