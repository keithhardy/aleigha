'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { User } from '@prisma/client';

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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useToast } from '@/hooks/use-toast';

import { CreateGroupSchema } from './schema';
import { createGroupAction } from './action';

export default function CreateGroupForm({
  users
}: {
  users: User[]
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CreateGroupSchema>>({
    resolver: zodResolver(CreateGroupSchema),
    defaultValues: {
      name: '',
      users: {
        connect: [{ id: 'cm5heg65w0000uqpkaqo0uv5m' }]
      }
    }
  });

  const onSubmit = async (data: z.infer<typeof CreateGroupSchema>) => {
    const response = await createGroupAction(data);

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
              <FormLabel>Group Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="users.connect"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Add members</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" role="combobox" className="w-[200px] justify-between">
                      {field.value.length > 0
                        ? `${field.value.length} user(s) selected`
                        : 'Select users'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search users..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No users found.</CommandEmpty>
                      <CommandGroup>
                        {users.map((user) => {
                          const isSelected = field.value.some(
                            (item) => item.id === user.id
                          );

                          const handleToggle = () => {
                            const updatedUsers = isSelected
                              ? field.value.filter((item) => item.id !== user.id)
                              : [...field.value, { id: user.id }];
                            field.onChange(updatedUsers);
                          };

                          return (
                            <CommandItem
                              key={user.id}
                              onSelect={handleToggle}
                            >
                              <span className="text-sm">{user.name}</span>
                              {isSelected && (
                                <Check className="ml-auto" />
                              )}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Create
        </Button>
      </form>
    </Form>
  );
}
