"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Client, User, UserRole } from "@prisma/client";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
      auth0Id: user.auth0Id,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormItem className="flex flex-col">
              <FormLabel>Client</FormLabel>
              <Popover open={userRoleOpen} onOpenChange={setRoleOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={userRoleOpen ? "true" : "false"}
                    className="max-w-[1024px] justify-between"
                  >
                    {field.value
                      ? UserRoles.find(
                          (userRole) => userRole.id === field.value,
                        )?.name
                      : "Select role..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {UserRoles.map((userRole) => (
                          <CommandItem
                            key={userRole.id}
                            value={userRole.id}
                            onSelect={(currentValue) => {
                              form.setValue("role", currentValue as UserRole);
                              setRoleOpen(false);
                            }}
                          >
                            {userRole.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                userRole.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="flex flex-col">
          <FormLabel>Clients</FormLabel>
          <Popover open={userClientOpen} onOpenChange={setClientOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="max-w-[1024px] justify-between"
              >
                {clientsToConnect.length === 0 &&
                clientsToDisconnect.length === 0
                  ? user.clients.length === 0
                    ? "Select Clients..."
                    : `${user.clients.length} clients selected`
                  : `${clientsToConnect.length} added, ${clientsToDisconnect.length} removed`}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {clients.map((client) => {
                      const isInDisconnect = clientsToDisconnect.some(
                        (c) => c.clientId === client.id,
                      );
                      const isInConnect = clientsToConnect.some(
                        (c) => c.clientId === client.id,
                      );
                      const filteredCurrentClients = user.clients.filter(
                        (c) => c !== null,
                      );
                      const isInCurrentClients = filteredCurrentClients.some(
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
                                    (field) => field.clientId === client.id,
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
            </PopoverContent>
          </Popover>
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
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          variant="outline"
        >
          {form.formState.isSubmitting ? "Saving" : "Save"}
        </Button>
      </form>
    </Form>
  );
}
