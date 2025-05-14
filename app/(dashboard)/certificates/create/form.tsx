"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Client, Property, User } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  DialogSheet,
  DialogSheetContent,
  DialogSheetTitle,
  DialogSheetTrigger,
} from "@/components/dialog-sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import { createCertificate } from "./action";
import { CreateCertificateSchema } from "./schema";

export function CreateCertificateForm({
  currentUser,
  clients,
}: {
  currentUser: User;
  clients: (Client & { property: (Property & { address: Address })[] })[];
}) {
  const { toast } = useToast();

  const [typeOpen, setTypeOpen] = useState(false);
  const [clientOpen, setClientOpen] = useState(false);
  const [propertyOpen, setPropertyOpen] = useState(false);

  const form = useForm<z.infer<typeof CreateCertificateSchema>>({
    resolver: zodResolver(CreateCertificateSchema),
    defaultValues: {
      creatorId: currentUser.id,
      type: "",
      clientId: "",
      propertyId: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateCertificateSchema>) => {
    const response = await createCertificate(data);

    if (response.status === "success") {
      form.reset(data);
    }

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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Card className="rounded-md shadow-none">
            <div className="flex flex-col gap-4 p-6 lg:flex-row">
              <CardHeader className="w-full p-0">
                <CardTitle>Certificate Details</CardTitle>
                <CardDescription className="text-balance">
                  Please make sure all values are correct.
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full space-y-4 p-0">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <DialogSheet open={typeOpen} onOpenChange={setTypeOpen}>
                        <DialogSheetTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            {field.value || "Select type..."}
                            <ChevronsUpDown />
                          </Button>
                        </DialogSheetTrigger>
                        <DialogSheetContent className="p-0">
                          <DialogSheetTitle className="hidden" />
                          <Command className="pt-2">
                            <CommandInput placeholder="Search..." />
                            <CommandList className="scrollbar-hidden mt-1 border-t p-1">
                              <CommandEmpty>No results found.</CommandEmpty>
                              <CommandGroup>
                                {["Electrical Installation Condition Report"].map((type) => (
                                  <CommandItem
                                    key={type}
                                    value={type}
                                    onSelect={(currentValue) => {
                                      form.setValue("type", currentValue);
                                      setTypeOpen(false);
                                    }}
                                  >
                                    {type}
                                    {type === field.value ? <Check className="ml-auto" /> : null}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </DialogSheetContent>
                      </DialogSheet>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <DialogSheet open={clientOpen} onOpenChange={setClientOpen}>
                        <DialogSheetTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            {field.value
                              ? clients.find((client) => client.id === field.value)?.name
                              : "Select client..."}
                            <ChevronsUpDown />
                          </Button>
                        </DialogSheetTrigger>
                        <DialogSheetContent className="p-0">
                          <DialogSheetTitle className="hidden" />
                          <Command className="pt-2">
                            <CommandInput placeholder="Search..." />
                            <CommandList className="scrollbar-hidden mt-1 border-t p-1">
                              <CommandEmpty>No results found.</CommandEmpty>
                              <CommandGroup>
                                {clients.map((client) => (
                                  <CommandItem
                                    key={client.id}
                                    value={client.id}
                                    onSelect={(currentValue) => {
                                      form.setValue("clientId", currentValue);
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
                        </DialogSheetContent>
                      </DialogSheet>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="propertyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property</FormLabel>
                      <DialogSheet open={propertyOpen} onOpenChange={setPropertyOpen}>
                        <DialogSheetTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            {field.value
                              ? clients
                                  .find((client) => client.id === form.getValues("clientId"))
                                  ?.property.find((property) => property.id === field.value)
                                  ?.address.streetAddress
                              : "Select property..."}
                            <ChevronsUpDown />
                          </Button>
                        </DialogSheetTrigger>
                        <DialogSheetContent className="p-0">
                          <DialogSheetTitle className="hidden" />
                          <Command className="pt-2">
                            <CommandInput placeholder="Search..." />
                            <CommandList className="scrollbar-hidden mt-1 border-t p-1">
                              <CommandEmpty>No results found.</CommandEmpty>
                              <CommandGroup>
                                {clients
                                  .find((client) => client.id === form.getValues("clientId"))
                                  ?.property.map((property) => (
                                    <CommandItem
                                      key={property.id}
                                      value={property.id}
                                      onSelect={(currentValue) => {
                                        form.setValue("propertyId", currentValue, {
                                          shouldDirty: true,
                                        });
                                        setPropertyOpen(false);
                                      }}
                                    >
                                      {property.address.streetAddress}
                                      {property.id === field.value ? (
                                        <Check className="ml-auto" />
                                      ) : null}
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </DialogSheetContent>
                      </DialogSheet>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </div>
            <CardFooter className="justify-end space-x-4 rounded-b-md border-t bg-muted py-4">
              <Button
                variant="outline"
                size="sm"
                type="submit"
                disabled={!form.formState.isDirty || form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Saving..." : "Save"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
}
