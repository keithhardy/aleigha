"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { observations } from "./observations";
import { Schema } from "./schema";

export function ObservationsForm() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      observations: [],
    },
  });

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
        <Card>
          <CardHeader>
            <CardTitle>Observations</CardTitle>
            <CardDescription className="text-primary">Observations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormItem>
              <FormLabel>Select Predefined Observation</FormLabel>
              <Select
                value={selectedObservation}
                onValueChange={(value) => {
                  setSelectedObservation(value);
                  handleobservationselect(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an observation" />
                </SelectTrigger>
                <SelectContent>
                  {observations.map((observation) => (
                    <SelectItem key={observation.id} value={observation.id.toString()}>
                      {`${observation.itemNumber}: ${observation.description}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
            <div className="grid grid-cols-9 gap-2">
              <FormLabel>Item</FormLabel>
              <FormLabel className="col-span-4">Details</FormLabel>
              <FormLabel>Code</FormLabel>
              <FormLabel className="col-span-2">Location</FormLabel>
            </div>
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
            <Button type="button" onClick={addObservation}>
              Add
            </Button>
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">Condition.</p>
            <Button variant="outline" type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
