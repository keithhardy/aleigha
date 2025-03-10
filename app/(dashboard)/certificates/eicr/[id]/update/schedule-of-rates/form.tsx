"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

import { updateScheduleOfRates } from "./action";
import { scheduleOfRates } from "./rates";
import { UpdateScheduleOfRatesSchema } from "./schema";

export function UpdateScheduleOfRatesForm({ electricalInstallationConditionReport }: { electricalInstallationConditionReport: ElectricalInstallationConditionReport }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateScheduleOfRatesSchema>>({
    resolver: zodResolver(UpdateScheduleOfRatesSchema),
    defaultValues: {
      rates: (electricalInstallationConditionReport.rates as Array<any>) || [],
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateScheduleOfRatesSchema>) => {
    const response = await updateScheduleOfRates(data);

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });
  };

  const [selectedRateOpen, setSelectedRateOpen] = useState(false);
  const [selectedRate, setSelectedRate] = useState<string>("");

  const selectedRates = (form.watch("rates") as z.infer<typeof UpdateScheduleOfRatesSchema>["rates"][number][]) || [];

  const handleRateSelect = (value: string) => {
    const rate = scheduleOfRates.find((r) => r.id === parseInt(value));
    if (rate) {
      form.setValue("rates", [...selectedRates, { id: rate.id, name: rate.name, description: rate.description }], { shouldDirty: true });
      setSelectedRate("");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Schedule of rates</CardTitle>
            <CardDescription>Select predefined rates and input quantities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormItem>
              <FormLabel>Select Rate</FormLabel>
              <Popover open={selectedRateOpen} onOpenChange={setSelectedRateOpen}>
                <PopoverTrigger asChild className="w-full">
                  <Button variant="outline" role="combobox" aria-expanded={selectedRateOpen} className="flex justify-between items-center">
                    <span>{selectedRate ? `${selectedRate}: ${scheduleOfRates.find((r) => r.id.toString() === selectedRate)?.name}` : "Select a rate"}</span>
                    <ChevronsUpDown className="opacity-50 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 min-w-[375px]">
                  <Command>
                    <CommandInput placeholder="Search rates..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No rate found.</CommandEmpty>
                      <CommandGroup>
                        {scheduleOfRates.map((rate) => (
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
                            {rate.id.toString() === selectedRate ? <Check className="ml-auto" /> : null}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
            {selectedRates.length > 0 && (
              <div className="grid grid-cols-9 gap-2">
                <FormLabel className="col-span-4">Rate Name</FormLabel>
                <FormLabel className="col-span-4">Description</FormLabel>
              </div>
            )}
            {selectedRates.map((rate, index) => (
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
                  onClick={() =>
                    form.setValue(
                      "rates",
                      selectedRates.filter((_, i) => i !== index),
                      { shouldDirty: true },
                    )
                  }
                >
                  Delete
                </Button>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">Review the selected rates and update descriptions as needed.</p>
            <Button variant="outline" type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
