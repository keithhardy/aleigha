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
import { updateFinalCircuits } from "./action";
import { inspectionItems } from "./inspection-items";
import { UpdateFinalCircuitsSchema } from "./schema";

export function UpdateFinalCircuitsForm({ electricalInstallationConditionReport }: { electricalInstallationConditionReport: ElectricalInstallationConditionReport }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateFinalCircuitsSchema>>({
    resolver: zodResolver(UpdateFinalCircuitsSchema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      item_6_1: electricalInstallationConditionReport.item_6_1 || "na",
      item_6_2: electricalInstallationConditionReport.item_6_2 || "na",
      item_6_3: electricalInstallationConditionReport.item_6_3 || "na",
      item_6_4: electricalInstallationConditionReport.item_6_4 || "na",
      item_6_5: electricalInstallationConditionReport.item_6_5 || "na",
      item_6_6: electricalInstallationConditionReport.item_6_6 || "na",
      item_6_7: electricalInstallationConditionReport.item_6_7 || "na",
      item_6_8: electricalInstallationConditionReport.item_6_8 || "na",
      item_6_9: electricalInstallationConditionReport.item_6_9 || "na",
      item_6_10: electricalInstallationConditionReport.item_6_10 || "na",
      item_6_11: electricalInstallationConditionReport.item_6_11 || "na",
      item_6_12A: electricalInstallationConditionReport.item_6_12A || "na",
      item_6_12B: electricalInstallationConditionReport.item_6_12B || "na",
      item_6_13A: electricalInstallationConditionReport.item_6_13A || "na",
      item_6_13B: electricalInstallationConditionReport.item_6_13B || "na",
      item_6_13C: electricalInstallationConditionReport.item_6_13C || "na",
      item_6_13D: electricalInstallationConditionReport.item_6_13D || "na",
      item_6_13E: electricalInstallationConditionReport.item_6_13E || "na",
      item_6_14: electricalInstallationConditionReport.item_6_14 || "na",
      item_6_15: electricalInstallationConditionReport.item_6_15 || "na",
      item_6_16: electricalInstallationConditionReport.item_6_16 || "na",
      item_6_17A: electricalInstallationConditionReport.item_6_17A || "na",
      item_6_17B: electricalInstallationConditionReport.item_6_17B || "na",
      item_6_17C: electricalInstallationConditionReport.item_6_17C || "na",
      item_6_17D: electricalInstallationConditionReport.item_6_17D || "na",
      item_6_18: electricalInstallationConditionReport.item_6_18 || "na",
      item_6_19: electricalInstallationConditionReport.item_6_19 || "na",
      item_6_20: electricalInstallationConditionReport.item_6_20 || "na",
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateFinalCircuitsSchema>) => {
    const response = await updateFinalCircuits(data);

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
            <CardTitle>Final circuits</CardTitle>
            <CardDescription className="text-primary">This section covers the condition and performance of the final circuits.</CardDescription>
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
            <p className="text-sm text-muted-foreground">Ensure all final circuits are thoroughly inspected.</p>
            <Button variant="outline" type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
