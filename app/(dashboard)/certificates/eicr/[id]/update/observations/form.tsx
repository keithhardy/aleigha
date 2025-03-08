"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { observations } from "./observations";
import { Schema } from "./schema";

export function ObservationsForm() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      observations: [],
    },
  });

  const [selectedObservationOpen, setSelectedObservationOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "observations",
  });

  const [selectedObservation, setSelectedObservation] = useState<string>("");

  const handleobservationselect = (value: string) => {
    const observation = observations.find((obs) => obs.id === parseInt(value));
    if (observation) {
      append({
        itemNumber: observation.itemNumber,
        description: observation.description,
        code: observation.code,
        location: observation.location,
      });
      setSelectedObservation("");
    }
  };

  const addObservation = () => {
    append({
      itemNumber: "",
      description: "",
      code: "",
      location: "",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data: z.infer<typeof Schema>) => console.log(data))}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Observations</CardTitle>
            <CardDescription className="text-primary">Select predefined observations or add custom details about the condition of the installation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormItem>
              <FormLabel>Select Predefined Observation</FormLabel>
              <Popover open={selectedObservationOpen} onOpenChange={setSelectedObservationOpen}>
                <div className="flex space-y-4 lg:space-x-4 lg:space-y-0 flex-col lg:flex-row">
                  <PopoverTrigger asChild className="w-full">
                    <Button variant="outline" role="combobox" aria-expanded={selectedObservationOpen ? "true" : "false"} className="flex justify-between items-center">
                      <span>{selectedObservation ? `${selectedObservation}: ${observations.find((obs) => obs.id.toString() === selectedObservation)?.description}` : "Select an observation"}</span>
                      <ChevronsUpDown className="opacity-50 ml-2" />
                    </Button>
                  </PopoverTrigger>
                  <Button type="button" onClick={addObservation}>
                    Add Observation
                  </Button>
                </div>
                <PopoverContent className="p-0 min-w-[375px]">
                  <Command>
                    <CommandInput placeholder="Search observation..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No observation found.</CommandEmpty>
                      <CommandGroup>
                        {observations.map((observation) => (
                          <CommandItem
                            key={observation.id}
                            value={observation.id.toString()}
                            onSelect={(currentValue) => {
                              setSelectedObservation(currentValue);
                              handleobservationselect(currentValue);
                              setSelectedObservationOpen(false);
                            }}
                          >
                            {`${observation.itemNumber}: ${observation.description}`}
                            {observation.id.toString() === selectedObservation ? <Check className="ml-auto" /> : null}
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
                <FormLabel>Item Number</FormLabel>
                <FormLabel className="col-span-4">Description</FormLabel>
                <FormLabel>Code</FormLabel>
                <FormLabel className="col-span-2">Location</FormLabel>
              </div>
            )}
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-9 items-end gap-2">
                <FormField
                  control={form.control}
                  name={`observations.${index}.itemNumber`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="4.19" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`observations.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="col-span-4">
                      <FormControl>
                        <Input placeholder="SPDs not provided for protection against transient overvoltage." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`observations.${index}.code`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="C3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`observations.${index}.location`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormControl>
                        <Input placeholder="Consumer Unit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" onClick={() => remove(index)} className="ml-2">
                  Delete
                </Button>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">Review the details of the observations and add any missing information.</p>
            <Button variant="outline" type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
