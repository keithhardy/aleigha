"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Client, ElectricalInstallationConditionReport, Property } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Header, HeaderGroup, Heading } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription, CardFooter, Card } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

import { updateContractorClientPropertyReport } from "./action";
import { UpdateContractorClientPropertySchema } from "./schema";

export function UpdateContractorClientPropertyForm({ electricalInstallationConditionReport, clients }: { electricalInstallationConditionReport: ElectricalInstallationConditionReport; clients: (Client & { property: (Property & { address: Address })[] })[] }) {
  const { toast } = useToast();

  const [clientOpen, setClientOpen] = useState(false);
  const [propertyOpen, setPropertyOpen] = useState(false);

  const form = useForm<z.infer<typeof UpdateContractorClientPropertySchema>>({
    resolver: zodResolver(UpdateContractorClientPropertySchema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      clientId: electricalInstallationConditionReport.clientId,
      propertyId: electricalInstallationConditionReport.propertyId,
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateContractorClientPropertySchema>) => {
    const response = await updateContractorClientPropertyReport(data);

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Header>
          <HeaderGroup>
            <Heading>Contractor, Client and Property</Heading>
          </HeaderGroup>
        </Header>

        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Client</CardTitle>
            <CardDescription className="text-primary">Select the client.</CardDescription>
          </CardHeader>
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <Popover open={clientOpen} onOpenChange={setClientOpen}>
                  <div className="p-6 pt-0">
                    <PopoverTrigger asChild className="w-full">
                      <Button variant="outline" role="combobox" aria-expanded={clientOpen ? "true" : "false"} className="flex justify-between items-center lg:max-w-[50%]">
                        <span>{field.value ? clients.find((client) => client.id === field.value)?.name : "Select client..."}</span>
                        <ChevronsUpDown className="opacity-50 ml-2" />
                      </Button>
                    </PopoverTrigger>
                  </div>
                  <PopoverContent className="p-0" align="start">
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
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">This is the person or company requesting the report.</p>
          </CardFooter>
        </Card>

        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Property</CardTitle>
            <CardDescription className="text-primary">Select the property.</CardDescription>
          </CardHeader>
          <FormField
            control={form.control}
            name="propertyId"
            render={({ field }) => (
              <FormItem>
                <div className="p-6 pt-0">
                  <Popover open={propertyOpen} onOpenChange={setPropertyOpen}>
                    <PopoverTrigger asChild className="w-full">
                      <Button variant="outline" role="combobox" aria-expanded={propertyOpen ? "true" : "false"} className="flex justify-between items-center lg:max-w-[50%]">
                        <span>{field.value ? clients.find((client) => client.id === form.getValues("clientId"))?.property.find((property) => property.id === field.value)?.address.streetAddress : "Select a property..."}</span>
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="start">
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
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">Properties populate when a client is selected.</p>
          </CardFooter>
        </Card>

        <Button variant="outline" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
}
