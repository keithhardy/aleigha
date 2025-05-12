"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Client, User, UserRole } from "@prisma/client";
import { Check, ChevronsUpDown, ExternalLink, X } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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

import { updateUser } from "./action";
import { UpdateUserSchema } from "./schema";
import { SignatureField } from "../../components/signature-field";

export default function UpdateUserForm({
  user,
  clients,
}: {
  user: User & { clients: Client[] };
  clients: Client[];
}) {
  const { toast } = useToast();

  const [userRoleOpen, setRoleOpen] = useState(false);
  const [userClientOpen, setClientOpen] = useState(false);

  const UserRoles = Object.entries(UserRole).map(([key, value]) => ({
    id: value,
    name: key,
  }));

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      signature: user.signature || "",
      role: user.role || ("" as UserRole),
      clientsToConnect: [],
      clientsToDisconnect: [],
    },
  });

  const {
    append: appendToConnect,
    remove: removeFromConnect,
    fields: clientsToConnect,
  } = useFieldArray({
    control: form.control,
    name: "clientsToConnect",
  });

  const {
    append: appendToDisconnect,
    remove: removeFromDisconnect,
    fields: clientsToDisconnect,
  } = useFieldArray({
    control: form.control,
    name: "clientsToDisconnect",
  });

  const onSubmit = async (data: z.infer<typeof UpdateUserSchema>) => {
    const response = await updateUser(data);

    if (response.status === "success") {
      form.reset(data);
    }

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });

    if (response.status === "success") {
      redirect("/users");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Card className="rounded-md shadow-none">
            <div className="flex flex-col gap-4 p-6 lg:flex-row">
              <CardHeader className="w-full p-0">
                <CardTitle>User Details</CardTitle>
                <CardDescription className="text-balance">
                  Please make sure all values are correct.
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full space-y-4 p-0">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <DialogSheet
                        open={userRoleOpen}
                        onOpenChange={setRoleOpen}
                      >
                        <DialogSheetTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between"
                          >
                            {field.value
                              ? UserRoles.find(
                                  (userRole) => userRole.id === field.value,
                                )?.name
                              : "Select role..."}
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
                                {UserRoles.map((userRole) => (
                                  <CommandItem
                                    key={userRole.id}
                                    value={userRole.id}
                                    onSelect={(currentValue) => {
                                      form.setValue(
                                        "role",
                                        currentValue as UserRole,
                                      );
                                      setRoleOpen(false);
                                    }}
                                  >
                                    {userRole.name}
                                    {userRole.id === field.value ? (
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
                <FormItem>
                  <FormLabel>Clients</FormLabel>
                  <DialogSheet
                    open={userClientOpen}
                    onOpenChange={setClientOpen}
                  >
                    <DialogSheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        {clientsToConnect.length === 0 &&
                        clientsToDisconnect.length === 0
                          ? user.clients.length === 0
                            ? "Select Clients..."
                            : `${user.clients.length} clients selected`
                          : `${clientsToConnect.length} added, ${clientsToDisconnect.length} removed`}
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
                            {clients.map((client) => {
                              const isInDisconnect = clientsToDisconnect.some(
                                (c) => c.clientId === client.id,
                              );
                              const isInConnect = clientsToConnect.some(
                                (c) => c.clientId === client.id,
                              );
                              const filteredCurrentClients =
                                user.clients.filter((c) => c !== null);
                              const isInCurrentClients =
                                filteredCurrentClients.some(
                                  (c) => c.id === client.id,
                                );

                              return (
                                <CommandItem
                                  key={client.id}
                                  onSelect={() => {
                                    if (isInCurrentClients) {
                                      if (isInDisconnect) {
                                        removeFromDisconnect(
                                          clientsToDisconnect.findIndex(
                                            (field) =>
                                              field.clientId === client.id,
                                          ),
                                        );
                                      } else {
                                        appendToDisconnect({
                                          clientId: client.id,
                                          name: client.name,
                                        });
                                      }
                                    } else {
                                      if (isInConnect) {
                                        removeFromConnect(
                                          clientsToConnect.findIndex(
                                            (c) => c.clientId === client.id,
                                          ),
                                        );
                                      } else {
                                        appendToConnect({
                                          clientId: client.id,
                                          name: client.name,
                                        });
                                      }
                                    }
                                  }}
                                >
                                  {client.name}
                                  {(isInCurrentClients && !isInDisconnect) ||
                                  isInConnect ? (
                                    <Check className="ml-auto" />
                                  ) : null}
                                  {isInCurrentClients && isInDisconnect ? (
                                    <X className="ml-auto" />
                                  ) : null}
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </DialogSheetContent>
                  </DialogSheet>
                </FormItem>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="signature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Signature</FormLabel>
                      <FormControl>
                        <SignatureField {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </div>
            <CardFooter className="justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
              <p className="text-balance text-sm text-muted-foreground">
                To add more clients, visit{" "}
                <Link
                  href={"/clients"}
                  className="inline-flex items-center space-x-1 text-blue-500"
                >
                  <span>Clients</span>
                  <ExternalLink size={14} />
                </Link>
                .
              </p>
              <Button
                variant="outline"
                size="sm"
                type="submit"
                disabled={
                  !form.formState.isDirty || form.formState.isSubmitting
                }
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
