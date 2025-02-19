'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Address, Client, Property, User } from '@prisma/client'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { cn } from '@/lib/utils'

import { Schema } from './schema'
import { createEicr } from './action'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { redirect } from 'next/navigation'

export function ElectricalInstallationConditionReport({
  currentUser,
  users,
  clients,
  properties
}: {
  currentUser: User,
  users: User[],
  clients: Client[],
  properties: (Property & { address: Address })[]
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      userId: currentUser.id,
      clientId: "",
      propertyId: "",
    },
  })

  const [userOpen, setUserOpen] = useState(false);
  const [clientOpen, setClientOpen] = useState(false);
  const [propertyOpen, setPropertyOpen] = useState(false);

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    const response = await createEicr(data);

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === 'success' ? 'default' : 'destructive',
    });

    if (response.status === 'success') {
      redirect("/certificates");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>User</FormLabel>
              <Popover open={userOpen} onOpenChange={setUserOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={userOpen ? 'true' : 'false'} className="w-[300px] justify-between" >
                    {field.value ? users.find((user) => user.id === field.value)?.name : "Select user..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search user..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No user found.</CommandEmpty>
                      <CommandGroup>
                        {users.map((user) => (
                          <CommandItem key={user.id} value={user.id} onSelect={(currentValue) => { form.setValue("userId", currentValue); setUserOpen(false); }} >
                            {user.name}
                            <Check className={cn("ml-auto", user.id === field.value ? "opacity-100" : "opacity-0")} />
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
          name="clientId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Client</FormLabel>
              <Popover open={clientOpen} onOpenChange={setClientOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={clientOpen ? 'true' : 'false'} className="w-[300px] justify-between" >
                    {field.value ? clients.find((client) => client.id === field.value)?.name : "Select client..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search client..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No client found.</CommandEmpty>
                      <CommandGroup>
                        {clients.map((client) => (
                          <CommandItem key={client.id} value={client.id} onSelect={(currentValue) => { form.setValue("clientId", currentValue); setClientOpen(false); }} >
                            {client.name}
                            <Check className={cn("ml-auto", client.id === field.value ? "opacity-100" : "opacity-0")} />
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
          name="propertyId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Property</FormLabel>
              <Popover open={propertyOpen} onOpenChange={setPropertyOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={propertyOpen ? 'true' : 'false'} className="w-[300px] justify-between" >
                    {field.value ? properties.find((property) => property.id === field.value)?.address.streetAddress : "Select a property..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search property..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No property found.</CommandEmpty>
                      <CommandGroup>
                        {properties.map((property) => (
                          <CommandItem key={property.id} value={property.id} onSelect={(currentValue) => { form.setValue("propertyId", currentValue); setPropertyOpen(false); }} >
                            {property.address.streetAddress}
                            <Check className={cn("ml-auto", field.value === property.address.streetAddress ? "opacity-100" : "opacity-0")} />
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

        <Button type="submit" disabled={form.formState.isSubmitting} variant="outline">
          {form.formState.isSubmitting ? 'Saving' : 'Save'}
        </Button>
      </form>
    </Form >
  )
}
