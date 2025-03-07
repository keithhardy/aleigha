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

export function ScheduleOfItemsInspectedSection3Form() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      item_3_1A: "na" as const,
      item_3_1B: "na" as const,
      item_3_1C: "na" as const,
      item_3_1D: "na" as const,
      item_3_1E: "na" as const,
      item_3_1F: "na" as const,
      item_3_1G: "na" as const,
      item_3_1H: "na" as const,
      item_3_1I: "na" as const,
      item_3_2: "na" as const,
      item_3_3A: "na" as const,
      item_3_3B: "na" as const,
      item_3_3C: "na" as const,
      item_3_3D: "na" as const,
      item_3_3E: "na" as const,
      item_3_3F: "na" as const,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data: z.infer<typeof Schema>) => console.log(data))}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Methods of Protection</CardTitle>
            <CardDescription className="text-primary">
              This section assesses the condition and adequacy of earthing, bonding, insulation, and safety provisions, including main earthing, protective bonding, and equipotential bonding.
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
              Ensure all earthing and bonding arrangements are inspected.
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
