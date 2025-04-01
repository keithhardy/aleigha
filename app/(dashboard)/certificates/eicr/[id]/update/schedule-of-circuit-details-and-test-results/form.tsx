"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { Check, ChevronsUpDown, Ellipsis, MoveLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import FormActions from "@/components/form-bar";
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
import { Switch } from "@/components/ui/switch";
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
      designation: "",
      location: "",
      zdb: "",
      ipf: "",
      confirmationOfSupplyPolarity: true,
      phaseSequenceConfirmed: true,
      spdType: "",
      spdStatusIndicator: true,
      supplyFrom: "",
      ocpdBSnumber: "",
      ocpdType: "",
      ocpdNominalVoltage: "",
      ocpdRating: "",
      ocpdNumberOfPhases: "",
      rcdBSNumber: "",
      rcdType: "",
      rcdOperatingCurrent: "",
      rcdNumberOfPoles: "",
      rcdOperatingTime: "",
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
      number: "",
      description: "",
      typeOfWiring: "",
      referenceMethod: "",
      numberOfPoints: "",
      conductorLiveCSA: "",
      conductorCPCCSA: "",
      maxDisconnectionTime: "",
      ocpdBSNumber: "",
      ocpdType: "",
      ocpdRating: "",
      ocpdShortCircuitCapacity: "",
      ocpdMaxPermittedZs: "",
      rcdBSNumber: "",
      rcdType: "",
      rcdRating: "",
      rcdOperatingCurrent: "",
      continuityr1: "",
      continuityrn: "",
      continuityr2: "",
      continuityR1R2: "",
      continuityR2: "",
      insulationResistanceLiveLive: "",
      insulationResistanceLiveEarth: "",
      insulationResistanceTestVoltage: "",
      polarity: true,
      maximumZs: "",
      rcdOperatingTime: "",
      rcdTestButton: true,
      afddOTestButton: true,
      comments: "",
      equipmentVunerableToDamage: "",
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
                            ? form.watch(`db.${selectedDB}.designation`)
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
                                {form.watch(`db.${index}.designation`)}
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
                          <Ellipsis />
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
                              <TableHead>Description</TableHead>
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
                                      `db.${selectedDB}.circuits.${index}.number`,
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {form.watch(
                                      `db.${selectedDB}.circuits.${index}.description`,
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
                                  colSpan={3}
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
            <ScrollArea className="max-h-[320px] overflow-y-auto overflow-x-hidden">
              <div className="space-y-4 p-6">
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.designation`}
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
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.location`}
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
                <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.confirmationOfSupplyPolarity`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <FormLabel>Confirmation of Supply Polarity</FormLabel>
                          <FormDescription>
                            Check if supply polarity is correct.
                          </FormDescription>
                        </div>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.zdb`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Earth Fault Loop Impedance (Zdb)</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input {...field} className="pr-10" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            Ω
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.ipf`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prospective Fault Current (Ipf)</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input {...field} className="pr-10" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            kA
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.phaseSequenceConfirmed`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <FormLabel>Confirmation of Phase Sequence</FormLabel>
                          <FormDescription>
                            Check if supply phase sequence is correct.
                          </FormDescription>
                        </div>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.spdType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SPD Type</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.spdStatusIndicator`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <FormLabel>Confirmation of Phase Sequence</FormLabel>
                          <FormDescription>
                            Check if supply phase sequence is correct.
                          </FormDescription>
                        </div>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.supplyFrom`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplied From</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.ocpdBSnumber`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OCPD BS Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.ocpdType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OCPD Type</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.ocpdNominalVoltage`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OCPD Nominal Voltage</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input {...field} className="pr-10" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            V
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.ocpdRating`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OCPD Rating</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input {...field} className="pr-10" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            A
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.ocpdNumberOfPhases`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OCPD No. of Phases</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.rcdBSNumber`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RCD BS Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.rcdType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RCD Type</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.rcdOperatingCurrent`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RCD Operating Current</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input {...field} className="pr-10" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            mA
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.rcdNumberOfPoles`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RCD No. of Poles</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`db.${selectedDB}.rcdOperatingTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RCD Operating Time</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input {...field} className="pr-10" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            mS
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
          )}
        </ResponsiveDialogTest>

        <ResponsiveDialogTest
          open={circuitDialogOpen}
          onOpenChange={setCircuitDialogOpen}
        >
          {selectedCircuit != null && (
            <ScrollArea className="max-h-[320px] overflow-y-auto overflow-x-hidden">
              {selectedDB !== null && selectedCircuit !== null && (
                <div className="space-y-4 p-6">
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.number`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.typeOfWiring`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Wiring</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.referenceMethod`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference Method</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.numberOfPoints`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Points</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.conductorLiveCSA`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conductor Live CSA</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.conductorCPCCSA`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conductor CPC CSA</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.maxDisconnectionTime`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Disconnection Time</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.ocpdBSNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OCPD BS Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.ocpdType`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OCPD Type</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.ocpdRating`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OCPD Rating</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.ocpdShortCircuitCapacity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OCPD Short Circuit Capacity</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.ocpdMaxPermittedZs`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OCPD Maximum Permitted Zs</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.rcdBSNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RCD BS Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.rcdType`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RCD Type</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.rcdRating`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RCD Rating</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.rcdOperatingCurrent`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RCD Operating Current</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.continuityr1`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Continuity r1</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.continuityrn`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Continuity rn</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.continuityr2`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Continuity r2</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.continuityR1R2`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Continuity R1 + R2</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.continuityR2`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Continuity R2</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.insulationResistanceLiveLive`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insulation Resistance Live Live</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.insulationResistanceLiveEarth`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insulation Resistance Live Earth</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.insulationResistanceTestVoltage`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Insulation Resistance Test Voltage
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                    <FormField
                      control={form.control}
                      name={`db.${selectedDB}.circuits.${selectedCircuit}.polarity`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between gap-4">
                          <div className="space-y-0.5">
                            <FormLabel>Confirmation of Polarity</FormLabel>
                            <FormDescription>
                              Check if polarity is correct.
                            </FormDescription>
                          </div>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.maximumZs`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Zs</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.rcdOperatingTime`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RCD Operating Time</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                    <FormField
                      control={form.control}
                      name={`db.${selectedDB}.circuits.${selectedCircuit}.rcdTestButton`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between gap-4">
                          <div className="space-y-0.5">
                            <FormLabel>
                              Confirmation of RCD Test Button
                            </FormLabel>
                            <FormDescription>
                              Check the RCD test button works.
                            </FormDescription>
                          </div>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                    <FormField
                      control={form.control}
                      name={`db.${selectedDB}.circuits.${selectedCircuit}.afddOTestButton`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between gap-4">
                          <div className="space-y-0.5">
                            <FormLabel>
                              Confirmation of AFDD Test Button
                            </FormLabel>
                            <FormDescription>
                              Check the AFDD test button works.
                            </FormDescription>
                          </div>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.comments`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comments</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${selectedDB}.circuits.${selectedCircuit}.equipmentVunerableToDamage`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Equipment Vunerable to Damage</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </ScrollArea>
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
