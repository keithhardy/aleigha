"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { RadioGroupComponent } from "../radio-group";
import { inspectionItems } from "./inspection-items";
import { Schema } from "./schema";

export function ScheduleOfItemsInspectedSection4Form() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      item_4_1: "na" as const,
      item_4_2: "na" as const,
      item_4_3: "na" as const,
      item_4_4: "na" as const,
      item_4_5: "na" as const,
      item_4_6: "na" as const,
      item_4_7: "na" as const,
      item_4_8: "na" as const,
      item_4_9: "na" as const,
      item_4_10: "na" as const,
      item_4_11: "na" as const,
      item_4_12: "na" as const,
      item_4_13: "na" as const,
      item_4_14: "na" as const,
      item_4_15: "na" as const,
      item_4_16: "na" as const,
      item_4_17: "na" as const,
      item_4_18: "na" as const,
      item_4_19: "na" as const,
      item_4_20: "na" as const,
      item_4_21: "na" as const,
      item_4_22: "na" as const,
      item_4_23: "na" as const,
      item_4_24: "na" as const,
      item_4_25: "na" as const,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data: z.infer<typeof Schema>) => console.log(data))}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Distribution Equipment (Consumer Units & Distribution Boards)</CardTitle>
            <CardDescription className="text-primary">
              This section covers the condition of distribution equipment, including consumer units, circuit breakers, and distribution boards.
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
                      <RadioGroupComponent onChange={field.onChange} defaultValue={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">
              Ensure all distribution equipment and consumer units are properly inspected.
            </p>
            <Button variant="outline" type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
