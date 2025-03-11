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
import { useToast } from "@/hooks/use-toast";

import { RadioGroupComponent } from "../radio-group";
import { updateIntakeEquipment } from "./action";
import { inspectionItems } from "./inspection-items";
import { UpdateIntakeEquipmentSchema } from "./schema";

export function UpdateIntakeEquipmentForm({
  electricalInstallationConditionReport,
}: {
  electricalInstallationConditionReport: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateIntakeEquipmentSchema>>({
    resolver: zodResolver(UpdateIntakeEquipmentSchema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      item_1_1A: electricalInstallationConditionReport.item_1_1A || "na",
      item_1_1B: electricalInstallationConditionReport.item_1_1B || "na",
      item_1_1C: electricalInstallationConditionReport.item_1_1C || "na",
      item_1_1D: electricalInstallationConditionReport.item_1_1D || "na",
      item_1_1E: electricalInstallationConditionReport.item_1_1E || "na",
      item_1_1F: electricalInstallationConditionReport.item_1_1F || "na",
      item_1_2: electricalInstallationConditionReport.item_1_2 || "na",
      item_1_3: electricalInstallationConditionReport.item_1_3 || "na",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof UpdateIntakeEquipmentSchema>,
  ) => {
    const response = await updateIntakeEquipment(data);

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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Intake equipment (visual inspection only)</CardTitle>
            <CardDescription className="text-primary">
              This section covers all outcomes related to the inspection of
              intake equipment. Any findings other than those regarding access
              to live parts should not influence the overall evaluation.
            </CardDescription>
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
                      <RadioGroupComponent
                        onChange={field.onChange}
                        defaultValue={field.value || "na"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">
              Ensure all inspection items are correctly addressed and noted.
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
