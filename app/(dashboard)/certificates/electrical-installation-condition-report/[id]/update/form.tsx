'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Address, Client, ElectricalInstallationConditionReport, Property, User } from '@prisma/client'
import { Check, ChevronsUpDown } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

import { updateElectricalInstallationConditionReport } from './action'
import { Schema } from './schema'

export function ElectricalInstallationConditionReportForm({
  electricalInstallationConditionReport,
  clients,
  properties
}: {
  electricalInstallationConditionReport: ElectricalInstallationConditionReport,
  clients: Client[],
  properties: (Property & { address: Address })[]
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      clientId: electricalInstallationConditionReport.clientId,
      propertyId: electricalInstallationConditionReport.propertyId,
    },
  })

  const [clientOpen, setClientOpen] = useState(false);
  const [propertyOpen, setPropertyOpen] = useState(false);

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    const response = await updateElectricalInstallationConditionReport(data);

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
