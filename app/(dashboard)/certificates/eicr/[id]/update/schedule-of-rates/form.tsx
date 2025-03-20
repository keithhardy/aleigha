"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { Check, ChevronsUpDown, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import FormActions from "@/components/form-actions";
import { Header, HeaderGroup, Heading } from "@/components/page-header";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UnsavedChangesDialog } from "@/components/unsaved-changes-dialog";
import { useToast } from "@/hooks/use-toast";

import { updateScheduleOfRates } from "./action";
import { rates } from "./rates";
import { UpdateScheduleOfRatesSchema } from "./schema";
import { sections } from "../components/sections";

export function UpdateScheduleOfRatesForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateScheduleOfRatesSchema>>({
    resolver: zodResolver(UpdateScheduleOfRatesSchema),
    defaultValues: {
      id: certificate.id,
      rates: JSON.parse(certificate.rates as string) || [],
    },
  });

  const onSubmit = async (
    data: z.infer<typeof UpdateScheduleOfRatesSchema>,
  ) => {
    const response = await updateScheduleOfRates(data);

    if (response.status === "success") {
      form.reset(data);
    }

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });
  };

  const [selectedRateOpen, setSelectedRateOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rates",
  });

  const [selectedRate, setSelectedRate] = useState("");

  const handleRateSelect = (value: string) => {
    const rate = rates.find((rate) => rate.id === parseInt(value));
    if (rate) {
      append({
        name: rate.name,
        description: rate.description,
      });
      setSelectedRate("");
    }
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
              <Heading>Schedule of rates</Heading>
            </HeaderGroup>
          </Header>

          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Schedule of rates</CardTitle>
                  <CardDescription>
                    Select predefined rates and input quantities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-2 p-0">
                  <FormItem>
                    <FormLabel>Select rate</FormLabel>
                    <Popover
                      open={selectedRateOpen}
                      onOpenChange={setSelectedRateOpen}
                    >
                      <PopoverTrigger asChild className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={selectedRateOpen}
                          className="flex items-center justify-between"
                        >
                          <span>
                            {selectedRate
                              ? `${selectedRate}: ${rates.find((rate) => rate.id.toString() === selectedRate)?.name}`
                              : "Select a rate"}
                          </span>
                          <ChevronsUpDown className="ml-2 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="min-w-[375px] p-0">
                        <Command
                          filter={(value, search) => {
                            if (!search) return 1;
                            return value
                              .toLowerCase()
                              .includes(search.toLowerCase())
                              ? 1
                              : 0;
                          }}
                        >
                          <CommandInput placeholder="Search rates..." />
                          <CommandList>
                            <CommandEmpty>No rate found.</CommandEmpty>
                            <CommandGroup>
                              {rates.map((rate) => (
                                <CommandItem
                                  key={rate.id}
                                  value={rate.name}
                                  onSelect={() => {
                                    setSelectedRate(rate.id.toString());
                                    handleRateSelect(rate.id.toString());
                                    setSelectedRateOpen(false);
                                  }}
                                >
                                  {rate.name}
                                  {rate.id.toString() === selectedRate ? (
                                    <Check className="ml-auto" />
                                  ) : null}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                  {fields.map((rate, index) => (
                    <div key={index} className="space-y-2">
                      <FormField
                        control={form.control}
                        name={`rates.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Find and rectify fault"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`rates.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Located loose r1 on bedroom socket and reterminated"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="button" onClick={() => remove(index)}>
                        Delete
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-sm text-muted-foreground">
                  Review the selected rates and update descriptions as needed.
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
