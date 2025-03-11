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
import { updateCurrentUsingEquipment } from "./action";
import { inspectionItems } from "./inspection-items";
import { UpdateCurrentUsingEquipmentSchema } from "./schema";

export function UpdateCurrentUsingEquipmentForm({
  electricalInstallationConditionReport,
}: {
  electricalInstallationConditionReport: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateCurrentUsingEquipmentSchema>>({
    resolver: zodResolver(UpdateCurrentUsingEquipmentSchema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      item_8_1: electricalInstallationConditionReport.item_8_1 || "na",
      item_8_2: electricalInstallationConditionReport.item_8_2 || "na",
      item_8_3: electricalInstallationConditionReport.item_8_3 || "na",
      item_8_4: electricalInstallationConditionReport.item_8_4 || "na",
      item_8_5: electricalInstallationConditionReport.item_8_5 || "na",
      item_8_6: electricalInstallationConditionReport.item_8_6 || "na",
      item_8_7A: electricalInstallationConditionReport.item_8_7A || "na",
      item_8_7B: electricalInstallationConditionReport.item_8_7B || "na",
      item_8_7C: electricalInstallationConditionReport.item_8_7C || "na",
      item_8_7D: electricalInstallationConditionReport.item_8_7D || "na",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof UpdateCurrentUsingEquipmentSchema>,
  ) => {
    const response = await updateCurrentUsingEquipment(data);

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
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>
              Current-using equipment (permanently connected)
            </CardTitle>
            <CardDescription className="text-primary">
              This section evaluates the condition and safety of current-using
              equipment that is permanently connected.
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
              Ensure the condition and safety of permanently connected equipment
              is checked.
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
