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

import { updateParticularsOfInstallationsReferredToInThisReport } from "./action";
import { UpdateParticularsOfInstallationsReferredToInThisReportSchema } from "./schema";
import { sections } from "../components/sections";

export function UpdateParticularsOfInstallationsReferredToInThisReportForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<
    z.infer<typeof UpdateParticularsOfInstallationsReferredToInThisReportSchema>
  >({
    resolver: zodResolver(
      UpdateParticularsOfInstallationsReferredToInThisReportSchema,
    ),
    defaultValues: {
      id: certificate.id,
      maximumDemand: certificate.maximumDemand || "",
      distributorsFacility: certificate.distributorsFacility ?? true,
      installationEarthElectrodes:
        certificate.installationEarthElectrodes ?? false,
      earthElectrodeType: certificate.earthElectrodeType || "",
      earthElectrodeLocation: certificate.earthElectrodeLocation || "",
      electrodeResistanceToEarth: certificate.electrodeResistanceToEarth || "",
      earthingConductorMaterial: certificate.earthingConductorMaterial || "",
      earthingConductorCSA: certificate.earthingConductorCSA || "",
      earthingConductorVerified: certificate.earthingConductorVerified ?? false,
      mainProtectiveBondingConductorMaterial:
        certificate.mainProtectiveBondingConductorMaterial || "",
      mainProtectiveBondingConductorCSA:
        certificate.mainProtectiveBondingConductorCSA || "",
      mainProtectiveBondingConductorVerified:
        certificate.mainProtectiveBondingConductorVerified ?? false,
      waterInstallationPipes: certificate.waterInstallationPipes || "",
      gasInstallationPipes: certificate.gasInstallationPipes || "",
      structuralSteel: certificate.structuralSteel || "",
      oilInstallationPipes: certificate.oilInstallationPipes || "",
      lightningProtection: certificate.lightningProtection || "",
      other: String(certificate.other || ""),
      mainSwitchLocation: certificate.mainSwitchLocation || "",
      mainSwitchBSNumber: certificate.mainSwitchBSNumber || "",
      mainSwitchType: certificate.mainSwitchType || "",
      mainSwitchRating: certificate.mainSwitchRating || "",
      mainSwitchPoles: certificate.mainSwitchPoles || "",
      mainSwitchCurrentRating: certificate.mainSwitchCurrentRating || "",
      mainSwitchVoltageRating: certificate.mainSwitchVoltageRating || "",
      mainSwitchRCDOperatingCurrent:
        certificate.mainSwitchRCDOperatingCurrent || "",
      mainSwitchRCDType: certificate.mainSwitchRCDType || "",
      mainSwitchRCDRatedTimeDelay:
        certificate.mainSwitchRCDRatedTimeDelay || "",
      mainSwitchRCDMeasuredOperatingTime:
        certificate.mainSwitchRCDMeasuredOperatingTime || "",
    },
  });

  const onSubmit = async (
    data: z.infer<
      typeof UpdateParticularsOfInstallationsReferredToInThisReportSchema
    >,
  ) => {
    const response =
      await updateParticularsOfInstallationsReferredToInThisReport(data);

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
              <Heading>Particulars of Installation</Heading>
            </HeaderGroup>
          </Header>

          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Particulars of Installation</CardTitle>
                  <CardDescription>
                    Key details of the electrical installation for this report.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="maximumDemand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Electrical Demand</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Maximum Demand (e.g., 100 A)"
                            {...field}
                          />
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
                              <Input
                                placeholder="e.g., Copper Rod"
                                {...field}
                              />
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
                              <Input
                                placeholder="e.g., Front Garden"
                                {...field}
                              />
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
                            <FormLabel>
                              Resistance of Electrode to Earth
                            </FormLabel>
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
                    name="mainProtectiveBondingConductorMaterial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Main Protective Bonding Conductor Material
                        </FormLabel>
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
                        <FormLabel>
                          Main Protective Bonding Conductor CSA
                        </FormLabel>
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
                          <FormLabel>
                            Main Protective Bonding Conductor Verified
                          </FormLabel>
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
                          <Input
                            placeholder="e.g., Electric Cupboard"
                            {...field}
                          />
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
