"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import { RadioGroupComponent } from "../radio-group";
import { updateDistributionCircuits } from "./action";
import { inspectionItems } from "./inspection-items";
import { UpdateDistributionCircuitsSchema } from "./schema";

export function UpdateDistributionCircuitsForm({ electricalInstallationConditionReport }: { electricalInstallationConditionReport: ElectricalInstallationConditionReport }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateDistributionCircuitsSchema>>({
    resolver: zodResolver(UpdateDistributionCircuitsSchema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      item_5_1: electricalInstallationConditionReport.item_5_1 || "na",
      item_5_2: electricalInstallationConditionReport.item_5_2 || "na",
      item_5_3: electricalInstallationConditionReport.item_5_3 || "na",
      item_5_4: electricalInstallationConditionReport.item_5_4 || "na",
      item_5_5: electricalInstallationConditionReport.item_5_5 || "na",
      item_5_6: electricalInstallationConditionReport.item_5_6 || "na",
      item_5_7: electricalInstallationConditionReport.item_5_7 || "na",
      item_5_8: electricalInstallationConditionReport.item_5_8 || "na",
      item_5_9: electricalInstallationConditionReport.item_5_9 || "na",
      item_5_10: electricalInstallationConditionReport.item_5_10 || "na",
      item_5_11: electricalInstallationConditionReport.item_5_11 || "na",
      item_5_12: electricalInstallationConditionReport.item_5_12 || "na",
      item_5_13: electricalInstallationConditionReport.item_5_13 || "na",
      item_5_14A: electricalInstallationConditionReport.item_5_14A || "na",
      item_5_14B: electricalInstallationConditionReport.item_5_14B || "na",
      item_5_15: electricalInstallationConditionReport.item_5_15 || "na",
      item_5_16: electricalInstallationConditionReport.item_5_16 || "na",
      item_5_17: electricalInstallationConditionReport.item_5_17 || "na",
      item_5_18: electricalInstallationConditionReport.item_5_18 || "na",
      item_5_19: electricalInstallationConditionReport.item_5_19 || "na",
      item_5_20: electricalInstallationConditionReport.item_5_20 || "na",
      item_5_21: electricalInstallationConditionReport.item_5_21 || "na",
      item_5_22: electricalInstallationConditionReport.item_5_22 || "na",
      item_5_23: electricalInstallationConditionReport.item_5_23 || "na",
      item_5_24: electricalInstallationConditionReport.item_5_24 || "na",
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateDistributionCircuitsSchema>) => {
    const response = await updateDistributionCircuits(data);

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
            <CardTitle>Distribution circuits</CardTitle>
            <CardDescription className="text-primary">This section covers the condition and adequacy of the distribution circuits in the system.</CardDescription>
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
                      <RadioGroupComponent onChange={field.onChange} defaultValue={field.value || "na"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
          <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
            <p className="text-sm text-muted-foreground">Ensure all distribution circuits are properly inspected.</p>
            <Button variant="outline" type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
