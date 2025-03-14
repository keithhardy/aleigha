"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Address,
  Client,
  ElectricalInstallationConditionReport,
  Property,
  Settings,
} from "@prisma/client";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();

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

  const [clientDialogOpen, setClientDialogOpen] = useState(false);
  const [propertyDialogOpen, setPropertyDialogOpen] = useState(false);

  const [clientSheetOpen, setClientSheetOpen] = useState(false);
  const [propertySheetOpen, setPropertySheetOpen] = useState(false);

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (!clientSheetOpen || !propertySheetOpen) return;

    const handleResize = () => {
      if (window.visualViewport) {
        const isKeyboardVisible =
          window.visualViewport.height < window.outerHeight * 0.75;
        setKeyboardVisible(isKeyboardVisible);
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, [clientSheetOpen || propertySheetOpen]);

  const handleClientOpenChange = (isOpen: boolean) => {
    setClientSheetOpen(isOpen);

    if (!isOpen) {
      setKeyboardVisible(false);
    }
  };

  const handlePropertyOpenChange = (isOpen: boolean) => {
    setPropertySheetOpen(isOpen);

    if (!isOpen) {
      setKeyboardVisible(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container mx-auto max-w-screen-xl px-4"
      >
        <Card className="rounded-md shadow-none">
          <CardHeader>
            <CardTitle>
              Contractor
            </CardTitle>
            <CardDescription>
              View the contractor and select the client and installation for
              this EICR report.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
            <div className="flex space-x-2">
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
          </CardContent>
          <CardHeader>
            <CardTitle>
              Client
            </CardTitle>
            <CardDescription>
              View the contractor and select the client and installation for
              this EICR report.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="clientId"
              render={() => (
                <FormItem>
                  {isMobile ? (
                    <Sheet
                      open={clientSheetOpen}
                      onOpenChange={handleClientOpenChange}
                    >
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {selectedClient
                            ? selectedClient.name
                            : "Select client..."}
                          <ChevronsUpDown className="ml-2 opacity-50" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side={keyboardVisible ? "top" : "bottom"}>
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
                                    setClientSheetOpen(false);
                                    setKeyboardVisible(false);
                                  }}
                                >
                                  {client.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </SheetContent>
                    </Sheet>
                  ) : (
                    <Dialog
                      open={clientDialogOpen}
                      onOpenChange={setClientDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {selectedClient
                            ? selectedClient.name
                            : "Select client..."}
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
            <Input
              type="text"
              value={selectedClient!.address.streetAddress ?? ""}
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
            <div className="flex space-x-2">
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
            <CardTitle>
              Installation
            </CardTitle>
            <CardDescription>
              View the contractor and select the client and installation for
              this EICR report.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="propertyId"
              render={() => (
                <FormItem>
                  {isMobile ? (
                    <Sheet
                      open={propertySheetOpen}
                      onOpenChange={handlePropertyOpenChange}
                    >
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {selectedProperty
                            ? selectedProperty.address.streetAddress
                            : "Select property..."}
                          <ChevronsUpDown className="ml-2 opacity-50" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side={keyboardVisible ? "top" : "bottom"}>
                        <DialogTitle />
                        <Command>
                          <CommandInput placeholder="Search property..." />
                          <CommandList className="scrollbar-hidden">
                            <CommandEmpty>No property found.</CommandEmpty>
                            <CommandGroup>
                              {selectedClient?.property.map((property) => (
                                <CommandItem
                                  key={property.id}
                                  value={property.address.streetAddress!}
                                  onSelect={() => {
                                    form.setValue("propertyId", property.id);
                                    setPropertySheetOpen(false);
                                    setKeyboardVisible(false);
                                  }}
                                >
                                  {property.address.streetAddress}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </SheetContent>
                    </Sheet>
                  ) : (
                    <Dialog
                      open={propertyDialogOpen}
                      onOpenChange={setPropertyDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {selectedProperty
                            ? selectedProperty.address.streetAddress
                            : "Select property..."}
                          <ChevronsUpDown className="ml-2 opacity-50" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle />
                        <Command>
                          <CommandInput placeholder="Search property..." />
                          <CommandList className="scrollbar-hidden">
                            <CommandEmpty>No property found.</CommandEmpty>
                            <CommandGroup>
                              {selectedClient?.property.map((property) => (
                                <CommandItem
                                  key={property.id}
                                  value={property.address.streetAddress!}
                                  onSelect={() => {
                                    form.setValue("propertyId", property.id);
                                    setPropertyDialogOpen(false);
                                  }}
                                >
                                  {property.address.streetAddress}
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
            <div className="flex space-x-2">
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
          <CardFooter className="justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
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
