'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { $Enums } from '@prisma/client';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

import { createUserAction } from './action';
import { CreateUserSchema } from './schema';

export default function CreateUserForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      position: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateUserSchema>) => {
    const response = await createUserAction(data);

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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values($Enums.UserPosition).map((value) => (
                    <SelectItem key={value} value={value}>
                      {value.toTitleCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
