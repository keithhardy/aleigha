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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { updateObservations } from "./action";
import { observations } from "./observations";
import { UpdateObservationsSchema } from "./schema";

export function UpdateObservationsForm({
  electricalInstallationConditionReport,
}: {
  electricalInstallationConditionReport: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateObservationsSchema>>({
    resolver: zodResolver(UpdateObservationsSchema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      observations:
        JSON.parse(
          electricalInstallationConditionReport.observations as string,
        ) || [],
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateObservationsSchema>) => {
    const response = await updateObservations(data);

    if (response.status === "success") {
      form.reset(data);
    }

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });
  };

  const [selectedObservationOpen, setSelectedObservationOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "observations",
  });

  const [selectedObservation, setSelectedObservation] = useState("");

  const handleObservationSelect = (value: string) => {
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container mx-auto max-w-screen-md"
      >
        <Card className="rounded-md shadow-none">
          <CardHeader>
            <CardTitle>Observations</CardTitle>
            <CardDescription className="text-primary">
              Select observations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormItem>
              <Popover
                open={selectedObservationOpen}
                onOpenChange={setSelectedObservationOpen}
              >
                <PopoverTrigger asChild className="w-full">
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={selectedObservationOpen}
                    className="flex items-center justify-between"
                  >
                    <span>
                      {selectedObservation
                        ? `${selectedObservation}: ${observations.find((obs) => obs.id.toString() === selectedObservation)?.description}`
                        : "Select an observation"}
                    </span>
                    <ChevronsUpDown className="ml-2 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="min-w-[375px] p-0">
                  <Command
                    filter={(value, search) => {
                      if (!search) return 1;
                      return value.toLowerCase().includes(search.toLowerCase())
                        ? 1
                        : 0;
                    }}
                  >
                    <CommandInput placeholder="Search observation..." />
                    <CommandList>
                      <CommandEmpty>No observation found.</CommandEmpty>
                      <CommandGroup>
                        {observations.map((observation) => (
                          <CommandItem
                            key={observation.id}
                            value={`${observation.itemNumber} ${observation.description}`}
                            onSelect={() => {
                              setSelectedObservation(observation.id.toString());
                              handleObservationSelect(
                                observation.id.toString(),
                              );
                              setSelectedObservationOpen(false);
                            }}
                          >
                            {`${observation.itemNumber}: ${observation.description}`}
                            {observation.id.toString() ===
                            selectedObservation ? (
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
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2">
                <FormField
                  control={form.control}
                  name={`observations.${index}.itemNumber`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item number</FormLabel>
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
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="SPDs not provided for protection against transient overvoltage."
                          {...field}
                          className="h-[100px]"
                        />
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
                      <FormLabel>Code</FormLabel>
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
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Electrical cupboard" {...field} />
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
          <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
            <p className="text-sm text-muted-foreground">
              Review the details of the observations and add any missing
              information.
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
