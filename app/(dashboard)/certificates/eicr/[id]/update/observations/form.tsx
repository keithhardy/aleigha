"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { ChevronsUpDown, Ellipsis, ExternalLink, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import FormActions from "@/components/form-actions";
import { Header, HeaderGroup, Heading } from "@/components/page-header";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { ResponsiveDialog as ResponsiveDialogTest } from "@/components/responsive-dialog-test";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "observations",
  });

  const handleObservationSelect = (value: string) => {
    const observation = observations.find((obs) => obs.id === parseInt(value));
    if (observation) {
      append({
        itemNumber: observation.itemNumber,
        description: observation.description,
        photo: "",
        code: observation.code,
        location: observation.location,
        redmedialActionTaken: false,
        descriptionOfActionTaken: "",
        photoOfActionTaken: "",
        codeAfterRemedial: "",
      });
    }
  };

  const [observationDialogOpen, setObservationDialogOpen] = useState(false);
  const [selectedObservation, setSelectedObservation] = useState<any>(null);

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
              <div className="flex flex-col items-center gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Observations</CardTitle>
                  <CardDescription className="text-balance">
                    Select relevant observations from the predefined list.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormItem>
                    <ResponsiveDialog
                      trigger={
                        <Button
                          variant="outline"
                          role="combobox"
                          className="flex w-full items-center justify-between"
                        >
                          Select an observation
                          <ChevronsUpDown className="ml-2 opacity-50" />
                        </Button>
                      }
                      content={(setOpen) => (
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
                                    handleObservationSelect(
                                      observation.id.toString(),
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  {`${observation.itemNumber}: ${observation.description}`}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      )}
                    />
                  </FormItem>
                </CardContent>
              </div>
              <CardContent>
                {fields.length > 0 && (
                  <>
                    <Card className="hidden rounded-md shadow-none md:block">
                      <CardContent className="p-0">
                        <Table className="text-sm">
                          <TableHeader>
                            <TableRow className="h-8">
                              <TableHead className="pl-6">
                                Item Number
                              </TableHead>
                              <TableHead>Code</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead className="pr-6 text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {fields.map((field, index) => (
                              <TableRow key={index}>
                                <TableCell className="pl-6">
                                  {field.itemNumber}
                                </TableCell>
                                <TableCell>{field.code}</TableCell>
                                <TableCell>{field.description}</TableCell>
                                <TableCell className="pr-6 text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <Ellipsis className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onSelect={() => {
                                          setSelectedObservation(fields[index]);
                                          setObservationDialogOpen(true);
                                        }}
                                      >
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onSelect={() => remove(index)}
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    <Card className="rounded-md shadow-none md:hidden">
                      <CardContent className="p-0">
                        <div>
                          {fields.map((field, index) => (
                            <div key={index}>
                              <div className="flex items-start justify-between p-6">
                                <div className="w-full space-y-1.5 text-sm">
                                  <div className="flex items-center justify-between gap-2">
                                    <div>
                                      <span>{field.itemNumber}</span>
                                      <span className="text-muted-foreground">
                                        {" "}
                                        -{" "}
                                      </span>
                                      <span>{field.code}</span>
                                    </div>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="-mt-2"
                                        >
                                          <Ellipsis className="h-4 w-4" />
                                          <span className="sr-only">
                                            Open menu
                                          </span>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                          onSelect={() => {
                                            setSelectedObservation(
                                              fields[index],
                                            );
                                            setObservationDialogOpen(true);
                                          }}
                                        >
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onSelect={() => {
                                            remove(index);
                                          }}
                                        >
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                  <p>{field.description}</p>
                                </div>
                                <div></div>
                              </div>
                              {index !== fields.length - 1 && <Separator />}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-balance text-sm text-muted-foreground">
                  Can`&apos;t find an observation? Add one in{" "}
                  <Link
                    href={"/properties"}
                    className="inline-flex items-center space-x-1 text-blue-500"
                  >
                    <span>Observations</span>
                    <ExternalLink size={14} />
                  </Link>
                  .
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

        <ResponsiveDialogTest
          open={observationDialogOpen}
          onOpenChange={setObservationDialogOpen}
        >
          {selectedObservation && (
            <>
              <ScrollArea className="max-h-[320px] overflow-y-auto overflow-x-hidden">
                <div className="space-y-4 p-6">
                  <FormField
                    control={form.control}
                    name={`observations.${fields.indexOf(selectedObservation)}.itemNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item Number</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`observations.${fields.indexOf(selectedObservation)}.code`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`observations.${fields.indexOf(selectedObservation)}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observation</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[100px]"
                            readOnly
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`observations.${fields.indexOf(selectedObservation)}.location`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`observations.${fields.indexOf(selectedObservation)}.location`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Photo of issue</FormLabel>
                        <FormControl>
                          <Input type="file" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                    <FormField
                      control={form.control}
                      name={`observations.${fields.indexOf(selectedObservation)}.redmedialActionTaken`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between gap-4">
                          <div className="space-y-0.5">
                            <FormLabel>Alterations</FormLabel>
                            <FormDescription>
                              Check if alterations have been made.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch(
                      `observations.${fields.indexOf(selectedObservation)}.redmedialActionTaken`,
                    ) && (
                      <>
                        <FormField
                          control={form.control}
                          name={`observations.${fields.indexOf(selectedObservation)}.descriptionOfActionTaken`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description of action taken</FormLabel>
                              <FormControl>
                                <Textarea
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`observations.${fields.indexOf(selectedObservation)}.photoOfActionTaken`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Photo of completed remedial</FormLabel>
                              <FormControl>
                                <Input type="file" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`observations.${fields.indexOf(selectedObservation)}.codeAfterRemedial`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Code after remedial</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </ResponsiveDialogTest>

        <UnsavedChangesDialog
          condition={form.formState.isDirty}
          action={form.handleSubmit(onSubmit)}
        />
      </form>
    </Form>
  );
}
