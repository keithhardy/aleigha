"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { Schema } from "./schema";

export function PurposeOfTheReportForm() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      purpose: "",
      startDate: "",
      endDate: "",
      recordsAvailable: false,
      previousReportAvailable: false,
      previousReportDate: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data: z.infer<typeof Schema>) => console.log(data))}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Purpose of the EICR</CardTitle>
            <CardDescription className="text-primary">Specify the purpose of the report, including inspection details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose of the Report</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="lg:max-w-[50%] min-h-[100px]" placeholder="Describe the purpose of the inspection, e.g., condition assessment, fault detection, etc." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date of Inspection</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="lg:max-w-[50%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date of Inspection</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="lg:max-w-[50%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recordsAvailable"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>Are Inspection Records Available?</FormLabel>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} className="lg:max-w-[50%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previousReportAvailable"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>Is Previous Report Available?</FormLabel>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} className="lg:max-w-[50%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previousReportDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Previous Report</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="lg:max-w-[50%]" disabled={!form.watch("previousReportAvailable")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">Details about the inspection purpose and relevant dates.</p>
            <Button variant="outline" type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
