"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Client, UserRole } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
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

import { createUserAction } from "./action";
import { Schema } from "./schema";

export default function CreateUserForm({ clients }: { clients: Client[] }) {
  const router = useRouter();

  const { toast } = useToast();

  const [userRoleOpen, setRoleOpen] = useState(false);
  const [userClientOpen, setClientOpen] = useState(false);

  const UserRoles = Object.entries(UserRole).map(([key, value]) => ({
    id: value,
    name: key,
  }));

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "" as UserRole,
      clients: [],
    },
  });

  const { append, remove } = useFieldArray({
    control: form.control,
    name: "clients",
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    const response = await createUserAction(data);

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });

    if (response.status === "success") {
      router.push("/users");
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
              <FormLabel>Role</FormLabel>
              <Popover open={userRoleOpen} onOpenChange={setRoleOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={userRoleOpen ? "true" : "false"}
                    className="max-w-[768px] justify-between"
                  >
                    {field.value
                      ? UserRoles.find(
                        (userRole) => userRole.id === field.value,
                      )?.name
                      : "Select role..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search roles..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No role found.</CommandEmpty>
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
                            {userRole.id === field.value ? (
                              <Check className="ml-auto" />
                            ) : null}
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
        <FormField
          control={form.control}
          name="clients"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Clients</FormLabel>
              <FormControl>
                <Popover open={userClientOpen} onOpenChange={setClientOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="max-w-[768px] justify-between"
                    >
                      {field.value.length === 0
                        ? "Select Clients..."
                        : field.value.length === 1
                          ? field.value[0].name
                          : `${field.value.length} clients selected`}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search client..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No client found.</CommandEmpty>
                        <CommandGroup>
                          {clients.map((client) => {
                            const isSelected = field.value.some(
                              (field) => field.clientId === client.id,
                            );

                            return (
                              <CommandItem
                                key={client.id}
                                onSelect={() => {
                                  if (isSelected) {
                                    const index = field.value.findIndex(
                                      (field) => field.clientId === client.id,
                                    );
                                    remove(index);
                                  } else {
                                    append({
                                      clientId: client.id,
                                      name: client.name,
                                    });
                                  }
                                }}
                              >
                                {client.name}
                                {isSelected ? (
                                  <Check className="ml-auto" />
                                ) : null}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
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
          {form.formState.isSubmitting ? "Creating" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
