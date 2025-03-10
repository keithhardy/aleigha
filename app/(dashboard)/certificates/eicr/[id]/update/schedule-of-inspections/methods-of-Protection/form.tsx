"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { RadioGroupComponent } from "../radio-group";
import { inspectionItems } from "./inspection-items";
import { UpdateMethodsOfProtectionSchema } from "./schema";

export function UpdateMethodsOfProtectionForm({ electricalInstallationConditionReport }: { electricalInstallationConditionReport: ElectricalInstallationConditionReport }) {
  const form = useForm<z.infer<typeof UpdateMethodsOfProtectionSchema>>({
    resolver: zodResolver(UpdateMethodsOfProtectionSchema),
    defaultValues: {
      item_3_1A: electricalInstallationConditionReport.item_3_1A || "na",
      item_3_1B: electricalInstallationConditionReport.item_3_1B || "na",
      item_3_1C: electricalInstallationConditionReport.item_3_1C || "na",
      item_3_1D: electricalInstallationConditionReport.item_3_1D || "na",
      item_3_1E: electricalInstallationConditionReport.item_3_1E || "na",
      item_3_1F: electricalInstallationConditionReport.item_3_1F || "na",
      item_3_1G: electricalInstallationConditionReport.item_3_1G || "na",
      item_3_1H: electricalInstallationConditionReport.item_3_1H || "na",
      item_3_1I: electricalInstallationConditionReport.item_3_1I || "na",
      item_3_2: electricalInstallationConditionReport.item_3_2 || "na",
      item_3_3A: electricalInstallationConditionReport.item_3_3A || "na",
      item_3_3B: electricalInstallationConditionReport.item_3_3B || "na",
      item_3_3C: electricalInstallationConditionReport.item_3_3C || "na",
      item_3_3D: electricalInstallationConditionReport.item_3_3D || "na",
      item_3_3E: electricalInstallationConditionReport.item_3_3E || "na",
      item_3_3F: electricalInstallationConditionReport.item_3_3F || "na",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data: z.infer<typeof UpdateMethodsOfProtectionSchema>) => console.log(data))}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Methods of protection</CardTitle>
            <CardDescription className="text-primary">This section assesses the condition and adequacy of earthing, bonding, insulation, and safety provisions, including main earthing, protective bonding, and equipotential bonding.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inspectionItems.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                // @ts-expect-error Field value is an enum, Input expects string
                name={item.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.item + " - " + item.label}</FormLabel>
                    <FormControl>
                      <RadioGroupComponent onChange={field.onChange} defaultValue={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">Ensure all earthing and bonding arrangements are inspected.</p>
            <Button variant="outline" type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
