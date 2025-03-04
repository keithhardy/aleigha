"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { Schema } from "./schema";

export function SupplyCharacteristicsAndEarthingArrangementsForm() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      systemTypeAndEarthingArrangemets: "",
      supplyProtectiveDeviceBSNumber: "",
      supplyProtectiveDeviceType: "",
      supplyProtectiveDeviceRatedCurrent: "",
      numberAndTypeOfLiveConductors: "",
      confirmationOfSupplyPolarity: true,
      otherSourcesOfSupply: "",
      nominalVoltageBetweenLines: "",
      nominalLineVoltageToEarth: "",
      nominalFrequency: "",
      prospectiveFaultCurrent: "",
      externalEarthFaultLoopImpedance: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data: z.infer<typeof Schema>) => console.log(data))}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Supply Characteristics and Earthing Arrangements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="systemTypeAndEarthingArrangemets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>System Type and Earthing Arrangements</FormLabel>
                  <FormControl>
                    <Input placeholder="TN-C-S" {...field} />
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
                    <Input placeholder="BS 1361" {...field} />
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
                    <Input placeholder="IIb" {...field} />
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
                    <Input placeholder="80 A" {...field} />
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
                    <Input placeholder="2 Wire Single Phase AC" {...field} />
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
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
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
                    <Input placeholder="Photovoltaic System" {...field} />
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
                    <Input placeholder="N/A" {...field} />
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
                    <Input placeholder="230 V" {...field} />
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
                    <Input placeholder="50 Hz" {...field} />
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
                    <Input placeholder="2.0 KA" {...field} />
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
                  <FormLabel>External Earth Fault Loop Impedance (Ze)</FormLabel>
                  <FormControl>
                    <Input placeholder="0.35 Ω" {...field} />
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
