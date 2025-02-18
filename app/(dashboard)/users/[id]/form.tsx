'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { redirect } from 'next/navigation';
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
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

import { updateUserAction } from './action';
import { Schema } from './schema';
import { SignatureField } from '../components/signature-field';

export default function UpdateUserForm({ user }: { user: User }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      id: user.id,
      auth0Id: user.auth0Id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      signature: user.signature || ''
    },
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    const response = await updateUserAction(data);

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === 'success' ? 'default' : 'destructive',
    });

    if (response.status === 'success') {
      redirect("/users");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="signature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Signature</FormLabel>
              <FormControl>
                <SignatureField {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting} variant="outline">
          {form.formState.isSubmitting ? 'Saving' : 'Save'}
        </Button>
      </form>
    </Form>
  );
}
