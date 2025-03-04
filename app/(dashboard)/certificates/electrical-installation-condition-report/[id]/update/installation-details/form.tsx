"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { Schema } from "./schema";

export function ParticularsOfInstallationsReferredToInThisReportForm() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      maximumDemand: "",
      distributorsFacility: true,
      installationEarthElectrodes: false,
      earthElectrodeType: "",
      earthElectrodeLocation: "",
      electrodeResistanceToEarth: "",
      earthingConductorMaterial: "",
      earthingConductorCSA: "",
      earthingConductorVerified: false,
      mainProtectiveBondingConductorMaterial: "",
      mainProtectiveBondingConductorCSA: "",
      mainProtectiveBondingConductorVerified: false,
      waterInstallationPipes: "",
      gasInstallationPipes: "",
      structuralSteel: "",
      oilInstallationPipes: "",
      lightningProtection: "",
      other: "",
      mainSwitchImage: "",
      mainSwitchLocation: "",
      mainSwitchBSNumber: "",
      mainSwitchType: "",
      mainSwitchRating: "",
      mainSwitchPoles: "",
      mainSwitchCurrentRating: "",
      mainSwitchVoltageRating: "",
      mainSwitchRCDOperatingCurrent: "",
      mainSwitchRCDType: "",
      mainSwitchRCDRatedTimeDelay: "",
      mainSwitchRCDMeasuredOperatingTime: "",
    },
  });

  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data: z.infer<typeof Schema>) => console.log(data))}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Particulars of Installations Referred to in this Report</CardTitle>
            <CardDescription className="text-primary">Particulars of Installations Referred to in this Report.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="maximumDemand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Demand</FormLabel>
                  <FormControl>
                    <Input placeholder="100 A" {...field} />
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
                    <FormLabel>Installation Earth Electrode(s)</FormLabel>
                  </div>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="earthElectrodeType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Earth Electrode Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Rod" {...field} disabled={!form.watch("installationEarthElectrodes")} />
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
                    <Input placeholder="Front Garden" {...field} disabled={!form.watch("installationEarthElectrodes")} />
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
                  <FormLabel>Electrode Resistance to Earth</FormLabel>
                  <FormControl>
                    <Input placeholder="10.0 Ω" {...field} disabled={!form.watch("installationEarthElectrodes")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="earthingConductorMaterial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Earthing Conductor Material</FormLabel>
                  <FormControl>
                    <Input placeholder="Copper" {...field} />
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
                  <FormLabel>Earthing Conductor CSA</FormLabel>
                  <FormControl>
                    <Input placeholder="16 mm²" {...field} />
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
                    <Input placeholder="Copper" {...field} />
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
                    <Input placeholder="10 mm²" {...field} />
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
                    <Input placeholder="0.02 Ω" {...field} />
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
                    <Input placeholder="0.01 Ω" {...field} />
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
                  <FormLabel>Other</FormLabel>
                  <FormControl>
                    <Input placeholder="N/A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainSwitchImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Switch Photo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const files = e.target.files;
                        const file = files?.[0];
                        if (file) {
                          const previewUrl = URL.createObjectURL(file);
                          setPreview(previewUrl);
                          field.onChange(files);
                        } else {
                          setPreview(null);
                          field.onChange(null);
                        }
                      }}
                    />
                  </FormControl>
                  {preview && (
                    <div>
                      <Image src={preview} alt="Preview" width={300} height={0} />
                    </div>
                  )}
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
                    <Input placeholder="Electric Cupboard" {...field} />
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
                  <FormLabel>Main Switch BS Number</FormLabel>
                  <FormControl>
                    <Input placeholder="BS 60898" {...field} />
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
                  <FormLabel>Main Switch Type</FormLabel>
                  <FormControl>
                    <Input placeholder="B" {...field} />
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
                    <Input placeholder="100 A" {...field} />
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
                  <FormLabel>Main Switch Number of Poles</FormLabel>
                  <FormControl>
                    <Input placeholder="2" {...field} />
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
                    <Input placeholder="100 A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainSwitchVoltageRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Switch Voltage Rating</FormLabel>
                  <FormControl>
                    <Input placeholder="230 V" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainSwitchRCDOperatingCurrent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Switch RCD Operating Current</FormLabel>
                  <FormControl>
                    <Input placeholder="30 mA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainSwitchRCDType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Switch RCD Type</FormLabel>
                  <FormControl>
                    <Input placeholder="A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainSwitchRCDRatedTimeDelay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Switch RCD Rated Time Delay</FormLabel>
                  <FormControl>
                    <Input placeholder="120 mS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainSwitchRCDMeasuredOperatingTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Switch RCD Measured Operating Time</FormLabel>
                  <FormControl>
                    <Input placeholder="92 mS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">Condition.</p>
            <Button variant="outline" type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
