"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Client, ElectricalInstallationConditionReport, Property, Settings } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription, CardFooter, Card, CardContent } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

import { updateContractorClientAndInstallation } from "./action";
import { UpdateContractorClientAndInstallationSchema } from "./schema";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

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

  const isMobile = useIsMobile();

  const [clientSheetOpen, setClientSheetOpen] = useState(false);
  const [clientDialogOpen, setClientDialogOpen] = useState(false);
  const [propertyOpen, setPropertyOpen] = useState(false);

  const form = useForm<z.infer<typeof UpdateContractorClientAndInstallationSchema>>({
    resolver: zodResolver(UpdateContractorClientAndInstallationSchema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      clientId: electricalInstallationConditionReport.clientId,
      propertyId: electricalInstallationConditionReport.propertyId,
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateContractorClientAndInstallationSchema>) => {
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

  const selectedClient = clients.find((client) => client.id === form.getValues("clientId"));

  const selectedProperty = selectedClient?.property.find((property) => property.id === form.getValues("propertyId"));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="container mx-auto max-w-screen-md px-4">
        <Card className="rounded-md shadow-none">
          <CardHeader>
            <CardTitle>Details of the contractor, client and installation</CardTitle>
            <CardDescription className="text-primary">View the contractor and select the client and installation for this EICR report.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <FormLabel>Contractor Details</FormLabel>
              <Input type="text" value={settings?.name ?? ""} readOnly disabled placeholder="Street address" />
              <Input type="text" value={settings?.address?.streetAddress ?? ""} readOnly disabled placeholder="Street address" />
              <Input type="text" value={settings?.address?.city ?? ""} readOnly disabled placeholder="City" />
              <Input type="text" value={settings?.address?.county ?? ""} readOnly disabled placeholder="County" />
              <Input type="text" value={settings?.address?.postTown ?? ""} readOnly disabled placeholder="Post town" />
              <div className="flex space-x-2">
                <Input type="text" value={settings?.address?.postCode ?? ""} readOnly disabled placeholder="Post code" />
                <Input type="text" value={settings?.address?.country ?? ""} readOnly disabled placeholder="Country" />
              </div>
            </div>
            <div className="space-y-2">
              <FormLabel>Client Details</FormLabel>
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    {isMobile ? (
                      <Sheet open={clientSheetOpen} onOpenChange={setClientSheetOpen}>
                        <SheetTrigger asChild className="w-full">
                          <Button variant="outline" role="combobox" aria-expanded={clientSheetOpen ? "true" : "false"} className="flex items-center justify-between">
                            <span>{selectedClient ? selectedClient.name : "Select client..."}</span>
                            <ChevronsUpDown className="ml-2 opacity-50" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent side={"bottom"} className="p-0">
                          <Command>
                            <CommandInput placeholder="Search client..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No client found.</CommandEmpty>
                              <CommandGroup>
                                {clients.map((client) => (
                                  <CommandItem
                                    key={client.id}
                                    value={client.name}
                                    onSelect={() => {
                                      form.setValue("clientId", client.id);
                                      form.setValue("propertyId", "");
                                      setClientSheetOpen(false);
                                    }}
                                  >
                                    {client.name}
                                    {client.id === field.value ? <Check className="ml-auto" /> : null}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </SheetContent>
                      </Sheet>
                    ) : (
                      <Dialog open={clientDialogOpen} onOpenChange={setClientDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            {selectedClient ? selectedClient.name : "Select client..."}
                            <ChevronsUpDown className="ml-2 opacity-50" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle />
                          <Command>
                            <CommandInput placeholder="Search client..." />
                            <CommandList className="scrollbar-hidden">
                              <CommandEmpty>No client found.</CommandEmpty>
                              <CommandGroup>
                                {clients.map((client) => (
                                  <CommandItem
                                    key={client.id}
                                    value={client.name}
                                    onSelect={() => {
                                      form.setValue("clientId", client.id);
                                      form.setValue("propertyId", "");
                                      setClientDialogOpen(false);
                                    }}
                                  >
                                    {client.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </DialogContent>
                      </Dialog>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Input type="text" value={selectedClient?.address?.streetAddress ?? ""} readOnly disabled placeholder="Street address" />
              <Input type="text" value={selectedClient?.address?.city ?? ""} readOnly disabled placeholder="City" />
              <Input type="text" value={selectedClient?.address?.county ?? ""} readOnly disabled placeholder="County" />
              <Input type="text" value={selectedClient?.address?.postTown ?? ""} readOnly disabled placeholder="Post town" />
              <div className="flex space-x-2">
                <Input type="text" value={selectedClient?.address?.postCode ?? ""} readOnly disabled placeholder="Post code" />
                <Input type="text" value={selectedClient?.address?.country ?? ""} readOnly disabled placeholder="Country" />
              </div>
            </div>

            <div className="space-y-2">
              <FormLabel>Installation Details</FormLabel>
              <FormField
                control={form.control}
                name="propertyId"
                render={({ field }) => (
                  <FormItem>
                    <Sheet open={propertyOpen} onOpenChange={setPropertyOpen}>
                      <SheetTrigger asChild className="w-full">
                        <Button variant="outline" role="combobox" aria-expanded={propertyOpen ? "true" : "false"} className="flex items-center justify-between">
                          <span>{field.value ? selectedProperty?.address.streetAddress || "Select a property..." : "Select a property..."}</span>
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="min-w-[375px] p-0">
                        <Command>
                          <CommandInput placeholder="Search property..." className="h-9" />
                          <CommandList>
                            <CommandEmpty>No property found.</CommandEmpty>
                            <CommandGroup>
                              {selectedClient?.property.map((property) => (
                                <CommandItem
                                  key={property.id}
                                  value={property.address.streetAddress!}
                                  onSelect={() => {
                                    form.setValue("propertyId", property.id);
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
                      </SheetContent>
                    </Sheet>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Input type="text" value={selectedProperty?.address?.city ?? ""} readOnly disabled placeholder="City" />
              <Input type="text" value={selectedProperty?.address?.county ?? ""} readOnly disabled placeholder="County" />
              <Input type="text" value={selectedProperty?.address?.postTown ?? ""} readOnly disabled placeholder="Post town" />
              <div className="flex space-x-2">
                <Input type="text" value={selectedProperty?.address?.postCode ?? ""} readOnly disabled placeholder="Post code" />
                <Input type="text" value={selectedProperty?.address?.country ?? ""} readOnly disabled placeholder="Country" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
            <p className="text-sm text-muted-foreground">Properties populate when a client is selected.</p>
            <Button variant="outline" type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
