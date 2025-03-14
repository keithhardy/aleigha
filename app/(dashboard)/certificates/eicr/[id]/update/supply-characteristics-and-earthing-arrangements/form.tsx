"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { useForm } from "react-hook-form";
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

export function UpdateSupplyCharacteristicsAndEarthingArrangementsForm({
  electricalInstallationConditionReport,
}: {
  electricalInstallationConditionReport: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<
    z.infer<typeof UpdateSupplyCharacteristicsAndEarthingArrangementsSchema>
  >({
    resolver: zodResolver(
      UpdateSupplyCharacteristicsAndEarthingArrangementsSchema,
    ),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      systemTypeAndEarthingArrangements:
        electricalInstallationConditionReport.systemTypeAndEarthingArrangements ||
        "",
      supplyProtectiveDeviceBSNumber:
        electricalInstallationConditionReport.supplyProtectiveDeviceBSNumber ||
        "",
      supplyProtectiveDeviceType:
        electricalInstallationConditionReport.supplyProtectiveDeviceType || "",
      supplyProtectiveDeviceRatedCurrent:
        electricalInstallationConditionReport.supplyProtectiveDeviceRatedCurrent ||
        "",
      numberAndTypeOfLiveConductors:
        electricalInstallationConditionReport.numberAndTypeOfLiveConductors ||
        "",
      confirmationOfSupplyPolarity:
        electricalInstallationConditionReport.confirmationOfSupplyPolarity ??
        true,
      otherSourcesOfSupply:
        electricalInstallationConditionReport.otherSourcesOfSupply || "",
      nominalVoltageBetweenLines:
        electricalInstallationConditionReport.nominalVoltageBetweenLines || "",
      nominalLineVoltageToEarth:
        electricalInstallationConditionReport.nominalLineVoltageToEarth || "",
      nominalFrequency:
        electricalInstallationConditionReport.nominalFrequency || "",
      prospectiveFaultCurrent:
        electricalInstallationConditionReport.prospectiveFaultCurrent || "",
      externalEarthFaultLoopImpedance:
        electricalInstallationConditionReport.externalEarthFaultLoopImpedance ||
        "",
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
        className="container mx-auto max-w-screen-md"
      >
        <Card className="rounded-md shadow-none">
          <CardHeader>
            <CardTitle>
              Supply characteristics and earthing arrangements
            </CardTitle>
            <CardDescription className="text-primary">
              Please fill out the details regarding the supply characteristics
              and earthing arrangements for the electrical installation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="systemTypeAndEarthingArrangements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>System Type and Earthing Arrangements</FormLabel>
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
                  <FormLabel>Supply Protective Device BS Number</FormLabel>
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
                  <FormLabel>Number and Type of Live Conductors</FormLabel>
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
                    <Input placeholder="e.g., Photovoltaic System" {...field} />
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
                  <FormLabel>Nominal Line Voltage to Earth (U0)</FormLabel>
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
          <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
            <p className="text-sm text-muted-foreground">
              Ensure all details are accurate before submission.
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
