"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Address,
  Client,
  ElectricalInstallationConditionReport,
  Property,
  Settings,
} from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

import { updateContractorClientAndInstallation } from "./action";
import { UpdateContractorClientAndInstallationSchema } from "./schema";

export function UpdateContractorClientAndInstallationForm({
  electricalInstallationConditionReport,
  clients,
  settings,
}: {
  electricalInstallationConditionReport: ElectricalInstallationConditionReport & {
    property: Property & { address: Address };
    client: Client & { address: Address };
  };
  clients: (Client & {
    address: Address;
    property: (Property & { address: Address })[];
  })[];
  settings: Settings & { address: Address };
}) {
  const { toast } = useToast();

  const [clientOpen, setClientOpen] = useState(false);
  const [propertyOpen, setPropertyOpen] = useState(false);

  const form = useForm<
    z.infer<typeof UpdateContractorClientAndInstallationSchema>
  >({
    resolver: zodResolver(UpdateContractorClientAndInstallationSchema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      clientId: electricalInstallationConditionReport.clientId,
      propertyId: electricalInstallationConditionReport.propertyId,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof UpdateContractorClientAndInstallationSchema>,
  ) => {
    const response = await updateContractorClientAndInstallation(data);

    if (response.status === "success") {
      form.reset(data);
    }

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });
  };

  const selectedClient = clients.find(
    (client) => client.id === form.getValues("clientId"),
  );

  const selectedProperty = selectedClient?.property.find(
    (property) => property.id === form.getValues("propertyId"),
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Contractor Details</CardTitle>
            <CardDescription className="text-primary">
              Contractor details for this EICR report.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input
              type="text"
              value={settings?.name ?? ""}
              readOnly
              disabled
              placeholder="Street address"
            />
            <Input
              type="text"
              value={settings?.address?.streetAddress ?? ""}
              readOnly
              disabled
              placeholder="Street address"
            />
            <Input
              type="text"
              value={settings?.address?.city ?? ""}
              readOnly
              disabled
              placeholder="City"
            />
            <Input
              type="text"
              value={settings?.address?.county ?? ""}
              readOnly
              disabled
              placeholder="County"
            />
            <Input
              type="text"
              value={settings?.address?.postTown ?? ""}
              readOnly
              disabled
              placeholder="Post town"
            />
            <div className="space-x-2 flex">
              <Input
                type="text"
                value={settings?.address?.postCode ?? ""}
                readOnly
                disabled
                placeholder="Post code"
              />
              <Input
                type="text"
                value={settings?.address?.country ?? ""}
                readOnly
                disabled
                placeholder="Country"
              />
            </div>
            <FormMessage />
          </CardContent>
          <CardHeader>
            <CardTitle>Client Details</CardTitle>
            <CardDescription className="text-primary">
              Select the client for this EICR report.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <Popover open={clientOpen} onOpenChange={setClientOpen}>
                    <PopoverTrigger asChild className="w-full">
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={clientOpen ? "true" : "false"}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {selectedClient
                            ? selectedClient.name
                            : "Select client..."}
                        </span>
                        <ChevronsUpDown className="opacity-50 ml-2" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 min-w-[375px]">
                      <Command>
                        <CommandInput
                          placeholder="Search client..."
                          className="h-9"
                        />
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
                                {client.id === field.value ? (
                                  <Check className="ml-auto" />
                                ) : null}
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
            <Input
              type="text"
              value={selectedClient?.address?.streetAddress ?? ""}
              readOnly
              disabled
              placeholder="Street address"
            />
            <Input
              type="text"
              value={selectedClient?.address?.city ?? ""}
              readOnly
              disabled
              placeholder="City"
            />
            <Input
              type="text"
              value={selectedClient?.address?.county ?? ""}
              readOnly
              disabled
              placeholder="County"
            />
            <Input
              type="text"
              value={selectedClient?.address?.postTown ?? ""}
              readOnly
              disabled
              placeholder="Post town"
            />
            <div className="space-x-2 flex">
              <Input
                type="text"
                value={selectedClient?.address?.postCode ?? ""}
                readOnly
                disabled
                placeholder="Post code"
              />
              <Input
                type="text"
                value={selectedClient?.address?.country ?? ""}
                readOnly
                disabled
                placeholder="Country"
              />
            </div>
          </CardContent>
          <CardHeader>
            <CardTitle>Installation Details</CardTitle>
            <CardDescription className="text-primary">
              Select the property for this EICR report.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="propertyId"
              render={({ field }) => (
                <FormItem>
                  <Popover open={propertyOpen} onOpenChange={setPropertyOpen}>
                    <PopoverTrigger asChild className="w-full">
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={propertyOpen ? "true" : "false"}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {field.value
                            ? selectedProperty?.address.streetAddress ||
                            "Select a property..."
                            : "Select a property..."}
                        </span>
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 min-w-[375px]">
                      <Command>
                        <CommandInput
                          placeholder="Search property..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No property found.</CommandEmpty>
                          <CommandGroup>
                            {selectedClient?.property.map((property) => (
                              <CommandItem
                                key={property.id}
                                value={property.id}
                                onSelect={(currentValue) => {
                                  form.setValue("propertyId", currentValue);
                                  setPropertyOpen(false);
                                }}
                              >
                                {property.address.streetAddress}
                                {field.value === property.id ? (
                                  <Check className="ml-auto" />
                                ) : null}
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
            <Input
              type="text"
              value={selectedProperty?.address?.city ?? ""}
              readOnly
              disabled
              placeholder="City"
            />
            <Input
              type="text"
              value={selectedProperty?.address?.county ?? ""}
              readOnly
              disabled
              placeholder="County"
            />
            <Input
              type="text"
              value={selectedProperty?.address?.postTown ?? ""}
              readOnly
              disabled
              placeholder="Post town"
            />
            <div className="space-x-2 flex">
              <Input
                type="text"
                value={selectedProperty?.address?.postCode ?? ""}
                readOnly
                disabled
                placeholder="Post code"
              />
              <Input
                type="text"
                value={selectedProperty?.address?.country ?? ""}
                readOnly
                disabled
                placeholder="Country"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">
              Properties populate when a client is selected.
            </p>
            <Button
              variant="outline"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
