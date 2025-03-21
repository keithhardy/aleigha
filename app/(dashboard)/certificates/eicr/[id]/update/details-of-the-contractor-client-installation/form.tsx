"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Client, Property, Settings } from "@prisma/client";
import { ChevronsUpDown, ExternalLink, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormActions from "@/components/form-actions";
import { Header, HeaderGroup, Heading } from "@/components/page-header";
import { ResponsiveDialog } from "@/components/responsive-dialog";
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
import { UnsavedChangesDialog } from "@/components/unsaved-changes-dialog";
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
        <div className="container mx-auto max-w-screen-xl flex-grow p-6">
          <Header>
            <HeaderGroup>
              <Link
                href={"/certificates"}
                className="inline-flex items-center text-sm font-semibold"
              >
                <MoveLeft size={22} className="mr-2" />
                <span>Back to Certificates</span>
              </Link>
              <Heading>
                Details of the Contractor, Client and Installation
              </Heading>
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
                    type="text"
                    value={settings?.name ?? ""}
                    readOnly
                    placeholder="Street address"
                  />
                  <Input
                    type="text"
                    value={settings?.address?.streetAddress ?? ""}
                    readOnly
                    placeholder="Street address"
                  />
                  <Input
                    type="text"
                    value={settings?.address?.city ?? ""}
                    readOnly
                    placeholder="City"
                  />
                  <Input
                    type="text"
                    value={settings?.address?.county ?? ""}
                    readOnly
                    placeholder="County"
                  />
                  <Input
                    type="text"
                    value={settings?.address?.postTown ?? ""}
                    readOnly
                    placeholder="Post town"
                  />
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={settings?.address?.postCode ?? ""}
                      readOnly
                      placeholder="Post code"
                    />
                    <Input
                      type="text"
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
                            <ResponsiveDialog
                              trigger={
                                <Button
                                  variant="outline"
                                  className="w-full justify-between"
                                >
                                  {selectedClient
                                    ? selectedClient.name
                                    : "Select client..."}
                                  <ChevronsUpDown className="ml-2 opacity-50" />
                                </Button>
                              }
                              content={(setOpen) => (
                                <Command>
                                  <CommandInput placeholder="Search clients..." />
                                  <CommandList className="scrollbar-hidden">
                                    <CommandEmpty>
                                      No client found.
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
                                            setOpen(false);
                                          }}
                                        >
                                          {client.name}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              )}
                            />
                            <FormMessage />
                          </FormItem>
                          <Input
                            type="text"
                            value={selectedClient!.address.streetAddress ?? ""}
                            readOnly
                            placeholder="Street address"
                          />
                          <Input
                            type="text"
                            value={selectedClient?.address?.city ?? ""}
                            readOnly
                            placeholder="City"
                          />
                          <Input
                            type="text"
                            value={selectedClient?.address?.county ?? ""}
                            readOnly
                            placeholder="County"
                          />
                          <Input
                            type="text"
                            value={selectedClient?.address?.postTown ?? ""}
                            readOnly
                            placeholder="Post town"
                          />
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              value={selectedClient?.address?.postCode ?? ""}
                              readOnly
                              placeholder="Post code"
                            />
                            <Input
                              type="text"
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
                            <ResponsiveDialog
                              trigger={
                                <Button
                                  variant="outline"
                                  className="w-full justify-between"
                                >
                                  {selectedProperty
                                    ? selectedProperty.address.streetAddress
                                    : "Select property..."}
                                  <ChevronsUpDown className="ml-2 opacity-50" />
                                </Button>
                              }
                              content={(setOpen) => (
                                <Command>
                                  <CommandInput placeholder="Search properties..." />
                                  <CommandList className="scrollbar-hidden">
                                    <CommandEmpty>
                                      No property found.
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
                                              setOpen(false);
                                            }}
                                          >
                                            {property.address.streetAddress}
                                          </CommandItem>
                                        ),
                                      )}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              )}
                            />
                            <FormMessage />
                          </FormItem>
                          <Input
                            type="text"
                            value={selectedProperty?.address?.city ?? ""}
                            readOnly
                            placeholder="City"
                          />
                          <Input
                            type="text"
                            value={selectedProperty?.address?.county ?? ""}
                            readOnly
                            placeholder="County"
                          />
                          <Input
                            type="text"
                            value={selectedProperty?.address?.postTown ?? ""}
                            readOnly
                            placeholder="Post town"
                          />
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              value={selectedProperty?.address?.postCode ?? ""}
                              readOnly
                              placeholder="Post code"
                            />
                            <Input
                              type="text"
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

        <FormActions
          form={form}
          sections={sections}
          baseUrl={"/certificates/eicr"}
        />
      </form>

      <UnsavedChangesDialog
        condition={form.formState.isDirty}
        action={form.handleSubmit(onSubmit)}
      />
    </Form>
  );
}
