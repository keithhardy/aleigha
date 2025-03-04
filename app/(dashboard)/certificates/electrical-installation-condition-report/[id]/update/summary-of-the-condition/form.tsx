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

export function SummaryOfTheConditionOfTheInstallationForm() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      generalCondition: "",
      estimatedAgeOfElectricalInstallation: "",
      evidenceOfAlterations: false,
      estimatedAgeOfAlterations: "",
      overallAssessmentOfTheInstallation: true,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data: z.infer<typeof Schema>) => console.log(data))}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Summary of the Condition of the Installation</CardTitle>
            <CardDescription className="text-primary">Summary.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="generalCondition"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="General condition of the installation (in terms of electrical safety)" {...field} className="lg:max-w-[50%] min-h-[100px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estimatedAgeOfElectricalInstallation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Age of Installation</FormLabel>
                  <FormControl>
                    <Input placeholder="10" type="number" {...field} className="lg:max-w-[50%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="evidenceOfAlterations"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>Evidence of Alterations</FormLabel>
                  </div>
                  <Switch checked={field.value} onCheckedChange={field.onChange} className="lg:max-w-[50%]" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimatedAgeOfAlterations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Age of Alterations</FormLabel>
                  <FormControl>
                    <Input placeholder="2" {...field} disabled={!form.watch("evidenceOfAlterations")} className="lg:max-w-[50%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="overallAssessmentOfTheInstallation"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>Overall Assessment</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                    <span className="text-sm font-medium">{field.value ? "Satisfactory" : "Unsatisfactory"}</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">Condition.</p>
            <Button variant="outline" type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
