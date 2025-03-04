"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Schema } from "./schema";

export function DeclarationForm() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      inspectorsName: "",
      inspectorsSignatureDate: "",
      retestDate: "",
      reasonForRecommendation: "",
      qualifiedSupervisorsName: "",
      qualifiedSupervisorsSignatureDate: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data: z.infer<typeof Schema>) => console.log(data))}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Declaration</CardTitle>
            <CardDescription className="text-primary">Declaration.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="retestDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retest Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Retest date" {...field} className="lg:max-w-[50%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reasonForRecommendation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} className="lg:max-w-[50%] min-h-[100px]" placeholder="Reason for Recommendation" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inspectorsName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inspector&apos;s Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="lg:max-w-[50%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inspectorsSignatureDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inspector&apos;s Signature Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="lg:max-w-[50%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qualifiedSupervisorsName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualified Supervisor&apos;s Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Smith" {...field} className="lg:max-w-[50%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qualifiedSupervisorsSignatureDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualified Supervisor&apos;s Signature Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Date of signature" {...field} className="lg:max-w-[50%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">Declaration.</p>
            <Button variant="outline" type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
