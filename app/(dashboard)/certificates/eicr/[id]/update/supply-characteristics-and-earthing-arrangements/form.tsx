"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { ExternalLink, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormBar } from "@/app/(dashboard)/certificates/components/form-bar";
import { UnsavedChangesDialog } from "@/app/(dashboard)/certificates/components/unsaved-changes-dialog";
import { Header, HeaderGroup, HeaderTitle } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

import { updateSupplyCharacteristicsAndEarthingArrangements } from "./action";
import { UpdateSupplyCharacteristicsAndEarthingArrangementsSchema } from "./schema";
import { sections } from "../components/sections";

export function UpdateSupplyCharacteristicsAndEarthingArrangementsForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateSupplyCharacteristicsAndEarthingArrangementsSchema>>({
    resolver: zodResolver(UpdateSupplyCharacteristicsAndEarthingArrangementsSchema),
    defaultValues: {
      id: certificate.id,
      systemTypeAndEarthingArrangements: certificate.systemTypeAndEarthingArrangements || "",
      supplyProtectiveDeviceBSNumber: certificate.supplyProtectiveDeviceBSNumber || "",
      supplyProtectiveDeviceType: certificate.supplyProtectiveDeviceType || "",
      supplyProtectiveDeviceRatedCurrent: certificate.supplyProtectiveDeviceRatedCurrent || "",
      numberAndTypeOfLiveConductors: certificate.numberAndTypeOfLiveConductors || "",
      confirmationOfSupplyPolarity: certificate.confirmationOfSupplyPolarity ?? true,
      otherSourcesOfSupply: certificate.otherSourcesOfSupply || "",
      nominalVoltageBetweenLines: certificate.nominalVoltageBetweenLines || "",
      nominalLineVoltageToEarth: certificate.nominalLineVoltageToEarth || "",
      nominalFrequency: certificate.nominalFrequency || "",
      prospectiveFaultCurrent: certificate.prospectiveFaultCurrent || "",
      externalEarthFaultLoopImpedance: certificate.externalEarthFaultLoopImpedance || "",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof UpdateSupplyCharacteristicsAndEarthingArrangementsSchema>,
  ) => {
    const response = await updateSupplyCharacteristicsAndEarthingArrangements(data);

    if (response.status === "success") {
      form.reset(data);
    }

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col">
        <div className="container mx-auto p-6">
          <Header>
            <HeaderGroup>
              <Link
                href={"/certificates"}
                className="inline-flex items-center text-sm font-semibold"
              >
                <MoveLeft size={22} className="mr-2" />
                <span>Back to Certificates</span>
              </Link>
              <HeaderTitle>Supply characteristics and earthing arrangements</HeaderTitle>
            </HeaderGroup>
          </Header>
          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Characteristics</CardTitle>
                  <CardDescription className="text-balance">
                    Provide details about the supply characteristics and earthing arrangements of
                    the electrical installation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="systemTypeAndEarthingArrangements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>System Type and Earthing Arrangements</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numberAndTypeOfLiveConductors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number and Type of Live Conductors</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nominalVoltageBetweenLines"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nominal Voltage Between Lines (U)</FormLabel>
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
                    name="nominalLineVoltageToEarth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nominal Line Voltage to Earth (U0)</FormLabel>
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
                    name="nominalFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nominal Frequency (f)</FormLabel>
                        <FormControl>
                          <div className="relative w-full">
                            <Input {...field} className="pr-10" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                              Hz
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="otherSourcesOfSupply"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Sources of Supply</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-6">
                <p className="text-balance text-sm text-muted-foreground">
                  Not sure about the system type? Check out our{" "}
                  <Link
                    href={"/settings"}
                    className="inline-flex items-center space-x-1 text-blue-500"
                  >
                    <span>guide</span>
                    <ExternalLink size={14} />
                  </Link>{" "}
                  for more details.
                </p>
              </CardFooter>
            </Card>
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Protective Device</CardTitle>
                  <CardDescription className="text-balance">
                    Enter details about the supply protective device, including its BS number, type,
                    and rated current.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="supplyProtectiveDeviceBSNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supply Protective Device BS Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="supplyProtectiveDeviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supply Protective Device Type</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="supplyProtectiveDeviceRatedCurrent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rated Current of Supply Protective Device</FormLabel>
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
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-6">
                <p className="text-sm text-muted-foreground">
                  Ensure all details are correct before submission.
                </p>
              </CardFooter>
            </Card>
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Confirmation</CardTitle>
                  <CardDescription className="text-balance">
                    Verify and confirm key supply characteristics, including polarity checks, fault
                    current, and earth loop impedance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="confirmationOfSupplyPolarity"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Confirmation of Supply Polarity</FormLabel>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="externalEarthFaultLoopImpedance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>External Earth Fault Loop Impedance (Ze)</FormLabel>
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
                    name="prospectiveFaultCurrent"
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
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-6">
                <p className="text-balance text-sm text-muted-foreground">
                  Not sure how to test? Check out our{" "}
                  <Link
                    href={"/settings"}
                    className="inline-flex items-center space-x-1 text-blue-500"
                  >
                    <span>guide</span>
                    <ExternalLink size={14} />
                  </Link>{" "}
                  for more details.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
        <FormBar form={form} sections={sections} baseUrl={"/certificates/eicr"} />
        <UnsavedChangesDialog
          condition={form.formState.isDirty}
          action={form.handleSubmit(onSubmit)}
        />
      </form>
    </Form>
  );
}
