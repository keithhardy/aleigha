"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Client } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

import { importProperties } from "./action";
import { ImportPropertiesSchema } from "./schema";

export function ImportPropertiesForm({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const { toast } = useToast();

  const [clientOpen, setClientOpen] = useState(false);

  const form = useForm<z.infer<typeof ImportPropertiesSchema>>({
    resolver: zodResolver(ImportPropertiesSchema),
    defaultValues: {
      client: "",
      file: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof ImportPropertiesSchema>) => {
    const response = await importProperties(data);

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
                <CardTitle>Properties File</CardTitle>
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
                      <DialogSheet
                        open={clientOpen}
                        onOpenChange={setClientOpen}
                      >
                        <DialogSheetTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between"
                          >
                            {field.value
                              ? clients.find(
                                  (client) => client.id === field.value,
                                )?.name
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
                  name="file"
                  render={({
                    field: { onChange, onBlur, name, ref, disabled },
                  }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".csv"
                          className="h-[32px]"
                          name={name}
                          ref={ref}
                          onBlur={onBlur}
                          disabled={disabled}
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                              onChange(file);
                            }
                          }}
                        />
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
