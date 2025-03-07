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

export function ScheduleOfItemsInspectedSection7Form() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      item_7_1A: "na" as const,
      item_7_1B: "na" as const,
      item_7_1C: "na" as const,
      item_7_1D: "na" as const,
      item_7_1E: "na" as const,
      item_7_1F: "na" as const,
      item_7_2A: "na" as const,
      item_7_2B: "na" as const,
      item_7_2C: "na" as const,
      item_7_2D: "na" as const,
      item_7_3A: "na" as const,
      item_7_3B: "na" as const,
      item_7_3C: "na" as const,
      item_7_3D: "na" as const,
      item_7_4A: "na" as const,
      item_7_4B: "na" as const,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data: z.infer<typeof Schema>) => console.log(data))}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Isolation and Switching</CardTitle>
            <CardDescription className="text-primary">
              This section evaluates the isolation and switching arrangements for safety and compliance.
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
              Ensure all isolation and switching mechanisms are inspected.
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
