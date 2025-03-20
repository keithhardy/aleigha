"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UnsavedChangesDialog } from "@/components/unsaved-changes-dialog";
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

  const form = useForm<
    z.infer<typeof UpdateSupplyCharacteristicsAndEarthingArrangementsSchema>
  >({
    resolver: zodResolver(
      UpdateSupplyCharacteristicsAndEarthingArrangementsSchema,
    ),
    defaultValues: {
      id: certificate.id,
      systemTypeAndEarthingArrangements:
        certificate.systemTypeAndEarthingArrangements || "",
      supplyProtectiveDeviceBSNumber:
        certificate.supplyProtectiveDeviceBSNumber || "",
      supplyProtectiveDeviceType: certificate.supplyProtectiveDeviceType || "",
      supplyProtectiveDeviceRatedCurrent:
        certificate.supplyProtectiveDeviceRatedCurrent || "",
      numberAndTypeOfLiveConductors:
        certificate.numberAndTypeOfLiveConductors || "",
      confirmationOfSupplyPolarity:
        certificate.confirmationOfSupplyPolarity ?? true,
      otherSourcesOfSupply: certificate.otherSourcesOfSupply || "",
      nominalVoltageBetweenLines: certificate.nominalVoltageBetweenLines || "",
      nominalLineVoltageToEarth: certificate.nominalLineVoltageToEarth || "",
      nominalFrequency: certificate.nominalFrequency || "",
      prospectiveFaultCurrent: certificate.prospectiveFaultCurrent || "",
      externalEarthFaultLoopImpedance:
        certificate.externalEarthFaultLoopImpedance || "",
    },
  });

  const onSubmit = async (
    data: z.infer<
      typeof UpdateSupplyCharacteristicsAndEarthingArrangementsSchema
    >,
  ) => {
    const response =
      await updateSupplyCharacteristicsAndEarthingArrangements(data);

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
              <Heading>
                Supply characteristics and earthing arrangements
              </Heading>
            </HeaderGroup>
          </Header>

          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>
                    Supply characteristics and earthing arrangements
                  </CardTitle>
                  <CardDescription>
                    Please fill out the details regarding the supply
                    characteristics and earthing arrangements for the electrical
                    installation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-2 p-0">
                  <FormField
                    control={form.control}
                    name="systemTypeAndEarthingArrangements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          System Type and Earthing Arrangements
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., TN-C-S" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="supplyProtectiveDeviceBSNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Supply Protective Device BS Number
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., BS 1361" {...field} />
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
                          <Input placeholder="e.g., IIb" {...field} />
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
                        <FormLabel>
                          Rated Current of Supply Protective Device
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 80 A" {...field} />
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
                        <FormLabel>
                          Number and Type of Live Conductors
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 2 Wire Single Phase AC"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmationOfSupplyPolarity"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel>Confirmation of Supply Polarity</FormLabel>
                        </div>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
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
                          <Input
                            placeholder="e.g., Photovoltaic System"
                            {...field}
                          />
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
                          <Input placeholder="e.g., N/A" {...field} />
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
                        <FormLabel>
                          Nominal Line Voltage to Earth (U0)
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 230 V" {...field} />
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
                          <Input placeholder="e.g., 50 Hz" {...field} />
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
                          <Input placeholder="e.g., 2.0 KA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="externalEarthFaultLoopImpedance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          External Earth Fault Loop Impedance (Ze)
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 0.35 Ω" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-sm text-muted-foreground">
                  Ensure all details are accurate before submission.
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
