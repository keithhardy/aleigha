"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

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
import { useToast } from "@/hooks/use-toast";

import { updateScheduleOfRates } from "./action";
import { rates } from "./rates";
import { UpdateScheduleOfRatesSchema } from "./schema";

export function UpdateScheduleOfRatesForm({
  electricalInstallationConditionReport,
}: {
  electricalInstallationConditionReport: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateScheduleOfRatesSchema>>({
    resolver: zodResolver(UpdateScheduleOfRatesSchema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      rates:
        JSON.parse(electricalInstallationConditionReport.rates as string) || [],
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

  const addRate = () => {
    append({
      name: "",
      description: "",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container mx-auto max-w-screen-md"
      >
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Schedule of rates</CardTitle>
            <CardDescription>
              Select predefined rates and input quantities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormItem>
              <FormLabel>Select Rate</FormLabel>
              <Popover
                open={selectedRateOpen}
                onOpenChange={setSelectedRateOpen}
              >
                <PopoverTrigger asChild className="w-full">
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={selectedRateOpen}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {selectedRate
                        ? `${selectedRate}: ${rates.find((rate) => rate.id.toString() === selectedRate)?.name}`
                        : "Select a rate"}
                    </span>
                    <ChevronsUpDown className="opacity-50 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 min-w-[375px]">
                  <Command>
                    <CommandInput
                      placeholder="Search rates..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No rate found.</CommandEmpty>
                      <CommandGroup>
                        {rates.map((rate) => (
                          <CommandItem
                            key={rate.id}
                            value={rate.id.toString()}
                            onSelect={(currentValue) => {
                              setSelectedRate(currentValue);
                              handleRateSelect(currentValue);
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
            {fields.length > 0 && (
              <div className="grid grid-cols-9 gap-2">
                <FormLabel className="col-span-4">Rate Name</FormLabel>
                <FormLabel className="col-span-4">Description</FormLabel>
              </div>
            )}
            {fields.map((rate, index) => (
              <div key={index} className="grid grid-cols-9 items-end gap-2">
                <span className="col-span-4">{rate.name}</span>
                <FormField
                  control={form.control}
                  name={`rates.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="col-span-4">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="ml-2"
                >
                  Delete
                </Button>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">
              Review the selected rates and update descriptions as needed.
            </p>
            <Button
              variant="outline"
              type="submit"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
