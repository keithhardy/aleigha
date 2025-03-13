"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

import { updateParticularsOfInstallationsReferredToInThisReport } from "./action";
import { UpdateParticularsOfInstallationsReferredToInThisReportSchema } from "./schema";

export function UpdateParticularsOfInstallationsReferredToInThisReportForm({ electricalInstallationConditionReport }: { electricalInstallationConditionReport: ElectricalInstallationConditionReport }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateParticularsOfInstallationsReferredToInThisReportSchema>>({
    resolver: zodResolver(UpdateParticularsOfInstallationsReferredToInThisReportSchema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      maximumDemand: electricalInstallationConditionReport.maximumDemand || "",
      distributorsFacility: electricalInstallationConditionReport.distributorsFacility ?? true,
      installationEarthElectrodes: electricalInstallationConditionReport.installationEarthElectrodes ?? false,
      earthElectrodeType: electricalInstallationConditionReport.earthElectrodeType || "",
      earthElectrodeLocation: electricalInstallationConditionReport.earthElectrodeLocation || "",
      electrodeResistanceToEarth: electricalInstallationConditionReport.electrodeResistanceToEarth || "",
      earthingConductorMaterial: electricalInstallationConditionReport.earthingConductorMaterial || "",
      earthingConductorCSA: electricalInstallationConditionReport.earthingConductorCSA || "",
      earthingConductorVerified: electricalInstallationConditionReport.earthingConductorVerified ?? false,
      mainProtectiveBondingConductorMaterial: electricalInstallationConditionReport.mainProtectiveBondingConductorMaterial || "",
      mainProtectiveBondingConductorCSA: electricalInstallationConditionReport.mainProtectiveBondingConductorCSA || "",
      mainProtectiveBondingConductorVerified: electricalInstallationConditionReport.mainProtectiveBondingConductorVerified ?? false,
      waterInstallationPipes: electricalInstallationConditionReport.waterInstallationPipes || "",
      gasInstallationPipes: electricalInstallationConditionReport.gasInstallationPipes || "",
      structuralSteel: electricalInstallationConditionReport.structuralSteel || "",
      oilInstallationPipes: electricalInstallationConditionReport.oilInstallationPipes || "",
      lightningProtection: electricalInstallationConditionReport.lightningProtection || "",
      other: String(electricalInstallationConditionReport.other || ""),
      mainSwitchLocation: electricalInstallationConditionReport.mainSwitchLocation || "",
      mainSwitchBSNumber: electricalInstallationConditionReport.mainSwitchBSNumber || "",
      mainSwitchType: electricalInstallationConditionReport.mainSwitchType || "",
      mainSwitchRating: electricalInstallationConditionReport.mainSwitchRating || "",
      mainSwitchPoles: electricalInstallationConditionReport.mainSwitchPoles || "",
      mainSwitchCurrentRating: electricalInstallationConditionReport.mainSwitchCurrentRating || "",
      mainSwitchVoltageRating: electricalInstallationConditionReport.mainSwitchVoltageRating || "",
      mainSwitchRCDOperatingCurrent: electricalInstallationConditionReport.mainSwitchRCDOperatingCurrent || "",
      mainSwitchRCDType: electricalInstallationConditionReport.mainSwitchRCDType || "",
      mainSwitchRCDRatedTimeDelay: electricalInstallationConditionReport.mainSwitchRCDRatedTimeDelay || "",
      mainSwitchRCDMeasuredOperatingTime: electricalInstallationConditionReport.mainSwitchRCDMeasuredOperatingTime || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateParticularsOfInstallationsReferredToInThisReportSchema>) => {
    const response = await updateParticularsOfInstallationsReferredToInThisReport(data);

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="container mx-auto max-w-screen-md">
        <Card className="rounded-md shadow-none">
          <CardHeader>
            <CardTitle>Particulars of Installation</CardTitle>
            <CardDescription className="text-primary">Key details of the electrical installation for this report.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="maximumDemand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Electrical Demand</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Maximum Demand (e.g., 100 A)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="distributorsFacility"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>Distributor&apos;s Facility</FormLabel>
                  </div>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="installationEarthElectrodes"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>Earth Electrodes Installed?</FormLabel>
                  </div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (!checked) {
                        form.setValue("earthElectrodeType", "");
                        form.setValue("earthElectrodeLocation", "");
                        form.setValue("electrodeResistanceToEarth", "");
                      }
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("installationEarthElectrodes") && (
              <>
                <FormField
                  control={form.control}
                  name="earthElectrodeType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Earth Electrode</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Copper Rod" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="earthElectrodeLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Earth Electrode Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Front Garden" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="electrodeResistanceToEarth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resistance of Electrode to Earth</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 10.0 Ω" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="earthingConductorMaterial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material of Earthing Conductor</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Copper" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="earthingConductorCSA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CSA of Earthing Conductor</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 16 mm²" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="earthingConductorVerified"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>Earthing Conductor Verified</FormLabel>
                  </div>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainProtectiveBondingConductorMaterial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Protective Bonding Conductor Material</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Copper" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainProtectiveBondingConductorCSA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Protective Bonding Conductor CSA</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 10 mm²" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainProtectiveBondingConductorVerified"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>Main Protective Bonding Conductor Verified</FormLabel>
                  </div>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waterInstallationPipes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Water Installation Pipes</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 0.02 Ω" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gasInstallationPipes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gas Installation Pipes</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 0.01 Ω" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="structuralSteel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Structural Steel</FormLabel>
                  <FormControl>
                    <Input placeholder="N/A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="oilInstallationPipes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Oil Installation Pipes</FormLabel>
                  <FormControl>
                    <Input placeholder="N/A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lightningProtection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lightning Protection</FormLabel>
                  <FormControl>
                    <Input placeholder="N/A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Installation Details</FormLabel>
                  <FormControl>
                    <Input placeholder="N/A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainSwitchLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Switch Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Electric Cupboard" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainSwitchBSNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BS Number of Main Switch</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., BS 60898" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainSwitchType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Main Switch</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Type B" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainSwitchRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Switch Rating / Setting</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 100 A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainSwitchPoles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Poles in Main Switch</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainSwitchCurrentRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Switch Current Rating</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 32 A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
            <p className="text-sm text-muted-foreground">Ensure all details are accurate before submission.</p>
            <Button variant="outline" type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
