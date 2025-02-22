'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserRole } from '@prisma/client';
import { Check, ChevronsUpDown } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils'

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
      signature: user.signature || '',
      role: user.role || '' as UserRole
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

  const [userRoleOpen, setClientOpen] = useState(false);

  const UserRoles = Object.entries(UserRole).map(([key, value]) => ({
    id: value,
    name: key
  }));

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
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Client</FormLabel>
              <Popover open={userRoleOpen} onOpenChange={setClientOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={userRoleOpen ? 'true' : 'false'} className="w-[300px] justify-between" >
                    {field.value ? UserRoles.find((userRole) => userRole.id === field.value)?.name : "Select Role..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search userRole..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No userRole found.</CommandEmpty>
                      <CommandGroup>
                        {UserRoles.map((userRole) => (
                          <CommandItem key={userRole.id} value={userRole.id} onSelect={(currentValue) => { form.setValue("role", currentValue as UserRole); setClientOpen(false); }} >
                            {userRole.name}
                            <Check className={cn("ml-auto", userRole.id === field.value ? "opacity-100" : "opacity-0")} />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
