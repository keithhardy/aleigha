"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Client, Property, Settings } from "@prisma/client";
import { ArrowLeft, ArrowRight, ChevronsUpDown, Ellipsis, ExternalLink, Link2, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Header,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";
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
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import { updateContractorClientAndInstallation } from "./action";
import { UpdateContractorClientAndInstallationSchema } from "./schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ResponsiveDialog from "@/components/responsive-dialog";

const pages = [
  {
    title: "Details of the contractor, client and installation",
    url: `/details-of-the-contractor-client-installation`,
  },
  {
    title: "Purpose of the report",
    url: `/purpose-of-the-report`,
  },
  {
    title: "Summary of the condition of the installation",
    url: `/summary-of-the-condition-of-the-installation`,
  },
  {
    title: "Declaration",
    url: `/declaration`,
  },
  {
    title: "Observations",
    url: `/observations`,
  },
  {
    title: "Details and limitations of the inspection and testing",
    url: `/details-and-limitations-of-the-inspection-and-testing`,
  },
  {
    title: "Supply characteristics and earthing arrangements",
    url: `/supply-characteristics-and-earthing-arrangements`,
  },
  {
    title: "Particulars of installation reffered to in this Report",
    url: `/particulars-of-installation-reffered-to-in-this-Report`,
  },
  {
    title: "Intake equipment (visual inspection only)",
    url: `/schedule-of-inspections/intake-equipment`,
  },
  {
    title:
      "Presence of adequate arrangements for parallel or switched alternative sources",
    url: `/schedule-of-inspections/presence-of-adequate-arrangements-for-parallel-or-switched-alternative-sources`,
  },
  {
    title: "Methods of protection",
    url: `/schedule-of-inspections/methods-of-Protection`,
  },
  {
    title:
      "Distribution equipment, including consumer units and distribution boards",
    url: `/schedule-of-inspections/distribution-equipment`,
  },
  {
    title: "Distribution circuits",
    url: `/schedule-of-inspections/distribution-Circuits`,
  },
  {
    title: "Final circuits",
    url: `/schedule-of-inspections/final-circuits`,
  },
  {
    title: "Isolation and switching",
    url: `/schedule-of-inspections/isolation-and-switching`,
  },
  {
    title: "Current-using equipment (permanently connected)",
    url: `/schedule-of-inspections/current-using-equipment`,
  },
  {
    title: "Special locations and installations",
    url: `/schedule-of-inspections/special-locations-and-installations`,
  },
  {
    title: "Prosumer’s low voltage installation",
    url: `/schedule-of-inspections/prosumers-low-voltage-installation`,
  },
  {
    title: "Schedule of circuit details and test results",
    url: `/schedule-of-circuit-details-and-test-results`,
  },
  {
    title: "Schedule of rates",
    url: `/schedule-of-rates`,
  },
];

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

  const onSubmit = async (
    data: z.infer<typeof UpdateContractorClientAndInstallationSchema>,
  ) => {
    const response = await updateContractorClientAndInstallation(data);

    if (response.status === "success") {
      form.reset(data);

      setTimeout(() => {
        if (nextUrl) {
          router.push(nextUrl);
        }
      }, 1000);
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

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [clientDialogOpen, setClientDialogOpen] = useState(false);
  const [propertyOpen, setPropertyOpen] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [unsavedChangesOpen, setUnsavedChangesOpen] = useState(false);
  const [nextUrl, setNextUrl] = useState("");

  const originalPush = useRef(router.push);

  useEffect(() => {
    originalPush.current = router.push;

    router.push = (url: string) => {
      if (form.formState.isDirty) {
        setUnsavedChangesOpen(true);
        setNextUrl(url);
        return;
      } else {
        originalPush.current.call(router, url);
      }
    };

    return () => {
      router.push = originalPush.current;
    };
  }, [form.formState.isDirty, router]);

  return (
    <>
      <div className="container mx-auto max-w-screen-lg p-6">
        <Header>
          <HeaderGroup>
            <Link
              href={"/certificates"}
              className="inline-flex items-center text-sm font-semibold"
            >
              <MoveLeft size={22} className="mr-2" />
              <span>Back to Certificates</span>
            </Link>
            <Heading>Contractor, Client and Installation</Heading>
            <HeaderDescription>
              View the contractor and select the client and installation for
              this EICR report.
            </HeaderDescription>
          </HeaderGroup>
        </Header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Card className="rounded-md shadow-none">
              <CardContent className="space-y-6 p-6">
                <div className="flex flex-col gap-4 lg:flex-row">
                  <div className="w-full">
                    <CardTitle>Contractor</CardTitle>
                    <CardDescription>
                      View the contractor details associated with this EICR
                      report.
                    </CardDescription>
                  </div>
                  <div className="w-full space-y-2">
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
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-sm text-muted-foreground text-balance">
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
                  <div className="w-full">
                    <CardTitle>Client</CardTitle>
                    <CardDescription>
                      Select the client for this EICR report.
                    </CardDescription>
                  </div>
                  <div className="w-full space-y-2">
                    <FormField
                      control={form.control}
                      name="clientId"
                      render={() => (
                        <FormItem>
                          <ResponsiveDialog
                            sheetOpen={clientDialogOpen}
                            setSheetOpen={setClientDialogOpen}
                            keyboardVisible={keyboardVisible}
                            setKeyboardVisible={setKeyboardVisible}
                            triggerButton={
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
                          >
                            <Command>
                              <CommandInput placeholder="Search clients..." />
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
                          </ResponsiveDialog>
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
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-sm text-muted-foreground text-balance">
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
                  <div className="w-full">
                    <CardTitle>Installation</CardTitle>
                    <CardDescription>
                      Select the installation for this EICR report.
                    </CardDescription>
                  </div>
                  <div className="w-full space-y-2">
                    <FormField
                      control={form.control}
                      name="propertyId"
                      render={() => (
                        <FormItem>
                          <ResponsiveDialog
                            sheetOpen={propertyOpen}
                            setSheetOpen={setPropertyOpen}
                            keyboardVisible={keyboardVisible}
                            setKeyboardVisible={setKeyboardVisible}
                            triggerButton={
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
                          >
                            <Command>
                              <CommandInput placeholder="Search properties..." />
                              <CommandList className="scrollbar-hidden">
                                <CommandEmpty>No property found.</CommandEmpty>
                                <CommandGroup>
                                  {selectedClient?.property.map((property) => (
                                    <CommandItem
                                      key={property.id}
                                      value={property.address.streetAddress!}
                                      onSelect={() => {
                                        form.setValue(
                                          "propertyId",
                                          property.id,
                                          { shouldDirty: true },
                                        );
                                        setPropertyOpen(false);
                                        setKeyboardVisible(false);
                                      }}
                                    >
                                      {property.address.streetAddress}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </ResponsiveDialog>
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
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-sm text-muted-foreground text-balance">
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
                <Button
                  variant="outline"
                  type="submit"
                  disabled={
                    !form.formState.isDirty || form.formState.isSubmitting
                  }
                >
                  {form.formState.isSubmitting ? "Saving..." : "Save"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>

      <div className="sticky bottom-0 flex w-full items-center justify-between border-t bg-background px-6 py-4">
        <Button variant="outline" disabled>
          <ArrowLeft />Prev
        </Button>
        <ResponsiveDialog
          sheetOpen={navigationOpen}
          setSheetOpen={setNavigationOpen}
          keyboardVisible={keyboardVisible}
          setKeyboardVisible={setKeyboardVisible}
          triggerButton={<Button variant="outline"><Ellipsis /></Button>}
        >
          <Command>
            <CommandInput placeholder="Search sections..." />
            <CommandList className="scrollbar-hidden">
              <CommandEmpty>No found.</CommandEmpty>
              <CommandGroup>
                {pages.map((page, index) => (
                  <CommandItem
                    key={index}
                    value={page.title}
                    onSelect={() => {
                      setNavigationOpen(false);
                      setKeyboardVisible(false);
                      router.push(
                        `/certificates/eicr/${certificate.id}/update${page.url}`,
                      );
                    }}
                    className="truncate"
                  >
                    <p className="truncate">{page.title}</p>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </ResponsiveDialog>
        <Link
          href={`/certificates/eicr/${certificate.id}/update/purpose-of-the-report`}
        >
          <Button variant="outline">Next<ArrowRight /></Button>
        </Link>
      </div>

      <AlertDialog
        open={unsavedChangesOpen}
        onOpenChange={setUnsavedChangesOpen}
      >
        <AlertDialogContent className="w-[90%]">
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Leave without saving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setUnsavedChangesOpen(false);
                setNextUrl("");
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setUnsavedChangesOpen(false);
                if (nextUrl) originalPush.current.call(router, nextUrl);
              }}
              className="mt-2 sm:mt-0"
            >
              Continue
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => {
                form.handleSubmit(onSubmit)();
                setUnsavedChangesOpen(false);
              }}
            >
              Save then continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
