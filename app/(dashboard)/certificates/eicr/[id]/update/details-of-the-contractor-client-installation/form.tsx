"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Client, Property, Settings } from "@prisma/client";
import {
  ArrowLeft,
  ArrowRight,
  ChevronsUpDown,
  ExternalLink,
  List,
  MoveLeft,
  RotateCcw,
  Save,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Header, HeaderGroup, Heading } from "@/components/page-header";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import {
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
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ActionConfirmationDialog } from "@/components/unsaved-changes-dialog";
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

  const router = useRouter();

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

  const selectedClient = clients.find(
    (client) => client.id === form.watch("clientId"),
  );

  const selectedProperty = selectedClient?.property.find(
    (property) => property.id === form.watch("propertyId"),
  );

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
    <>
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
                <CardContent className="space-y-6 p-6">
                  <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="w-full space-y-2">
                      <CardTitle>Contractor</CardTitle>
                      <CardDescription>
                        Your company details will be shown here and included on
                        the certificate to identify the contractor conducting
                        the report.
                      </CardDescription>
                    </div>
                    <div className="w-full space-y-2">
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
                      <div className="flex space-x-2">
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
                    </div>
                  </div>
                </CardContent>
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
                <CardContent className="space-y-6 p-6">
                  <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="w-full space-y-2">
                      <CardTitle>Client</CardTitle>
                      <CardDescription>
                        Select the client for whom you are conducting this
                        report. Their details will be included on the
                        certificate.
                      </CardDescription>
                    </div>
                    <div className="w-full space-y-2">
                      <FormField
                        control={form.control}
                        name="clientId"
                        render={() => (
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
                        )}
                      />
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
                      <div className="flex space-x-2">
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
                    </div>
                  </div>
                </CardContent>
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
                <CardContent className="space-y-6 p-6">
                  <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="w-full space-y-2">
                      <CardTitle>Installation</CardTitle>
                      <CardDescription>
                        Select the installation for this report. Available
                        properties will populate once a client is selected.
                      </CardDescription>
                    </div>
                    <div className="w-full space-y-2">
                      <FormField
                        control={form.control}
                        name="propertyId"
                        render={() => (
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
                        )}
                      />
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
                      <div className="flex space-x-2">
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
                    </div>
                  </div>
                </CardContent>
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

          <div className="sticky bottom-0 border-t bg-background">
            <div className="container mx-auto flex max-w-screen-xl justify-between px-6 py-4">
              <Button variant="outline" size="icon" disabled>
                <ArrowLeft />
              </Button>
              <div className="space-x-2">
                <ResponsiveDialog
                  trigger={
                    <Button variant="outline" size="icon">
                      <List />
                    </Button>
                  }
                  content={(setOpen) => (
                    <Command>
                      <CommandInput placeholder="Search sections..." />
                      <CommandList className="scrollbar-hidden">
                        <CommandEmpty>No found.</CommandEmpty>
                        <CommandGroup>
                          {sections.map((section, index) => (
                            <CommandItem
                              key={index}
                              value={section.title}
                              onSelect={() => {
                                setOpen(false);
                                router.push(
                                  `/certificates/eicr/${certificate.id}/update${section.url}`,
                                );
                              }}
                              className="truncate"
                            >
                              <p className="truncate">{section.title}</p>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  )}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => form.reset()}
                  disabled={
                    !form.formState.isDirty || form.formState.isSubmitting
                  }
                >
                  <RotateCcw />
                </Button>
                <Button
                  type="submit"
                  variant="outline"
                  size="icon"
                  disabled={
                    !form.formState.isDirty || form.formState.isSubmitting
                  }
                >
                  <Save />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => form.reset()}
                >
                  <Send />
                </Button>
              </div>
              <Link
                href={`/certificates/eicr/${certificate.id}/update/purpose-of-the-report`}
              >
                <Button variant="outline" size="icon">
                  <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </Form>

      <ActionConfirmationDialog
        condition={form.formState.isDirty}
        action={form.handleSubmit(onSubmit)}
      />
    </>
  );
}
