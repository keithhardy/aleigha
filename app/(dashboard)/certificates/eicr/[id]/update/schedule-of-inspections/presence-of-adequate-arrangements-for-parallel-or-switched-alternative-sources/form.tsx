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
import { updatePresenceOfAdequateArrangements } from "./action";
import { inspectionItems } from "./inspection-items";
import { UpdatePresenceOfAdequateArrangementsSchema } from "./schema";

export function UpdatePresenceOfAdequateArrangementsForm({
  electricalInstallationConditionReport,
}: {
  electricalInstallationConditionReport: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<
    z.infer<typeof UpdatePresenceOfAdequateArrangementsSchema>
  >({
    resolver: zodResolver(UpdatePresenceOfAdequateArrangementsSchema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      item_2_1: electricalInstallationConditionReport.item_2_1 || "na",
      item_2_2: electricalInstallationConditionReport.item_2_2 || "na",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof UpdatePresenceOfAdequateArrangementsSchema>,
  ) => {
    const response = await updatePresenceOfAdequateArrangements(data);

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
            <CardTitle>
              Presence of adequate arrangements for parallel or switched
              alternative sources
            </CardTitle>
            <CardDescription className="text-primary">
              This section evaluates the presence of suitable arrangements for
              parallel or switched alternative power sources, such as
              microgenerators.
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
          <CardFooter className="flex justify-between bg-muted py-2 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">
              Ensure all items related to microgenerators are inspected.
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
