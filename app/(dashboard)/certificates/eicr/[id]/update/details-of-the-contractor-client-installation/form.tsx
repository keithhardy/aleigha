"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Client, Property, Settings } from "@prisma/client";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isDirty, z } from "zod";

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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

import { updateContractorClientAndInstallation } from "./action";
import { UpdateContractorClientAndInstallationSchema } from "./schema";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

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

  const isMobile = useIsMobile();

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

  const [clientDialogOpen, setClientDialogOpen] = useState(false);
  const [clientSheetOpen, setClientSheetOpen] = useState(false);

  const handleClientOpenChange = (isOpen: boolean) => {
    setClientSheetOpen(isOpen);

    if (!isOpen) {
      setKeyboardVisible(false);
    }
  };

  const selectedProperty = selectedClient?.property.find(
    (property) => property.id === form.getValues("propertyId"),
  );

  const [propertyDialogOpen, setPropertyDialogOpen] = useState(false);
  const [propertySheetOpen, setPropertySheetOpen] = useState(false);

  const handlePropertyOpenChange = (isOpen: boolean) => {
    setPropertySheetOpen(isOpen);

    if (!isOpen) {
      setKeyboardVisible(false);
    }
  };

  const [navigationDialogOpen, setNavigationDialogOpen] = useState(false);
  const [navigationSheetOpen, setNavigationSheetOpen] = useState(false);

  const handleNavigationOpenChange = (isOpen: boolean) => {
    setNavigationSheetOpen(isOpen);

    if (!isOpen) {
      setKeyboardVisible(false);
    }
  };

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [nextUrl, setNextUrl] = useState("");

  useEffect(() => {
    const originalPush = router.push;

    router.push = (url: string) => {
      if (form.formState.isDirty) {
        setOpen(true)
        setNextUrl(url)
        return;
      } else {
        originalPush.call(router, url);
      }
    };

    return () => {
      router.push = originalPush;
    };
  }, [form.formState.isDirty, router]);

  return (
    <>
      <div className="container mx-auto max-w-screen-lg p-6">
        <Header className="px-6 lg:px-0">
          <HeaderGroup>
            <Heading>Contractor, Client and Installation</Heading>
            <HeaderDescription>
              View the contractor and select the client and installation for
              this EICR report.
            </HeaderDescription>
          </HeaderGroup>
        </Header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                              <SheetContent
                                side={keyboardVisible ? "top" : "bottom"}
                              >
                                <DialogTitle />
                                <Command>
                                  <CommandInput placeholder="Search client..." />
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
                  </div>
                </div>
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
                              <SheetContent
                                side={keyboardVisible ? "top" : "bottom"}
                              >
                                <DialogTitle />
                                <Command>
                                  <CommandInput placeholder="Search property..." />
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
                                              setPropertySheetOpen(false);
                                              setKeyboardVisible(false);
                                            }}
                                          >
                                            {property.address.streetAddress}
                                          </CommandItem>
                                        ),
                                      )}
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
                                              setPropertyDialogOpen(false);
                                            }}
                                          >
                                            {property.address.streetAddress}
                                          </CommandItem>
                                        ),
                                      )}
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
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end space-x-4 rounded-b-md border-t bg-muted py-4">
                <Button
                  variant="outline"
                  onClick={(event) => {
                    event.preventDefault();
                    form.reset();
                  }}
                  disabled={!form.formState.isDirty}
                >
                  Cancel
                </Button>
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
          Prev
        </Button>
        {isMobile ? (
          <Sheet
            open={navigationSheetOpen}
            onOpenChange={handleNavigationOpenChange}
          >
            <SheetTrigger asChild>
              <Button variant="outline">Sections</Button>
            </SheetTrigger>
            <SheetContent side={keyboardVisible ? "top" : "bottom"}>
              <DialogTitle />
              <Command>
                <CommandInput placeholder="Search ..." />
                <CommandList className="scrollbar-hidden">
                  <CommandEmpty>No found.</CommandEmpty>
                  <CommandGroup>
                    {pages.map((page, index) => (
                      <CommandItem
                        key={index}
                        value={page.title}
                        onSelect={() => {
                          setNavigationSheetOpen(false);
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
            </SheetContent>
          </Sheet>
        ) : (
          <Dialog
            open={navigationDialogOpen}
            onOpenChange={setNavigationDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">Sections</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle />
              <Command>
                <CommandInput placeholder="Search ..." />
                <CommandList className="scrollbar-hidden">
                  <CommandEmpty>No found.</CommandEmpty>
                  <CommandGroup>
                    {pages.map((page, index) => (
                      <CommandItem
                        key={index}
                        value={page.title}
                        onSelect={() => {
                          setNavigationDialogOpen(false);
                          setKeyboardVisible(false);
                          router.push(
                            `/certificates/eicr/${certificate.id}/update${page.url}`,
                          );
                        }}
                      >
                        <p className="truncate">{page.title}</p>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DialogContent>
          </Dialog>
        )}
        <Link
          href={`/certificates/eicr/${certificate.id}/update/purpose-of-the-report`}
        >
          <Button variant="outline">Next</Button>
        </Link>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave without saving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { setOpen(false); setNextUrl("") }}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                form.handleSubmit(onSubmit)();
                setOpen(false);
              }}
            >
              Save and leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
