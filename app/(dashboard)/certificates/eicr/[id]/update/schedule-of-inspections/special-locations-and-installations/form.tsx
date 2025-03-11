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
import { updateContractorClientAndInstallation } from "./action";
import { inspectionItems } from "./inspection-items";
import { UpdateSpecialLocationsAndInstallationsSchema } from "./schema";

export function UpdateSpecialLocationsAndInstallationsForm({
  electricalInstallationConditionReport,
}: {
  electricalInstallationConditionReport: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<
    z.infer<typeof UpdateSpecialLocationsAndInstallationsSchema>
  >({
    resolver: zodResolver(UpdateSpecialLocationsAndInstallationsSchema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      item_9_1A: electricalInstallationConditionReport.item_9_1A || "na",
      item_9_1B: electricalInstallationConditionReport.item_9_1B || "na",
      item_9_1C: electricalInstallationConditionReport.item_9_1C || "na",
      item_9_1D: electricalInstallationConditionReport.item_9_1D || "na",
      item_9_1E: electricalInstallationConditionReport.item_9_1E || "na",
      item_9_1F: electricalInstallationConditionReport.item_9_1F || "na",
      item_9_1G: electricalInstallationConditionReport.item_9_1G || "na",
      item_9_1H: electricalInstallationConditionReport.item_9_1H || "na",
      item_9_2: electricalInstallationConditionReport.item_9_2 || "na",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof UpdateSpecialLocationsAndInstallationsSchema>,
  ) => {
    const response = await updateContractorClientAndInstallation(data);

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
            <CardTitle>Special locations and installations</CardTitle>
            <CardDescription className="text-primary">
              This section evaluates the condition and safety of special
              locations and installations.
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
              Ensure the condition and safety of special locations and
              installations is checked.
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
