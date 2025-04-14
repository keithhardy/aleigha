"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Client, UserRole } from "@prisma/client";
import { Check, ChevronsUpDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

import { createUserAction } from "./action";
import { CreateUserSchema } from "./schema";

export default function CreateUserForm({ clients }: { clients: Client[] }) {
  const router = useRouter();

  const { toast } = useToast();

  const [userRoleOpen, setRoleOpen] = useState(false);
  const [userClientOpen, setClientOpen] = useState(false);

  const UserRoles = Object.entries(UserRole).map(([key, value]) => ({
    id: value,
    name: key,
  }));

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "" as UserRole,
      clients: [],
    },
    mode: "onChange",
  });

  const { append, remove } = useFieldArray({
    control: form.control,
    name: "clients",
  });

  const onSubmit = async (data: z.infer<typeof CreateUserSchema>) => {
    const response = await createUserAction(data);

    if (response.status === "success") {
      form.reset(data);
    }

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
                    <FormItem className="flex flex-col">
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
                <FormField
                  control={form.control}
                  name="clients"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Clients</FormLabel>
                      <FormControl>
                        <DialogSheet
                          open={userClientOpen}
                          onOpenChange={setClientOpen}
                        >
                          <DialogSheetTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between"
                            >
                              {field.value.length === 0
                                ? "Select Clients..."
                                : field.value.length === 1
                                  ? field.value[0].name
                                  : `${field.value.length} clients selected`}
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
                                    const isSelected = field.value.some(
                                      (field) => field.clientId === client.id,
                                    );

                                    return (
                                      <CommandItem
                                        key={client.id}
                                        onSelect={() => {
                                          if (isSelected) {
                                            const index = field.value.findIndex(
                                              (field) =>
                                                field.clientId === client.id,
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
                          </DialogSheetContent>
                        </DialogSheet>
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
