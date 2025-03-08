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

export function ScheduleOfItemsInspectedSection5Form() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      item_5_1: "na" as const,
      item_5_2: "na" as const,
      item_5_3: "na" as const,
      item_5_4: "na" as const,
      item_5_5: "na" as const,
      item_5_6: "na" as const,
      item_5_7: "na" as const,
      item_5_8: "na" as const,
      item_5_9: "na" as const,
      item_5_10: "na" as const,
      item_5_11: "na" as const,
      item_5_12: "na" as const,
      item_5_13: "na" as const,
      item_5_14A: "na" as const,
      item_5_14B: "na" as const,
      item_5_15: "na" as const,
      item_5_16: "na" as const,
      item_5_17: "na" as const,
      item_5_18: "na" as const,
      item_5_19: "na" as const,
      item_5_20: "na" as const,
      item_5_21: "na" as const,
      item_5_22: "na" as const,
      item_5_23: "na" as const,
      item_5_24: "na" as const,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data: z.infer<typeof Schema>) => console.log(data))}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Distribution Circuits</CardTitle>
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
                      <RadioGroupComponent onChange={field.onChange} defaultValue={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
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
