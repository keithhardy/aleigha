"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Client, Property, Settings } from "@prisma/client";
import { Check, ChevronsUpDown, ExternalLink, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormBar } from "@/app/(dashboard)/certificates/components/form-bar";
import { UnsavedChangesDialog } from "@/app/(dashboard)/certificates/components/unsaved-changes-dialog";
import {
  DialogSheet,
  DialogSheetContent,
  DialogSheetTitle,
  DialogSheetTrigger,
} from "@/components/dialog-sheet";
import { Header, HeaderGroup, HeaderTitle } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardFooter,
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import { updateContractorClientAndInstallation } from "./action";
import { UpdateContractorClientAndInstallationSchema } from "./schema";
import { sections } from "../components/sections";

export function UpdateContractorClientAndInstallationForm({
  certificate,
  clients,
  settings,
}: {
  certificate: z.infer<typeof UpdateContractorClientAndInstallationSchema>;
  clients: (Client & {
    address: Address;
    property: (Property & { address: Address })[];
  })[];
  settings?: (Settings & { address?: Address | null }) | null;
}) {
  const { toast } = useToast();

  const [selectClientOpen, setSelectClientOpen] = useState(false);
  const [selectPropertyOpen, setSelectPropertyOpen] = useState(false);

  const form = useForm<
    z.infer<typeof UpdateContractorClientAndInstallationSchema>
  >({
    resolver: zodResolver(UpdateContractorClientAndInstallationSchema),
    defaultValues: {
      id: certificate.id,
      clientId: certificate.clientId,
      propertyId: certificate.propertyId,
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col"
      >
        <div className="container mx-auto p-6">
          <Header>
            <HeaderGroup>
              <Link
                href={"/certificates"}
                className="inline-flex items-center text-sm font-semibold"
              >
                <MoveLeft size={22} className="mr-2" />
                <span>Back to Certificates</span>
              </Link>
              <HeaderTitle>
                Details of the Contractor, Client and Installation
              </HeaderTitle>
            </HeaderGroup>
          </Header>
          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Contractor</CardTitle>
                  <CardDescription className="text-balance">
                    Your company details will be shown here and included on the
                    certificate to identify the contractor conducting the
                    report.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <Input
                    value={settings?.name ?? ""}
                    readOnly
                    placeholder="Street address"
                  />
                  <Input
                    value={settings?.address?.streetAddress ?? ""}
                    readOnly
                    placeholder="Street address"
                  />
                  <Input
                    value={settings?.address?.city ?? ""}
                    readOnly
                    placeholder="City"
                  />
                  <Input
                    value={settings?.address?.county ?? ""}
                    readOnly
                    placeholder="County"
                  />
                  <Input
                    value={settings?.address?.postTown ?? ""}
                    readOnly
                    placeholder="Post town"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={settings?.address?.postCode ?? ""}
                      readOnly
                      placeholder="Post code"
                    />
                    <Input
                      value={settings?.address?.country ?? ""}
                      readOnly
                      placeholder="Country"
                    />
                  </div>
                </CardContent>
              </div>
              <CardFooter className="justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-balance text-sm text-muted-foreground">
                  To update the contractor, visit{" "}
                  <Link
                    href={"/settings"}
                    className="inline-flex items-center space-x-1 text-blue-500"
                  >
                    <span>Settings</span>
                    <ExternalLink size={14} />
                  </Link>
                  .
                </p>
              </CardFooter>
            </Card>
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Client</CardTitle>
                  <CardDescription className="text-balance">
                    Select the client for whom you are conducting this report.
                    Their details will be included on the certificate.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => {
                      const selectedClient = clients.find(
                        (client) => client.id === field.value,
                      );

                      return (
                        <>
                          <FormItem>
                            <DialogSheet
                              open={selectClientOpen}
                              onOpenChange={setSelectClientOpen}
                            >
                              <DialogSheetTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-between"
                                >
                                  {selectedClient
                                    ? selectedClient.name
                                    : "Select client..."}
                                  <ChevronsUpDown />
                                </Button>
                              </DialogSheetTrigger>
                              <DialogSheetContent className="p-0">
                                <DialogSheetTitle className="hidden" />
                                <Command className="pt-2">
                                  <CommandInput placeholder="Search..." />
                                  <CommandList className="scrollbar-hidden mt-1 border-t p-1">
                                    <CommandEmpty>
                                      No results found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {clients.map((client) => (
                                        <CommandItem
                                          key={client.id}
                                          value={client.name}
                                          onSelect={() => {
                                            form.setValue(
                                              "clientId",
                                              client.id,
                                            );
                                            form.setValue("propertyId", "");
                                            setSelectClientOpen(false);
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
                          <Input
                            value={selectedClient!.address.streetAddress ?? ""}
                            readOnly
                            placeholder="Street address"
                          />
                          <Input
                            value={selectedClient?.address?.city ?? ""}
                            readOnly
                            placeholder="City"
                          />
                          <Input
                            value={selectedClient?.address?.county ?? ""}
                            readOnly
                            placeholder="County"
                          />
                          <Input
                            value={selectedClient?.address?.postTown ?? ""}
                            readOnly
                            placeholder="Post town"
                          />
                          <div className="flex gap-2">
                            <Input
                              value={selectedClient?.address?.postCode ?? ""}
                              readOnly
                              placeholder="Post code"
                            />
                            <Input
                              value={selectedClient?.address?.country ?? ""}
                              readOnly
                              placeholder="Country"
                            />
                          </div>
                        </>
                      );
                    }}
                  />
                </CardContent>
              </div>
              <CardFooter className="justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-balance text-sm text-muted-foreground">
                  To add a new client, visit{" "}
                  <Link
                    href={"/clients"}
                    className="inline-flex items-center space-x-1 text-blue-500"
                  >
                    <span>Clients</span>
                    <ExternalLink size={14} />
                  </Link>
                  .
                </p>
              </CardFooter>
            </Card>
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Installation</CardTitle>
                  <CardDescription className="text-balance">
                    Choose the installation for this report. This property will
                    be the subject of the report.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="propertyId"
                    render={({ field }) => {
                      const selectedClient = clients.find(
                        (client) => client.id === form.watch("clientId"),
                      );
                      const selectedProperty = selectedClient?.property.find(
                        (property) => property.id === field.value,
                      );
                      return (
                        <>
                          <FormItem>
                            <DialogSheet
                              open={selectPropertyOpen}
                              onOpenChange={setSelectPropertyOpen}
                            >
                              <DialogSheetTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-between"
                                >
                                  {selectedProperty
                                    ? selectedProperty.address.streetAddress
                                    : "Select property..."}
                                  <ChevronsUpDown />
                                </Button>
                              </DialogSheetTrigger>
                              <DialogSheetContent className="p-0">
                                <DialogSheetTitle className="hidden" />
                                <Command className="pt-2">
                                  <CommandInput placeholder="Search..." />
                                  <CommandList className="scrollbar-hidden mt-1 border-t p-1">
                                    <CommandEmpty>
                                      No results found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {selectedClient?.property.map(
                                        (property) => (
                                          <CommandItem
                                            key={property.id}
                                            value={
                                              property.address.streetAddress!
                                            }
                                            onSelect={() => {
                                              form.setValue(
                                                "propertyId",
                                                property.id,
                                                { shouldDirty: true },
                                              );
                                              setSelectPropertyOpen(false);
                                            }}
                                          >
                                            {property.address.streetAddress}
                                            {property.id === field.value ? (
                                              <Check className="ml-auto" />
                                            ) : null}
                                          </CommandItem>
                                        ),
                                      )}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </DialogSheetContent>
                            </DialogSheet>
                            <FormMessage />
                          </FormItem>
                          <Input
                            value={selectedProperty?.address?.city ?? ""}
                            readOnly
                            placeholder="City"
                          />
                          <Input
                            value={selectedProperty?.address?.county ?? ""}
                            readOnly
                            placeholder="County"
                          />
                          <Input
                            value={selectedProperty?.address?.postTown ?? ""}
                            readOnly
                            placeholder="Post town"
                          />
                          <div className="flex gap-2">
                            <Input
                              value={selectedProperty?.address?.postCode ?? ""}
                              readOnly
                              placeholder="Post code"
                            />
                            <Input
                              value={selectedProperty?.address?.country ?? ""}
                              readOnly
                              placeholder="Country"
                            />
                          </div>
                        </>
                      );
                    }}
                  />
                </CardContent>
              </div>
              <CardFooter className="justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-balance text-sm text-muted-foreground">
                  To add a new property, visit{" "}
                  <Link
                    href={"/properties"}
                    className="inline-flex items-center space-x-1 text-blue-500"
                  >
                    <span>Properties</span>
                    <ExternalLink size={14} />
                  </Link>
                  .
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
        <FormBar
          form={form}
          sections={sections}
          baseUrl={"/certificates/eicr"}
        />
        <UnsavedChangesDialog
          condition={form.formState.isDirty}
          action={form.handleSubmit(onSubmit)}
        />
      </form>
    </Form>
  );
}
