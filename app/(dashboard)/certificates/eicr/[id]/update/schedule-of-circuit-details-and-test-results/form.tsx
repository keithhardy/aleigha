"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { Check, ChevronsUpDown, Ellipsis, MoveLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UnsavedChangesDialog } from "@/components/unsaved-changes-dialog";
import { useToast } from "@/hooks/use-toast";

import { updateScheduleOfCircuitDetailsAndTestResults } from "./action";
import { UpdateScheduleOfCircuitDetailsAndTestResultsSchema } from "./schema";
import { sections } from "../components/sections";

export function UpdateScheduleOfCircuitDetailsAndTestResultsForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<
    z.infer<typeof UpdateScheduleOfCircuitDetailsAndTestResultsSchema>
  >({
    resolver: zodResolver(UpdateScheduleOfCircuitDetailsAndTestResultsSchema),
    defaultValues: {
      id: certificate.id,
      db: JSON.parse(certificate.db as string) || [],
    },
  });

  const onSubmit = async (
    data: z.infer<typeof UpdateScheduleOfCircuitDetailsAndTestResultsSchema>,
  ) => {
    const response = await updateScheduleOfCircuitDetailsAndTestResults(data);

    if (response.status === "success") {
      form.reset(data);
    }

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });
  };

  //      DDDDD    BBBBB    SSSSS
  //      D    D   B    B   S
  //      D    D   BBBBB    SSSSS
  //      D    D   B    B       S
  //      DDDDD    BBBBB    SSSSS

  const {
    fields: dbs,
    append: appendDB,
    remove: removeDB,
  } = useFieldArray({
    control: form.control,
    name: "db",
  });

  const [selectedDB, setSelectedDB] = useState<number | null>(
    dbs.length > 0 ? 0 : null,
  );

  const addDb = () => {
    appendDB({
      dbDesignation: `New Consumer Unit`,
      circuits: [],
    });
    setSelectedDB(dbs.length);
  };

  const deleteDb = (index: number) => {
    removeDB(index);

    if (dbs.length === 1) {
      setSelectedDB(null);
    } else {
      const previousIndex = index - 1;
      setSelectedDB(previousIndex >= 0 ? previousIndex : 0);
    }
  };

  const [dbDialogOpen, setDBDialogOpen] = useState(false);

  //   CCCCC   III  RRRR   CCCCC  U   U  III  TTTTT  SSSSS
  //  C        I    R   R  C      U   U   I     T    S
  //  C        I    RRRR   C      U   U   I     T    SSSSS
  //  C        I    R  R   C      U   U   I     T        S
  //   CCCCC   III  R   R  CCCCC  UUUUU  III    T    SSSSS

  const {
    fields: circuits,
    append: appendCircuit,
    remove: removeCircuit,
    replace: replaceCircuits,
  } = useFieldArray({
    control: form.control,
    // @ts-expect-error: Ignoring type error due to dynamic field name with selectedDB
    name: `db.${selectedDB}.circuits`,
  });

  const [selectedCircuit, setSelectedCircuit] = useState<number | null>(null);

  useEffect(() => {
    if (selectedDB !== null) {
      const newCircuits = form.watch(`db.${selectedDB}.circuits`) || [];
      replaceCircuits(newCircuits);
    } else {
      replaceCircuits([]);
    }
  }, [selectedDB, form, replaceCircuits]);

  const addCircuit = () => {
    appendCircuit({
      circuitNumber: "",
    });
    setSelectedCircuit(circuits.length);
  };

  const deleteCircuit = (index: number) => {
    removeCircuit(index);

    if (circuits.length === 1) {
      setSelectedCircuit(null);
    }
  };

  const [circuitDialogOpen, setCircuitDialogOpen] = useState(false);

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
              <Heading>Schedule of circuit details and test results</Heading>
            </HeaderGroup>
          </Header>
          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col items-center gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Distribution Boards</CardTitle>
                  <CardDescription className="text-balance">
                    Review and update the details of the circuits and test
                    results below.
                  </CardDescription>
                </CardHeader>

                <div className="flex w-full justify-end space-x-4">
                  <ResponsiveDialog
                    trigger={
                      <Button
                        variant="outline"
                        role="combobox"
                        className="flex-1 items-center justify-between"
                      >
                        <span>
                          {selectedDB !== null
                            ? form.watch(`db.${selectedDB}.dbDesignation`)
                            : "Select db..."}
                        </span>
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
                        {dbs.length > 0 && (
                          <CommandInput placeholder="Search..." />
                        )}
                        <CommandList>
                          <CommandEmpty>None found.</CommandEmpty>
                          <CommandGroup>
                            {dbs.map((db, index) => (
                              <CommandItem
                                key={db.id}
                                value={db.id}
                                onSelect={() => {
                                  setSelectedDB(index);
                                  setOpen(false);
                                }}
                              >
                                {form.watch(`db.${index}.dbDesignation`)}
                                {index === selectedDB ? (
                                  <Check className="ml-auto" />
                                ) : null}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    )}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    onClick={() => {
                      addDb();
                      setDBDialogOpen(true);
                    }}
                  >
                    <Plus />
                  </Button>
                  {selectedDB != null && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Ellipsis className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={() => {
                            setDBDialogOpen(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => deleteDb(selectedDB)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>

              <CardContent className="p-6">
                {selectedDB != null && (
                  <div key={selectedDB} className="space-y-4">
                    <Card className="rounded-md shadow-none">
                      <div className="flex flex-col items-center gap-4 p-6 lg:flex-row">
                        <CardHeader className="w-full p-0">
                          <CardTitle>Circuits</CardTitle>
                          <CardDescription className="text-balance">
                            Review and update the details of the circuits and
                            test results below.
                          </CardDescription>
                        </CardHeader>

                        <div className="flex w-full justify-end space-x-4">
                          <Button
                            variant="outline"
                            size="icon"
                            type="button"
                            onClick={addCircuit}
                          >
                            <Plus />
                          </Button>
                        </div>
                      </div>

                      <CardContent>
                        <Table className="border text-sm">
                          <TableHeader>
                            <TableRow className="h-8">
                              <TableHead className="pl-6">Number</TableHead>
                              <TableHead className="pr-6 text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {circuits.length > 0 ? (
                              circuits.map((field, index) => (
                                <TableRow key={index}>
                                  <TableCell className="pl-6">
                                    {form.watch(
                                      `db.${selectedDB}.circuits.${index}.circuitNumber`,
                                    )}
                                  </TableCell>
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
                                            setCircuitDialogOpen(true);
                                            setSelectedCircuit(index);
                                          }}
                                        >
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onSelect={() => deleteCircuit(index)}
                                        >
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell
                                  colSpan={2}
                                  className="py-4 text-center"
                                >
                                  None Found
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-balance text-sm text-muted-foreground">
                  Ensure the prosumer’s low voltage installation is inspected
                  for condition.
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
          open={dbDialogOpen}
          onOpenChange={setDBDialogOpen}
        >
          {selectedDB != null && (
            <>
              <ScrollArea className="max-h-[320px] overflow-y-auto overflow-x-hidden">
                <div className="space-y-4 p-6">
                  {selectedDB !== null && (
                    <FormField
                      control={form.control}
                      name={`db.${selectedDB}.dbDesignation`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Designation</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </ScrollArea>
            </>
          )}
        </ResponsiveDialogTest>

        <ResponsiveDialogTest
          open={circuitDialogOpen}
          onOpenChange={setCircuitDialogOpen}
        >
          {selectedCircuit != null && (
            <>
              <ScrollArea className="max-h-[320px] overflow-y-auto overflow-x-hidden">
                <div className="space-y-4 p-6">
                  {selectedDB !== null && selectedCircuit !== null && (
                    <FormField
                      control={form.control}
                      name={`db.${selectedDB}.circuits.${selectedCircuit}.circuitNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Circuit number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
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
