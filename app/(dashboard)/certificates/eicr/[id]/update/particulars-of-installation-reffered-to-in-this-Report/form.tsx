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
              <HeaderTitle>Particulars of Installation</HeaderTitle>
            </HeaderGroup>
          </Header>
          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col items-center gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Maximum Demand</CardTitle>
                  <CardDescription className="text-balance">
                    Key details of the electrical installation for this report.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="maximumDemand"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative w-full">
                            <Input {...field} className="pr-10" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                              kW
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
                  Not sure how to calculate maximum demand? Check out our{" "}
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
                  <CardTitle>Earthing Conductor</CardTitle>
                  <CardDescription className="text-balance">
                    Key details of the electrical installation for this report.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="distributorsFacility"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Distributor&apos;s Facility?</FormLabel>
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
                      <FormItem className="flex flex-col">
                        <FormLabel>Earth Electrodes Installed?</FormLabel>
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
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                        name="electrodeResistanceToEarth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Resistance to Earth</FormLabel>
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
                    </>
                  )}
                  <FormField
                    control={form.control}
                    name="earthingConductorMaterial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conductor Material</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Conductor CSA</FormLabel>
                        <FormControl>
                          <div className="relative w-full">
                            <Input {...field} className="pr-10" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                              mm²
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="earthingConductorVerified"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Conductor Verified</FormLabel>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-6">
                <p className="text-balance text-sm text-muted-foreground">
                  Ensure all details are accurate before submission.
                </p>
              </CardFooter>
            </Card>
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Main Protective Bonding</CardTitle>
                  <CardDescription className="text-balance">
                    Key details of the electrical installation for this report.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="mainProtectiveBondingConductorMaterial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conductor Material</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Conductor CSA</FormLabel>
                        <FormControl>
                          <div className="relative w-full">
                            <Input {...field} className="pr-10" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                              mm²
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mainProtectiveBondingConductorVerified"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Conductor Verified</FormLabel>
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
                          <Input {...field} />
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
                          <Input {...field} />
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
                          <Input {...field} />
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
                          <Input {...field} />
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
                          <Input {...field} />
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
                  Ensure all details are accurate before submission.
                </p>
              </CardFooter>
            </Card>
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Main Switch</CardTitle>
                  <CardDescription className="text-balance">
                    Key details of the electrical installation for this report.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="mainSwitchLocation"
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
                    name="mainSwitchBSNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BS Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Rating / Setting</FormLabel>
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
                    name="mainSwitchPoles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Poles</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Current Rating</FormLabel>
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
                <p className="text-balance text-sm text-muted-foreground">
                  Ensure all details are accurate before submission.
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
