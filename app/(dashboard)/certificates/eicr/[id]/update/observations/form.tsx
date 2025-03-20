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
import { Textarea } from "@/components/ui/textarea";
import { UnsavedChangesDialog } from "@/components/unsaved-changes-dialog";
import { useToast } from "@/hooks/use-toast";

import { updateObservations } from "./action";
import { observations } from "./observations";
import { UpdateObservationsSchema } from "./schema";
import { sections } from "../components/sections";

export function UpdateObservationsForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateObservationsSchema>>({
    resolver: zodResolver(UpdateObservationsSchema),
    defaultValues: {
      id: certificate.id,
      observations: JSON.parse(certificate.observations as string) || [],
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
              <Heading>Observations</Heading>
            </HeaderGroup>
          </Header>

          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Observations</CardTitle>
                  <CardDescription>Select observations.</CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
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
                            return value
                              .toLowerCase()
                              .includes(search.toLowerCase())
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
                                    setSelectedObservation(
                                      observation.id.toString(),
                                    );
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
                              <Input
                                placeholder="Electrical cupboard"
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
                  Review the details of the observations and add any missing
                  information.
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
