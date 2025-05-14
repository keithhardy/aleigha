"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Client, Property } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updateProperty } from "@/app/(dashboard)/properties/[id]/update/action";
import { UpdatePropertySchema } from "@/app/(dashboard)/properties/[id]/update/schema";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function UpdatePropertyForm({
  property,
  clients,
}: {
  property: Property & { address: Address | null };
  clients: Client[];
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [clientOpen, setClientOpen] = useState(false);

  const form = useForm<z.infer<typeof UpdatePropertySchema>>({
    resolver: zodResolver(UpdatePropertySchema),
    defaultValues: {
      id: property.id,
      uprn: property.uprn,
      occupier: property.occupier,
      client: property.clientId,
      address: {
        city: property.address?.city || "",
        county: property.address?.county || "",
        postTown: property.address?.postTown || "",
        postCode: property.address?.postCode || "",
        streetAddress: property.address?.streetAddress || "",
        country: property.address?.country || "",
      },
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdatePropertySchema>) => {
    const response = await updateProperty(data);

    if (response.status === "success") {
      form.reset(data);
    }

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });

    if (response.status === "success") {
      router.push("/properties");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Card className="rounded-md shadow-none">
            <div className="flex flex-col gap-4 p-6 lg:flex-row">
              <CardHeader className="w-full p-0">
                <CardTitle>Property Details</CardTitle>
                <CardDescription className="text-balance">
                  Please make sure all values are correct.
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full space-y-4 p-0">
                <FormField
                  control={form.control}
                  name="client"
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
                                      form.setValue("client", currentValue);
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
                  name="uprn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UPRN</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="occupier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupier</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.streetAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.county"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>County</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.postTown"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post Town</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.postCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postcode</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
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
