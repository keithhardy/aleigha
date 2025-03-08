"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Client, Property, User } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

import { createElectricalInstallationConditionReport } from "./action";
import { CreateElectricalInstallationConditionReportSchema } from "./schema";

export function CreateElectricalInstallationConditionReportForm({ currentUser, clients }: { currentUser: User; clients: (Client & { property: (Property & { address: Address })[] })[] }) {
  const { toast } = useToast();

  const [clientOpen, setClientOpen] = useState(false);
  const [propertyOpen, setPropertyOpen] = useState(false);

  const form = useForm<z.infer<typeof CreateElectricalInstallationConditionReportSchema>>({
    resolver: zodResolver(CreateElectricalInstallationConditionReportSchema),
    defaultValues: {
      creatorId: currentUser.id,
      clientId: "",
      propertyId: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateElectricalInstallationConditionReportSchema>) => {
    const response = await createElectricalInstallationConditionReport(data);

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });

    if (response.status === "success") {
      redirect("/certificates");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Client</FormLabel>
              <Popover open={clientOpen} onOpenChange={setClientOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={clientOpen ? "true" : "false"} className="max-w-[1024px] pl-3 text-left font-normal justify-between">
                    {field.value ? clients.find((client) => client.id === field.value)?.name : "Select client..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search client..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No client found.</CommandEmpty>
                      <CommandGroup>
                        {clients.map((client) => (
                          <CommandItem
                            key={client.id}
                            value={client.id}
                            onSelect={(currentValue) => {
                              form.setValue("clientId", currentValue);
                              form.setValue("propertyId", "");
                              setClientOpen(false);
                            }}
                          >
                            {client.name}
                            {client.id === field.value ? <Check className="ml-auto" /> : null}
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
                  <Button variant="outline" role="combobox" aria-expanded={propertyOpen ? "true" : "false"} className="max-w-[1024px] pl-3 text-left font-normal justify-between">
                    {field.value ? clients.find((client) => client.id === form.getValues("clientId"))?.property.find((property) => property.id === field.value)?.address.streetAddress : "Select a property..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search property..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No property found.</CommandEmpty>
                      <CommandGroup>
                        {clients
                          .find((client) => client.id === form.getValues("clientId"))
                          ?.property.map((property) => (
                            <CommandItem
                              key={property.id}
                              value={property.id}
                              onSelect={(currentValue) => {
                                form.setValue("propertyId", currentValue);
                                setPropertyOpen(false);
                              }}
                            >
                              {property.address.streetAddress}
                              {field.value === property.id ? <Check className="ml-auto" /> : null}
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
          {form.formState.isSubmitting ? "Saving" : "Save"}
        </Button>
      </form>
    </Form>
  );
}
