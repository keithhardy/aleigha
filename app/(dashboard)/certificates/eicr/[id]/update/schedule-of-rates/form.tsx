"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { Check, ChevronsUpDown, Ellipsis, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import {
  DialogSheet,
  DialogSheetContent,
  DialogSheetTitle,
  DialogSheetTrigger,
} from "@/components/dialog-sheet";
import { FormBar } from "@/components/form-bar";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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

  const [selectedRate, setSelectedRate] = useState<number | null>(null);
  const [selectRateOpen, setSelectRateOpen] = useState(false);
  const [editRateOpen, setEditRateOpen] = useState(false);

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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rates",
  });

  const handleRateSelect = (value: string) => {
    const rate = rates.find((rate) => rate.id === parseInt(value));
    if (rate) {
      append({
        name: rate.name,
        description: rate.description,
      });
      setSelectedRate(null);
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
              <div className="flex flex-col items-center gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Schedule of rates</CardTitle>
                  <CardDescription className="text-balance">
                    Select predefined rates and input quantities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormItem>
                    <DialogSheet
                      open={selectRateOpen}
                      onOpenChange={setSelectRateOpen}
                    >
                      <DialogSheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          Select a rate
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
                              {rates.map((rate) => (
                                <CommandItem
                                  key={rate.id}
                                  value={rate.name}
                                  onSelect={() => {
                                    handleRateSelect(rate.id.toString());
                                    setSelectRateOpen(false);
                                  }}
                                >
                                  {rate.name}
                                  {rate.id === selectedRate ? (
                                    <Check className="ml-auto" />
                                  ) : null}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </DialogSheetContent>
                    </DialogSheet>
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
                              <TableHead className="pl-6">Name</TableHead>
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
                                  {field.name}
                                </TableCell>
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
                                          setSelectedRate(index);
                                          setEditRateOpen(true);
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
                                      <span>{field.name}</span>
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
                                            setSelectedRate(index);
                                            setEditRateOpen(true);
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
                    <DialogSheet
                      open={editRateOpen}
                      onOpenChange={setEditRateOpen}
                    >
                      <DialogSheetContent className="p-0">
                        <DialogSheetTitle className="hidden" />
                        {selectedRate !== null && (
                          <ScrollArea className="max-h-[320px] overflow-y-auto overflow-x-hidden">
                            <div className="space-y-4 p-6">
                              <FormField
                                control={form.control}
                                name={`rates.${selectedRate}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} readOnly />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`rates.${selectedRate}.description`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        {...field}
                                        className="min-h-[100px]"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </ScrollArea>
                        )}
                      </DialogSheetContent>
                    </DialogSheet>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-balance text-sm text-muted-foreground">
                  Review the selected rates and update descriptions as needed.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
        <FormBar
          form={form}
          sections={sections}
          baseUrl={"/certificates/eicr"}
        />
        <UnsavedChangesDialog
          condition={form.formState.isDirty}
          action={form.handleSubmit(onSubmit)}
        />
      </form>
    </Form>
  );
}
